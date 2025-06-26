import { Navigate, type RouteObject } from "react-router-dom";
import HomeUI from "../views/home/components/HomeUI.view";



export const routes: RouteObject[] = [
	{
		index: true,
		element: <Navigate to="/home" replace />,
	},
	{
		path: "home",
		element: <HomeUI />,
	}
];



