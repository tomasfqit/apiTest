// src/components/PrivateRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useValidateToken } from "../store/auth/useValidateToken";


export const PrivateRoute = () => {
	const { validateToken } = useValidateToken();
	if (validateToken) {
		return <Outlet />;
	} else {
		return <Navigate to="/login" />;
	}
};
