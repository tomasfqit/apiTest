import { createAxiosInstance } from './config';
import { ENDPOINTS_ROUTES } from './enpointsRoute';

export interface LoginCredentials {
	email: string;
	password: string;
}

export interface LoginResponse {
	result: {
		access: string;
		refresh: string;
		user: {
			id: string;
			email: string;
			name: string;
		};
	};
}

export interface LogoutRequest {
	refresh: string;
}

class AuthService {
	private api = createAxiosInstance();
	private endpoint = import.meta.env.VITE_API_URL;

	async login(credentials: LoginCredentials): Promise<LoginResponse> {
		const cre = {
			username: credentials.email,
			password: credentials.password,	
		}
		console.log('cre =>',cre);
		const response = await this.api.post<LoginResponse>(`${this.endpoint}${ENDPOINTS_ROUTES.login}`, cre);
		return response.data;
	}

	async logout(refreshToken: string): Promise<void> {
		await this.api.post(ENDPOINTS_ROUTES.logout, { refresh: refreshToken });
	}

	// async verifyAuth(): Promise<boolean> {
	// 	try {
	// 		// Puedes agregar un endpoint de verificación si existe
	// 		// Por ahora, verificamos si hay token válido
	// 		const token = localStorage.getItem('accesss_token');
	// 		return !!token;
	// 	} catch (error: unknown) {	
	// 		const axiosError = error as AxiosErrorType;
	// 		console.error('Error al verificar autenticación', axiosError);	
	// 		return false;
	// 	}
	// }
}

export const authService = new AuthService(); 