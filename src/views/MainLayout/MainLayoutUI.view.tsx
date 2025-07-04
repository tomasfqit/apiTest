"use client";

import { AppLayout, clearURLParams, IActionPanelOption, IPermissionSubmodule, mapPermissionsToMenuFormat } from "@ITSA-Nucleo/itsa-fe-components";
import { ReactNode, useCallback, useEffect, useMemo, useRef, useState, createContext, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { LOCAL_STORAGE_NAMES } from "@/constants";
import { useSettingsStore } from "@/store/settings.store";
import { useAuthStore } from "@/store/auth/auth.store";
import { getFormattedDataMenu } from "@/helpers";
import { useLayoutHeights } from "./MainLayoutUI.hook";

// Context para compartir el ancho del componente
interface LayoutContextType {
	componentWidth: number;
}

const LayoutContext = createContext<LayoutContextType>({ componentWidth: 0 });

// Hook personalizado para usar el ancho en componentes hijos
export const useLayoutWidth = () => {
	const context = useContext(LayoutContext);
	if (!context) {
		throw new Error('useLayoutWidth debe usarse dentro de MainLayoutUIView');
	}
	return context.componentWidth;
};

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

	// Ref para medir el ancho del componente
	const mainRef = useRef<HTMLElement>(null);
	const [componentWidth, setComponentWidth] = useState<number>(0);

	// Hook para gestionar alturas
	const { containerStyle } = useLayoutHeights({
		headerHeight: 90,
		footerHeight: 69,
		additionalOffset: -5
	});

	// Efecto para medir el ancho del componente
	useEffect(() => {
		const measureWidth = () => {
			if (mainRef.current) {
				const width = mainRef.current.offsetWidth;
				setComponentWidth(width);
				console.log('Ancho del componente:', width, 'px');
			}
		};

		// Medir inicialmente
		measureWidth();

		// Configurar ResizeObserver para cambios de tamaño
		const resizeObserver = new ResizeObserver(measureWidth);
		if (mainRef.current) {
			resizeObserver.observe(mainRef.current);
		}

		// Cleanup
		return () => {
			resizeObserver.disconnect();
		};
	}, []);

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
	}, [getPermissions, permissions, isLoadingAuth, token]);

	return (
		<LayoutContext.Provider value={{ componentWidth }}>
			<div className="layout-container">
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
							action: logout,
							confirm: {
								title: 'Cierre de Sesión',
								message: '¿Esta seguro que desea cerrar sesión?',
							},
						},
					]}
					options={menuOptions ?? []} // TODO update this in component library
				>
					<main 
						ref={mainRef}
						className="min-w-[250px] max-w-[1446px] bg-gray-100 mt-0.5 flex-1"
						style={containerStyle}
					>
						{/* Opcional: mostrar el ancho actual */}
						{/* <div className="text-xs text-gray-500 p-2">Ancho actual: {componentWidth}px</div> */}
						{children}
					</main>
				</AppLayout>
			</div>
		</LayoutContext.Provider>
	);
};

// EJEMPLO DE USO EN COMPONENTES HIJOS:
// 
// Opción 1: Usando el hook personalizado
// import { useLayoutWidth } from './MainLayoutUI.view';
// 
// const MiComponenteHijo = () => {
// 	const layoutWidth = useLayoutWidth();
// 	
// 	return (
// 		<div>
// 			<p>El ancho del layout es: {layoutWidth}px</p>
// 			{layoutWidth < 768 && <p>Vista móvil</p>}
// 			{layoutWidth >= 768 && <p>Vista desktop</p>}
// 		</div>
// 	);
// };
// 
// Opción 2: Usando el hook con lógica condicional
// const ComponenteResponsive = () => {
// 	const layoutWidth = useLayoutWidth();
// 	
// 	const isMobile = layoutWidth < 768;
// 	const isTablet = layoutWidth >= 768 && layoutWidth < 1024;
// 	const isDesktop = layoutWidth >= 1024;
// 	
// 	return (
// 		<div className={`${isMobile ? 'p-2' : isTablet ? 'p-4' : 'p-6'}`}>
// 			{isMobile && <div>Contenido móvil</div>}
// 			{isTablet && <div>Contenido tablet</div>}
// 			{isDesktop && <div>Contenido desktop</div>}
// 		</div>
// 	);
// };
// 
// Opción 3: Usando el hook para cálculos dinámicos
// const ComponenteConCalculos = () => {
// 	const layoutWidth = useLayoutWidth();
// 	
// 	// Calcular columnas basadas en el ancho
// 	const columns = Math.floor(layoutWidth / 300);
// 	
// 	return (
// 		<div style={{ 
// 			display: 'grid', 
// 			gridTemplateColumns: `repeat(${columns}, 1fr)`,
// 			gap: '1rem' 
// 		}}>
// 			{/* Contenido de la grilla */}
// 		</div>
// 	);
// };

