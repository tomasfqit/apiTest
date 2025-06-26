import axios from 'axios';

// En desarrollo, usar el proxy de Vite para evitar CORS
const server = import.meta.env.DEV ? '/api' : import.meta.env.VITE_API_URL || 'http://192.168.7.139:9095';

// Configuración de cifrado AES
const ENCRYPTION_KEY = import.meta.env.KEY_ENCRYPTER_AES || 'your-default-key-32-bytes-long-here';
const ENCRYPTION_IV = import.meta.env.IV_ENCRYPTER_AES || 'your-default-iv-16-bytes';

// Función para obtener el token desde localStorage
const getToken = () => {
	const userToken = localStorage.getItem('userToken') || '';
	let token = null;
	if (userToken) {
		token = JSON.parse(userToken).accessToken;
	}
	return token;
};

const defaultOptions = {
	baseURL: server,
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type, Authorization',
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

// Función para convertir string a Uint8Array
const stringToUint8Array = (str: string): Uint8Array => {
	return new TextEncoder().encode(str);
};

// Función para convertir Uint8Array a string
const uint8ArrayToString = (array: Uint8Array): string => {
	return new TextDecoder().decode(array);
};

// Función para convertir string hexadecimal a Uint8Array
const hexToUint8Array = (hex: string): Uint8Array => {
	const bytes = new Uint8Array(hex.length / 2);
	for (let i = 0; i < hex.length; i += 2) {
		bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
	}
	return bytes;
};

// Función para convertir Uint8Array a string hexadecimal
const uint8ArrayToHex = (array: Uint8Array): string => {
	return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Función para generar clave y IV aleatorios (solo para desarrollo)
const generateRandomKey = (): { key: string; iv: string } => {
	const keyArray = crypto.getRandomValues(new Uint8Array(32));
	const ivArray = crypto.getRandomValues(new Uint8Array(16));

	return {
		key: uint8ArrayToHex(keyArray),
		iv: uint8ArrayToHex(ivArray),
	};
};

// Función para cifrar datos
const encryptValue = async (value: string): Promise<string> => {
	try {
		// Convertir la clave y IV desde hexadecimal
		const keyBytes = hexToUint8Array(ENCRYPTION_KEY);
		const ivBytes = hexToUint8Array(ENCRYPTION_IV);

		// Importar la clave
		const key = await crypto.subtle.importKey('raw', keyBytes, { name: 'AES-CBC' }, false, ['encrypt']);

		// Convertir el valor a bytes
		const data = stringToUint8Array(value);

		// Cifrar los datos
		const encrypted = await crypto.subtle.encrypt({ name: 'AES-CBC', iv: ivBytes }, key, data);

		// Convertir a base64 URL-safe
		const encryptedArray = new Uint8Array(encrypted);
		const base64 = btoa(String.fromCharCode(...encryptedArray));
		return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
	} catch (error) {
		console.error('Error al cifrar:', error);
		throw new Error('Error al cifrar los datos');
	}
};

// Función para descifrar datos
const decryptValue = async (encryptedData: string): Promise<string> => {
	try {
		// Convertir la clave y IV desde hexadecimal
		const keyBytes = hexToUint8Array(ENCRYPTION_KEY);
		const ivBytes = hexToUint8Array(ENCRYPTION_IV);

		// Importar la clave
		const key = await crypto.subtle.importKey('raw', keyBytes, { name: 'AES-CBC' }, false, ['decrypt']);

		// Convertir desde base64 URL-safe
		const base64 = encryptedData.replace(/-/g, '+').replace(/_/g, '/');
		const encryptedArray = new Uint8Array(
			atob(base64)
				.split('')
				.map(char => char.charCodeAt(0)),
		);

		// Descifrar los datos
		const decrypted = await crypto.subtle.decrypt({ name: 'AES-CBC', iv: ivBytes }, key, encryptedArray);

		// Convertir de vuelta a string
		return uint8ArrayToString(new Uint8Array(decrypted));
	} catch (error) {
		console.error('Error al descifrar:', error);
		throw new Error('Error al descifrar los datos');
	}
};

const { get, post, put, delete: destroy, patch } = _axios;

// Exportar las funciones de cifrado junto con las funciones HTTP
export { decryptValue, destroy, encryptValue, generateRandomKey, get, patch, post, put };
