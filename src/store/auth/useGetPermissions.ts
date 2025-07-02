import { get as getConfig } from '@/api/config';
import { safeAxiosCall } from '@/api/safeAxiosCall';
import { AxiosErrorType } from '@/interfaces/Common';
import { IAgencyModules, IModules, IPermissionResponse } from '@/interfaces/IMenuItems';
import { AxiosResponse } from 'axios';
import { create } from 'zustand';

// interface FunctionProps {
// 	onSuccess?: (data: IAgenciesAccess) => void;
// 	onError?: (error: string) => void;
// }
interface IState {
	isLoading: boolean;
	data?: IAgencyModules[];
	currentAgency: IAgencyModules | null;
	currentModule: IModules | null;
	getPermissions: () => void;
}

export const useGetPermissions = create<IState>(set => ({
	isLoading: false,
	agencies: [],
	currentAgency: null,
	currentModule: null,
	getPermissions: async () => {
		set({ isLoading: true });
		await safeAxiosCall<IState, AxiosResponse<IPermissionResponse>>(
			() => getConfig(`/security/getPermissions/`),
			res => {
				const result = res.data.result.agencies;
				set({ data: result });
				set({ currentAgency: result?.[0] || null });
				set({ currentModule: result?.[0]?.modules?.[0] || null });
				//onSuccess?.(result);
			},
			err => {
				const error = err as AxiosErrorType;
				const msg = error.response?.data.message || '';
				console.log(msg);
				//onError?.(msg);
			},
			set,
		);
		set({ isLoading: false });
	},
}));
