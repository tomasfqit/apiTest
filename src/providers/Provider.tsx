import React, { ReactNode } from 'react';
interface ProviderProps {
	children: ReactNode;
}

export const AppProvider: React.FC<ProviderProps> = ({ children }) => {
	return (
		<>{children}</>
	);
};

export default AppProvider;
