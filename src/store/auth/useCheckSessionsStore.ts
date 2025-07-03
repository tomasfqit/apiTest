import { AxiosResponse } from 'axios';
import { create } from 'zustand';
import { ICheckSessionResponse, ICheckSessionResult, ILoginRequest } from './IAuth';
import { AxiosErrorType, post as postConfig, safeAxiosCall } from '@/api/config';
import { ENDPOINTS_ROUTES } from '@/api/enpointsRoute';

interface FunctionProps {
	onSuccess: (data: ICheckSessionResult[]) => void;
}
interface IState {
	isLoading: boolean;
	data?: ICheckSessionResult[];
	checkSession: (data: ILoginRequest, { onSuccess }: FunctionProps) => void;
}

export const useCheckSessionsStore = create<IState>(set => ({
	isLoading: false,
	checkSession: async (request: ILoginRequest, { onSuccess }: FunctionProps) => {
		set({ isLoading: true });
		await safeAxiosCall<IState, AxiosResponse<ICheckSessionResponse>>(
			() => postConfig(ENDPOINTS_ROUTES.checkSession, request),
			res => {
				const result = res.data.result;
				set({ data: result });
				onSuccess(result);
			},
			err => {
				const error = err as AxiosErrorType;
				const msg = error.response?.data.message || '';
				console.log('Error al verificar sesión', msg);
			},
			set,
		);
		set({ isLoading: false });
	},
}));
