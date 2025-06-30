import { IActionPanelOption } from '@ITSA-Nucleo/itsa-fe-components';
import { useCallback, useEffect, useState } from 'react';
import { IAgencyModules, IModules } from '../../interfaces/IMenuItems';
import { useGetPermissions } from '../../store/auth/useGetPermissions';

export interface IMainLayoutUI {
	agencies: IActionPanelOption[];
	currentAgency?: IAgencyModules;
	currentModules: IActionPanelOption[];
	currentModule: IActionPanelOption | null;
	isLoading: boolean;
}

export const useMainLayoutHook = (): IMainLayoutUI => {
	const { getPermissions, isLoading } = useGetPermissions();
	// const { validateNavigate } = useValidateNavigate();
	const [agencies, setAgencies] = useState<IActionPanelOption[]>([]);
	const [currentAgency, setCurrentAgency] = useState<IAgencyModules>();
	const [currentModules, setCurrentModules] = useState<IActionPanelOption[]>([]);
	const [currentModule, setCurrentModule] = useState<IActionPanelOption | null>(null);

	const getAgencies = useCallback((agencies: IAgencyModules[]) => {
		return agencies.map(agency => {
			return {
				title: agency.name || '',
				action: () => {},
			};
		});
	}, []);

	const getModules = useCallback((modules: IModules[]) => {
		return modules.map(module => {
			return {
				title: module.name || '',
				action: () => {},
			};
		});
	}, []);

	const getCurrentModule = useCallback((modules: IModules[]): IActionPanelOption | null => {
		if (modules.length > 0) {
			return {
				title: modules[0].name || '',
				action: () => {},
			};
		} else {
			return null;
		}
	}, []);

	useEffect(() => {
		getPermissions({
			onSuccess: data => {
				if (data.agencias.length > 0) {
					setAgencies(getAgencies(data.agencias));
					setCurrentAgency(data.agencias[0]);
					setCurrentModules(
						data.agencias[0].modules.map(module => ({
							title: module.name || '',
							action: () => {},
						})),
					);
					setCurrentModule(getCurrentModule(data.agencias[0].modules));
				} else {
					setAgencies([]);
				}
			},
			onError: error => {
				console.log(error);
			},
		});
	}, [getAgencies, getCurrentModule, getModules, getPermissions]);

	return { agencies, currentAgency, currentModules, currentModule, isLoading };
};
