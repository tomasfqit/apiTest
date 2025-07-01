import { Modal } from '@ITSA-Nucleo/itsa-fe-components';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'sonner';
import App from './App.tsx';
import AppProvider from './providers/Provider.tsx';
import './styles.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<AppProvider>
			<App />
			<Modal />
			<Toaster
				position="top-right"
				className='hover:cursor-pointer'
				toastOptions={{
					style: {
						zIndex: 9999,
					},
				}}
				richColors
				closeButton
			/>
		</AppProvider>
	</StrictMode>
);
