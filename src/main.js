import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Importa la configuración que hicimos

const app = createApp(App)

app.use(router) // ¡Asegúrate de que esta línea exista!
app.mount('#app')

// En src/main.js — agrega al final
// ── Deshabilitar clic derecho e inspección (producción) ──────
if (import.meta.env.PROD) {
  // Bloquear clic derecho
  document.addEventListener('contextmenu', (e) => e.preventDefault())

  // Bloquear F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
  document.addEventListener('keydown', (e) => {
    if (
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) ||
      (e.ctrlKey && e.key === 'U')
    ) {
      e.preventDefault()
    }
  })
}