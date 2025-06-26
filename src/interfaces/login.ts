export interface ILoginRequest {
	username: string;
	password: string;
}

export interface ILoginResponse {
	code: number;
	message: string;
	result: string;
}

export interface ICheckSessionResponse {
	code: number;
	message: string;
	result: ICheckSessionResult[];
}

export interface ICheckSessionResult {
	id: number;
	hora_inicio: Date;
	ip_conexion: string;
	dispositivo_conexion: string;
}

export interface ICloseSessionRequest {
	username: string;
	session: number;
}
