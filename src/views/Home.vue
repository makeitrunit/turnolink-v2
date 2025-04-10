<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-20">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-6">Reserva tu cita de belleza</h1>
        <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          Agenda tu cita en minutos y disfruta de nuestros servicios profesionales de belleza
        </p>
        <button
            @click="scrollToBooking"
            class="bg-white text-pink-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-full shadow-lg transition-all transform hover:scale-105"
        >
          Reservar ahora
        </button>
      </div>
    </section>

    <!-- Booking Section -->
    <section id="booking-section" class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Agenda tu cita en 3 simples pasos</h2>

        <div class="max-w-4xl mx-auto">
          <!-- Steps Indicator -->
          <div class="flex justify-between mb-8 relative">
            <div
                v-for="(label, index) in stepLabels"
                :key="index"
                class="z-10 flex flex-col items-center"
            >
              <div
                  class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg mb-2"
                  :class="currentStep >= index + 1 ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-600'"
              >
                {{ index + 1 }}
              </div>
              <div class="text-sm font-medium" :class="currentStep >= index + 1 ? 'text-pink-600' : 'text-gray-500'">
                {{ label }}
              </div>
            </div>

            <!-- Progress Line -->
            <div class="absolute top-5 left-0 right-0 h-1 bg-gray-200 -z-0">
              <div
                  class="h-full bg-pink-600 transition-all duration-300"
                  :style="{ width: `${(currentStep - 1) * 25}%` }"
              >
              </div>
            </div>
          </div>

          <!-- Step Content -->
          <div class="bg-gray-50 rounded-lg p-6 shadow-md">
            <!-- Step 1: Select Date -->
            <div v-if="currentStep === 1" class="space-y-6">
              <h3 class="text-xl font-semibold text-gray-800">Selecciona la fecha de tu cita</h3>

              <div class="bg-white rounded-lg shadow p-4">
                <div class="flex justify-between items-center mb-4">
                  <h4 class="font-medium text-gray-700">{{ currentMonthName }} {{ currentYear }}</h4>
                  <div class="flex space-x-2">
                    <button
                        @click="prevMonth"
                        class="p-1 rounded-full hover:bg-gray-100"
                        :disabled="isPrevMonthDisabled"
                        :class="{ 'opacity-50 cursor-not-allowed': isPrevMonthDisabled }"
                    >
                      <ChevronLeftIcon class="h-5 w-5 text-gray-600" />
                    </button>
                    <button
                        @click="nextMonth"
                        class="p-1 rounded-full hover:bg-gray-100"
                    >
                      <ChevronRightIcon class="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                </div>

                <div class="grid grid-cols-7 gap-1 text-center font-medium mb-2">
                  <div v-for="day in ['L', 'M', 'X', 'J', 'V', 'S', 'D']" :key="day" class="text-gray-500">
                    {{ day }}
                  </div>
                </div>

                <div class="grid grid-cols-7 gap-1">
                  <!-- Espacios vacíos para el primer día del mes -->
                  <div
                      v-for="n in firstDayOfMonth"
                      :key="`empty-${n}`"
                      class="h-12"
                  ></div>

                  <!-- Días del mes -->
                  <button
                      v-for="date in daysInMonth"
                      :key="date"
                      :class="[
                      'h-12 rounded-lg font-medium transition-colors',
                      isDateSelected(date) ? 'bg-pink-600 text-white hover:bg-pink-700' :
                      isDateDisabled(date) ? 'bg-gray-100 text-gray-400 cursor-not-allowed' :
                      'bg-gray-50 hover:bg-pink-100'
                    ]"
                      @click="selectDate(date)"
                      :disabled="isDateDisabled(date)"
                  >
                    {{ date }}
                    <div v-if="isToday(date)" class="w-1 h-1 bg-pink-600 rounded-full mx-auto mt-1"></div>
                  </button>
                </div>
              </div>

              <div class="flex justify-end">
                <button
                    @click="nextStep"
                    :disabled="!selectedDate"
                    class="bg-pink-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continuar
                </button>
              </div>
            </div>

            <!-- Step 2: Select Time -->
            <div v-if="currentStep === 2" class="space-y-6">
              <h3 class="text-xl font-semibold text-gray-800">Selecciona la hora de tu cita</h3>

              <div class="grid grid-cols-3 sm:grid-cols-4 gap-3">
                <button
                    v-for="time in availableTimes"
                    :key="time"
                    :class="[
                    'py-3 px-4 rounded-lg font-medium text-center transition-colors',
                    selectedTime === time ? 'bg-pink-600 text-white' :
                    isTimeDisabled(time) ? 'bg-gray-100 text-gray-400 cursor-not-allowed' :
                    'bg-white hover:bg-pink-100'
                  ]"
                    @click="selectTime(time)"
                    :disabled="isTimeDisabled(time)"
                >
                  {{ time }}
                </button>
              </div>

              <div class="flex justify-between">
                <button
                    @click="prevStep"
                    class="border border-gray-300 text-gray-700 py-2 px-6 rounded-lg font-medium hover:bg-gray-100"
                >
                  Atrás
                </button>
                <button
                    @click="nextStep"
                    :disabled="!selectedTime"
                    class="bg-pink-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continuar
                </button>
              </div>
            </div>

            <!-- Step 3: Select Services -->
            <div v-if="currentStep === 3" class="space-y-6">
              <h3 class="text-xl font-semibold text-gray-800">Selecciona tus servicios</h3>

              <!-- Resumen de servicios seleccionados -->
              <div v-if="selectedServices.length > 0" class="mb-4 bg-white rounded-lg p-4 shadow-sm">
                <h4 class="font-medium text-gray-700 mb-2">Servicios seleccionados:</h4>
                <div class="space-y-2">
                  <div
                      v-for="service in selectedServices"
                      :key="service.id"
                      class="flex justify-between items-center p-2 bg-pink-50 rounded-lg"
                  >
                    <div class="flex items-center">
                      <div class="w-10 h-10 overflow-hidden rounded-lg mr-3">
                        <img
                            :src="getPrimaryImage(service)"
                            :alt="service.title"
                            class="w-full h-full object-cover"
                        />
                      </div>
                      <span class="font-medium">{{ service.title }}</span>
                    </div>
                    <div class="flex items-center">
                      <span class="text-sm text-gray-600 mr-3">{{ formatDuration(service.duration) }}</span>
                      <span class="font-bold text-pink-600">${{ service.price }}</span>
                      <button
                          @click="removeService(service)"
                          class="ml-2 text-gray-400 hover:text-red-500"
                      >
                        <XIcon class="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
                <div class="mt-3 pt-2 border-t border-gray-200 flex justify-between">
                  <div>
                    <span class="font-medium">Total:</span>
                    <span class="text-sm text-gray-600 ml-2">{{ formatDuration(totalDuration) }}</span>
                  </div>
                  <span class="font-bold text-pink-600">${{ totalPrice }}</span>
                </div>
              </div>

              <!-- Lista de servicios disponibles (vista de lista con miniaturas) -->
              <div class="space-y-4">
                <div
                    v-for="service in availableServices"
                    :key="service.id"
                    class="bg-white rounded-lg shadow-sm overflow-hidden"
                    :class="{ 'ring-2 ring-pink-500': isServiceSelected(service) }"
                >
                  <div class="p-4 flex">
                    <!-- Miniatura del servicio -->
                    <div class="relative w-24 h-24 flex-shrink-0 mr-4">
                      <img
                          :src="getPrimaryImage(service)"
                          :alt="service.title"
                          class="w-full h-full object-cover rounded-md cursor-pointer"
                          @click="openGallery(service)"
                      />
                      <div
                          v-if="service.images && service.images.length > 1"
                          class="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1.5 py-0.5 rounded-md flex items-center cursor-pointer"
                          @click.stop="openGallery(service)"
                      >
                        <ImageIcon class="h-3 w-3 mr-1" />
                        {{ service.images.length }}
                      </div>
                    </div>

                    <div class="flex-grow">
                      <div class="flex justify-between items-start mb-2">
                        <h4 class="text-lg font-bold text-gray-800">{{ service.title }}</h4>
                        <span class="bg-pink-100 text-pink-800 text-sm font-medium px-3 py-1 rounded-full">
                          {{ formatDuration(service.duration) }}
                        </span>
                      </div>

                      <p class="text-gray-600 mb-4">{{ service.description }}</p>

                      <div class="flex justify-between items-center">
                        <span class="text-lg font-bold text-pink-600">${{ service.price }}</span>
                        <button
                            @click="toggleService(service)"
                            class="py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                            :class="isServiceSelected(service)
                            ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                            : 'bg-pink-600 text-white hover:bg-pink-700'"
                        >
                          {{ isServiceSelected(service) ? 'Quitar' : 'Agregar' }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex justify-between">
                <button
                    @click="prevStep"
                    class="border border-gray-300 text-gray-700 py-2 px-6 rounded-lg font-medium hover:bg-gray-100"
                >
                  Atrás
                </button>
                <button
                    @click="nextStep"
                    :disabled="selectedServices.length === 0"
                    class="bg-pink-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continuar
                </button>
              </div>
            </div>

            <!-- Step 4: Contact Information -->
            <div v-if="currentStep === 4" class="space-y-6">
              <h3 class="text-xl font-semibold text-gray-800">Información de contacto</h3>

              <div class="space-y-4">
                <div>
                  <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Teléfono *</label>
                  <input
                      id="phone"
                      v-model="phone"
                      type="tel"
                      placeholder="Ingresa tu número de teléfono"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      required
                  />
                </div>

                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email (opcional)</label>
                  <input
                      id="email"
                      v-model="email"
                      type="email"
                      placeholder="Ingresa tu correo electrónico"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label for="notes" class="block text-sm font-medium text-gray-700 mb-1">Notas adicionales (opcional)</label>
                  <textarea
                      id="notes"
                      v-model="notes"
                      placeholder="Cualquier información adicional que debamos saber"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      rows="3"
                  ></textarea>
                </div>
              </div>

              <div class="flex justify-between">
                <button
                    @click="prevStep"
                    class="border border-gray-300 text-gray-700 py-2 px-6 rounded-lg font-medium hover:bg-gray-100"
                >
                  Atrás
                </button>
                <button
                    @click="submitBooking"
                    :disabled="!phone"
                    class="bg-pink-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirmar cita
                </button>
              </div>
            </div>

            <!-- Confirmation -->
            <div v-if="currentStep === 5" class="text-center py-8 space-y-6">
              <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckIcon class="h-10 w-10 text-green-600" />
              </div>

              <h3 class="text-2xl font-bold text-gray-800">¡Cita confirmada!</h3>

              <div class="bg-gray-100 rounded-lg p-4 max-w-md mx-auto text-left">
                <p class="font-medium mb-2">Detalles de tu cita:</p>
                <p>Fecha: {{ formatSelectedDate }}</p>
                <p>Hora: {{ selectedTime }}</p>
                <p>Duración total: {{ formatDuration(totalDuration) }}</p>

                <div class="mt-3 mb-2">
                  <p class="font-medium">Servicios:</p>
                  <div class="space-y-2 mt-2">
                    <div v-for="service in selectedServices" :key="service.id" class="flex items-center">
                      <div class="w-10 h-10 overflow-hidden rounded-lg mr-3">
                        <img
                            :src="getPrimaryImage(service)"
                            :alt="service.title"
                            class="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p class="font-medium">{{ service.title }}</p>
                        <p class="text-sm text-gray-600">{{ formatDuration(service.duration) }} • ${{ service.price }}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <p class="mt-3">Precio total: <span class="font-bold">${{ totalPrice }}</span></p>
                <p>Teléfono: {{ phone }}</p>
                <p v-if="email">Email: {{ email }}</p>
              </div>

              <p class="text-gray-600">
                Te enviaremos un recordatorio antes de tu cita. ¡Gracias por elegirnos!
              </p>

              <button
                  @click="resetForm"
                  class="bg-pink-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-pink-700 mt-4"
              >
                Agendar otra cita
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">¿Por qué elegirnos?</h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white p-6 rounded-lg shadow-md text-center">
            <div class="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ClockIcon class="h-8 w-8 text-pink-600" />
            </div>
            <h3 class="text-xl font-bold mb-2">Ahorra tiempo</h3>
            <p class="text-gray-600">Agenda tu cita en minutos y evita largas esperas telefónicas.</p>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md text-center">
            <div class="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CalendarIcon class="h-8 w-8 text-pink-600" />
            </div>
            <h3 class="text-xl font-bold mb-2">Flexibilidad</h3>
            <p class="text-gray-600">Elige el día y la hora que mejor se adapte a tu agenda.</p>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md text-center">
            <div class="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BellIcon class="h-8 w-8 text-pink-600" />
            </div>
            <h3 class="text-xl font-bold mb-2">Recordatorios</h3>
            <p class="text-gray-600">Recibe notificaciones para no olvidar tu próxima cita.</p>
          </div>
        </div>
      </div>
    </section>

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

        <!-- Información del servicio -->
        <div class="bg-white bg-opacity-90 p-4 mt-4 rounded-lg">
          <h3 class="text-xl font-bold text-gray-800">{{ galleryService.title }}</h3>
          <p class="text-gray-600 my-2">{{ galleryService.description }}</p>
          <div class="flex justify-between items-center">
            <div class="flex items-center">
              <ClockIcon class="h-4 w-4 text-gray-600 mr-1" />
              <span class="text-gray-600">{{ formatDuration(galleryService.duration) }}</span>
            </div>
            <span class="font-bold text-pink-600">${{ galleryService.price }}</span>
          </div>
          <div class="mt-3 flex justify-end">
            <button
                @click="toggleService(galleryService); showGallery = false"
                class="py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                :class="isServiceSelected(galleryService)
                ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                : 'bg-pink-600 text-white hover:bg-pink-700'"
            >
              {{ isServiceSelected(galleryService) ? 'Quitar del carrito' : 'Agregar al carrito' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import {
  CheckIcon,
  ClockIcon,
  CalendarIcon,
  BellIcon,
  ScissorsIcon,
  XIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ImageIcon
} from 'lucide-vue-next';

// Step management
const currentStep = ref(1);
const stepLabels = ['Fecha', 'Hora', 'Servicios', 'Contacto', 'Confirmación'];

// Form data
const selectedDate = ref(null);
const selectedTime = ref(null);
const selectedServices = ref([]);
const phone = ref('');
const email = ref('');
const notes = ref('');

// Gallery state
const showGallery = ref(false);
const galleryService = ref(null);
const currentImageIndex = ref(0);

// Date management
const today = new Date();
const currentMonth = ref(today.getMonth());
const currentYear = ref(today.getFullYear());

// Computed properties for calendar
const daysInMonth = computed(() => {
  return new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
});

const firstDayOfMonth = computed(() => {
  // Get the day of the week for the first day of the month (0 = Sunday, 1 = Monday, etc.)
  const firstDay = new Date(currentYear.value, currentMonth.value, 1).getDay();
  // Convert to Monday-based index (0 = Monday, 6 = Sunday)
  return firstDay === 0 ? 6 : firstDay - 1;
});

const currentMonthName = computed(() => {
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  return monthNames[currentMonth.value];
});

const isPrevMonthDisabled = computed(() => {
  // Disable previous month button if current month and year are the same as today
  return currentMonth.value === today.getMonth() && currentYear.value === today.getFullYear();
});

const formatSelectedDate = computed(() => {
  if (!selectedDate.value) return '';

  const date = new Date(currentYear.value, currentMonth.value, selectedDate.value);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('es-ES', options);
});

// Available times
const availableTimes = [
  '9:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00',
  '17:00', '18:00', '19:00'
];

// Available services
const availableServices = ref([
  {
    id: 1,
    title: 'Corte de Cabello',
    description: 'Corte personalizado según tu tipo de rostro y preferencias.',
    duration: 45,
    price: 35,
    images: [
      { id: 1, url: '/placeholder.svg?height=200&width=300', isPrimary: true },
      { id: 2, url: '/placeholder.svg?height=200&width=300&text=Corte2', isPrimary: false }
    ]
  },
  {
    id: 2,
    title: 'Coloración',
    description: 'Coloración completa con productos de alta calidad.',
    duration: 120,
    price: 65,
    images: [
      { id: 3, url: '/placeholder.svg?height=200&width=300', isPrimary: true },
      { id: 4, url: '/placeholder.svg?height=200&width=300&text=Color2', isPrimary: false },
      { id: 5, url: '/placeholder.svg?height=200&width=300&text=Color3', isPrimary: false }
    ]
  },
  {
    id: 3,
    title: 'Manicura',
    description: 'Tratamiento completo para tus uñas.',
    duration: 45,
    price: 25,
    images: [
      { id: 6, url: '/placeholder.svg?height=200&width=300', isPrimary: true }
    ]
  },
  {
    id: 4,
    title: 'Pedicura',
    description: 'Tratamiento rejuvenecedor para tus pies.',
    duration: 60,
    price: 35,
    images: [
      { id: 7, url: '/placeholder.svg?height=200&width=300', isPrimary: true }
    ]
  },
  {
    id: 5,
    title: 'Tratamiento Facial',
    description: 'Limpieza profunda, exfoliación y mascarilla personalizada.',
    duration: 60,
    price: 55,
    images: [
      { id: 8, url: '/placeholder.svg?height=200&width=300', isPrimary: true },
      { id: 9, url: '/placeholder.svg?height=200&width=300&text=Facial2', isPrimary: false }
    ]
  },
  {
    id: 6,
    title: 'Extensiones de Pestañas',
    description: 'Aplicación pelo a pelo para una mirada más intensa.',
    duration: 90,
    price: 80,
    images: [
      { id: 10, url: '/placeholder.svg?height=200&width=300', isPrimary: true }
    ]
  }
]);

// Obtener la imagen principal de un servicio
const getPrimaryImage = (service) => {
  if (!service.images || service.images.length === 0) {
    return '/placeholder.svg?height=200&width=300';
  }

  const primaryImage = service.images.find(img => img.isPrimary);
  return primaryImage ? primaryImage.url : service.images[0].url;
};

// Computed properties
const totalDuration = computed(() => {
  return selectedServices.value.reduce((total, service) => total + service.duration, 0);
});

const totalPrice = computed(() => {
  return selectedServices.value.reduce((total, service) => total + service.price, 0);
});

// Load pre-selected services from localStorage (if coming from Services page)
onMounted(() => {
  const savedServices = localStorage.getItem('selectedServices');
  if (savedServices) {
    try {
      const parsedServices = JSON.parse(savedServices);
      if (Array.isArray(parsedServices) && parsedServices.length > 0) {
        selectedServices.value = parsedServices;
      }
    } catch (error) {
      console.error('Error parsing saved services:', error);
    }
    // Clear localStorage after loading
    localStorage.removeItem('selectedServices');
  }
});

// Calendar navigation functions
const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }

  // Reset selected date if it's not valid in the new month
  if (selectedDate.value > daysInMonth.value) {
    selectedDate.value = null;
  }
};

const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }

  // Reset selected date if it's not valid in the new month
  if (selectedDate.value > daysInMonth.value) {
    selectedDate.value = null;
  }
};

