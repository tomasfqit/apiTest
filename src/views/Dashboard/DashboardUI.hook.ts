import { errorMsgRequired } from "@/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { Control, useForm } from "react-hook-form";
import z from "zod";

export interface IDashboardUIHook {
	control: Control<{ shareText: string }>;
    shareText: string;
}

const formSchema = z.object({
	shareText: z.string({ required_error: errorMsgRequired('usuario') }).min(1, errorMsgRequired('usuario')),
});

export const useDashboardUIHook = (): IDashboardUIHook => {
   	const {
        control,
        watch,
		} = useForm<{ shareText: string }>({
			resolver: zodResolver(formSchema),
		});

    const shareText = watch('shareText');

    return {
        control,
        shareText,
    };
};

