<template>
  <div class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <h1 class="text-4xl font-bold text-center mb-4">Contacto</h1>
      <p class="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
        Estamos aquí para ayudarte. Contáctanos o visítanos en nuestra ubicación.
      </p>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Contact Information -->
        <div class="bg-white rounded-lg shadow-md p-8">
          <h2 class="text-2xl font-bold mb-6">Información de Contacto</h2>
          
          <div class="space-y-6">
            <div class="flex items-start">
              <div class="bg-pink-100 p-3 rounded-full mr-4">
                <MapPinIcon class="h-6 w-6 text-pink-600" />
              </div>
              <div>
                <h3 class="font-bold text-lg">Dirección</h3>
                <p class="text-gray-600">Calle Principal 123, Ciudad, CP 12345</p>
                <p class="text-gray-600 mt-1">Referencia: Frente al parque central</p>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="bg-pink-100 p-3 rounded-full mr-4">
                <PhoneIcon class="h-6 w-6 text-pink-600" />
              </div>
              <div>
                <h3 class="font-bold text-lg">Teléfono</h3>
                <p class="text-gray-600">+123 456 7890</p>
                <p class="text-gray-600 mt-1">Lun-Vie: 9:00 - 20:00, Sáb: 10:00 - 18:00</p>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="bg-pink-100 p-3 rounded-full mr-4">
                <MailIcon class="h-6 w-6 text-pink-600" />
              </div>
              <div>
                <h3 class="font-bold text-lg">Email</h3>
                <p class="text-gray-600">info@beautysalon.com</p>
                <p class="text-gray-600 mt-1">Respondemos en menos de 24 horas</p>
              </div>
            </div>
          </div>
          
          <div class="mt-8">
            <h3 class="text-xl font-bold mb-4">Envíanos un mensaje</h3>
            <form class="space-y-4">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input 
                  id="name" 
                  type="text" 
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Tu nombre"
                />
              </div>
              
              <div>
                <label for="contact-email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  id="contact-email" 
                  type="email" 
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Tu email"
                />
              </div>
              
              <div>
                <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
                <textarea 
                  id="message" 
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  rows="4"
                  placeholder="¿En qué podemos ayudarte?"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                class="bg-pink-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-pink-700 transition-colors"
              >
                Enviar mensaje
              </button>
            </form>
          </div>
        </div>
        
        <!-- Map -->
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <h2 class="text-2xl font-bold p-6">Nuestra Ubicación</h2>
          <div class="h-96 bg-gray-200 relative">
            <!-- This is a placeholder for the map. In a real application, you would integrate with Google Maps or another map provider -->
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="text-center">
                <MapIcon class="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p class="text-gray-600">Mapa interactivo</p>
                <p class="text-sm text-gray-500 mt-2">
                  En una implementación real, aquí se mostraría un mapa interactivo de Google Maps o similar.
                </p>
              </div>
            </div>
          </div>
          <div class="p-6">
            <h3 class="font-bold text-lg mb-2">Cómo llegar</h3>
            <ul class="space-y-2 text-gray-600">
              <li class="flex items-start">
                <CarIcon class="h-5 w-5 text-pink-600 mr-2 mt-0.5" />
                <span>A 10 minutos en auto desde el centro de la ciudad</span>
              </li>
              <li class="flex items-start">
                <BusIcon class="h-5 w-5 text-pink-600 mr-2 mt-0.5" />
                <span>Líneas de autobús: 10, 24, 35 (parada "Parque Central")</span>
              </li>
              <li class="flex items-start">
                <ParkingSquareIcon class="h-5 w-5 text-pink-600 mr-2 mt-0.5" />
                <span>Estacionamiento gratuito para clientes</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { MapPinIcon, PhoneIcon, MailIcon, MapIcon, CarIcon, BusIcon, ParkingSquareIcon } from 'lucide-vue-next';
</script>