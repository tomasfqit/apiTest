import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthLayout } from "../components/layout/AuthLayout";
import { NotFoundUI } from "../views/auth/components/notfound/NotFoundUI.view";
import { PublicRoute } from "./PublicRoute";
import { routes } from "./routes";

const router = createBrowserRouter([
	{
		path: "/",
		element: <AuthLayout />,
		children: routes,
	},
	{
		path: "/login",
		element: <PublicRoute />,
	},
	{
		path: "*",
		element: <NotFoundUI />,
	},
]);

export const AppRouterProvider = () => {
	return <RouterProvider router={router} />;
};