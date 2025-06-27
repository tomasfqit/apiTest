import { post as postConfig } from '@/api/config';
import { safeAxiosCall } from '@/api/safeAxiosCall';
import { ICloseSessionRequest, IResponseGeneric } from '@/interfaces/login';
import { AxiosResponse } from 'axios';
import { create } from 'zustand';
import { AxiosErrorType } from '../../interfaces/Common';

interface FunctionProps {
	onSuccess: (data: IResponseGeneric) => void;
	onError?: (error: string) => void;
}
interface IState {
	isLoading: boolean;
	data?: IResponseGeneric;
	fetchFunction: (data: ICloseSessionRequest, { onSuccess, onError }: FunctionProps) => void;
}

export const useCloseSessions = create<IState>(set => ({
	isLoading: false,
	fetchFunction: async (request: ICloseSessionRequest, { onSuccess, onError }: FunctionProps) => {
		set({ isLoading: true });
		await safeAxiosCall<IState, AxiosResponse<IResponseGeneric>>(
			() => postConfig('/security/closeSession/', request),
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
