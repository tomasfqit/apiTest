import { Navigate, type RouteObject } from "react-router-dom";
import HomeUI from "../views/home/components/HomeUI.view";
import SecurityUI from "../views/security/SecurityUI.controller";
import ModulesUI from "../views/security/components/modules/ModulesUI.controller";



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
		children: [
			{
				path: "modules",
				element: <ModulesUI />,
			},
		],
	},
];



