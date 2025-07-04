import { createAxiosInstance } from '@/api/config';
import { safeAxiosCall } from '@/api/config';
import { AxiosResponse } from 'axios';
import { create } from 'zustand';
import { AxiosErrorType } from '@/api/config';
import { IUserInformationResponse, IUserInformationResult } from './IAuth';
import { ENDPOINTS_ROUTES } from '@/api/enpointsRoute';

interface FunctionProps {
	onSuccess?: (data: IUserInformationResult) => void;
	onError?: (error: string) => void;
}

interface IState {
	isLoading: boolean;
	error: string | null;
	userInformation?: IUserInformationResult;
	fetchUserInformation: ({ onSuccess, onError }: FunctionProps) => void;
	clearUserData: () => void;
	clearError: () => void;
}

export const useUserInformationStore = create<IState>((set) => ({
	isLoading: false,
	error: null,
	userInformation: undefined,
	
	fetchUserInformation: async ({ onSuccess, onError }: FunctionProps) => {
		set({ isLoading: true, error: null });
		const axiosInstance = createAxiosInstance();	
		
		await safeAxiosCall<IState, AxiosResponse<IUserInformationResponse>>(
			() => axiosInstance.get(ENDPOINTS_ROUTES.userInformation),
			res => {
				const result = res.data.result;
				set({ userInformation: result, error: null });
				onSuccess?.(result);
			},
			err => {
				const error = err as AxiosErrorType;
				const errorMessage = error.response?.data?.message || error.message || 'Error al obtener información del usuario';
				console.error('Error al obtener información del usuario:', error);
				set({ error: errorMessage });
				onError?.(errorMessage);
			},
			set,
		);
	},
	
	clearUserData: () => {
		set({ userInformation: undefined, error: null });
	},
	
	clearError: () => {
		set({ error: null });
	},
}));