// Date selection functions
const isToday = (date) => {
  return date === today.getDate() &&
      currentMonth.value === today.getMonth() &&
      currentYear.value === today.getFullYear();
};

const isDateDisabled = (date) => {
  // Disable dates in the past
  if (currentYear.value < today.getFullYear()) return true;
  if (currentYear.value === today.getFullYear() && currentMonth.value < today.getMonth()) return true;
  if (currentYear.value === today.getFullYear() && currentMonth.value === today.getMonth() && date < today.getDate()) return true;

  return false;
};

const isDateSelected = (date) => {
  return selectedDate.value === date;
};

const selectDate = (date) => {
  if (!isDateDisabled(date)) {
    selectedDate.value = date;
    // Reset selected time if we're selecting today and the current time makes some options invalid
    if (isToday(date) && selectedTime.value && isTimeDisabled(selectedTime.value)) {
      selectedTime.value = null;
    }
  }
};

// Time selection functions
const isTimeDisabled = (time) => {
  // If selected date is today, disable times that have already passed
  if (isToday(selectedDate.value)) {
    const [hours, minutes] = time.split(':').map(Number);
    const currentHours = today.getHours();
    const currentMinutes = today.getMinutes();

    // Disable if hour has passed or if it's the current hour but minutes have passed
    if (hours < currentHours || (hours === currentHours && minutes <= currentMinutes)) {
      return true;
    }
  }

  return false;
};

