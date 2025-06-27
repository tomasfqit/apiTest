import { post as postConfig } from '@/api/config';
import { safeAxiosCall } from '@/api/safeAxiosCall';
import { ICheckSessionResponse, ICheckSessionResult, ILoginRequest } from '@/interfaces/login';
import { AxiosResponse } from 'axios';
import { create } from 'zustand';
import { AxiosErrorType } from '../../interfaces/Common';

interface FunctionProps {
	onSuccess: (data: ICheckSessionResult[]) => void;
	onError?: (error: string) => void;
}
interface IState {
	isLoading: boolean;
	data?: ICheckSessionResult[];
	fetchFunction: (data: ILoginRequest, { onSuccess, onError }: FunctionProps) => void;
}

export const useCheckSessionsStore = create<IState>(set => ({
	isLoading: false,
	fetchFunction: async (request: ILoginRequest, { onSuccess, onError }: FunctionProps) => {
		set({ isLoading: true });
		await safeAxiosCall<IState, AxiosResponse<ICheckSessionResponse>>(
			() => postConfig('/security/checkSession/', request),
			res => {
				const result = res.data.result;
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
