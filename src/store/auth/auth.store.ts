import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { authService, LoginCredentials, LoginResponse } from '@/api/auth.service';
import { AxiosErrorType, fetchAccessToken } from '@/api/config';

import { cleanLocalStorage } from '../../helpers';

interface User {
	id: string;
	email: string;
	name: string;
}

type AuthState = {
	token: string | null;
	user: User | null;
	isLoading: boolean;
	error: string | null;
	isAuthenticated: boolean;

	// Actions
	setToken: (token: string) => void;
	setUser: (user: User) => void;
	login: (credentials: LoginCredentials) => Promise<void>;
	logout: () => Promise<void>;
	clearError: () => void;
	checkAuth: () => Promise<void>;
};

export const useAuthStore = create<AuthState>()(
	devtools(
		set => ({
			token: null,
			user: null,
			isLoading: false,
			error: null,
			isAuthenticated: false,

			setToken: (token: string) => {
				set({ token, isAuthenticated: true }, false, 'setToken');
			},

			setUser: (user: User) => {
				set({ user }, false, 'setUser');
			},

			login: async (credentials: LoginCredentials) => {
				set({ isLoading: true, error: null }, false, 'login-start');
				console.log('credentials =>', credentials);

				try {
					const response: LoginResponse = await authService.login(credentials);
					localStorage.setItem('refresh_token', response.result.refresh);
					set(
						{
							token: response.result.access,
							user: response.result.user,
							isAuthenticated: true,
							isLoading: false,
							error: null,
						},
						false,
						'login-success',
					);
				} catch (error: unknown) {
					const axiosError = error as AxiosErrorType;
					set(
						{
							isLoading: false,
							error: axiosError.response?.data?.message || 'Error al iniciar sesión',
						},
						false,
						'login-error',
					);
				}
			},

			logout: async () => {
				set({ isLoading: true }, false, 'logout-start');

				try {
					const refreshToken = localStorage.getItem('refresh_token');
					if (refreshToken) {
						await authService.logout(refreshToken);
						cleanLocalStorage();
						window.location.href = '/login';
					}
				} catch (error) {
					console.error('Error during logout:', error);
				} finally {
					// Limpiar estado y localStorage
					cleanLocalStorage();
					set(
						{
							token: null,
							user: null,
							isAuthenticated: false,
							isLoading: false,
							error: null,
						},
						false,
						'logout-success',
					);
				}
			},

			clearError: () => {
				set({ error: null }, false, 'clearError');
			},

			checkAuth: async () => {
				set({ isLoading: true });
				const token = await fetchAccessToken();

				if (token) {
					set({ token, isAuthenticated: true }, false, 'checkAuth-valid');
				} else {
					set({ token: null, isAuthenticated: false }, false, 'checkAuth-invalid');
				}
				set({ isLoading: false });


			},
		}),
		{ name: 'AuthStore' },
	),
);
//"refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc1MTY1Nzk1NCwiaWF0IjoxNzUxNTcxNTU0LCJqdGkiOiI4YTExNDc2ZjExZTY0YzRiYmE0NGEyYTgwMWFlYjgxZCIsInVzZXJfaWQiOjE5fQ.ykVpJ3skmLP1cyXPT0VuUHFgsI3twz-sCp41pYJCWVc",
//"access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzUxNTg5NTU0LCJpYXQiOjE3NTE1NzE1NTQsImp0aSI6ImM5MTA0MzdiY2IxOTRkMTJiN2ZlNGM4MDEwMTNhMTdkIiwidXNlcl9pZCI6MTksInNlc3Npb25faWQiOjc0MH0.aQbLbEPgPoM934ixVR596dE6Xj78kHdi3ljzT_W0hnI"
				// // const token = localStorage.getItem('access_token');
				// // set({ token, isAuthenticated: true }, false, 'checkAuth-valid');
				// const token = localStorage.getItem('access_token');
				// if (token) {
				// 	const isValid = await authService.verifyAuth();
				// 	if (isValid) {
				// 		set({ token, isAuthenticated: true }, false, 'checkAuth-valid');
				// 	} else {
				// 		// Token inválido, limpiar estado
				// 		cleanLocalStorage();
				// 		set(
				// 			{
				// 				token: null,
				// 				user: null,
				// 				isAuthenticated: false,
				// 			},
				// 			false,
				// 			'checkAuth-invalid',
				// 		);
				// 	}
				// }