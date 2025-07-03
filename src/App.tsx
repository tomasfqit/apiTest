import { useEffect } from 'react';
import { useAuthStore } from './store/auth/auth.store';
import { AppRouter } from './router/AppRouter';
import { THEME } from './constants';
import { UIProvider } from '@ITSA-Nucleo/itsa-fe-components';

const App = () => {
	const { checkAuth } = useAuthStore();

	useEffect(() => {
		// Verificar autenticación al cargar la aplicación
		checkAuth();
	}, [checkAuth]);

	return <UIProvider
		themeOptions={{
			palette: {
				primary: {
					main: THEME.primaryColor,
					contrastText: THEME.contrastText,
				},

			},
		}}
	>
		<AppRouter />
	</UIProvider>
		;
};

export default App;