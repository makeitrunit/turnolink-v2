<template>
  <div>
    <!-- Login Screen (mostrado si no está autenticado) -->
    <div v-if="!isAuthenticated" class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div class="text-center mb-6">
          <h2 class="text-2xl font-bold text-gray-800">Panel de Administración</h2>
          <p class="text-gray-600 mt-1">Inicia sesión para gestionar las citas</p>
        </div>

        <div v-if="loginError" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
          <p>{{ loginError }}</p>
        </div>

        <form @submit.prevent="login" class="space-y-4">
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
            <input
                id="username"
                v-model="loginForm.username"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input
                id="password"
                v-model="loginForm.password"
                type="password"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          <button
              type="submit"
              class="w-full bg-pink-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-pink-700 transition-colors"
              :disabled="isLoggingIn"
          >
            {{ isLoggingIn ? 'Iniciando sesión...' : 'Iniciar sesión' }}
          </button>
        </form>
      </div>
    </div>

    <!-- Admin Dashboard (mostrado si está autenticado) -->
    <div v-else class="min-h-screen bg-gray-100">
      <!-- Header -->
      <header class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 class="text-2xl font-bold text-gray-800">Panel de Administración</h1>
          <div class="flex items-center space-x-4">
            <span class="text-gray-600">{{ adminName }}</span>
            <button
                @click="logout"
                class="text-gray-600 hover:text-pink-600 font-medium"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-lg shadow-sm p-6">
            <div class="flex items-center">
              <div class="bg-blue-100 p-3 rounded-full">
                <CalendarIcon class="h-6 w-6 text-blue-600"/>
              </div>
              <div class="ml-4">
                <h2 class="text-sm font-medium text-gray-500">Citas Hoy</h2>
                <p class="text-2xl font-semibold text-gray-800">{{ stats.todayAppointments }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-sm p-6">
            <div class="flex items-center">
              <div class="bg-yellow-100 p-3 rounded-full">
                <ClockIcon class="h-6 w-6 text-yellow-600"/>
              </div>
              <div class="ml-4">
                <h2 class="text-sm font-medium text-gray-500">Pendientes</h2>
                <p class="text-2xl font-semibold text-gray-800">{{ stats.pendingAppointments }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-sm p-6">
            <div class="flex items-center">
              <div class="bg-green-100 p-3 rounded-full">
                <CheckIcon class="h-6 w-6 text-green-600"/>
              </div>
              <div class="ml-4">
                <h2 class="text-sm font-medium text-gray-500">Confirmadas</h2>
                <p class="text-2xl font-semibold text-gray-800">{{ stats.confirmedAppointments }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-sm p-6">
            <div class="flex items-center">
              <div class="bg-red-100 p-3 rounded-full">
                <XIcon class="h-6 w-6 text-red-600"/>
              </div>
              <div class="ml-4">
                <h2 class="text-sm font-medium text-gray-500">Canceladas</h2>
                <p class="text-2xl font-semibold text-gray-800">{{ stats.cancelledAppointments }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Tabs -->
        <div class="bg-white rounded-lg shadow-sm mb-8">
          <div class="border-b border-gray-200">
            <nav class="flex -mb-px">
              <button
                  @click="activeTab = 'list'"
                  class="py-4 px-6 font-medium text-sm border-b-2 transition-colors"
                  :class="activeTab === 'list' ? 'border-pink-500 text-pink-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
              >
                <ListIcon class="h-5 w-5 inline-block mr-1"/>
                Lista de Citas
              </button>
              <button
                  @click="activeTab = 'calendar'"
                  class="py-4 px-6 font-medium text-sm border-b-2 transition-colors"
                  :class="activeTab === 'calendar' ? 'border-pink-500 text-pink-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
              >
                <CalendarIcon class="h-5 w-5 inline-block mr-1"/>
                Calendario
              </button>
              <button
                  @click="activeTab = 'settings'"
                  class="py-4 px-6 font-medium text-sm border-b-2 transition-colors"
                  :class="activeTab === 'settings' ? 'border-pink-500 text-pink-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
              >
                <SettingsIcon class="h-5 w-5 inline-block mr-1"/>
                Configuración
              </button>
            </nav>
          </div>
        </div>

        <!-- Tab Content -->
        <!-- Lista de Citas -->
        <div v-if="activeTab === 'list'" class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-lg font-semibold text-gray-800">Lista de Citas</h2>
            <div class="flex space-x-2">
              <div class="relative">
                <input
                    type="text"
                    v-model="searchQuery"
                    placeholder="Buscar citas..."
                    class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
                <SearchIcon class="h-5 w-5 text-gray-400 absolute left-3 top-2.5"/>
              </div>
              <select
                  v-model="statusFilter"
                  class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="all">Todos los estados</option>
                <option value="pending">Pendientes</option>
                <option value="confirmed">Confirmadas</option>
                <option value="cancelled">Canceladas</option>
              </select>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha y Hora
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Servicios
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="appointment in filteredAppointments" :key="appointment.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <UserIcon class="h-5 w-5 text-gray-500"/>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ appointment.phone }}</div>
                      <div class="text-sm text-gray-500">{{ appointment.email || 'No email' }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ formatDate(appointment.date) }}</div>
                  <div class="text-sm text-gray-500">{{ appointment.time }}</div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900">
                    {{ appointment.services.map(s => s.title).join(', ') }}
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ formatDuration(getTotalDuration(appointment.services)) }} •
                    ${{ getTotalPrice(appointment.services) }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span
                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                        :class="{
                        'bg-yellow-100 text-yellow-800': appointment.status === 'pending',
                        'bg-green-100 text-green-800': appointment.status === 'confirmed',
                        'bg-red-100 text-red-800': appointment.status === 'cancelled'
                      }"
                    >
                      {{ getStatusText(appointment.status) }}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <button
                        @click="viewAppointmentDetails(appointment)"
                        class="text-gray-600 hover:text-gray-900"
                        title="Ver detalles"
                    >
                      <EyeIcon class="h-5 w-5"/>
                    </button>
                    <button
                        v-if="appointment.status === 'pending'"
                        @click="confirmAppointment(appointment)"
                        class="text-green-600 hover:text-green-900"
                        title="Confirmar cita"
                    >
                      <CheckIcon class="h-5 w-5"/>
                    </button>
                    <button
                        v-if="appointment.status !== 'cancelled'"
                        @click="cancelAppointment(appointment)"
                        class="text-red-600 hover:text-red-900"
                        title="Cancelar cita"
                    >
                      <XIcon class="h-5 w-5"/>
                    </button>
                  </div>
                </td>
              </tr>

              <!-- Empty state -->
              <tr v-if="filteredAppointments.length === 0">
                <td colspan="5" class="px-6 py-10 text-center text-gray-500">
                  <div class="flex flex-col items-center">
                    <CalendarIcon class="h-12 w-12 text-gray-400 mb-4"/>
                    <p class="text-lg font-medium">No se encontraron citas</p>
                    <p class="text-sm">Intenta cambiar los filtros de búsqueda</p>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Vista de Calendario -->
        <div v-if="activeTab === 'calendar'" class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-lg font-semibold text-gray-800">Calendario de Citas</h2>
            <div class="flex space-x-2">
              <button
                  @click="prevMonth"
                  class="p-2 rounded-full hover:bg-gray-100"
              >
                <ChevronLeftIcon class="h-5 w-5 text-gray-600"/>
              </button>
              <span class="py-2 px-4 font-medium">{{ currentMonthName }} {{ currentYear }}</span>
              <button
                  @click="nextMonth"
                  class="p-2 rounded-full hover:bg-gray-100"
              >
                <ChevronRightIcon class="h-5 w-5 text-gray-600"/>
              </button>
            </div>
          </div>

          <!-- Calendar Grid -->
          <div class="grid grid-cols-7 gap-2">
            <!-- Days of week -->
            <div
                v-for="day in ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']"
                :key="day"
                class="text-center font-medium text-gray-500 py-2"
            >
              {{ day }}
            </div>

            <!-- Empty cells for first day offset -->
            <div
                v-for="n in firstDayOfMonth"
                :key="`empty-${n}`"
                class="h-32 bg-gray-50 rounded-lg"
            ></div>

            <!-- Calendar days -->
            <div
                v-for="date in daysInMonth"
                :key="date"
                class="h-32 border border-gray-200 rounded-lg overflow-hidden"
                :class="{ 'bg-pink-50': isToday(date) }"
            >
              <div class="p-2">
                <div class="flex justify-between items-center">
                  <span
                      class="font-medium"
                      :class="{ 'text-pink-600': isToday(date) }"
                  >
                    {{ date }}
                  </span>
                  <span
                      v-if="getAppointmentsForDate(date).length > 0"
                      class="bg-pink-600 text-white text-xs rounded-full px-2 py-0.5"
                  >
                    {{ getAppointmentsForDate(date).length }}
                  </span>
                </div>

                <!-- Appointments for this day -->
                <div class="mt-1 space-y-1 max-h-24 overflow-y-auto">
                  <div
                      v-for="appointment in getAppointmentsForDate(date)"
                      :key="appointment.id"
                      class="text-xs p-1 rounded truncate cursor-pointer"
                      :class="{
                      'bg-yellow-100 text-yellow-800': appointment.status === 'pending',
                      'bg-green-100 text-green-800': appointment.status === 'confirmed',
                      'bg-red-100 text-red-800': appointment.status === 'cancelled'
                    }"
                      @click="viewAppointmentDetails(appointment)"
                  >
                    {{ appointment.time }} - {{ appointment.services[0].title }}
                    <span v-if="appointment.services.length > 1">+{{ appointment.services.length - 1 }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Configuración -->
        <div v-if="activeTab === 'settings'" class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-800 mb-6">Configuración</h2>

          <!-- Horarios Disponibles -->
          <div class="mb-8">
            <h3 class="text-md font-medium text-gray-700 mb-4">Horarios Disponibles</h3>

            <div class="grid grid-cols-7 gap-4 mb-4">
              <div
                  v-for="(day, index) in weekDays"
                  :key="day"
                  class="text-center"
              >
                <div class="font-medium mb-2">{{ day }}</div>
                <button
                    @click="toggleDayEnabled(index)"
                    class="w-full py-1 px-2 rounded text-sm font-medium"
                    :class="settings.enabledDays[index] ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                >
                  {{ settings.enabledDays[index] ? 'Habilitado' : 'Deshabilitado' }}
                </button>
              </div>
            </div>

            <div class="border-t border-gray-200 pt-4">
              <h4 class="text-sm font-medium text-gray-700 mb-2">Horas de Trabajo</h4>

              <div class="flex items-center space-x-4 mb-4">
                <div class="w-1/2">
                  <label class="block text-sm text-gray-600 mb-1">Hora de inicio</label>
                  <select
                      v-model="settings.workHours.start"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  >
                    <option v-for="hour in availableHours" :key="`start-${hour}`" :value="hour">
                      {{ hour }}
                    </option>
                  </select>
                </div>
                <div class="w-1/2">
                  <label class="block text-sm text-gray-600 mb-1">Hora de fin</label>
                  <select
                      v-model="settings.workHours.end"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  >
                    <option v-for="hour in availableHours" :key="`end-${hour}`" :value="hour">
                      {{ hour }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="mb-4">
                <label class="block text-sm text-gray-600 mb-1">Duración de los intervalos (minutos)</label>
                <select
                    v-model="settings.intervalDuration"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="15">15 minutos</option>
                  <option value="30">30 minutos</option>
                  <option value="60">1 hora</option>
                </select>
              </div>
            </div>

            <button
                @click="saveSettings"
                class="bg-pink-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-pink-700 transition-colors"
            >
              Guardar Configuración
            </button>
          </div>

          <!-- Servicios -->
          <div class="border-t border-gray-200 pt-6">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-md font-medium text-gray-700">Servicios</h3>
              <button
                  @click="openAddServiceModal()"
                  class="bg-pink-600 text-white py-1 px-4 rounded-lg text-sm font-medium hover:bg-pink-700 transition-colors"
              >
                Añadir Servicio
              </button>
            </div>

            <div class="space-y-3">
              <div
                  v-for="service in services"
                  :key="service.id"
                  class="bg-white border border-gray-200 rounded-lg p-4 flex justify-between items-center"
              >
                <div class="flex items-center">
                  <div class="w-12 h-12 bg-pink-100 rounded-lg overflow-hidden mr-4">
                    <img
                        :src="getPrimaryImage(service)"
                        :alt="service.title"
                        class="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 class="font-bold text-gray-800">{{ service.title }}</h4>
                    <div class="flex items-center text-sm text-gray-600">
                      <ClockIcon class="h-4 w-4 mr-1"/>
                      <span>{{ formatDuration(service.duration) }}</span>
                      <span class="mx-2">•</span>
                      <span class="font-medium text-pink-600">${{ service.price }}</span>
                      <span class="mx-2">•</span>
                      <span class="flex items-center">
                        <ImageIcon class="h-4 w-4 mr-1"/>
                        {{ service.images.length }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="flex space-x-2">
                  <button
                      @click="editService(service)"
                      class="text-gray-600 hover:text-gray-900"
                  >
                    <PencilIcon class="h-5 w-5"/>
                  </button>
                  <button
                      @click="deleteService(service)"
                      class="text-red-600 hover:text-red-900"
                  >
                    <TrashIcon class="h-5 w-5"/>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Modal de Detalles de Cita -->
    <div
        v-if="showAppointmentModal && selectedAppointment"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold text-gray-800">Detalles de la Cita</h3>
          <button @click="showAppointmentModal = false" class="text-gray-500 hover:text-gray-700">
            <XIcon class="h-6 w-6"/>
          </button>
        </div>

        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500">Estado</p>
              <span
                  class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
                  :class="{
                  'bg-yellow-100 text-yellow-800': selectedAppointment.status === 'pending',
                  'bg-green-100 text-green-800': selectedAppointment.status === 'confirmed',
                  'bg-red-100 text-red-800': selectedAppointment.status === 'cancelled'
                }"
              >
                {{ getStatusText(selectedAppointment.status) }}
              </span>
            </div>

            <div class="flex space-x-2">
              <button
                  v-if="selectedAppointment.status === 'pending'"
                  @click="confirmAppointment(selectedAppointment); showAppointmentModal = false"
                  class="bg-green-600 text-white py-1 px-3 rounded text-sm font-medium hover:bg-green-700"
              >
                Confirmar
              </button>
              <button
                  v-if="selectedAppointment.status !== 'cancelled'"
                  @click="cancelAppointment(selectedAppointment); showAppointmentModal = false"
                  class="bg-red-600 text-white py-1 px-3 rounded text-sm font-medium hover:bg-red-700"
              >
                Cancelar
              </button>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-500">Fecha</p>
              <p class="font-medium">{{ formatDate(selectedAppointment.date) }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Hora</p>
              <p class="font-medium">{{ selectedAppointment.time }}</p>
            </div>
          </div>

          <div>
            <p class="text-sm text-gray-500">Cliente</p>
            <p class="font-medium">{{ selectedAppointment.phone }}</p>
            <p v-if="selectedAppointment.email" class="text-sm text-gray-600">{{ selectedAppointment.email }}</p>
          </div>

          <div>
            <p class="text-sm text-gray-500 mb-2">Servicios</p>
            <div class="space-y-2">
              <div
                  v-for="service in selectedAppointment.services"
                  :key="service.id"
                  class="flex justify-between items-center p-2 bg-gray-50 rounded"
              >
                <span>{{ service.title }}</span>
                <div class="flex items-center">
                  <span class="text-sm text-gray-600 mr-3">{{ formatDuration(service.duration) }}</span>
                  <span class="font-medium">${{ service.price }}</span>
                </div>
              </div>
            </div>
            <div class="flex justify-between items-center mt-3 pt-2 border-t border-gray-200">
              <div>
                <span class="text-sm text-gray-500">Duración total:</span>
                <span class="ml-1">{{ formatDuration(getTotalDuration(selectedAppointment.services)) }}</span>
              </div>
              <div>
                <span class="text-sm text-gray-500">Total:</span>
                <span class="ml-1 font-bold">${{ getTotalPrice(selectedAppointment.services) }}</span>
              </div>
            </div>
          </div>

          <div v-if="selectedAppointment.notes">
            <p class="text-sm text-gray-500">Notas</p>
            <p class="text-gray-700">{{ selectedAppointment.notes }}</p>
          </div>
        </div>
      </div>
    </div>
    selectedAppointment.notes}}
  </div>


  <!-- Modal de Añadir/Editar Servicio -->
  <div
      v-if="showServiceModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
  >
    <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-bold text-gray-800">
          {{ editingService ? 'Editar Servicio' : 'Añadir Servicio' }}
        </h3>
        <button @click="showServiceModal = false" class="text-gray-500 hover:text-gray-700">
          <XIcon class="h-6 w-6"/>
        </button>
      </div>

      <form @submit.prevent="saveService" class="space-y-4">
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Nombre del servicio</label>
          <input
              id="title"
              v-model="serviceForm.title"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>

        <div>
          <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea
              id="description"
              v-model="serviceForm.description"
              rows="2"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          ></textarea>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="duration" class="block text-sm font-medium text-gray-700 mb-1">Duración (minutos)</label>
            <input
                id="duration"
                v-model.number="serviceForm.duration"
                type="number"
                min="5"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>
          <div>
            <label for="price" class="block text-sm font-medium text-gray-700 mb-1">Precio ($)</label>
            <input
                id="price"
                v-model.number="serviceForm.price"
                type="number"
                min="0"
                step="0.01"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>
        </div>

        <!-- Sección de imágenes -->
        <div>
          <div class="flex justify-between items-center mb-2">
            <label class="block text-sm font-medium text-gray-700">Imágenes</label>
            <button
                type="button"
                @click="showImageModal = true"
                class="text-sm text-pink-600 hover:text-pink-800 flex items-center"
            >
              <PlusIcon class="h-4 w-4 mr-1"/>
              Añadir imagen
            </button>
          </div>

          <div v-if="serviceForm.images.length === 0"
               class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <ImageIcon class="h-12 w-12 text-gray-400 mx-auto mb-2"/>
            <p class="text-gray-500">No hay imágenes. Haz clic en "Añadir imagen" para subir una.</p>
          </div>

          <div v-else class="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div
                v-for="(image, index) in serviceForm.images"
                :key="image.id"
                class="relative group border rounded-lg overflow-hidden"
            >
              <img :src="image.url" :alt="serviceForm.title" class="w-full h-32 object-cover"/>

              <!-- Overlay con acciones -->
              <div
                  class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                <button
                    type="button"
                    @click="setPrimaryImage(index)"
                    class="p-1 bg-white rounded-full"
                    :class="{ 'text-yellow-500': image.isPrimary, 'text-gray-600': !image.isPrimary }"
                    title="Establecer como principal"
                >
                  <StarIcon class="h-5 w-5"/>
                </button>
                <button
                    type="button"
                    @click="removeImage(index)"
                    class="p-1 bg-white rounded-full text-red-600"
                    title="Eliminar imagen"
                >
                  <TrashIcon class="h-5 w-5"/>
                </button>
              </div>

              <!-- Indicador de imagen principal -->
              <div
                  v-if="image.isPrimary"
                  class="absolute top-1 right-1 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full"
              >
                Principal
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-end space-x-3 pt-4">
          <button
              type="button"
              @click="showServiceModal = false"
              class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
              type="submit"
              class="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
          >
            {{ editingService ? 'Actualizar' : 'Añadir' }}
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- Modal para añadir imagen -->
  <div
      v-if="showImageModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
  >
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-bold text-gray-800">Añadir Imagen</h3>
        <button @click="showImageModal = false" class="text-gray-500 hover:text-gray-700">
          <XIcon class="h-6 w-6"/>
        </button>
      </div>

      <div class="space-y-4">
        <div>
          <label for="imageUrl" class="block text-sm font-medium text-gray-700 mb-1">URL de la imagen</label>
          <input
              id="imageUrl"
              v-model="newImageUrl"
              type="text"
              placeholder="https://ejemplo.com/imagen.jpg"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
          <p class="text-xs text-gray-500 mt-1">
            Para esta demo, puedes usar: /placeholder.svg?height=300&width=400&text=NuevaImagen
          </p>
        </div>

        <div v-if="newImageUrl" class="border rounded-lg overflow-hidden">
          <img :src="newImageUrl" alt="Vista previa" class="w-full h-48 object-cover"/>
        </div>

        <div class="flex justify-end space-x-3">
          <button
              type="button"
              @click="showImageModal = false"
              class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
              type="button"
              @click="addImage"
              :disabled="!newImageUrl"
              class="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:opacity-50"
          >
            Añadir
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, computed, onMounted} from 'vue';
import {
  CheckIcon,
  XIcon,
  CalendarIcon,
  ClockIcon,
  ListIcon,
  SettingsIcon,
  UserIcon,
  EyeIcon,
  SearchIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PencilIcon,
  TrashIcon,
  ScissorsIcon,
  PlusIcon,
  ImageIcon,
  StarIcon
} from 'lucide-vue-next';

