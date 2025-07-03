import { ReactNode } from 'react';

interface AuthLayoutProps {
	children: ReactNode;
}

export const AuthLayoutUI = ({ children }: AuthLayoutProps) => {
	return (
		<div className="min-h-screen bg-gray-50">
			<main>
				{children}
			</main>
		</div>
	);
};
