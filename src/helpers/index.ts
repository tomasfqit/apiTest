import { TOAST_ERROR } from "@/utils/toast";
import { FieldErrors } from "react-hook-form";



export const ToastErrorForm = (errors: FieldErrors) => {
	const errorField = Object.keys(errors)[0];
	const errorMessage = errors[errorField as keyof typeof errors];

	const message = (errorMessage?.message as string) || 'Error de validación';

	TOAST_ERROR(message);
};


import { IActionPanelOption } from '@ITSA-Nucleo/itsa-fe-components';
import * as mdiIcons from '@mdi/js';
import { mdiSecurity, mdiViewModule } from '@mdi/js';

export const getBackgroundImageByDay = (): string => {
	const today = new Date();
	const dayOfWeek = today.getDay();
	const backgroundImages = {
		0: '/fondo_login5.png',
		1: '/fondo_login6.png',
		2: '/fondo_login7.png',
		3: '/fondo_login8.jpg',
		4: '/fondo_login9.webp',
		5: '/fondo_login5.png',
		6: '/fondo_login6.png',
	};
	return backgroundImages[dayOfWeek as keyof typeof backgroundImages] || '/fondo_login6.png';
};

export const cleanLocalStorage = () => {
	localStorage.removeItem('refresh_token');
};

export const errorMsgRequired = (field: string) => {
	return `El campo ${field} es obligatorio`;
};

export const getMenuOptions = () => {
	const ALL_MODULES = [
		{
			name: 'SECURITY',
			icon: mdiSecurity,
			title: 'Seguridad',
			subList: [
				{
					name: 'MODELS',
					icon: mdiViewModule,
					title: 'Modulos',
					//route: paths.securityModels,
					action: () => {
						console.log('clicked');
					},
				},
			],
		},
	];

	return ALL_MODULES;
};

export const getFormattedDataMenu = (
	schema: { id: number; name: string }[] | null,
	handleAction: (id: number, name: string) => void,
): IActionPanelOption[] => {
	if (schema) {
		return schema.map((item: { id: number; name: string }) => {
			return {
				title: item.name,
				action: () => handleAction(item.id, item.name),
			};
		}) as IActionPanelOption[];
	} else {
		return [];
	}
};

export const getIcon = (name: string = 'mdiFolder'): string => {
	if (!name)
		return 'M21,15.61L19.59,17L14.58,12L19.59,7L21,8.39L17.44,12L21,15.61M3,6H16V8H3V6M3,13V11H13V13H3M3,18V16H16V18H3Z';
	return mdiIcons[name as keyof typeof mdiIcons];
};

export const getIconByModule = (module: string) => {
	switch (module) {
		case 'SEGURIDAD':
			return 'mdiShieldLock';
		default:
			return 'mdiAccessPointCheck';
	}
};


export const sw = (porcentaje: number) => {
	const sizeWindow = window.innerWidth;
	const size = sizeWindow * porcentaje / 100;
	return size;
};

export const estimatedSidebarWidth = window.innerWidth * 0.23; // 23% como margen de seguridad

