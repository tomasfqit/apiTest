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

export const newRoute = (
    Component: React.ComponentType,
    layout: 'auth' | 'main' | 'none' = 'main',
    isAuthenticated: boolean = true,
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


export const getRoutesConfig = (isAuth: boolean): RouteConfig[] => {
    const routes: RouteConfig[] = [];


    routes.push({
        path: ROUTES.LOGIN,
        layout: 'auth',
        requiresAuth: false,
        redirectIfAuth: ROUTES.DASHBOARD,
        element: newRoute(LoginUIController, 'auth', isAuth, ROUTES.DASHBOARD)
    });


    routes.push({
        path: ROUTES.DASHBOARD,
        element: newRoute(DashboardView, 'main', isAuth)
    });

    //security
    routes.push({ path: "/security/maintenance/modules", element: newRoute(ModulesUI, 'main', isAuth) });
    routes.push({ path: "/security/maintenance/programs", element: newRoute(ModulesUI, 'main', isAuth) });
    // end security


    routes.push({
        path: ROUTES.HOME,
        layout: 'none',
        element: React.createElement(Navigate, {
            to: isAuth ? ROUTES.DASHBOARD : ROUTES.LOGIN,
            replace: true
        })
    });


    routes.push({
        path: '/',
        layout: 'none',
        element: React.createElement(Navigate, {
            to: isAuth ? ROUTES.DASHBOARD : ROUTES.LOGIN,
            replace: true
        })
    });

    return routes;
};