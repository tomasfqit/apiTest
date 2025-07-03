import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES } from './Paths';
import { AuthLayoutUI } from '../views/AuhLayout/AuthLayoutUI.view';
import LoginUIController from '@/views/AuhLayout/components/LoginUI.controller';
import MainLayoutUI from '@/views/MainLayout/MainLayoutUI.Controller';
import { DashboardView } from '@/views/MainLayout/Dashboard.view';
import ModulesUI from '@/views/security/modules/ModulesUI.controller';

export interface RouteConfig {
	path: string;
	element: ReactNode;
	requiresAuth?: boolean;
	redirectIfAuth?: string;
	layout?: 'auth' | 'main' | 'none';
}

//
export const createRouteElement = (
	Component: React.ComponentType,
	layout: 'auth' | 'main' | 'none' = 'none',
	isAuthenticated: boolean,
	redirectPath?: string
): ReactNode => {
	
	if (redirectPath && isAuthenticated) {
		return React.createElement(Navigate, { to: redirectPath, replace: true });
	}

	
	const baseElement = React.createElement(Component);

	
	switch (layout) {
		case 'auth':
			return React.createElement(AuthLayoutUI, null, baseElement);
		case 'main':
			return isAuthenticated 
				? React.createElement(MainLayoutUI, null, baseElement)
				: React.createElement(Navigate, { to: ROUTES.LOGIN, replace: true });
		case 'none':
		default:
			return baseElement;
	}
};


export const getRoutesConfig = (isAuthenticated: boolean): RouteConfig[] => {
	const routes: RouteConfig[] = [];

	
	routes.push({
		path: ROUTES.LOGIN,
		layout: 'auth',
		redirectIfAuth: ROUTES.DASHBOARD,
		element: createRouteElement(LoginUIController, 'auth', isAuthenticated, ROUTES.DASHBOARD)
	});

	
	routes.push({
		path: ROUTES.DASHBOARD,
		layout: 'main',
		requiresAuth: true,
		element: createRouteElement(DashboardView, 'main', isAuthenticated)
	});

	//security
	routes.push({
		path: ROUTES.SECURITY_MAINTENANCE_MODULES,
		layout: 'main',
		requiresAuth: true,
        element: createRouteElement(ModulesUI, 'main', isAuthenticated)
	});
    // end security

	
	routes.push({
		path: ROUTES.HOME,
		layout: 'none',
		element: React.createElement(Navigate, { 
			to: isAuthenticated ? ROUTES.DASHBOARD : ROUTES.LOGIN, 
			replace: true 
		})
	});

	
	routes.push({
		path: '/',
		layout: 'none',
		element: React.createElement(Navigate, { 
			to: isAuthenticated ? ROUTES.DASHBOARD : ROUTES.LOGIN, 
			replace: true 
		})
	});

	return routes;
};

// Funciones helper para casos específicos (mantener compatibilidad)
export const createProtectedRoute = (
	Component: React.ComponentType,
	isAuthenticated: boolean
): ReactNode => {
	return createRouteElement(Component, 'main', isAuthenticated);
};

export const createAuthRoute = (
	Component: React.ComponentType,
	isAuthenticated: boolean
): ReactNode => {
	return createRouteElement(Component, 'auth', isAuthenticated, ROUTES.DASHBOARD);
}; 