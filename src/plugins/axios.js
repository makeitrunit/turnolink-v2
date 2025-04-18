import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});


async function getCsrfToken() {
    await axios.get(import.meta.env.VITE_BACKEND_API_URL + 'auth/user');
}

// Interceptor de solicitud para agregar encabezados (opcional)
axiosInstance.interceptors.request.use(
    async (config) => {
      /*  const xsrfToken = Cookies.get('XSRF-TOKEN');
        if (!xsrfToken) {
            await getCsrfToken();
        }
        config.headers['X-XSRF-TOKEN'] = Cookies.get('XSRF-TOKEN');


        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }*/
        config.headers['x-tenant-subdomain'] = 'minegocio';
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor de respuesta para manejar errores globalmente (opcional)
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.error('No autorizado. Redirigiendo al login.');
            // Aquí puedes manejar redirecciones o limpiar la sesión.
        }
        return Promise.reject(error);
    }
);

export {axiosInstance};
