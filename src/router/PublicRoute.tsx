import { Navigate } from "react-router-dom";
import { useValidateToken } from "../hooks/useValidateToken";
import AuthUI from "../views/auth/AuhUI.view";

export const PublicRoute = () => {
	const { validateToken } = useValidateToken();
	if (validateToken) {
		return <Navigate to="/home" replace />;
	}
	return <AuthUI />;
}; 