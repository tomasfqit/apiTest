"use client";

import { AppLayout, clearURLParams, IActionPanelOption, IPermissionSubmodule, mapPermissionsToMenuFormat } from "@ITSA-Nucleo/itsa-fe-components";
import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { LOCAL_STORAGE_NAMES } from "@/constants";
import { useSettingsStore } from "@/store/settings.store";
import { useAuthStore } from "@/store/auth/auth.store";
import { getFormattedDataMenu } from "@/helpers";
import { useLayoutHeights } from "./MainLayoutUI.hook";
import { LayoutContext } from "@/hooks/useLayoutWidth";
import { useUserInformationStore } from "@/store/auth/user.store";


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

	const mainRef = useRef<HTMLElement>(null);
	const [componentWidth, setComponentWidth] = useState<number>(0);
	const [componentHeight, setComponentHeight] = useState<number>(0);
	const { fetchUserInformation, userInformation } = useUserInformationStore();

	const { containerStyle } = useLayoutHeights({
		headerHeight: 90,
		footerHeight: 69,
		additionalOffset: -5
	});

	useEffect(() => {
		const measureWidth = () => {
			if (mainRef.current) {
				const width = mainRef.current.offsetWidth;
				setComponentWidth(width);
				setComponentHeight(mainRef.current.offsetHeight);
			}
		}
		measureWidth();
		const resizeObserver = new ResizeObserver(measureWidth);
		if (mainRef.current) {
			resizeObserver.observe(mainRef.current);
		}
		return () => {
			resizeObserver.disconnect();
		};
		
	}, [fetchUserInformation]);

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
		const data = currentSubmodules as unknown as IPermissionSubmodule[];
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
		fetchUserInformation({});
	}, [getPermissions, permissions, isLoadingAuth, token, fetchUserInformation]);

	return (
		<LayoutContext.Provider value={{ componentWidth, componentHeight }}>
			<div className="layout-container">
				<AppLayout
					linkComponent={RouterLink}
					isLoading={isLoading || menuOptions?.length === 0}
					currentPath={location.pathname}
					avatar={{ name: userInformation?.name ?? '' }}
					headerTitles={{
						agency: `Agencia - ${currentAgency ?? ''}`,
						module: `Modulo - ${currentModule}`,
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
							title: `${userInformation?.name ?? ''}`,
							route: '',	
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
					options={menuOptions ?? []}
				>
					<main 
						ref={mainRef}
						className="min-w-[250px] max-w-[1446px] bg-gray-100 mt-0.5 flex-1"
						style={containerStyle}
					>
						{children}
					</main>
				</AppLayout>
			</div>
		</LayoutContext.Provider>
	);
};
