import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth/auth.store';
import { ROUTES } from './RoutesPath';
import { AuthLayoutUI } from '../views/AuhLayout/AuthLayoutUI.view';
import { MainLayoutUI } from '../views/MainLayout/MainLayoutUI.view';
import { DashboardView } from '../views/MainLayout/Dashboard.view';
import { ProfileView } from '../views/MainLayout/Profile.view';
import { ProtectedRoute } from '../components/ProtectedRoute';
import LoginUIController from '@/views/AuhLayout/components/LoginUI.controller';
export const AppRouter = () => {
	const { checkAuth, isAuthenticated } = useAuthStore();

	useEffect(() => {
		// Verificar autenticación al cargar la aplicación
		checkAuth();
	}, [checkAuth]);

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

			<Route
				path={ROUTES.PROFILE}
				element={
					<ProtectedRoute>
						<MainLayoutUI>
							<ProfileView />
						</MainLayoutUI>
					</ProtectedRoute>
				}
			/>

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

			{/* Ruta 404 */}
			<Route
				path={ROUTES.NOT_FOUND}
				element={
					<div className="min-h-screen flex items-center justify-center bg-gray-50">
						<div className="text-center">
							<h1 className="text-6xl font-bold text-gray-900">404</h1>
							<p className="text-xl text-gray-600 mt-4">Página no encontrada</p>
							<button
								onClick={() => window.history.back()}
								className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
							>
								Volver
							</button>
						</div>
					</div>
				}
			/>
		</Routes>
	);
};
