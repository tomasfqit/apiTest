import { AppRouter } from './router/AppRouter';
import { THEME } from './constants';
import { Modal, UIProvider } from '@ITSA-Nucleo/itsa-fe-components';
import { Toaster } from 'sonner';

const App = () => {

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
		<Toaster />
		<Modal />
	</UIProvider>
		
};

export default App;