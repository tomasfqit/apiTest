import { Outlet } from "react-router-dom";

export const SecurityUIView = () => {
	return <div className="flex flex-col gap-4">
		<Outlet />
	</div>;
};