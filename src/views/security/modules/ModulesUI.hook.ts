import { Control, FieldValues, useForm } from "react-hook-form";

export interface IModulesUIHook {
	control: Control<FieldValues>;  
	layoutWidth: number;
}



export const useModulesUIHook = (): IModulesUIHook => {
	const {  control } = useForm();

    const layoutWidth = 0;

	return {
		control,
		layoutWidth,
	};
};
