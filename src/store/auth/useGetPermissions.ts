import { get as getConfig } from '@/api/config';
import { safeAxiosCall } from '@/api/safeAxiosCall';
import { AxiosErrorType } from '@/interfaces/Common';
import { IAgenciesAccess, IPermissionResponse } from '@/interfaces/IMenuItems';
import { AxiosResponse } from 'axios';
import { create } from 'zustand';

interface FunctionProps {
	onSuccess: (data: IAgenciesAccess) => void;
	onError: (error: string) => void;
}
interface IState {
	isLoading: boolean;
	data?: IAgenciesAccess;
	getPermissions: ({ onSuccess, onError }: FunctionProps) => void;
}

export const useGetPermissions = create<IState>(set => ({
	isLoading: false,
	getPermissions: async ({ onSuccess, onError }: FunctionProps) => {
		set({ isLoading: true });
		await safeAxiosCall<IState, AxiosResponse<IPermissionResponse>>(
			() => getConfig(`/security/getPermissions/`),
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
}));
