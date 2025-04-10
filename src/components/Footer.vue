<template>
  <footer class="bg-gray-800 text-white py-8">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 class="text-xl font-bold mb-4">BeautySalon</h3>
          <p class="text-gray-300">
            Tu destino para servicios de belleza profesionales y personalizados.
          </p>
        </div>
        <div>
          <h3 class="text-xl font-bold mb-4">Horario</h3>
          <ul class="text-gray-300">
            <li>Lunes - Viernes: 9:00 - 19:00</li>
            <li>Sábado: 10:00 - 16:00</li>
            <li>Domingo: Cerrado</li>
          </ul>
        </div>
        <div>
          <h3 class="text-xl font-bold mb-4">Contacto</h3>
          <ul class="text-gray-300">
            <li>Teléfono: +123 456 7890</li>
            <li>Email: info@beautysalon.com</li>
            <li>Dirección: 123 Beauty Street, City</li>
          </ul>
        </div>
      </div>
      <div class="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
        <p>&copy; {{ new Date().getFullYear() }} BeautySalon. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
</template>