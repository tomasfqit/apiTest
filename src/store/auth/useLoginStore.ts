import { post as postConfig } from '@/api/config';
import { safeAxiosCall } from '@/api/config';
import { AxiosResponse } from 'axios';
import { create } from 'zustand';
import { AxiosErrorType } from '@/api/config';
import { ILoginRequest, ILoginResponse } from './IAuth';
import { ENDPOINTS_ROUTES } from '@/api/enpointsRoute';

interface FunctionProps {
	onSuccess: (data: string) => void;
	onError?: (error: string) => void;
}
interface IState {
	isLoading: boolean;
	data?: string;
	login: (data: ILoginRequest, { onSuccess, onError }: FunctionProps) => void;
}

export const useLoginStore = create<IState>(set => ({
	isLoading: false,
	login: async (request: ILoginRequest, { onSuccess, onError }: FunctionProps) => {
		set({ isLoading: true });
		await safeAxiosCall<IState, AxiosResponse<ILoginResponse>>(
			() => postConfig(ENDPOINTS_ROUTES.login, request),
			res => {
				const result = res.data.result;
				set({ data: result });
				onSuccess(result);
			},
			err => {
				const error = err as AxiosErrorType;
				console.log('Error al iniciar sesión', error);
				onError?.(error.message);
			},
			set,
		);
		set({ isLoading: false });
	},
}));
