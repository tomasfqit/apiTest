import axios, { InternalAxiosRequestConfig, AxiosError } from 'axios';

import { useAuthStore } from '@/store/auth/auth.store';
import { ENDPOINTS_ROUTES } from './enpointsRoute';

export type ErrorType = {
	message: string;
	code: number;
};
export type AxiosErrorType = AxiosError<ErrorType>;


type AxiosRequestConfigWithRetry = InternalAxiosRequestConfig & { _retry?: boolean };
export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
	skipAuth?: boolean;
}

interface RefreshTokenResponse {
	result: {
		access: string;
		refresh: string;
	};
}

let accessToken: string | null = null;

// Instancia separada para la petición de refresh token sin interceptores
export const securityInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
});

export const instanceAXIOS = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
});

export const 	fetchAccessToken = async (): Promise<string | null> => {
	const { token, setToken } = useAuthStore.getState();
	if (token) {
		accessToken = token;
		return token;
	}

	const refreshToken = localStorage.getItem('refresh_token');

	if (!refreshToken) {
		return null;
	}

	try {
		const response = await securityInstance.post<RefreshTokenResponse>(ENDPOINTS_ROUTES.refreshToken, {
			refresh: refreshToken,
		});
		accessToken = response.data.result.access;
		setToken(accessToken);
		localStorage.setItem('refresh_token', response.data.result.refresh);
		return accessToken;
	} catch (err) {
		console.error('Error fetching token', err);
		//clearLocalStorage();
		// window.location.href = '/login'; // TODO: add this to COMP
		return null;
	}
};

export const createAxiosInstance = () => {
	// TODO: implement this when BE handles versioning
	const baseURL = `${import.meta.env.VITE_API_URL}`;
	const instance = axios.create({
		baseURL,
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	});

	instance.interceptors.request.use(async (config: CustomAxiosRequestConfig) => {
		if (config.skipAuth) {
			return config;
		}
		const token = await fetchAccessToken();
		if (token) {
			config.headers = config.headers || {};
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	});

	instance.interceptors.response.use(
		response => response,
		async error => {
			const originalRequest = error.config as AxiosRequestConfigWithRetry;

			if (error.response?.status === 401 && !originalRequest._retry) {
				originalRequest._retry = true;
				const newToken = await fetchAccessToken();
				if (newToken) {
					originalRequest.headers = originalRequest.headers || {};
					originalRequest.headers.Authorization = `Bearer ${newToken}`;
					return instance(originalRequest);
				}
			}

			return Promise.reject(error);
		},
	);

	return instance;
};

type ZustandSet<T> = Parameters<import('zustand').StateCreator<T>>[0];

export const safeAxiosCall = async <StoreType, ResponseType>(
	axiosCall: () => Promise<ResponseType>,
	onSuccess: (data: ResponseType) => void,
	onError: (error: unknown) => void,
	set: ZustandSet<StoreType>,
	loadingKey: keyof StoreType = 'isLoading' as keyof StoreType,
	errorKey: keyof StoreType = 'error' as keyof StoreType,
) => {
	set({
		[loadingKey]: true,
		[errorKey]: null,
	} as Partial<StoreType>);

	try {
		const response = await axiosCall();
		onSuccess(response);
	} catch (error) {
		onError(error);
		set({
			[loadingKey]: false,
			[errorKey]: error,
		} as Partial<StoreType>);
	} finally {
		set({
			[loadingKey]: false,
		} as Partial<StoreType>);
	}
};
const { get, post, put, delete: destroy, patch } = securityInstance;
export { destroy, get, patch, post, put };