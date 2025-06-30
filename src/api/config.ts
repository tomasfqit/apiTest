import axios from 'axios';

const server = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Configuración de cifrado AES
//const ENCRYPTION_KEY = import.meta.env.KEY_ENCRYPTER_AES || 'your-default-key-32-bytes-long-here';
//const ENCRYPTION_IV = import.meta.env.IV_ENCRYPTER_AES || 'your-default-iv-16-bytes';

// Función para obtener el token desde localStorage
const getToken = () => {
	const userToken = localStorage.getItem('token') || '';
	let token = null;
	if (userToken) {
		token = JSON.parse(userToken).access;
	}
	return token;
};

const defaultOptions = {
	baseURL: server,
	headers: {
		'Content-Type': 'application/json',
	},
	timeout: 300000,
};

const _axios = axios.create(defaultOptions);

// Interceptor de peticiones - agrega token automáticamente
_axios.interceptors.request.use(
	config => {
		const token = getToken();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	error => {
		return Promise.reject(error);
	},
);

// Interceptor de respuestas - maneja errores de autorización
_axios.interceptors.response.use(
	response => response,
	error => {
		if (error.response?.status === 401) {
			// Token inválido o expirado
			localStorage.removeItem('userToken');
			// Opcional: redirigir al login
			window.location.href = '/login';
		}
		return Promise.reject(error);
	},
);

const { get, post, put, delete: destroy, patch } = _axios;

// Exportar las funciones de cifrado junto con las funciones HTTP
export { destroy, get, patch, post, put };