// Authentication state
const isAuthenticated = ref(false);
const isLoggingIn = ref(false);
const loginError = ref('');
const adminName = ref('Administrador');
const loginForm = ref({
  username: '',
  password: ''
});

// Admin panel state
const activeTab = ref('list');
const searchQuery = ref('');
const statusFilter = ref('all');
const showAppointmentModal = ref(false);
const selectedAppointment = ref(null);
const showServiceModal = ref(false);
const showAddServiceModal = ref(false);
const editingService = ref(false);
const serviceForm = ref({
  id: null,
  title: '',
  description: '',
  duration: 30,
  price: 0,
  images: []
});

// Calendar state
const today = new Date();
const currentMonth = ref(today.getMonth());
const currentYear = ref(today.getFullYear());

// Settings
const weekDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const availableHours = [
  '8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00',
  '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00',
  '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00'
];

const settings = ref({
  enabledDays: [true, true, true, true, true, true, false], // Lun a Sáb habilitados, Dom deshabilitado
  workHours: {
    start: '9:00',
    end: '19:00'
  },
  intervalDuration: 30 // minutos
});

// Mock data for services
const services = ref([
  {
    id: 1,
    title: 'Corte de Cabello',
    description: 'Corte personalizado según tu tipo de rostro y preferencias.',
    duration: 45,
    price: 35,
    images: [
      {id: 1, url: '/placeholder.svg?height=200&width=300', isPrimary: true},
      {id: 2, url: '/placeholder.svg?height=200&width=300&text=Corte2', isPrimary: false}
    ]
  },
  {
    id: 2,
    title: 'Coloración',
    description: 'Coloración completa con productos de alta calidad.',
    duration: 120,
    price: 65,
    images: [
      {id: 3, url: '/placeholder.svg?height=200&width=300', isPrimary: true}
    ]
  },
  {
    id: 3,
    title: 'Manicura',
    description: 'Tratamiento completo para tus uñas.',
    duration: 45,
    price: 25,
    images: [
      {id: 4, url: '/placeholder.svg?height=200&width=300', isPrimary: true}
    ]
  },
  {
    id: 4,
    title: 'Pedicura',
    description: 'Tratamiento rejuvenecedor para tus pies.',
    duration: 60,
    price: 35,
    images: [
      {id: 5, url: '/placeholder.svg?height=200&width=300', isPrimary: true}
    ]
  },
  {
    id: 5,
    title: 'Tratamiento Facial',
    description: 'Limpieza profunda, exfoliación y mascarilla personalizada.',
    duration: 60,
    price: 55,
    images: [
      {id: 6, url: '/placeholder.svg?height=200&width=300', isPrimary: true}
    ]
  },
  {
    id: 6,
    title: 'Extensiones de Pestañas',
    description: 'Aplicación pelo a pelo para una mirada más intensa.',
    duration: 90,
    price: 80,
    images: [
      {id: 7, url: '/placeholder.svg?height=200&width=300', isPrimary: true}
    ]
  }
]);

