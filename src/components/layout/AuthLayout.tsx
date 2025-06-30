import { Navigate } from "react-router-dom";
import { useValidateToken } from "../../store/auth/useValidateToken";
import { MainLayout } from "./MainLayout";

export const AuthLayout = () => {
	const { validateToken } = useValidateToken();
	if (!validateToken) {
		return <Navigate to="/login" replace />;
	}

	return <MainLayout />;
}; 