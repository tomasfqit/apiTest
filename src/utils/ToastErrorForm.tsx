import { FieldErrors } from 'react-hook-form';
import { TOAST_ERROR } from './toast';

export const ToastErrorForm = (errors: FieldErrors) => {
	const errorField = Object.keys(errors)[0];
	const errorMessage = errors[errorField as keyof typeof errors];

	const message = errorMessage?.message as string || 'Error de validación';

	TOAST_ERROR(message);

}



