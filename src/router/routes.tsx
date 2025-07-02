import { Navigate, type RouteObject } from "react-router-dom";
import HomeUI from "../views/home/components/HomeUI.view";
import SecurityUI from "../views/security/SecurityUI.controller";
import ModulesUI from "../views/security/components/modules/ModulesUI.controller";
import { paths } from "./paths";

export const securityRoutes: RouteObject[] = [
	{
		path: "mantenimiento/modulos",
		element: <ModulesUI />,
	},
];

export const routes: RouteObject[] = [
	{
		index: true,
		element: <Navigate to={paths.home} replace />,
	},
	{
		path: paths.home,
		element: <HomeUI />,
	},
	{
		path: "seguridad",
		element: <SecurityUI />,
		children: securityRoutes,
	},
];