// Mock data for appointments
const appointments = ref([
  {
    id: 1,
    date: new Date(2023, 10, 15), // 15 de noviembre de 2023
    time: '10:00',
    services: [
      {
        id: 1,
        title: 'Corte de Cabello',
        duration: 45,
        price: 35
      }
    ],
    status: 'confirmed',
    phone: '555-123-4567',
    email: 'cliente1@example.com',
    notes: 'Primera visita'
  },
  {
    id: 2,
    date: new Date(2023, 10, 15), // 15 de noviembre de 2023
    time: '14:00',
    services: [
      {
        id: 2,
        title: 'Coloración',
        duration: 120,
        price: 65
      },
      {
        id: 3,
        title: 'Manicura',
        duration: 45,
        price: 25
      }
    ],
    status: 'pending',
    phone: '555-987-6543',
    email: 'cliente2@example.com',
    notes: ''
  },
  {
    id: 3,
    date: new Date(2023, 10, 16), // 16 de noviembre de 2023
    time: '11:00',
    services: [
      {
        id: 5,
        title: 'Tratamiento Facial',
        duration: 60,
        price: 55
      }
    ],
    status: 'cancelled',
    phone: '555-456-7890',
    email: '',
    notes: 'Cancelado por el cliente'
  },
  {
    id: 4,
    date: new Date(), // Hoy
    time: '16:00',
    services: [
      {
        id: 4,
        title: 'Pedicura',
        duration: 60,
        price: 35
      }
    ],
    status: 'confirmed',
    phone: '555-789-0123',
    email: 'cliente4@example.com',
    notes: ''
  }
]);

