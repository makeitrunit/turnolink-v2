import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './views/Home.vue'
import Servicios from './views/Servicios.vue'
import Contacto from './views/Contacto.vue'
import './index.css'

const routes = [
  { path: '/', component: Home },
  { path: '/servicios', component: Servicios },
  { path: '/contacto', component: Contacto }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')