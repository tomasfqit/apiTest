import '@ITSA-Nucleo/itsa-fe-components/styles.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.tsx';

import './styles.css';
import { Toaster } from 'sonner';
import { Modal } from '@ITSA-Nucleo/itsa-fe-components';

createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<App />
		<Toaster />
		<Modal />
	</BrowserRouter>,
);