const selectTime = (time) => {
  if (!isTimeDisabled(time)) {
    selectedTime.value = time;
  }
};

// Navigation functions
const nextStep = () => {
  currentStep.value++;
};

const prevStep = () => {
  currentStep.value--;
};

// Service selection functions
const isServiceSelected = (service) => {
  return selectedServices.value.some(s => s.id === service.id);
};

const toggleService = (service) => {
  if (isServiceSelected(service)) {
    removeService(service);
  } else {
    selectedServices.value.push(service);
  }
};

const removeService = (service) => {
  selectedServices.value = selectedServices.value.filter(s => s.id !== service.id);
};

// Format duration
const formatDuration = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) return `${mins} min`;
  if (mins === 0) return `${hours} h`;
  return `${hours} h ${mins} min`;
};

const submitBooking = () => {
  // Here you would typically send the booking data to your backend
  // For this example, we'll just move to the confirmation step
  nextStep();
};

const resetForm = () => {
  currentStep.value = 1;
  selectedDate.value = null;
  selectedTime.value = null;
  selectedServices.value = [];
  phone.value = '';
  email.value = '';
  notes.value = '';

  // Reset calendar to current month/year
  currentMonth.value = today.getMonth();
  currentYear.value = today.getFullYear();
};

const scrollToBooking = () => {
  document.getElementById('booking-section').scrollIntoView({
    behavior: 'smooth'
  });
};

// Gallery functions
const openGallery = (service) => {
  galleryService.value = service;
  currentImageIndex.value = 0;
  showGallery.value = true;
};

const nextImage = () => {
  if (!galleryService.value || !galleryService.value.images) return;
  currentImageIndex.value = (currentImageIndex.value + 1) % galleryService.value.images.length;
};

const prevImage = () => {
  if (!galleryService.value || !galleryService.value.images) return;
  currentImageIndex.value = (currentImageIndex.value - 1 + galleryService.value.images.length) % galleryService.value.images.length;
};
</script>

