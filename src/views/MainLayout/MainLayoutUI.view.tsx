"use client";

import { AppLayout, clearURLParams, IActionPanelOption, IPermissionSubmodule, mapPermissionsToMenuFormat } from "@ITSA-Nucleo/itsa-fe-components";
import { ReactNode, useCallback, useEffect, useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";
import { LOCAL_STORAGE_NAMES } from "@/constants";
import { useSettingsStore } from "@/store/settings.store";
import { useAuthStore } from "@/store/auth/auth.store";
import { getFormattedDataMenu } from "@/helpers";

interface MainLayoutProps {
	children: ReactNode;
}

export const MainLayoutUIView = ({ children }: MainLayoutProps) => {
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
	const { logout, token, isLoading: isLoadingAuth } = useAuthStore.getState();

	const handleAgency = useCallback((agencyId: number, agencyName: string) => {
		setCurrentAgency(agencyName);
		const agenciesModuleMatch = permissions?.agencies.find(item => item.id === agencyId);
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
		return getFormattedDataMenu(permissions?.agencies ?? [], handleAgency);
	}, [handleAgency, permissions]);

	const actionPanelModules: IActionPanelOption[] = useMemo(() => {
		return getFormattedDataMenu(modules, handleModule);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [modules]);

	const menuOptions = useMemo(() => {
		const data: IPermissionSubmodule[] = currentSubmodules.map(item => ({
			id: item.id,
			name: item.name,
			icon: item.icon ?? '',
			programs: item.programs.map(program => ({
				id: program.id,
				name: program.name,
				icon: program.icon ?? '',
				path: program.path ?? '',
				actions: {
					update: program.actions.actualizar,
					delete: program.actions.eliminar,
					create: program.actions.escribir,
					read: program.actions.leer,
					all_actions: program.actions.todas_acciones,
				},
			})),
			path: item.path ?? '',
		}));
		const res = mapPermissionsToMenuFormat(data);
		return res;
	}, [currentSubmodules]);

	useEffect(() => {
		if (token && !permissions && !isLoadingAuth) {
			const getPermissionsUser = async () => {
				await getPermissions();
			}
			getPermissionsUser();
			clearURLParams();
		}
	}, [getPermissions, permissions, isLoadingAuth, token]);


console.log('actionPanelModules =>',actionPanelModules);

	return <div className="w-[100vw] h-[100vh]">
		<AppLayout
			linkComponent={RouterLink}
			isLoading={isLoading || menuOptions?.length === 0}
			currentPath={location.pathname}
			avatar={{ name: 'Jan Acuna' }}
			headerTitles={{
				agency: `Agencia - ${currentAgency ?? ''}`,
				module: `Linea - ${currentModule}`,
			}}
			notifications={[
				{
					title: <p>Go to this notification</p>,
					action: () => console.log('GO!'),
				},
			]}
			lines={[...actionPanelModules]}
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
					action: logout,
					confirm: {
						title: 'Cierre de Sesión',
						message: '¿Esta seguro que desea cerrar sesión?',
					},
				},
			]}
			options={menuOptions ?? []} // TODO update this in component library
		>
			<div
				className="min-w-[250px] max-w-[1446px] h-[calc(100vh-69px)] bg-gray-500" hidden={isLoading}>
				<main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
					{children}
				</main>
			</div>
		</AppLayout>
	</div>;
};

