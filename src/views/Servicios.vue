<template>
  <div class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <h1 class="text-4xl font-bold text-center mb-4">Nuestros Servicios</h1>
      <p class="text-xl text-gray-600 text-center mb-8 max-w-3xl mx-auto">
        Ofrecemos una amplia gama de servicios de belleza para realzar tu belleza natural
      </p>

      <!-- Contador de servicios seleccionados -->
      <div class="mb-8 flex justify-between items-center">
        <div class="text-gray-600">
          <span v-if="selectedServices.length === 0">Selecciona los servicios que deseas reservar</span>
          <span v-else>
            <span class="font-medium">{{ selectedServices.length }}</span>
            {{ selectedServices.length === 1 ? 'servicio seleccionado' : 'servicios seleccionados' }}
          </span>
        </div>
        <button
            v-if="selectedServices.length > 0"
            @click="reservarSeleccionados"
            class="bg-pink-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-pink-700 transition-colors flex items-center"
        >
          <CalendarIcon class="h-5 w-5 mr-2" />
          Reservar seleccionados
        </button>
      </div>

      <!-- Resumen de servicios seleccionados (visible cuando hay selecciones) -->
      <div v-if="selectedServices.length > 0" class="mb-8 bg-white rounded-lg shadow-md p-4">
        <h3 class="font-bold text-lg mb-3 text-gray-800">Servicios seleccionados</h3>
        <div class="space-y-2">
          <div
              v-for="service in selectedServices"
              :key="service.id"
              class="flex justify-between items-center p-2 bg-pink-50 rounded-lg"
          >
            <div class="flex items-center">
              <div class="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center mr-3">
                <ScissorsIcon class="h-5 w-5 text-pink-600" />
              </div>
              <span class="font-medium">{{ service.title }}</span>
            </div>
            <div class="flex items-center">
              <span class="text-gray-600 mr-4">{{ formatDuration(service.duration) }}</span>
              <span class="font-bold text-pink-600">${{ service.price }}</span>
              <button
                  @click="toggleService(service)"
                  class="ml-3 text-gray-400 hover:text-red-500"
              >
                <XIcon class="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        <div class="mt-4 pt-3 border-t border-gray-200 flex justify-between">
          <span class="font-medium">Total:</span>
          <span class="font-bold text-pink-600">${{ totalPrice }}</span>
        </div>
      </div>

      <!-- Grid de servicios -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
            v-for="(service, index) in services"
            :key="index"
            class="relative bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg"
            :class="{ 'ring-2 ring-pink-500 ring-offset-2': isSelected(service) }"
        >
          <!-- Indicador de selección -->
          <div
              v-if="isSelected(service)"
              class="absolute top-3 right-3 bg-pink-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md z-10"
          >
            <CheckIcon class="h-5 w-5" />
          </div>

          <!-- Imagen principal con indicador de galería si hay más de una imagen -->
          <div class="relative">
            <img
                :src="getPrimaryImage(service)"
                :alt="service.title"
                class="w-full h-64 object-cover cursor-pointer"
                @click="openGallery(service)"
            />
            <div
                v-if="service.images.length > 1"
                class="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full flex items-center"
                @click.stop="openGallery(service)"
            >
              <ImageIcon class="h-3 w-3 mr-1" />
              {{ service.images.length }}
            </div>
          </div>

          <div class="p-6">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-xl font-bold text-gray-800">{{ service.title }}</h3>
              <span class="bg-pink-100 text-pink-800 text-sm font-medium px-3 py-1 rounded-full">
                {{ formatDuration(service.duration) }}
              </span>
            </div>
            <p class="text-gray-600 mb-4">{{ service.description }}</p>
            <div class="flex justify-between items-center">
              <span class="text-lg font-bold text-pink-600">${{ service.price }}</span>
              <button
                  @click="toggleService(service)"
                  class="py-2 px-4 rounded-lg font-medium transition-colors"
                  :class="isSelected(service)
                  ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  : 'bg-pink-600 text-white hover:bg-pink-700'"
              >
                {{ isSelected(service) ? 'Deseleccionar' : 'Seleccionar' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Botón flotante para reservar (visible cuando hay selecciones) -->
      <div
          v-if="selectedServices.length > 0"
          class="fixed bottom-6 right-6 md:hidden"
      >
        <button
            @click="reservarSeleccionados"
            class="bg-pink-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
        >
          <CalendarIcon class="h-6 w-6" />
        </button>
      </div>
    </div>

    <!-- Modal de confirmación (opcional) -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h3 class="text-xl font-bold mb-4">Confirmar selección</h3>
        <p class="mb-4">Has seleccionado {{ selectedServices.length }} servicios:</p>
        <ul class="mb-4 space-y-2">
          <li v-for="service in selectedServices" :key="service.id" class="flex justify-between">
            <span>{{ service.title }}</span>
            <span class="font-bold">${{ service.price }}</span>
          </li>
        </ul>
        <p class="font-bold mb-6">Total: ${{ totalPrice }}</p>
        <div class="flex justify-end space-x-3">
          <button
              @click="showModal = false"
              class="border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
              @click="procederReserva"
              class="bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700"
          >
            Proceder a reservar
          </button>
        </div>
      </div>
    </div>

    <!-- Modal de Galería de Imágenes -->
    <div
        v-if="showGallery && galleryService"
        class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
    >
      <div class="relative w-full max-w-4xl">
        <!-- Botón de cerrar -->
        <button
            @click="showGallery = false"
            class="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
        >
          <XIcon class="h-8 w-8" />
        </button>

        <!-- Imagen actual -->
        <div class="relative">
          <img
              :src="galleryService.images[currentImageIndex].url"
              :alt="galleryService.title"
              class="w-full max-h-[80vh] object-contain"
          />

          <!-- Contador de imágenes -->
          <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full">
            {{ currentImageIndex + 1 }} / {{ galleryService.images.length }}
          </div>
        </div>

        <!-- Botones de navegación -->
        <button
            v-if="galleryService.images.length > 1"
            @click="prevImage"
            class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full"
        >
          <ChevronLeftIcon class="h-8 w-8" />
        </button>
        <button
            v-if="galleryService.images.length > 1"
            @click="nextImage"
            class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full"
        >
          <ChevronRightIcon class="h-8 w-8" />
        </button>

        <!-- Miniaturas -->
        <div v-if="galleryService.images.length > 1" class="flex justify-center mt-4 space-x-2 overflow-x-auto">
          <button
              v-for="(image, index) in galleryService.images"
              :key="image.id"
              @click="currentImageIndex = index"
              class="w-16 h-16 rounded-md overflow-hidden border-2 transition-all"
              :class="currentImageIndex === index ? 'border-pink-500 opacity-100' : 'border-transparent opacity-70 hover:opacity-100'"
          >
            <img :src="image.url" :alt="`Miniatura ${index + 1}`" class="w-full h-full object-cover" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import {
  ScissorsIcon,
  CheckIcon,
  XIcon,
  CalendarIcon,
  ImageIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from 'lucide-vue-next';

const router = useRouter();
const selectedServices = ref([]);
const showModal = ref(false);

const showGallery = ref(false);
const galleryService = ref(null);
const currentImageIndex = ref(0);

const services = ref([
  {
    id: 1,
    title: 'Corte de Cabello',
    description: 'Corte personalizado según tu tipo de rostro y preferencias, incluye lavado y peinado básico.',
    duration: 45,
    price: 35,
    images: [
      { id: 1, url: '/placeholder.svg?height=400&width=600', isPrimary: true },
      { id: 2, url: '/placeholder.svg?height=400&width=600&text=Corte2', isPrimary: false }
    ]
  },
  {
    id: 2,
    title: 'Coloración',
    description: 'Coloración completa con productos de alta calidad que cuidan tu cabello mientras le dan un color vibrante.',
    duration: 120,
    price: 65,
    images: [
      { id: 3, url: '/placeholder.svg?height=400&width=600', isPrimary: true }
    ]
  },
  {
    id: 3,
    title: 'Manicura',
    description: 'Tratamiento completo para tus uñas que incluye limado, cutículas, exfoliación, masaje y esmalte.',
    duration: 45,
    price: 25,
    images: [
      { id: 4, url: '/placeholder.svg?height=400&width=600', isPrimary: true }
    ]
  },
  {
    id: 4,
    title: 'Pedicura',
    description: 'Tratamiento rejuvenecedor para tus pies que incluye remojo, exfoliación, limado, cutículas y esmalte.',
    duration: 60,
    price: 35,
    images: [
      { id: 5, url: '/placeholder.svg?height=400&width=600', isPrimary: true }
    ]
  },
  {
    id: 5,
    title: 'Tratamiento Facial',
    description: 'Limpieza profunda, exfoliación, mascarilla personalizada y masaje facial para una piel radiante.',
    duration: 60,
    price: 55,
    images: [
      { id: 6, url: '/placeholder.svg?height=400&width=600', isPrimary: true }
    ]
  },
  {
    id: 6,
    title: 'Extensiones de Pestañas',
    description: 'Aplicación pelo a pelo para lograr una mirada más intensa y definida de forma natural.',
    duration: 90,
    price: 80,
    images: [
      { id: 7, url: '/placeholder.svg?height=400&width=600', isPrimary: true }
    ]
  }
]);

// Calcular el precio total de los servicios seleccionados
const totalPrice = computed(() => {
  return selectedServices.value.reduce((total, service) => total + service.price, 0);
});

// Verificar si un servicio está seleccionado
const isSelected = (service) => {
  return selectedServices.value.some(s => s.id === service.id);
};

// Alternar la selección de un servicio
const toggleService = (service) => {
  if (isSelected(service)) {
    selectedServices.value = selectedServices.value.filter(s => s.id !== service.id);
  } else {
    selectedServices.value.push(service);
  }
};

// Formatear la duración del servicio
const formatDuration = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) return `${mins} min`;
  if (mins === 0) return `${hours} h`;
  return `${hours} h ${mins} min`;
};

// Mostrar modal de confirmación
const reservarSeleccionados = () => {
  showModal.value = true;
};

// Proceder a la página de reserva con los servicios seleccionados
const procederReserva = () => {
  // Guardar los servicios seleccionados en localStorage o en un estado global
  localStorage.setItem('selectedServices', JSON.stringify(selectedServices.value));

  // Navegar a la página de reserva
  router.push('/');

  // Cerrar el modal
  showModal.value = false;
};

// Obtener la imagen principal de un servicio
const getPrimaryImage = (service) => {
  const primaryImage = service.images.find(img => img.isPrimary);
  return primaryImage ? primaryImage.url : service.images[0]?.url || '/placeholder.svg?height=400&width=600';
};

// Abrir la galería de imágenes
const openGallery = (service) => {
  galleryService.value = service;
  currentImageIndex.value = 0;
  showGallery.value = true;
};

// Navegar a la siguiente imagen
const nextImage = () => {
  if (!galleryService.value) return;
  currentImageIndex.value = (currentImageIndex.value + 1) % galleryService.value.images.length;
};

// Navegar a la imagen anterior
const prevImage = () => {
  if (!galleryService.value) return;
  currentImageIndex.value = (currentImageIndex.value - 1 + galleryService.value.images.length) % galleryService.value.images.length;
};
</script>

