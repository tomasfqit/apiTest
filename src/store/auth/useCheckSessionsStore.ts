import { post as postConfig } from '@/api/config';
import { safeAxiosCall } from '@/api/safeAxiosCall';
import { ICheckSessionResponse, ICheckSessionResult, ILoginRequest } from '@/interfaces/login';
import { AxiosResponse } from 'axios';
import { create } from 'zustand';
import { AxiosErrorType } from '../../interfaces/Common';
import { TOAST_ERROR } from '../../utils/toast';

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
			() => postConfig('/security/checkSession/', request),
			res => {
				const result = res.data.result;
				set({ data: result });
				onSuccess(result);
			},
			err => {
				const error = err as AxiosErrorType;
				const msg = error.response?.data.message || '';
				TOAST_ERROR(msg);
			},
			set,
		);
		set({ isLoading: false });
	},
}));