// Computed properties
const stats = computed(() => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayAppointments = appointments.value.filter(a => {
    const appointmentDate = new Date(a.date);
    appointmentDate.setHours(0, 0, 0, 0);
    return appointmentDate.getTime() === today.getTime();
  }).length;

  const pendingAppointments = appointments.value.filter(a => a.status === 'pending').length;
  const confirmedAppointments = appointments.value.filter(a => a.status === 'confirmed').length;
  const cancelledAppointments = appointments.value.filter(a => a.status === 'cancelled').length;

  return {
    todayAppointments,
    pendingAppointments,
    confirmedAppointments,
    cancelledAppointments
  };
});

const filteredAppointments = computed(() => {
  let filtered = [...appointments.value];

  // Filter by status
  if (statusFilter.value !== 'all') {
    filtered = filtered.filter(a => a.status === statusFilter.value);
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(a =>
        a.phone.toLowerCase().includes(query) ||
        a.email.toLowerCase().includes(query) ||
        a.services.some(s => s.title.toLowerCase().includes(query))
    );
  }

  // Sort by date and time
  filtered.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    if (dateA.getTime() !== dateB.getTime()) {
      return dateA - dateB;
    }

    // If same date, sort by time
    return a.time.localeCompare(b.time);
  });

  return filtered;
});

