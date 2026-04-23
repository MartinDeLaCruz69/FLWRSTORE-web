// src/composables/useProductos.js
import { ref, onUnmounted } from 'vue'
import {
  collection, onSnapshot, addDoc, updateDoc, deleteDoc,
  doc, serverTimestamp, query, orderBy,
} from 'firebase/firestore'
import {
  ref as storageRef, uploadBytesResumable,
  getDownloadURL, deleteObject,
} from 'firebase/storage'
import { db, storage } from '../firebase'

export function useProductos() {
  const productos = ref([])
  const cargando  = ref(true)

  // ── Escucha en tiempo real ────────────────────────────────
  const q = query(collection(db, 'productos'), orderBy('creadoEn', 'desc'))

  const unsub = onSnapshot(q, (snap) => {
    productos.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
    cargando.value  = false
  }, (err) => {
    console.error('[useProductos] onSnapshot error:', err)
    cargando.value = false
  })

  onUnmounted(() => unsub())

  // ── Helper: subir imagen a Storage ───────────────────────
  const subirImagen = (file, onProgress) => {
    return new Promise((resolve, reject) => {
      const path    = `productos/${Date.now()}_${file.name}`
      const sRef    = storageRef(storage, path)
      const task    = uploadBytesResumable(sRef, file)

      task.on('state_changed',
        snap => {
          const pct = Math.round((snap.bytesTransferred / snap.totalBytes) * 100)
          onProgress?.(pct)
        },
        reject,
        async () => {
          const url = await getDownloadURL(task.snapshot.ref)
          resolve({ url, path })
        }
      )
    })
  }

  // ── Agregar producto ─────────────────────────────────────
  const agregarProducto = async (datos, imagenFile, onProgress) => {
    const { url, path } = await subirImagen(imagenFile, onProgress)
    await addDoc(collection(db, 'productos'), {
      ...datos,
      imagenUrl:  url,
      imagenPath: path,
      estado:     datos.estado || 'disponible',
      creadoEn:   serverTimestamp(),
    })
  }

  // ── Editar producto ──────────────────────────────────────
  const editarProducto = async (id, datos, imagenFile, imagenPathVieja, onProgress) => {
    let imagenUrl  = datos.imagenUrl  || null
    let imagenPath = imagenPathVieja  || null

    if (imagenFile) {
      // Borrar imagen vieja si existe
      if (imagenPathVieja) {
        try { await deleteObject(storageRef(storage, imagenPathVieja)) } catch (_) {}
      }
      const res  = await subirImagen(imagenFile, onProgress)
      imagenUrl  = res.url
      imagenPath = res.path
    }

    const ref = doc(db, 'productos', id)
    await updateDoc(ref, { ...datos, imagenUrl, imagenPath, actualizadoEn: serverTimestamp() })
  }

  // ── Eliminar producto ────────────────────────────────────
  const eliminarProducto = async (id, imagenPath) => {
    if (imagenPath) {
      try { await deleteObject(storageRef(storage, imagenPath)) } catch (_) {}
    }
    await deleteDoc(doc(db, 'productos', id))
  }

  // ── Apartar producto ─────────────────────────────────────
  const apartarProducto = async (id, nombreCliente) => {
    await updateDoc(doc(db, 'productos', id), {
      estado:      'apartado',
      apartadoPor: nombreCliente,
      apartadoEn:  serverTimestamp(),
    })
  }

  // ── Liberar producto (vuelve a disponible) ───────────────
  const liberarProducto = async (id) => {
    await updateDoc(doc(db, 'productos', id), {
      estado:      'disponible',
      apartadoPor: null,
      apartadoEn:  null,
    })
  }

  // ── Marcar como vendido ──────────────────────────────────
  const marcarVendido = async (id) => {
    await updateDoc(doc(db, 'productos', id), {
      estado:    'vendido',
      vendidoEn: serverTimestamp(),
    })
  }

  return {
    productos, cargando,
    agregarProducto, editarProducto, eliminarProducto,
    apartarProducto, liberarProducto, marcarVendido,
  }
}