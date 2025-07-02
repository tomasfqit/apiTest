// import { useEffect, useMemo, useState } from 'react';
// import { IAgencyModules, IModules, ISubModules } from '../../interfaces/IMenuItems';
// import { useGetPermissions } from '../../store/auth/useGetPermissions';
// import { useSettingsStore } from '../../store/settings.store';

// export interface IMainLayoutUI {
// 	isLoading: boolean;
// 	agencies: IAgencyModules[];
// 	currentAgency: IAgencyModules | null;
// 	currentModules: IModules[];
// 	currentModule: IModules | null;
// 	setCurrentAgency: (agency: IAgencyModules) => void;
// 	setCurrentModule: (module: IModules) => void;
// 	currentSubModules: ISubModules[];
// 	setCurrentSubModules: (subModules: ISubModules[]) => void;
// }

// export const useMainLayoutHook = (): IMainLayoutUI => {
// 	const { getPermissions, data, isLoading } = useGetPermissions();
// 	console.log('data =>', data);
// 	const { getCurrentAgencyId, getCurrentModuleId, setCurrentAgencyId, setCurrentModuleId } = useSettingsStore();
// 	const [currentAgency, setCurrentAgency] = useState<IAgencyModules | null>(null);
// 	const [currentModule, setCurrentModule] = useState<IModules | null>(null);
// 	const [currentSubModules, setCurrentSubModules] = useState<ISubModules[]>([]);

// 	// Obtener permisos si no se tienen aún
// 	useEffect(() => {
// 		if (!data) getPermissions();
// 	}, [data, getPermissions]);

// 	const agencies = useMemo(() => data ?? [], [data]);

// 	const agencyFromParams = useMemo(() => {
// 		const agencyId = getCurrentAgencyId();
// 		return agencies.find(agency => agency.id === agencyId) ?? null;
// 	}, [agencies, getCurrentAgencyId]);

// 	const moduleFromParams = useMemo(() => {
// 		const moduleId = getCurrentModuleId();
// 		return agencyFromParams?.modules.find(module => module.id === moduleId) ?? null;
// 	}, [agencyFromParams?.modules, getCurrentModuleId]);

// 	useEffect(() => {
// 		if (!agencies.length || currentAgency) return;

// 		const defaultAgency = agencyFromParams ?? agencies[0] ?? null;
// 		const defaultModule = moduleFromParams ?? defaultAgency?.modules?.[0] ?? null;

// 		if (defaultAgency && defaultModule) {
// 			setCurrentAgency(defaultAgency);
// 			setCurrentModule(defaultModule);
// 			setCurrentSubModules(defaultModule.submodules ?? []);
// 			setCurrentAgencyId(defaultAgency.id);
// 			setCurrentModuleId(defaultModule.id);
// 		}
// 	}, [agencies, currentAgency, agencyFromParams, moduleFromParams, setCurrentAgencyId, setCurrentModuleId]);

// 	const currentModules = useMemo(() => currentAgency?.modules ?? [], [currentAgency]);

// 	return {
// 		isLoading,
// 		agencies,
// 		currentAgency,
// 		setCurrentAgency,
// 		currentModules,
// 		currentModule,
// 		setCurrentModule,
// 		currentSubModules,
// 		setCurrentSubModules,
// 	};
// };
