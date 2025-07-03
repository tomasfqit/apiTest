import { get as getConfig } from '@/api/config';
import { safeAxiosCall } from '@/api/config';
import { AxiosResponse } from 'axios';
import { create } from 'zustand';
import { AxiosErrorType } from '@/api/config';
import { IExchangeCodeRequest, IExchangeCodeResponse, IExchangeCodeResult } from './IAuth';
import { ENDPOINTS_ROUTES } from '@/api/enpointsRoute';

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
			() => getConfig(`${ENDPOINTS_ROUTES.exchangeCode}?claim_code=${request.claim_code}`),
			res => {
				const result = res.data.result;
				set({ data: result });
				onSuccess(result);
			},
			err => {
				const error = err as AxiosErrorType;
				const msg = error.response?.data.message || '';
				console.log('Error al obtener el código de intercambio', msg);
			},
			set,
		);
		set({ isLoading: false });
	},
}));
