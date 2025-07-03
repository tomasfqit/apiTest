import { useAuthStore } from '@/store/auth/auth.store';

export const DashboardView = () => {
	const { user } = useAuthStore();

	return (
		<div className="px-4 sm:px-6 lg:px-8">
			<div className="sm:flex sm:items-center">
				<div className="sm:flex-auto">
					<h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
					<p className="mt-2 text-sm text-gray-700">
						Bienvenido al panel de control del sistema ERP.
					</p>
				</div>
			</div>

			{/* Stats Cards */}
			<div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
				<div className="bg-white overflow-hidden shadow rounded-lg">
					<div className="p-5">
						<div className="flex items-center">
							<div className="flex-shrink-0">
								<svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
								</svg>
							</div>
							<div className="ml-5 w-0 flex-1">
								<dl>
									<dt className="text-sm font-medium text-gray-500 truncate">
										Usuarios Activos
									</dt>
									<dd className="text-lg font-medium text-gray-900">1,234</dd>
								</dl>
							</div>
						</div>
					</div>
				</div>

				<div className="bg-white overflow-hidden shadow rounded-lg">
					<div className="p-5">
						<div className="flex items-center">
							<div className="flex-shrink-0">
								<svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
								</svg>
							</div>
							<div className="ml-5 w-0 flex-1">
								<dl>
									<dt className="text-sm font-medium text-gray-500 truncate">
										Ventas del Mes
									</dt>
									<dd className="text-lg font-medium text-gray-900">$45,678</dd>
								</dl>
							</div>
						</div>
					</div>
				</div>

				<div className="bg-white overflow-hidden shadow rounded-lg">
					<div className="p-5">
						<div className="flex items-center">
							<div className="flex-shrink-0">
								<svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
								</svg>
							</div>
							<div className="ml-5 w-0 flex-1">
								<dl>
									<dt className="text-sm font-medium text-gray-500 truncate">
										Productos
									</dt>
									<dd className="text-lg font-medium text-gray-900">567</dd>
								</dl>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Welcome Message */}
			<div className="mt-8 bg-white shadow rounded-lg">
				<div className="px-4 py-5 sm:p-6">
					<h3 className="text-lg leading-6 font-medium text-gray-900">
						Bienvenido, {user?.name || 'Usuario'}
					</h3>
					<div className="mt-2 max-w-xl text-sm text-gray-500">
						<p>
							Has iniciado sesión exitosamente en el sistema ERP. 
							Desde aquí puedes gestionar todos los aspectos de tu empresa.
						</p>
					</div>
					<div className="mt-5">
						<div className="rounded-md bg-blue-50 p-4">
							<div className="flex">
								<div className="flex-shrink-0">
									<svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
										<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
									</svg>
								</div>
								<div className="ml-3">
									<h3 className="text-sm font-medium text-blue-800">
										Información del Sistema
									</h3>
									<div className="mt-2 text-sm text-blue-700">
										<p>
											Este es un sistema ERP completo que te permite gestionar usuarios, 
											ventas, inventario y más. Utiliza la navegación superior para 
											acceder a las diferentes secciones.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}; 