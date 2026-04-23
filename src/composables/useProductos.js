import { ref, onUnmounted } from 'vue'
import { db, storage } from '../firebase'
import {
  collection, onSnapshot, addDoc, updateDoc,
  deleteDoc, doc, serverTimestamp, query, orderBy
} from 'firebase/firestore'
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject
} from 'firebase/storage'

export function useProductos() {
  const productos  = ref([])
  const cargando   = ref(true)

  // ── Escucha en tiempo real ──────────────────────────────────
  const unsub = onSnapshot(
    query(collection(db, 'productos'), orderBy('fechaCreacion', 'desc')),
    (snap) => {
      productos.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      cargando.value  = false
    },
    () => { cargando.value = false }
  )
  onUnmounted(() => unsub())

  // ── Subir imagen a Storage ──────────────────────────────────
  const subirImagen = (file, onProgress) => {
    return new Promise((resolve, reject) => {
      const path = `productos/${Date.now()}_${file.name}`
      const sRef = storageRef(storage, path)
      const task = uploadBytesResumable(sRef, file)
      task.on('state_changed',
        snap => onProgress?.(Math.round(snap.bytesTransferred / snap.totalBytes * 100)),
        reject,
        async () => resolve({
          url:  await getDownloadURL(task.snapshot.ref),
          path: task.snapshot.ref.fullPath
        })
      )
    })
  }

  // ── Agregar producto ────────────────────────────────────────
  const agregarProducto = async (datos, imagenFile, onProgress) => {
    let imagenUrl  = null
    let imagenPath = null

    if (imagenFile) {
      const result = await subirImagen(imagenFile, onProgress)
      imagenUrl  = result.url
      imagenPath = result.path
    }

    return addDoc(collection(db, 'productos'), {
      ...datos,
      precio:        Number(datos.precio),
      imagenUrl,
      imagenPath,
      apartadoPor:   null,
      fechaApartado: null,
      fechaCreacion: serverTimestamp(),
    })
  }

  // ── Editar producto ─────────────────────────────────────────
  const editarProducto = async (id, datos, imagenFile, imagenPathVieja, onProgress) => {
    let updates = { ...datos, precio: Number(datos.precio) }

    if (imagenFile) {
      // Sube nueva imagen
      const result = await subirImagen(imagenFile, onProgress)
      updates.imagenUrl  = result.url
      updates.imagenPath = result.path

      // Borra imagen vieja si existe
      if (imagenPathVieja) {
        try {
          await deleteObject(storageRef(storage, imagenPathVieja))
        } catch (_) {}
      }
    }

    return updateDoc(doc(db, 'productos', id), updates)
  }

  // ── Eliminar producto ───────────────────────────────────────
  const eliminarProducto = async (id, imagenPath) => {
    if (imagenPath) {
      try {
        await deleteObject(storageRef(storage, imagenPath))
      } catch (_) {}
    }
    return deleteDoc(doc(db, 'productos', id))
  }

  // ── Apartar producto ────────────────────────────────────────
  const apartarProducto = (id, nombre) =>
    updateDoc(doc(db, 'productos', id), {
      estado:        'apartado',
      apartadoPor:   nombre,
      fechaApartado: serverTimestamp(),
    })

  // ── Regresar a disponible ───────────────────────────────────
  const liberarProducto = (id) =>
    updateDoc(doc(db, 'productos', id), {
      estado:        'disponible',
      apartadoPor:   null,
      fechaApartado: null,
    })

  // ── Marcar como vendido ─────────────────────────────────────
  const marcarVendido = (id) =>
    updateDoc(doc(db, 'productos', id), { estado: 'vendido' })

  return {
    productos, cargando,
    agregarProducto, editarProducto, eliminarProducto,
    apartarProducto, liberarProducto, marcarVendido,
  }
}