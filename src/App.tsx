import { useEffect } from 'react';
import { useAuthStore } from './store/auth/auth.store';
import { AppRouter } from './router/AppRouter';

const App = () => {
	const { checkAuth } = useAuthStore();

	useEffect(() => {
		// Verificar autenticación al cargar la aplicación
		checkAuth();
	}, [checkAuth]);

	return <AppRouter />;
};

export default App;