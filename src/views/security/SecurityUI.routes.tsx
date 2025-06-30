import { PermissionRoute } from "@/hooks/PermissionRoute";
import { RouteObject } from "react-router-dom";
import ModulesUI from "./components/modules/ModulesUI.controller";

export const securityRoutes: RouteObject[] = [
	{
		path: "modules",
		element: <PermissionRoute><ModulesUI /></PermissionRoute>,
	},
];