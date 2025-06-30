import { Navigate } from "react-router-dom";
import { useValidateToken } from "../../store/auth/useValidateToken";
import MainLayoutUI from "../MainLayout/MainLayoutUI.Controller";

export const AuthLayout = () => {
	const { validateToken } = useValidateToken();
	if (!validateToken) {
		return <Navigate to="/login" replace />;
	}

	return <MainLayoutUI />;
}; 