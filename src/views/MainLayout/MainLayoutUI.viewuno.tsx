import { ReactNode, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/auth/auth.store';
import { ROUTES } from '../../router/Paths';
import LoadingSpinner from '../../components/LoadingSpinner';

interface MainLayoutProps {
	children: ReactNode;
}

export const MainLayoutUIUno = ({ children }: MainLayoutProps) => {
	const navigate = useNavigate();
	const location = useLocation();
	const { user, logout, isLoading } = useAuthStore();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const handleLogout = async () => {
		await logout();
		navigate(ROUTES.LOGIN);
	};

	const navigation = [
		{ name: 'Dashboard', href: ROUTES.DASHBOARD, current: location.pathname === ROUTES.DASHBOARD },
		{ name: 'Perfil', href: ROUTES.PROFILE, current: location.pathname === ROUTES.PROFILE },
	];

	return (
		<div className="min-h-screen bg-gray-100">
			{/* Header */}
			<header className="bg-white shadow-sm">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center py-6">
						<div className="flex items-center">
							<h1 className="text-xl font-semibold text-gray-900">
								ERP Sistema
							</h1>
						</div>

						{/* Navegación desktop */}
						<nav className="hidden md:flex space-x-8">
							{navigation.map((item) => (
								<Link
									key={item.name}
									to={item.href}
									className={`text-sm font-medium ${
										item.current
											? 'text-indigo-600 border-b-2 border-indigo-600'
											: 'text-gray-500 hover:text-gray-700'
									}`}
								>
									{item.name}
								</Link>
							))}
						</nav>

						{/* User menu */}
						<div className="flex items-center space-x-4">
							<div className="hidden md:block">
								<div className="text-sm text-gray-700">
									Bienvenido, <span className="font-medium">{user?.name || 'Usuario'}</span>
								</div>
							</div>

							{/* Logout button */}
							<button
								onClick={handleLogout}
								disabled={isLoading}
								className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
							>
								{isLoading ? (
									<LoadingSpinner isOpen={isLoading} title="Cargando..." />
								) : (
									<svg className="-ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
									</svg>
								)}
								{isLoading ? 'Cerrando...' : 'Cerrar Sesión'}
							</button>

							{/* Mobile menu button */}
							<div className="md:hidden">
								<button
									onClick={() => setIsMenuOpen(!isMenuOpen)}
									className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
								>
									<span className="sr-only">Abrir menú principal</span>
									{isMenuOpen ? (
										<svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
										</svg>
									) : (
										<svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
										</svg>
									)}
								</button>
							</div>
						</div>
					</div>

					{/* Mobile menu */}
					{isMenuOpen && (
						<div className="md:hidden">
							<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
								{navigation.map((item) => (
									<Link
										key={item.name}
										to={item.href}
										className={`block px-3 py-2 rounded-md text-base font-medium ${
											item.current
												? 'text-indigo-600 bg-indigo-50'
												: 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
										}`}
									>
										{item.name}
									</Link>
								))}
							</div>
							<div className="pt-4 pb-3 border-t border-gray-200">
								<div className="px-4">
									<div className="text-base font-medium text-gray-800">
										{user?.name || 'Usuario'}
									</div>
									<div className="text-sm font-medium text-gray-500">
										{user?.email}
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</header>

			{/* Main content */}
			<main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
				{children}
			</main>
		</div>
	);
};
