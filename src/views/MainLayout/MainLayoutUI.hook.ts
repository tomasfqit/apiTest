import { IActionPanelOption } from '@ITSA-Nucleo/itsa-fe-components';
import { useCallback, useEffect, useState } from 'react';
import { IAgencyModules, IModules } from '../../interfaces/IMenuItems';
import { useGetPermissions } from '../../store/auth/useGetPermissions';

export interface IMainLayoutUI {
	agencies: IActionPanelOption[];
	currentAgency?: IAgencyModules;
	currentModules: IActionPanelOption[];
}

export const useMainLayoutHook = (): IMainLayoutUI => {
	const { getPermissions } = useGetPermissions();
	const [agencies, setAgencies] = useState<IActionPanelOption[]>([]);
	const [currentAgency, setCurrentAgency] = useState<IAgencyModules>();
	const [currentModules, setCurrentModules] = useState<IActionPanelOption[]>([]);

	const getAgencies = useCallback((agencies: IAgencyModules[]) => {
		return agencies.map(agency => {
			return {
				title: agency.nombre || '',
				action: () => {},
			};
		});
	}, []);

	const getModules = useCallback((modules: IModules[]) => {
		return modules.map(module => {
			return {
				title: module.nombre || '',
				action: () => {},
			};
		});
	}, []);

	useEffect(() => {
		getPermissions({
			onSuccess: data => {
				setAgencies(getAgencies(data.agencias));
				if (data.agencias.length > 0) {
					setCurrentAgency(data.agencias[0]);
					setCurrentModules(getModules(data.agencias[0].modules));
				}
			},
			onError: error => {
				console.log(error);
			},
		});
	}, [getAgencies, getModules, getPermissions]);

	return { agencies, currentAgency, currentModules };
};
