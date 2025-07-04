import { useLayoutWidth } from "@/hooks/useLayoutWidth";
import { Control, FieldValues, useForm } from "react-hook-form";

export interface IModulesUIHook {
	control: Control<FieldValues>;  
	layoutWidth: number;
	layoutHeight: number;
}



export const useModulesUIHook = (): IModulesUIHook => {
	const {  control } = useForm();
    	const layoutWidth = useLayoutWidth();



	return {
		control,
		layoutWidth: layoutWidth.componentWidth - 40,
		layoutHeight: layoutWidth.componentHeight - 200,
	};
};
