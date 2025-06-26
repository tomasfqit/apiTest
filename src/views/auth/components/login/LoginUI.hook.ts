interface ILoginRequest {
	username: string;
	password: string;
}
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Control,
	FieldErrors,
	useForm,
	UseFormHandleSubmit,
	UseFormRegister,
	UseFormSetValue,
	UseFormWatch,
} from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
	username: z.string().min(1, 'El nombre de usuario es requerido'),
	password: z.string().min(1, 'La contraseña es requerida'),
});

export interface ILoginUIHookProps {
	errors: FieldErrors;
	register: UseFormRegister<ILoginRequest>;
	handleSubmit: UseFormHandleSubmit<ILoginRequest>;
	reset: () => void;
	watch: UseFormWatch<ILoginRequest>;
	setValue: UseFormSetValue<ILoginRequest>;
	control: Control<ILoginRequest>;
}
export const useLoginUIHook = (): ILoginUIHookProps => {
	const {
		register,
		handleSubmit,
		reset,
		watch,
		setValue,
		control,
		formState: { errors },
	} = useForm<ILoginRequest>({
		resolver: zodResolver(formSchema),
	});

	return {
		errors,
		register,
		handleSubmit,
		reset,
		watch,
		setValue,
		control,
	};
};
