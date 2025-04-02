<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <ScissorsIcon class="h-8 w-8 text-pink-600" />
            <h1 class="ml-2 text-2xl font-bold text-gray-800">BeautySalon</h1>
          </div>
          <nav class="flex space-x-6">
            <router-link 
              v-for="(item, index) in navItems" 
              :key="index" 
              :to="item.path"
              class="text-gray-600 hover:text-pink-600 font-medium transition-colors"
              active-class="text-pink-600 font-semibold"
            >
              {{ item.name }}
            </router-link>
          </nav>
        </div>
      </div>
    </header>

    <main>
      <router-view></router-view>
    </main>

    <footer class="bg-gray-800 text-white py-8">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-xl font-bold mb-4 flex items-center">
              <ScissorsIcon class="h-5 w-5 mr-2" />
              BeautySalon
            </h3>
            <p class="text-gray-300">
              Ofrecemos servicios de belleza de alta calidad para que te sientas y veas increíble.
            </p>
          </div>
          <div>
            <h3 class="text-xl font-bold mb-4">Horario</h3>
            <p class="text-gray-300">Lunes - Viernes: 9:00 - 20:00</p>
            <p class="text-gray-300">Sábados: 10:00 - 18:00</p>
            <p class="text-gray-300">Domingos: Cerrado</p>
          </div>
          <div>
            <h3 class="text-xl font-bold mb-4">Contacto</h3>
            <p class="text-gray-300 flex items-center mb-2">
              <PhoneIcon class="h-4 w-4 mr-2" />
              +123 456 7890
            </p>
            <p class="text-gray-300 flex items-center mb-2">
              <MailIcon class="h-4 w-4 mr-2" />
              info@beautysalon.com
            </p>
            <p class="text-gray-300 flex items-center">
              <MapPinIcon class="h-4 w-4 mr-2" />
              Calle Principal 123, Ciudad
            </p>
          </div>
        </div>
        <div class="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>© {{ new Date().getFullYear() }} BeautySalon. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ScissorsIcon, PhoneIcon, MailIcon, MapPinIcon } from 'lucide-vue-next';

const navItems = ref([
  { name: 'Inicio', path: '/' },
  { name: 'Servicios', path: '/servicios' },
  { name: 'Contacto', path: '/contacto' }
]);
</script>