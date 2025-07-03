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
export interface IResponseGeneric {
	code: number;
	message: string;
	result: string;
}

export interface IExchangeCodeRequest {
	claim_code: string;
}

export interface IExchangeCodeResponse {
	code: number;
	message: string;
	result: IExchangeCodeResult;
}

export interface IExchangeCodeResult {
	refresh: string;
	access: string;
}

export interface IValidateRouteRequest {
	progId: number;
	agenId: number;
}

export interface IValidateRouteResponse {
	code: number;
	message: string;
	result: boolean;
}
