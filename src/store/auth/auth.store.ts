import { create } from 'zustand';
import { devtools } from 'zustand/middleware';


import { cleanLocalStorage } from '../../helpers';

import {post} from '@/api/config'
import { ENDPOINTS_ROUTES } from '@/api/enpointsRoute';

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
	logout: () => Promise<void>;
	clearError: () => void;
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
			logout: async () => {
				set({ isLoading: true }, false, 'logout-start');

				try {
					const refreshToken = localStorage.getItem('refresh_token');
					await post(`${import.meta.env.VITE_API_URL}${ENDPOINTS_ROUTES.logout}`,{refresh: refreshToken});
					if (refreshToken) {
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

			
		}),
		{ name: 'AuthStore' },
	),
);