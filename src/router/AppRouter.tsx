import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth/auth.store';
import { ROUTES } from './RoutesPath';
import { AuthLayoutUI } from '../views/AuhLayout/AuthLayoutUI.view';
import LoginUIController from '@/views/AuhLayout/components/LoginUI.controller';
import MainLayoutUI from '@/views/MainLayout/MainLayoutUI.Controller';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { DashboardView } from '@/views/MainLayout/Dashboard.view';
import { ErrorPage } from '@ITSA-Nucleo/itsa-fe-components';
export const AppRouter = () => {
	
	const { token, checkAuth, isAuthenticated } = useAuthStore();

	useEffect(() => {
		if(token)return;
		// Verificar autenticación al cargar la aplicación
		const checkAuthUser = async () => {
			await checkAuth();
		}
		checkAuthUser();
	}, [checkAuth, token]);
// console.log('isLoading =>',isLoading);
// 	if (isLoading) {
// 		return <LoadingSpinner isOpen={true} title="Verificando autenticación..." />;
// 	}else{
		return (
			<Routes>
				{/* Rutas públicas (AuthLayout) */}
				<Route
					path={ROUTES.LOGIN}
					element={
						isAuthenticated ? (
							<Navigate to={ROUTES.DASHBOARD} replace />
						) : (
							<AuthLayoutUI>
								<LoginUIController />
							</AuthLayoutUI>
						)
					}
				/>

				{/* Rutas protegidas (MainLayout) */}
				<Route
					path={ROUTES.DASHBOARD}
					element={
						<ProtectedRoute>
							<MainLayoutUI>
								<DashboardView />
							</MainLayoutUI>
						</ProtectedRoute>
					}
				/>
				{/*

			<Route
				path={ROUTES.PROFILE}
				element={
					<ProtectedRoute>
						<MainLayoutUI>
							<ProfileView />
						</MainLayoutUI>
					</ProtectedRoute>
				}
			/> */}

				{/* Ruta por defecto */}
				<Route
					path={ROUTES.HOME}
					element={
						isAuthenticated ? (
							<Navigate to={ROUTES.DASHBOARD} replace />
						) : (
							<Navigate to={ROUTES.LOGIN} replace />
						)
					}
				/>

				<Route
					path={"/"}
					element={
						isAuthenticated ? (
							<Navigate to={ROUTES.DASHBOARD} replace />
						) : (
							<Navigate to={ROUTES.LOGIN} replace />
						)
					}
				/>

				{/* Ruta 404 */}
				<Route
					path={ROUTES.NOT_FOUND}
					element={
						<ErrorPage error={"Pagina no encontrada"} message="Página no encontrada" handleClick={() => console.log('click')} />
					}
				/>
			</Routes>
		);
	// }


	
};
