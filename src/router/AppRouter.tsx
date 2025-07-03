import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ROUTES } from './Paths';
import { ErrorPage } from '@ITSA-Nucleo/itsa-fe-components';
import { fetchAccessToken } from '@/api/config';
import LoadingSpinner from '@/components/LoadingSpinner';
import { getRoutesConfig } from './RouterComponents';

export const AppRouter = () => {
	const [authChecked, setAuthChecked] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const checkAuth = async () => {
			const token = await fetchAccessToken();
			setIsAuthenticated(!!token);
			setAuthChecked(true);
		};
		checkAuth();
	}, []);

	if (!authChecked) {
		return <LoadingSpinner isOpen title="Verificando autenticación..." />;
	}

	// Obtener la configuración de rutas basada en el estado de autenticación
	const routesConfig = getRoutesConfig(isAuthenticated);

	return (
		<Routes>
			{/* Renderizar rutas dinámicamente desde la configuración */}
			{routesConfig.map((route) => (
				<Route
					key={route.path}
					path={route.path}
					element={route.element}
				/>
			))}
			
			{/* Ruta de error 404 */}
			<Route
				path={ROUTES.NOT_FOUND}
				element={
					<ErrorPage
						error="404"
						handleClick={() => navigate(ROUTES.DASHBOARD)}
						message="Página no encontrada"
					/>
				}
			/>
		</Routes>
	);
};