// Calendar computed properties
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

// Authentication methods
const login = () => {
  isLoggingIn.value = true;
  loginError.value = '';

  // Simulate API call
  setTimeout(() => {
    // Simple validation (in a real app, this would be a server-side check)
    if (loginForm.value.username === 'admin' && loginForm.value.password === 'admin') {
      isAuthenticated.value = true;
      adminName.value = 'Administrador';
    } else {
      loginError.value = 'Usuario o contraseña incorrectos';
    }
    isLoggingIn.value = false;
  }, 1000);
};

const logout = () => {
  isAuthenticated.value = false;
  loginForm.value = {username: '', password: ''};
};

// Calendar navigation methods
const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
};

const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
};

// Appointment methods
const viewAppointmentDetails = (appointment) => {
  selectedAppointment.value = appointment;
  showAppointmentModal.value = true;
};

const confirmAppointment = (appointment) => {
  const index = appointments.value.findIndex(a => a.id === appointment.id);
  if (index !== -1) {
    appointments.value[index].status = 'confirmed';
  }
};

const cancelAppointment = (appointment) => {
  const index = appointments.value.findIndex(a => a.id === appointment.id);
  if (index !== -1) {
    appointments.value[index].status = 'cancelled';
  }
};

const getStatusText = (status) => {
  switch (status) {
    case 'pending':
      return 'Pendiente';
    case 'confirmed':
      return 'Confirmada';
    case 'cancelled':
      return 'Cancelada';
    default:
      return status;
  }
};

