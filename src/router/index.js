import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
import Servicios from "../views/Servicios.vue"
import Contacto from "../views/Contacto.vue"
import Admin from "../views/Admin.vue"

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/servicios",
        name: "Servicios",
        component: Servicios,
    },
    {
        path: "/contacto",
        name: "Contacto",
        component: Contacto,
    },
    {
        path: "/admin",
        name: "Admin",
        component: Admin,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router

