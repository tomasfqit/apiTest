"use client";

import { AppLayout, IActionPanelOption, IAppLayoutMenu } from "@ITSA-Nucleo/itsa-fe-components";
import { useCallback, useEffect, useMemo } from "react";
import { Outlet } from "react-router-dom";
import { LOCAL_STORAGE_NAMES } from "../../constants";
import { getFormattedDataMenu, getIcon } from "../../helpers";
import { useSettingsStore } from "../../store/settings.store";

// interface IMainLayoutUIView {
// 	isLoading: boolean;
// 	agencies: IActionPanelOption[];
// 	currentAgency: IAgencyModules | null;
// 	lines: IActionPanelOption[];
// 	currentModule: IModules | null;
// 	options: IAppLayoutMenu[]
// }


export const MainLayoutUIView = () => {
	//const { getToken } = useValidateToken();

	const {
		currentAgency,
		currentModule,
		permissions,
		isLoading,
		modules,
		currentSubmodules,
		setCurrentAgency,
		setCurrentModule,
		setCurrentSubmodules,
		setModules,
		getPermissions,
	} = useSettingsStore(state => state);

	const handleAgency = useCallback((agencyId: number, agencyName: string) => {
		setCurrentAgency(agencyName);
		const agenciesModuleMatch = permissions?.agencias.find(item => item.id === agencyId);
		const res = agenciesModuleMatch?.modules;
		setModules(res ?? []);
		setCurrentModule(agenciesModuleMatch?.modules[0] ? agenciesModuleMatch.modules[0].name : '');
		localStorage.setItem(LOCAL_STORAGE_NAMES.agency, agencyId.toString());
		if (agenciesModuleMatch?.modules[0]) {
			localStorage.setItem(LOCAL_STORAGE_NAMES.line, agenciesModuleMatch?.modules[0].id.toString());
		}
	}, [permissions, setCurrentAgency, setCurrentModule, setModules]);

	const handleModule = (moduleId: number, moduleName: string) => {
		setCurrentModule(moduleName);
		const modulesSubmoduleMatch = modules?.find(item => item.id === moduleId);
		setCurrentSubmodules([]);
		setCurrentSubmodules(modulesSubmoduleMatch?.submodules ?? []);
		localStorage.setItem(LOCAL_STORAGE_NAMES.line, moduleId.toString());
	};

	const actionPanelAgencies: IActionPanelOption[] = useMemo(() => {
		return getFormattedDataMenu(permissions?.agencias ?? [], handleAgency);
	}, [handleAgency, permissions]);

	const actionPanelModules: IActionPanelOption[] = useMemo(() => {
		return getFormattedDataMenu(modules, handleModule);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [modules]);

	const menuOptions = useMemo(() => {
		if (currentSubmodules) {
			// const menuOptionsMapped = mapPermissionsToMenuFormat(currentSubmodules, MENU_CUSTOM_MAPPING);
			const res: IAppLayoutMenu[] = currentSubmodules.map(item => ({
				icon: getIcon(item.icon),
				title: item.name,
				route: '',
				subList: item.programs.map(program => ({
					icon: getIcon(program.icon),
					title: program.name,
					route: program.path,
					// action: () => console.log('GO!'),
				})),
			}));
			return res; // TODO: use this if BE doesnt return the proper options
			// return menuOptionsMapped;
		}
	}, [currentSubmodules]);

	useEffect(() => {
		const getToken = localStorage.getItem('token');
		if (getToken) {
			getPermissions();

			//clearURLParams();
		}
	}, [getPermissions]);


	return <div className="h-[100vh] w-[100vw]">
		<AppLayout
			isLoading={isLoading || menuOptions?.length === 0}
			currentPath={location.pathname}
			avatar={{ name: 'Jan Acuna' }}
			headerTitles={{
				agency: `Agencia - ${currentAgency}`,
				module: `Linea - ${currentModule}`,
			}}
			notifications={[
				{
					title: <p>Go to this notification</p>,
					action: () => console.log('GO!'),
				},
			]}
			lines={actionPanelModules}
			agencies={actionPanelAgencies}
			settings={[
				{
					title: 'Cuenta',
					route: '/account',
				},
				{
					title: 'Configuraciones',
					route: '/settings',
				},
				{
					title: 'Cerrar Sesión',
					action: () => { },
					confirm: {
						title: 'Cierre de Sesión',
						message: '¿Esta seguro que desea cerrar sesión?',
					},
				},
			]}
			options={menuOptions ?? []} // TODO update this in component library
		>
			<Outlet />
		</AppLayout>
	</div>;
};

