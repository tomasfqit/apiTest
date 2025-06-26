import { errorMsgRequired } from '@/helpers/functions';
import { zodResolver } from '@hookform/resolvers/zod';
import { Control, FieldErrors, useForm, UseFormHandleSubmit, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { z } from 'zod';

interface ILoginRequest {
	username: string;
	password: string;
}

const formSchema = z.object({
	username: z.string({ required_error: errorMsgRequired('usuario') }).min(1, errorMsgRequired('usuario')),
	password: z.string({ required_error: errorMsgRequired('contraseña') }).min(1, errorMsgRequired('contraseña')),
});

export interface ILoginUIHookProps {
	errors: FieldErrors;
	register: UseFormRegister<ILoginRequest>;
	handleSubmit: UseFormHandleSubmit<ILoginRequest>;
	control: Control<ILoginRequest>;
	watch: UseFormWatch<ILoginRequest>;
}

export const useLoginUIHook = (): ILoginUIHookProps => {
	const {
		register,
		handleSubmit,
		control,
		watch,
		formState: { errors },
	} = useForm<ILoginRequest>({
		resolver: zodResolver(formSchema),
	});

	return {
		errors,
		register,
		handleSubmit,
		control,
		watch,
	};
};
