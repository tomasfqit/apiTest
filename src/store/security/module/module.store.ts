import { createAxiosInstance } from '@/api/config';
import { safeAxiosCall } from '@/api/config';
import { AxiosResponse } from 'axios';
import { create } from 'zustand';
import { AxiosErrorType } from '@/api/config';
import { ENDPOINTS_ROUTES } from '@/api/enpointsRoute';
import { ISecurityModuleResponse, ISecurityModuleResult } from '../../../views/Security/IModule';

interface FunctionProps {
	onSuccess?: (data: ISecurityModuleResult[]) => void;
	onError?: (error: string) => void;
}

interface IState {
	isLoading: boolean;
	error: string | null;
	securityModules?: ISecurityModuleResult[];
	fetchModules: ({ onSuccess, onError }: FunctionProps) => void;
	clearUserData: () => void;
	clearError: () => void;
}

export const useSecurityModuleStore = create<IState>((set) => ({
	isLoading: false,
	error: null,
	securityModules: undefined,
	
	fetchModules: async ({ onSuccess, onError }: FunctionProps) => {
		set({ isLoading: true, error: null });
		const axiosInstance = createAxiosInstance();	
		
		await safeAxiosCall<IState, AxiosResponse<ISecurityModuleResponse>>(
			() => axiosInstance.get(ENDPOINTS_ROUTES.securityModules),
			res => {
				const result = res.data.result;
				set({ securityModules: result, error: null });
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
		set({ securityModules: undefined, error: null });
	},
	
	clearError: () => {
		set({ error: null });
	},
}));