// Calendar methods
const isToday = (date) => {
  const now = new Date();
  return date === now.getDate() &&
      currentMonth.value === now.getMonth() &&
      currentYear.value === now.getFullYear();
};

const getAppointmentsForDate = (date) => {
  return appointments.value.filter(a => {
    const appointmentDate = new Date(a.date);
    return appointmentDate.getDate() === date &&
        appointmentDate.getMonth() === currentMonth.value &&
        appointmentDate.getFullYear() === currentYear.value;
  });
};

// Settings methods
const toggleDayEnabled = (dayIndex) => {
  settings.value.enabledDays[dayIndex] = !settings.value.enabledDays[dayIndex];
};

const saveSettings = () => {
  // Here you would typically send the settings to your backend
  alert('Configuración guardada correctamente');
};

// Service methods
const editService = (service) => {
  editingService.value = true;
  serviceForm.value = JSON.parse(JSON.stringify(service)); // Copia profunda
  showServiceModal.value = true;
};

const deleteService = (service) => {
  if (confirm(`¿Estás seguro de que deseas eliminar el servicio "${service.title}"?`)) {
    services.value = services.value.filter(s => s.id !== service.id);
  }
};

const saveService = () => {
  // Asegurarse de que haya al menos una imagen principal
  if (serviceForm.value.images.length > 0 && !serviceForm.value.images.some(img => img.isPrimary)) {
    serviceForm.value.images[0].isPrimary = true;
  }

  if (editingService.value) {
    // Update existing service
    const index = services.value.findIndex(s => s.id === serviceForm.value.id);
    if (index !== -1) {
      services.value[index] = JSON.parse(JSON.stringify(serviceForm.value));
    }
  } else {
    // Add new service
    const newId = Math.max(0, ...services.value.map(s => s.id)) + 1;
    services.value.push({
      ...JSON.parse(JSON.stringify(serviceForm.value)),
      id: newId
    });
  }

  // Reset form and close modal
  serviceForm.value = {
    id: null,
    title: '',
    description: '',
    duration: 30,
    price: 0,
    images: []
  };
  editingService.value = false;
  showServiceModal.value = false;
};

