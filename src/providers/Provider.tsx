import { UIProvider } from '@ITSA-Nucleo/itsa-fe-components';
import React, { ReactNode } from 'react';
import { THEME } from '../constants';
interface ProviderProps {
	children: ReactNode;
}

export const AppProvider: React.FC<ProviderProps> = ({ children }) => {
	return (
		<>
			<UIProvider
				themeOptions={{
					palette: {
						primary: {
							main: THEME.primaryColor,
							contrastText: THEME.contrastText,
						},
					},
				}}
			>
				{children}
			</UIProvider>
		</>
	);
};

export default AppProvider;
