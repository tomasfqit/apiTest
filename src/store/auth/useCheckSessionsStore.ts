import { post as postConfig } from '@/api/config';
import { safeAxiosCall } from '@/api/safeAxiosCall';
import { ApiKey } from '@/constants/ApiKey';
import { ILoginRequest, ILoginResponse } from '@/interfaces/login';
import { AxiosResponse } from 'axios';
import { create } from 'zustand';
import { AxiosErrorType } from '../../interfaces/Common';

interface FunctionProps {
	onSuccess: (data: ILoginResponse) => void;
	onError?: (error: string) => void;
}

interface IState {
	isLoading: boolean;
	data?: ILoginResponse;
	fetchFunction: (data: ILoginRequest, { onSuccess, onError }: FunctionProps) => void;
}

export const useCheckSessionsStore = create<IState>(set => ({
	isLoading: false,
	fetchFunction: async (request: ILoginRequest, { onSuccess, onError }: FunctionProps) => {
		set({ isLoading: true });
		await safeAxiosCall<IState, AxiosResponse>(
			() => postConfig(ApiKey.CHECK_SESSION, request),
			res => {
				set({ data: res.data });
				onSuccess(res.data);
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