// Utility methods
const formatDate = (date) => {
  if (!date) return '';

  const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
  return new Date(date).toLocaleDateString('es-ES', options);
};

const formatDuration = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) return `${mins} min`;
  if (mins === 0) return `${hours} h`;
  return `${hours} h ${mins} min`;
};

const getTotalDuration = (services) => {
  return services.reduce((total, service) => total + service.duration, 0);
};

const getTotalPrice = (services) => {
  return services.reduce((total, service) => total + service.price, 0);
};

// Actualizar la estructura de datos de servicios para soportar múltiples imágenes
const newImageUrl = ref('');
const showImageModal = ref(false);
const imagePreview = ref('');

// Initialize
onMounted(() => {
  // For demo purposes, auto-login
  // In a real app, you would check for a stored token or session
  // isAuthenticated.value = true;
});

const addImage = () => {
  if (!newImageUrl.value) return;

  const newImageId = Math.max(0, ...serviceForm.value.images.map(img => img.id)) + 1;
  const isPrimary = serviceForm.value.images.length === 0; // Primera imagen es principal por defecto

  serviceForm.value.images.push({
    id: newImageId,
    url: newImageUrl.value,
    isPrimary
  });

  // Limpiar y cerrar modal
  newImageUrl.value = '';
  showImageModal.value = false;
};

