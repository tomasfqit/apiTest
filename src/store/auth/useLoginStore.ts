import { post as postConfig } from '@/api/config';
import { safeAxiosCall } from '@/api/safeAxiosCall';
import { ApiKey } from '@/constants/ApiKey';
import { ILoginRequest, ILoginResponse } from '@/interfaces/login';
import { create } from 'zustand';
import { AxiosErrorType } from '../../interfaces/Common';

interface onSuccessProps {
	onSuccess: (data: ILoginResponse) => void;
}

interface LoginState {
	isLoading: boolean;
	error?: AxiosErrorType;
	login: (data: ILoginRequest, { onSuccess }: onSuccessProps) => void;
}

export const useLoginStore = create<LoginState>(set => ({
	isLoading: false,
	login: async (request: ILoginRequest, { onSuccess }: onSuccessProps) => {
		set({ isLoading: true });
		await safeAxiosCall<LoginState, ILoginResponse>(
			() => postConfig(ApiKey.LOGIN, request),
			data => {
				onSuccess(data);
			},
			err => set({ error: err as AxiosErrorType }),
			set,
		);
		set({ isLoading: false });
	},
}));
