# FLWRSTORE 🌸 — Tienda Online de K-Pop

Plataforma web para la gestión y venta de artículos de K-Pop: álbumes, photocards, peluches, lightsticks y más. Desarrollada con Vue 3 + Firebase para ofrecer stock en tiempo real, sistema de apartado y panel de administración completo.

**Producción:** [flwrstore.com.mx](https://flwrstore.com.mx)

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Frontend | Vue.js 3 (Composition API) + Vite |
| Estilos | CSS nativo con variables, responsive mobile-first |
| Base de datos | Firebase Cloud Firestore (tiempo real) |
| Autenticación | Firebase Auth (email/password) |
| Almacenamiento | Firebase Storage (imágenes de productos) |
| Hosting | Firebase Hosting |
| DNS | Cloudflare + Akky (.com.mx) |

---

## Estructura del proyecto

```
src/
├── components/
│   ├── Navbar.vue
│   ├── Footer.vue
│   └── SplashScreen.vue
├── composables/
│   ├── useAuth.js
│   ├── useProductos.js
│   ├── useTestimonios.js
│   └── useComentarios.js
├── views/
│   ├── ComingSoonView.vue
│   ├── HomeView.vue
│   ├── StockView.vue
│   ├── MisApartadosView.vue
│   ├── LoginView.vue
│   ├── SignUpView.vue
│   ├── PagosView.vue
│   ├── LegalView.vue
│   └── NotFoundView.vue
├── firebase.js
├── router.js
├── main.js
└── style.css
```

---

## Roles del sistema

| Rol | Permisos |
|---|---|
| `cliente` | Ver stock, apartar productos, enviar comentarios, ver sus apartados |
| `subadmin` | Todo lo anterior + agregar/editar/eliminar productos y testimonios |
| `admin` | Todo lo anterior + ver comentarios de clientes |

---

## Instalación local

```bash
# 1. Clonar el repositorio
git clone 

# 2. Instalar dependencias
npm install

# 3. Correr servidor de desarrollo
npm run dev
# Acceder en: http://localhost
```

> ⚠️ El archivo `.env` nunca debe subirse a GitHub. Está incluido en `.gitignore`.

---

## Aspectos legales

### Privacidad de datos
FLWRSTORE recopila únicamente nombre y correo electrónico con fines de gestión de cuenta y pedidos, conforme a la **Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP)** vigente en México. Los datos se almacenan en Firebase (Google Cloud) con cifrado en tránsito y en reposo. No se comparten con terceros.

### Propiedad intelectual
El código fuente, diseño y marca FLWRSTORE son propiedad de Andrea Esqueda Rosario. Las imágenes de artistas, álbumes y sellos discográficos pertenecen a sus respectivos titulares y se utilizan exclusivamente con fines ilustrativos para la reventa de artículos originales. FLWRSTORE no es distribuidora oficial de ningún sello discográfico.

### Términos de uso del sistema
- Este sistema es de uso exclusivo para FLWRSTORE y su equipo autorizado.
- El acceso no autorizado al panel de administración está prohibido.
- El código fuente no puede ser reutilizado ni distribuido sin autorización expresa.

---

## Equipo

| Rol | Persona |
|---|---|
| Fundadora & Administradora | Andrea Esqueda Rosario |
| Administradora de apoyo | Melissa Esparza |
| Diseño y desarrollo web | Ing. Juan Martín Esparza de la Cruz |

---

## 📄 Licencia

Proyecto privado. Todos los derechos reservados © 2026 FLWRSTORE — Andrea Esqueda Rosario.
