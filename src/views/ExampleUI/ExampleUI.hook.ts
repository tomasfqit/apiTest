// @note: here goes all logic
// Add here all functions, states and logic need it for this specific UI, including API calls and more.
import { Control, FieldErrors, useForm, UseFormHandleSubmit, UseFormSetValue } from 'react-hook-form';

interface IFormData {
	firstAmount: number;
	secondAmount: number;
	inputFile: File | null;
}

export interface IExampleUIHookProps {
	control: Control<IFormData>;
	errors: FieldErrors;
	onSubmit: (data: IFormData) => void;
	handleSubmit: UseFormHandleSubmit<IFormData, undefined>;
	setValue: UseFormSetValue<IFormData>;
}

export const useExampleUIHook = (): IExampleUIHookProps => {
	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<IFormData>({
		defaultValues: {
			firstAmount: 0,
			secondAmount: 0,
			inputFile: null,
		},
	});

	const onSubmit = (data: IFormData) => {
		console.log('DATA', data);
	};

	return { control, errors, onSubmit, handleSubmit, setValue };
};
