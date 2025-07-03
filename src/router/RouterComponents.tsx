import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES } from './Paths';
import { AuthLayoutUI } from '../views/AuhLayout/AuthLayoutUI.view';
import LoginUIController from '@/views/AuhLayout/components/LoginUI.controller';
import MainLayoutUI from '@/views/MainLayout/MainLayoutUI.Controller';
import { DashboardView } from '@/views/MainLayout/Dashboard.view';
import { ProfileView } from '@/views/MainLayout/Profile.view';

export interface RouteConfig {
	path: string;
	element: ReactNode;
	requiresAuth?: boolean;
	redirectIfAuth?: string;
	layout?: 'auth' | 'main' | 'none';
}

// Switch para manejar diferentes tipos de rutas
export const createRouteElement = (
	Component: React.ComponentType,
	layout: 'auth' | 'main' | 'none' = 'none',
	isAuthenticated: boolean,
	redirectPath?: string
): ReactNode => {
	// Si hay redirección y está autenticado
	if (redirectPath && isAuthenticated) {
		return React.createElement(Navigate, { to: redirectPath, replace: true });
	}

	// Crear el elemento base
	const baseElement = React.createElement(Component);

	// Aplicar layout según el tipo
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

// Función principal para obtener la configuración de rutas
export const getRoutesConfig = (isAuthenticated: boolean): RouteConfig[] => {
	const routes: RouteConfig[] = [];

	// Ruta de login
	routes.push({
		path: ROUTES.LOGIN,
		layout: 'auth',
		redirectIfAuth: ROUTES.DASHBOARD,
		element: createRouteElement(LoginUIController, 'auth', isAuthenticated, ROUTES.DASHBOARD)
	});

	// Ruta de dashboard
	routes.push({
		path: ROUTES.DASHBOARD,
		layout: 'main',
		requiresAuth: true,
		element: createRouteElement(DashboardView, 'main', isAuthenticated)
	});

	// Ruta de profile
	routes.push({
		path: ROUTES.PROFILE,
		layout: 'main',
		requiresAuth: true,
		element: createRouteElement(ProfileView, 'main', isAuthenticated)
	});

	// Ruta de home (redirección)
	routes.push({
		path: ROUTES.HOME,
		layout: 'none',
		element: React.createElement(Navigate, { 
			to: isAuthenticated ? ROUTES.DASHBOARD : ROUTES.LOGIN, 
			replace: true 
		})
	});

	// Ruta raíz (redirección)
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