import { Navigate, type RouteObject } from "react-router-dom";
import HomeUI from "../views/home/components/HomeUI.view";
import SecurityUI from "../views/security/SecurityUI.controller";
import { securityRoutes } from "../views/security/SecurityUI.routes";



export const routes: RouteObject[] = [
	{
		index: true,
		element: <Navigate to="/home" replace />,
	},
	{
		path: "home",
		element: <HomeUI />,
	},
	{
		path: "security",
		element: <SecurityUI />,
		children: securityRoutes,
	},
];



