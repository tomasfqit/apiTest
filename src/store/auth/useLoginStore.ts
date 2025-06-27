import { post as postConfig } from '@/api/config';
import { safeAxiosCall } from '@/api/safeAxiosCall';
import { ILoginRequest, ILoginResponse } from '@/interfaces/login';
import { AxiosResponse } from 'axios';
import { create } from 'zustand';
import { AxiosErrorType } from '../../interfaces/Common';

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
			() => postConfig('/security/login/', request),
			res => {
				const result = res.data.result;
				set({ data: result });
				onSuccess(result);
			},
			err => {
				const error = err as AxiosErrorType;
				console.log('erroaaaaaaaar', error);
				onError?.(error.message);
			},
			set,
		);
		set({ isLoading: false });
	},
}));
