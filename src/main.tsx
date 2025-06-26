import '@ITSA-Nucleo/itsa-fe-components/styles.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import AppProvider from './providers/Provider.tsx';
import './styles.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<AppProvider>
			<App />
		</AppProvider>
	</StrictMode>
);
