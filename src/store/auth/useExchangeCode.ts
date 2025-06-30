import { get as getConfig } from '@/api/config';
import { safeAxiosCall } from '@/api/safeAxiosCall';
import { IExchangeCodeRequest, IExchangeCodeResponse, IExchangeCodeResult } from '@/interfaces/login';
import { AxiosResponse } from 'axios';
import { create } from 'zustand';
import { AxiosErrorType } from '../../interfaces/Common';
import { TOAST_ERROR } from '../../utils/toast';

interface FunctionProps {
	onSuccess: (data: IExchangeCodeResult) => void;
}
interface IState {
	isLoading: boolean;
	data?: IExchangeCodeResult;
	exchangeCode: (data: IExchangeCodeRequest, { onSuccess }: FunctionProps) => void;
}

export const useExchangeCodeStore = create<IState>(set => ({
	isLoading: false,
	exchangeCode: async (request: IExchangeCodeRequest, { onSuccess }: FunctionProps) => {
		set({ isLoading: true });
		await safeAxiosCall<IState, AxiosResponse<IExchangeCodeResponse>>(
			() => getConfig(`/security/exchangecode/?claim_code=${request.claim_code}`),
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
