export interface IPermissionResponse {
	code: number;
	message: string;
	result: IAgenciesAccess;
}

export interface IAgenciesAccess {
	agencias: IAgencyModules[];
}

export interface IAgencyModules {
	id: number;
	nombre: string;
	modules: IModules[];
}

export interface IModules {
	id: number;
	nombre: string;
	path: string;
	submodules: ISubModules[];
}

export interface ISubModules {
	id: number;
	nombre: string;
	path: string;
	groups?: IGroups[];
	programs: IProgram[];
}

export interface IProgram {
	id: number;
	nombre: string;
	path: string;
	actions: IActions;
}

export interface IGroups {
	id: number;
	nombre: string;
	path: string;
	programs: IProgram[];
}

export interface IActions {
	todas_acciones: number;
	leer: number;
	escribir: number;
	actualizar: number;
	eliminar: number;
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

export interface IMainJoinSubModulesGroups1 {
	groups: {
		groupId?: number;
		groupName?: string;
		programs: IProgram[];
	}[];
	submodules: {
		submoduleId?: number;
		submoduleName?: string;
		programs: IProgram[];
	}[];
}

export interface IMainJoinSubModulesGroups {
	id: number;
	nombre: string;
	programs: IProgram[];
}
