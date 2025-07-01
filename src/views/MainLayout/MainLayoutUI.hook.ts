import { useEffect, useMemo, useState } from 'react';
import { useCustomsParams } from '../../hooks/useCustomsParams';
import { IAgencyModules, IModules, ISubModules } from '../../interfaces/IMenuItems';
import { useGetPermissions } from '../../store/auth/useGetPermissions';

export interface IMainLayoutUI {
	isLoading: boolean;
	agencies: IAgencyModules[];
	currentAgency: IAgencyModules | null;
	currentModules: IModules[];
	currentModule: IModules | null;
	setCurrentAgency: (agency: IAgencyModules) => void;
	setCurrentModule: (module: IModules) => void;
	currentSubModules: ISubModules[];
	setCurrentSubModules: (subModules: ISubModules[]) => void;
}

export const useMainLayoutHook = (): IMainLayoutUI => {
	const { setSearchParams } = useCustomsParams();
	const { getPermissions, data, isLoading } = useGetPermissions();
	const [currentAgency, setCurrentAgency] = useState<IAgencyModules | null>(null);
	const [currentModule, setCurrentModule] = useState<IModules | null>(null);
	const [currentSubModules, setCurrentSubModules] = useState<ISubModules[]>([]);

	useEffect(() => {
		if (data) return;
		getPermissions();
	}, [data, getPermissions]);

	const agencies = useMemo(() => {
		if (!data?.agencias?.length) return [];
		return data.agencias;
	}, [data]);

	useEffect(() => {
		if (agencies?.length) {
			setCurrentAgency(agencies[0]);
			setCurrentModule(agencies[0].modules[0]);
			setCurrentSubModules(agencies[0].modules[0].submodules);
			setSearchParams({
				agency: agencies[0].name,
				module: agencies[0].modules[0].id.toString(),
			});
		}
	}, [agencies, setSearchParams]);

	const currentModules = useMemo(() => {
		if (!currentAgency) return [];
		return currentAgency.modules;
	}, [currentAgency]);

	return {
		isLoading,
		agencies,
		currentAgency,
		setCurrentAgency,
		currentModules,
		currentModule,
		setCurrentModule,
		currentSubModules,
		setCurrentSubModules,
	};
};
