import { errorMsgRequired, getBackgroundImageByDay } from '@/helpers';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { Control, FieldErrors, useForm, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { z } from 'zod';
import { ILoginRequest } from '../../../../interfaces/login';

const formSchema = z.object({
	username: z.string({ required_error: errorMsgRequired('usuario') }).min(1, errorMsgRequired('usuario')),
	password: z.string({ required_error: errorMsgRequired('contraseña') }).min(1, errorMsgRequired('contraseña')),
});

export interface ILoginUIHookProps {
	errors: FieldErrors;
	register: UseFormRegister<ILoginRequest>;
	handleSubmit: UseFormHandleSubmit<ILoginRequest>;
	control: Control<ILoginRequest>;
	isLoading: boolean;
	onSubmit: (data: ILoginRequest) => void;
	backgroundImage: string;
}

export const useLoginUIHook = (): ILoginUIHookProps => {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<ILoginRequest>({
		resolver: zodResolver(formSchema),
	});

	const onSubmit = useCallback((data: ILoginRequest) => {
		console.log(data);
	}, []);
	const backgroundImage = getBackgroundImageByDay();

	return {
		errors,
		register,
		handleSubmit,
		control,
		isLoading: false,
		onSubmit,
		backgroundImage,
	};
};
