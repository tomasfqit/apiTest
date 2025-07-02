// Definir el tipo para las acciones CRUD
export type TActionType = 'create' | 'update' | 'delete';
export type TPermissions = {
	agencias: {
		id: number;
		name: string;
		modules: {
			id: number;
			name: string;
			submodule: {
				program: {
					actions: {
						actualizar: number;
						eliminar: number;
						escribir: number;
						leer: number;
						todas_acciones: number;
					};
					id: number;
					name: string;
				}[];
				id: number;
				name: string;
			}[];
		}[];
	}[];
};
