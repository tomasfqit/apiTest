import { ReactNode, useEffect } from 'react';

interface ProtectedRouteProps {
	children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {

	useEffect(() => {
		console.log('ProtectedRoute');
	}, []);
	
	return <>{children}</>;
}; 