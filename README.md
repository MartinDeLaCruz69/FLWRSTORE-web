# FLWRSTORE 🌸 - Tienda Online de K-Pop

¡Bienvenido a FLWRSTORE! Esta es una plataforma web diseñada para la gestión visual y venta de artículos de K-pop (álbumes, photocards, peluches y más). El objetivo principal es ofrecer una experiencia de usuario fluida donde los clientes puedan visualizar el stock en tiempo real y apartar sus productos favoritos.

---

## 🚀 Tecnologías Utilizadas

El proyecto está construido con un stack moderno y escalable (E-commerce Ready):

* **Frontend:** [Vue.js 3](https://vuejs.org/) (Composition API) para una interfaz reactiva y rápida.
* **Estilos:** [Tailwind CSS](https://tailwindcss.com/) para un diseño responsivo, moderno y estético.
* **Backend & Base de Datos:** [Firebase](https://firebase.google.com/) (Cloud Firestore) para la gestión de productos y stock en tiempo real.
* **Autenticación:** Firebase Auth para el acceso seguro al panel de administración.
* **Herramienta de Construcción:** Vite.

---

## 📖 Manual de Usuario

### Para Clientes:
1.  **Explorar el Stock:** Al ingresar a la página, verás la sección de "Stock Disponible" con fotos reales de los productos.
2.  **Estado de los Productos:** * **Disponible:** El producto puede ser tuyo.
    * **Apartado:** Alguien ya ha seleccionado el producto; se mostrará visualmente como no disponible para otros.
3.  **Proceso de Apartado:** Actualmente, el apartado se confirma visualmente. Para concretar la compra, el cliente debe seguir las instrucciones en la sección de "Formas de Pago".

### Para el Administrador (Panel de Control):
1.  **Gestión de Inventario:** Acceso al panel de administración para añadir, editar o eliminar productos.
2.  **Actualización de Estados:** Cambiar el estado de los productos (Disponible/Apartado) directamente desde la interfaz.

---

## ⚖️ Aspectos Legales y Privacidad

### Aviso de Privacidad
En FLWRSTORE, protegemos tus datos. La información recolectada (como nombres para apartados) se utiliza exclusivamente para la gestión interna de pedidos y nunca será compartida con terceros sin consentimiento previo.

### Derechos de Autor
Todo el contenido visual, logotipos y código fuente de esta página son propiedad de FLWRSTORE. Las imágenes de productos (álbumes, artistas, marcas) pertenecen a sus respectivos dueños y se utilizan aquí únicamente con fines ilustrativos para la venta de artículos originales.

### Términos y Condiciones
* Los apartados tienen una vigencia limitada (consultar sección de pagos).
* No se realizan devoluciones en artículos de preventa una vez confirmado el pedido.

---

## 🛠️ Instalación y Desarrollo

Si deseas ejecutar este proyecto localmente:

1. Clonar el repositorio.
2. Instalar dependencias: `npm install`
3. Correr el servidor de desarrollo: `npm run dev`
4. Acceder a: `localhost`