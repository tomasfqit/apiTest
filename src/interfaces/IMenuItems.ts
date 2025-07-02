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
	name: string;
	modules: IModules[];
}

export interface IModules {
	id: number;
	name: string;
	path: string;
	submodules: ISubModules[];
}

export interface ISubModules {
	id: number;
	name: string;
	icon?: string;
	path?: string;
	groups?: IGroups[];
	programs: IPrograms[];
}

export interface IPrograms {
	id: number;
	name: string;
	path?: string;
	icon?: string;
	actions: IActions;
}

export interface IGroups {
	id: number;
	name: string;
	path?: string;
	icon?: string;
	programs: IPrograms[];
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
		icon?: string;
		groupId?: number;
		groupName?: string;
		programs: IPrograms[];
	}[];
	submodules: {
		submoduleId?: number;
		submoduleName?: string;
		programs: IPrograms[];
	}[];
}

export interface IMainJoinSubModulesGroups {
	id: number;
	name: string;
	programs: IPrograms[];
}
