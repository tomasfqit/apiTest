import { get as getConfig } from '@/api/config';
import { safeAxiosCall } from '@/api/config';
import { AxiosResponse } from 'axios';
import { create } from 'zustand';
import { AxiosErrorType } from '@/api/config';
import { IValidateRouteRequest, IValidateRouteResponse } from './IAuth';
import { LOCAL_STORAGE_NAMES } from '@/constants/index';
import { ENDPOINTS_ROUTES } from '@/api/enpointsRoute';

interface FunctionProps {
	onSuccess: (data: boolean) => void;
	onError: (error: string) => void;
}
interface IState {
	isLoading: boolean;
	data?: boolean;
	progId: number;
	agenId: number;
	getAgenId: () => number;
	validateRoute: (request: IValidateRouteRequest, { onSuccess, onError }: FunctionProps) => void;
}

export const useValidateRoute = create<IState>(set => ({
	isLoading: false,
	progId: 0,
	agenId: 0,
	validateRoute: async (request: IValidateRouteRequest, { onSuccess, onError }: FunctionProps) => {
		set({ isLoading: true });
		await safeAxiosCall<IState, AxiosResponse<IValidateRouteResponse>>(
			() => getConfig(`${ENDPOINTS_ROUTES.validateRoute}?progId=${request.progId}&agenId=${request.agenId}`),
			res => {
				const result = res.data.result;
				set({ data: result });
				onSuccess(result);
			},
			err => {
				const error = err as AxiosErrorType;
				const msg = error.response?.data.message || '';
				onError(msg);
			},
			set,
		);
		set({ isLoading: false });
	},	
	getAgenId: () => {
		const agenId = localStorage.getItem(LOCAL_STORAGE_NAMES.agency);
		return agenId ? parseInt(agenId) : 0;
	},
	setProgId: (progId: number) => set({ progId }),
	setAgenId: (agenId: number) => set({ agenId }),
}));
