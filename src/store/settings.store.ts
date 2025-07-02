import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ENDPOINTS_ROUTES } from '../api';
import { LOCAL_STORAGE_NAMES } from '../constants';
import { getToken } from '../helpers';
import { IAgenciesAccess, IAgencyModules, IModules, ISubModules } from '../interfaces/IMenuItems';

type SettingsState = {
	currentAgency: string | null;
	currentModule: string | null;
	currentSubmodules: ISubModules[] | null;
	agencies: IAgencyModules[] | null;
	modules: IModules[] | null;
	error: string | null;

	permissions: IAgenciesAccess | null;
	isLoading: boolean;

	setCurrentAgency: (agency: string) => void;
	setCurrentModule: (module: string) => void;
	setCurrentSubmodules: (subModules: ISubModules[]) => void;
	setAgencies: (modulesAvailable: IAgencyModules[]) => void;
	setModules: (modulesAvailable: IModules[]) => void;
	getExchangeCode: (claimCode: string, version?: string) => Promise<void>;
	getPermissions: () => Promise<void>;
	getCountryLabelById: (countryId: number) => string;
};

export const useSettingsStore = create<SettingsState>()(
	devtools(
		(set, get) => ({
			agencies: [],
			modules: [],
			currentAgency: null,
			currentModule: null,
			currentSubmodules: null,
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
				// try {
				// 	const res = await get(ENDPOINTS_ROUTES.exchangeCode, {
				// 		params: { claimCode },
				// 		skipAuth: true,
				// 	} as CustomAxiosRequestConfig);
				// 	const { access, refresh } = res.data.result;
				// 	const { setToken } = useAuthStore.getState();
				// 	localStorage.setItem('refresh_token', refresh);
				// 	setToken(access);
				// } catch (error) {
				// 	console.error('Error al obtener el token desde claimCode:', error);
				// }
			},
			getPermissions: async () => {
				const { setCurrentAgency, setModules, setCurrentModule, setAgencies, setCurrentSubmodules } = get();

				set({ isLoading: true });

				try {
					// Obtener el token del localStorage
					const accessToken = getToken();
					// Configurar la URL base
					const server = import.meta.env.VITE_API_URL || 'http://localhost:3000';
					const url = `${server}/${ENDPOINTS_ROUTES.permissions}`;

					// Configurar headers con el Bearer token
					const headers: HeadersInit = {
						'Content-Type': 'application/json',
					};

					if (accessToken) {
						headers.Authorization = `Bearer ${accessToken}`;
					}

					// Realizar la petición con fetch
					const response = await fetch(url, {
						method: 'GET',
						headers,
					});

					if (!response.ok) {
						throw new Error(`HTTP error! status: ${response.status}`);
					}
					console.log('permissions =>', get().permissions);
					const data = await response.json();
					const result = data.result;
					set({ permissions: result, isLoading: false });
					const currentAgency = result.agencies[0];
					setAgencies(result.agencies);
					setCurrentAgency(currentAgency.name);
					setModules(currentAgency.modules);
					const currentModule = currentAgency.modules[0];
					setCurrentModule(currentModule.name);
					setCurrentSubmodules(currentModule.submodules);
					localStorage.setItem(LOCAL_STORAGE_NAMES.agency, currentAgency.id);
					localStorage.setItem(LOCAL_STORAGE_NAMES.line, currentModule.name);
				} catch (error) {
					console.error('Error al obtener los permisos:', error);
					set({ isLoading: false });
				}
			},
		}),

		{ name: 'SettingsStore' },
	),
);
