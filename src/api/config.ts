import axios from 'axios';
import { cleanLocalStorage, getToken } from '../helpers';

const server = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const defaultOptions = {
	baseURL: server,
	headers: {
		'Content-Type': 'application/json',
	},
	timeout: 300000,
};

const _axios = axios.create(defaultOptions);

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

_axios.interceptors.response.use(
	response => response,
	error => {
		if (error.response?.status === 401) {
			cleanLocalStorage();
			window.location.href = '/login';
		}
		return Promise.reject(error);
	},
);

const { get, post, put, delete: destroy, patch } = _axios;

export { destroy, get, patch, post, put };