// Establecer una imagen como principal
const setPrimaryImage = (index) => {
  // Quitar el estado principal de todas las imágenes
  serviceForm.value.images.forEach(img => img.isPrimary = false);

  // Establecer la imagen seleccionada como principal
  serviceForm.value.images[index].isPrimary = true;
};

// Eliminar una imagen
const removeImage = (index) => {
  const wasRemovingPrimary = serviceForm.value.images[index].isPrimary;

  // Eliminar la imagen
  serviceForm.value.images.splice(index, 1);

  // Si eliminamos la imagen principal y quedan imágenes, establecer la primera como principal
  if (wasRemovingPrimary && serviceForm.value.images.length > 0) {
    serviceForm.value.images[0].isPrimary = true;
  }
};

// Reemplazar la referencia a showAddServiceModal con esta función
const openAddServiceModal = () => {
  editingService.value = false;
  serviceForm.value = {
    id: null,
    title: '',
    description: '',
    duration: 30,
    price: 0,
    images: []
  };
  showServiceModal.value = true;
};

// Obtener la imagen principal de un servicio
const getPrimaryImage = (service) => {
  const primaryImage = service.images.find(img => img.isPrimary);
  return primaryImage ? primaryImage.url : '/placeholder.svg?height=200&width=300';
};
</script>

