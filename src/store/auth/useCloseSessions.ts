import { post as postConfig, safeAxiosCall } from '@/api/config';
import { AxiosResponse } from 'axios';
import { create } from 'zustand';
import { AxiosErrorType } from '@/api/config';
import { ICloseSessionRequest, IResponseGeneric } from './IAuth';
import { ENDPOINTS_ROUTES } from '@/api/enpointsRoute';

interface FunctionProps {
	onSuccess: (data: IResponseGeneric) => void;
	onError?: (error: string) => void;
}
interface IState {
	isLoading: boolean;
	data?: IResponseGeneric;
	closeSession: (data: ICloseSessionRequest, { onSuccess, onError }: FunctionProps) => void;
}

export const useCloseSessions = create<IState>(set => ({
	isLoading: false,
	closeSession: async (request: ICloseSessionRequest, { onSuccess, onError }: FunctionProps) => {
		set({ isLoading: true });
		await safeAxiosCall<IState, AxiosResponse<IResponseGeneric>>(
			() => postConfig(ENDPOINTS_ROUTES.closeSession, request),
			res => {
				const result = res.data;
				set({ data: result });
				onSuccess(result);
			},
			err => {
				const error = err as AxiosErrorType;
				onError?.(error.message);
			},
			set,
		);
		set({ isLoading: false });
	},
}));
