import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Importa la configuración que hicimos

const app = createApp(App)

app.use(router) // ¡Asegúrate de que esta línea exista!
app.mount('#app')