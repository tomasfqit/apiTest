import { ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/auth/auth.store';
import { ROUTES } from '../router/Paths';
import LoadingSpinner from './LoadingSpinner';

interface ProtectedRouteProps {
	children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const { isAuthenticated, checkAuth, isLoading } = useAuthStore();
	const location = useLocation();

	useEffect(() => {
		// Verificar autenticación al montar el componente
		checkAuth();
	}, [checkAuth]);

	if(isLoading){
		return <LoadingSpinner isOpen={isLoading} title="Cargando..." />
	}

	// Si no está autenticado, redirigir al login
	if (!isAuthenticated) {
		return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
	}

	// Si está autenticado, mostrar el contenido
	return <>{children}</>;
}; 