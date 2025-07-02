import { IActionPanelOption } from '@ITSA-Nucleo/itsa-fe-components';
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
	localStorage.removeItem('token');
	localStorage.removeItem('refresh_token');
	localStorage.removeItem('user');
};

export const getToken = () => {
	const userToken = localStorage.getItem('token') || '';
	let accessToken = null;
	if (userToken) {
		accessToken = JSON.parse(userToken).access;
	}
	return accessToken;
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
