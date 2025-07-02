import { clearLocalStorage } from '@ITSA-Nucleo/itsa-fe-components';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ENDPOINTS_ROUTES } from '../api';
import { post } from '../api/config';
import { IExchangeCodeResult } from '../interfaces/login';

type AuthState = {
	token: string | null;
	setToken: (token: string) => void;
	logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>()(
	devtools(
		set => ({
			token: null,

			setToken: (token: string) => {
				set({ token }, false, 'setToken');
			},

			logout: async () => {
				try {
					const refreshTokenString = localStorage.getItem('token');

					const token: IExchangeCodeResult = JSON.parse(refreshTokenString || '{}');
					const refreshToken = token.refresh;
					console.log('refreshToken =>', refreshToken);

					await post(ENDPOINTS_ROUTES.logout, { refresh: refreshToken });
					clearLocalStorage();
					window.location.href = 'http://192.168.7.87:8082/'; // TODO: add this to COMP
				} catch (error) {
					console.error('error', error);
				}
			},
		}),
		{ name: 'AuthStore' },
	),
);
