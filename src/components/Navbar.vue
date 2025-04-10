<template>
  <nav class="bg-white shadow-sm">
    <div class="container mx-auto px-4">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <router-link to="/" class="text-xl font-bold text-pink-600">BeautySalon</router-link>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <router-link
                to="/"
                class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                :class="$route.path === '/' ? 'border-pink-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'"
            >
              Inicio
            </router-link>
            <router-link
                to="/servicios"
                class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                :class="$route.path === '/servicios' ? 'border-pink-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'"
            >
              Servicios
            </router-link>
            <router-link
                to="/contacto"
                class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                :class="$route.path === '/contacto' ? 'border-pink-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'"
            >
              Contacto
            </router-link>
          </div>
        </div>
        <div class="hidden sm:ml-6 sm:flex sm:items-center">
          <router-link
              to="/admin"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700"
          >
            Administración
          </router-link>
        </div>
        <div class="-mr-2 flex items-center sm:hidden">
          <button
              @click="mobileMenuOpen = !mobileMenuOpen"
              type="button"
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-500"
          >
            <span class="sr-only">Abrir menú principal</span>
            <MenuIcon v-if="!mobileMenuOpen" class="block h-6 w-6" />
            <XIcon v-else class="block h-6 w-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="mobileMenuOpen" class="sm:hidden">
      <div class="pt-2 pb-3 space-y-1">
        <router-link
            to="/"
            class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            :class="$route.path === '/' ? 'bg-pink-50 border-pink-500 text-pink-700' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'"
            @click="mobileMenuOpen = false"
        >
          Inicio
        </router-link>
        <router-link
            to="/servicios"
            class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            :class="$route.path === '/servicios' ? 'bg-pink-50 border-pink-500 text-pink-700' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'"
            @click="mobileMenuOpen = false"
        >
          Servicios
        </router-link>
        <router-link
            to="/contacto"
            class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            :class="$route.path === '/contacto' ? 'bg-pink-50 border-pink-500 text-pink-700' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'"
            @click="mobileMenuOpen = false"
        >
          Contacto
        </router-link>
        <router-link
            to="/admin"
            class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium bg-gray-50 border-gray-300 text-gray-800"
            @click="mobileMenuOpen = false"
        >
          Administración
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import { MenuIcon, XIcon } from 'lucide-vue-next';

const mobileMenuOpen = ref(false);
</script>

