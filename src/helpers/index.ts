import { TOAST_ERROR } from "@/utils/toast";
import { FieldErrors } from "react-hook-form";

export const cleanLocalStorage = () => {
	localStorage.clear();
};

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

export const errorMsgRequired = (field: string) => {
	return `El campo ${field} es obligatorio`;
};

export const ToastErrorForm = (errors: FieldErrors) => {
	const errorField = Object.keys(errors)[0];
	const errorMessage = errors[errorField as keyof typeof errors];

	const message = (errorMessage?.message as string) || 'Error de validación';

	TOAST_ERROR(message);
};
