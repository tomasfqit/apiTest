import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { LOCAL_STORAGE_NAMES } from '@/constants';

import axios from 'axios';
import { IAgenciesAccess, IAgencyModules, IModules, IPermissionResponse, ISubModules } from '@/interfaces/IMenuItems';
import { useAuthStore } from './auth/auth.store';
import { ENDPOINTS_ROUTES } from '@/api/enpointsRoute';

interface IProgramLocalPath {
	program: string;
	currentSubmodule: string;
	breadcrumbsList: {
		label: string;
		route: string;
	}[];
}

type SettingsState = {
	currentAgency: string | null;
	currentModule: string | null;
	currentSubmodules: ISubModules[];
	agencies: IAgencyModules[];
	modules: IModules[];
	error: string | null;

	permissions: IAgenciesAccess | null;
	isLoading: boolean;

	programLocalPath: () => IProgramLocalPath;
	setCurrentAgency: (agency: string) => void;
	setCurrentModule: (module: string) => void;
	setCurrentSubmodules: (subModules: ISubModules[]) => void;
	setAgencies: (modulesAvailable: IAgencyModules[]) => void;
	setModules: (modulesAvailable: IModules[]) => void;
	getExchangeCode: (claimCode: string, version?: string) => Promise<void>;
	getPermissions: () => Promise<boolean>;
	getCountryLabelById: (countryId: number) => string;
	
};

export const useSettingsStore = create<SettingsState>()(
	devtools(
		(set, get) => ({
			agencies: [],
			modules: [],
			currentAgency: null,
			currentModule: null,
			currentSubmodules: [],
			error: null,
			menuOptions: [],

			setCurrentAgency: (agency: string) => {
				set({ currentAgency: agency }, false);
			},
			setCurrentModule: (module: string) => {
				set({ currentModule: module }, false);
			},

			setCurrentSubmodules: (subModules: ISubModules[]) => {
				set({ currentSubmodules: subModules }, false);
			},

			setAgencies: (agenciesAvailable: IAgencyModules[]) => {
				set({ agencies: agenciesAvailable }, false);
			},
			setModules: (modulesAvailable: IModules[]) => {
				set({ modules: modulesAvailable }, false);
			},
			getExchangeCode: async (claimCode: string) => {
				console.log('claimCode =>', claimCode);
			},
			programLocalPath: () => {
				const { currentSubmodules, currentModule } = get();
				const localPath = location.pathname;

				let program = '';
				let currentSubmodule = '';
				const breadcrumbsList = [{ label: currentModule ?? '', route: '' }];

				// Buscar el submódulo y programa correspondiente
				const foundSubmodule = currentSubmodules.find(submodule =>
					(submodule?.programs ?? []).some(programItem => programItem?.path === localPath),
				);

				if (foundSubmodule) {
					currentSubmodule = foundSubmodule.name ?? '';
					breadcrumbsList.push({ label: currentSubmodule, route: '' });

					const foundProgram = (foundSubmodule.programs ?? []).find(programItem => programItem?.path === localPath);
					if (foundProgram) {
						program = foundProgram.name;
					}
				}

				return { program, currentSubmodule, breadcrumbsList };
			},
			getPermissions: async () => {
				const { setCurrentAgency, setModules, setCurrentModule, setAgencies, setCurrentSubmodules } = get();

				set({ isLoading: true });

				try {
					const { token } = useAuthStore.getState();
					const server = import.meta.env.VITE_API_URL || 'http://localhost:3000';
					const url = `${server}${ENDPOINTS_ROUTES.permissions}`;

					// Configurar instancia o simplemente usar headers en la solicitud
					const config = {
						headers: {
							'Content-Type': 'application/json',
							Authorization: token ? `Bearer ${token}` : '',
						},
					};

					const response = await axios.get<IPermissionResponse>(url, config);
					const result = response.data.result;
					set({ permissions: result, isLoading: false });

					const currentAgency = result.agencies[0];
					setAgencies(result.agencies);
					setCurrentAgency(currentAgency?.name ?? '');
					setModules(currentAgency?.modules ?? []);

					const currentModule = currentAgency?.modules[0];
					setCurrentModule(currentModule?.name ?? '');
					setCurrentSubmodules(currentModule?.submodules ?? []);

					localStorage.setItem(LOCAL_STORAGE_NAMES.agency, currentAgency?.id.toString() ?? '');
					localStorage.setItem(LOCAL_STORAGE_NAMES.line, currentModule?.name ?? '');

					return true;
				} catch (error) {
					console.error('Error al obtener los permisos:', error);
					set({ isLoading: false });
					set({
						permissions: {
							agencies: [],
						},
						isLoading: false,
					});
					return false;
				}
			},
		}),

		{ name: 'SettingsStore' },
	),
);
