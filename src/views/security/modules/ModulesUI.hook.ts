import { useLayoutWidth } from "@/hooks/useLayoutWidth";
import { Control, FieldValues, useForm } from "react-hook-form";

export interface IModulesUIHook {
	control: Control<FieldValues>;  
	sWidth: number;
	sHeight: number;
}



export const useModulesUIHook = (): IModulesUIHook => {
	const {  control } = useForm();
    	const layoutWidth = useLayoutWidth();
	
        



	return {
		control,
		sWidth: layoutWidth.componentWidth - 40,
		sHeight: layoutWidth.componentHeight - 200,
	};
};
