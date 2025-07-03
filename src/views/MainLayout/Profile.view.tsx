import { useAuthStore } from '@/store/auth/auth.store';

export const ProfileView = () => {
	const { user } = useAuthStore();

	return (
		<div className="px-4 sm:px-6 lg:px-8">
			<div className="sm:flex sm:items-center">
				<div className="sm:flex-auto">
					<h1 className="text-2xl font-semibold text-gray-900">Perfil de Usuario</h1>
					<p className="mt-2 text-sm text-gray-700">
						Información de tu cuenta y configuración personal.
					</p>
				</div>
			</div>

			<div className="mt-8 max-w-3xl mx-auto">
				<div className="bg-white shadow overflow-hidden sm:rounded-lg">
					<div className="px-4 py-5 sm:px-6">
						<h3 className="text-lg leading-6 font-medium text-gray-900">
							Información Personal
						</h3>
						<p className="mt-1 max-w-2xl text-sm text-gray-500">
							Detalles de tu cuenta de usuario.
						</p>
					</div>
					<div className="border-t border-gray-200">
						<dl>
							<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="text-sm font-medium text-gray-500">Nombre completo</dt>
								<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
									{user?.name || 'No disponible'}
								</dd>
							</div>
							<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="text-sm font-medium text-gray-500">Email</dt>
								<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
									{user?.email || 'No disponible'}
								</dd>
							</div>
							<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="text-sm font-medium text-gray-500">ID de Usuario</dt>
								<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
									{user?.id || 'No disponible'}
								</dd>
							</div>
							<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="text-sm font-medium text-gray-500">Estado de la cuenta</dt>
								<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
									<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
										Activa
									</span>
								</dd>
							</div>
						</dl>
					</div>
				</div>

				{/* Configuración de seguridad */}
				<div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
					<div className="px-4 py-5 sm:px-6">
						<h3 className="text-lg leading-6 font-medium text-gray-900">
							Configuración de Seguridad
						</h3>
						<p className="mt-1 max-w-2xl text-sm text-gray-500">
							Opciones de seguridad y privacidad de tu cuenta.
						</p>
					</div>
					<div className="border-t border-gray-200">
						<div className="px-4 py-5 sm:p-6">
							<div className="space-y-6">
								<div className="flex items-center justify-between">
									<div>
										<h4 className="text-sm font-medium text-gray-900">
											Autenticación de dos factores
										</h4>
										<p className="text-sm text-gray-500">
											Añade una capa extra de seguridad a tu cuenta.
										</p>
									</div>
									<button
										type="button"
										className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
									>
										Configurar
									</button>
								</div>

								<div className="flex items-center justify-between">
									<div>
										<h4 className="text-sm font-medium text-gray-900">
											Cambiar contraseña
										</h4>
										<p className="text-sm text-gray-500">
											Actualiza tu contraseña regularmente.
										</p>
									</div>
									<button
										type="button"
										className="bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
									>
										Cambiar
									</button>
								</div>

								<div className="flex items-center justify-between">
									<div>
										<h4 className="text-sm font-medium text-gray-900">
											Sesiones activas
										</h4>
										<p className="text-sm text-gray-500">
											Revisa y gestiona tus sesiones activas.
										</p>
									</div>
									<button
										type="button"
										className="bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
									>
										Ver sesiones
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Información del sistema */}
				<div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
					<div className="px-4 py-5 sm:px-6">
						<h3 className="text-lg leading-6 font-medium text-gray-900">
							Información del Sistema
						</h3>
						<p className="mt-1 max-w-2xl text-sm text-gray-500">
							Detalles técnicos y de rendimiento.
						</p>
					</div>
					<div className="border-t border-gray-200">
						<dl>
							<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="text-sm font-medium text-gray-500">Versión del sistema</dt>
								<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
									v1.0.0
								</dd>
							</div>
							<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="text-sm font-medium text-gray-500">Última actualización</dt>
								<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
									{new Date().toLocaleDateString('es-ES')}
								</dd>
							</div>
						</dl>
					</div>
				</div>
			</div>
		</div>
	);
}; 