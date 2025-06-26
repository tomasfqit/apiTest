import { ICheckSessionResponse, ICloseSessionRequest, ILoginRequest, ILoginResponse } from '../interfaces/login';
import { post } from './config';

export const securityApi = {
	login: async (request: ILoginRequest) => {
		const response = await post<ILoginResponse>('/security/login/', request);
		return response.data;
	},

	checkSession: async (request: ILoginRequest) => {
		const response = await post<ICheckSessionResponse>('/security/checkSession/', request);
		return response.data;
	},

	closeSession: async (request: ICloseSessionRequest) => {
		const response = await post<ILoginResponse>('/security/closeSession/', request);
		return response.data;
	},

	// exchangeCode: async (params: string) => {
	//   const response = await get<IExchangeCodeResponse>(
	//     `/security/exchangecode/?claim_code=${params}`
	//   );
	//   return response.data;
	// },
	// logout: async (request: ILogoutRequest) => {
	//   const response = await post<IResponseGeneric>("/security/logout/", request);
	//   return response.data;
	// },
	// getPermissions: async () => {
	//   const response = await get<IPermissionResponse>(
	//     "/security/getPermissions/"
	//   );
	//   return response.data;
	// },
	// //security/validatePermissions/
	// validateRoute: async (request: IValidateRouteRequest) => {
	//   const response = await post<IValidateRouteResponse>(
	//     "/security/validate-route/",
	//     request
	//   );
	//   return response.data;
	// },
};
