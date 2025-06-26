import { Alert } from "@ITSA-Nucleo/itsa-fe-components";
import { toast } from "sonner";

export const TOAST_SUCCESS = (title: string) => {
	toast.custom(() => (
		<Alert
			content={title}
			severity="success"
		/>
	), {
		duration: 3000,
	});
};

export const TOAST_ERROR = (title: string) => {
	toast.custom(() => (
		<Alert
			content={title}
			severity="error"
		/>
	), {
		duration: 3000,
	});
};

export const TOAST_WARNING = (title: string) => {
	toast.custom(() => (
		<Alert
			content={title}
			severity="warning"
		/>
	), {
		duration: 3000,
	});
};

export const TOAST_INFO = (title: string) => {
	toast.custom(() => (
		<Alert
			content={title}
			severity="info"
		/>
	), {
		duration: 3000,
	});
};