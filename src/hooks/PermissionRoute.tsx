
import ModalLoading from "@/components/layout/ModalLoading";
import { useValidateToken } from "@/store/auth/useValidateToken";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useValidateRoute } from "../store/auth/useValidateRoute";

export const PermissionRoute = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const { validateRoute, progId, agenId } = useValidateRoute();
	const [allowed, setAllowed] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const { validateToken } = useValidateToken();
	const navigate = useNavigate();

	useEffect(() => {
		if (validateToken) {
			validateRoute({ progId: progId, agenId: agenId }, {
				onSuccess: (data) => {
					setAllowed(data);
					setIsLoading(false);
				},
				onError: () => {
					navigate('/unauthorized');
					setIsLoading(false);
				}
			});
		}
	}, [agenId, navigate, progId, validateRoute, validateToken]);


	// Mostrar loading mientras se cargan los datos
	if (isLoading) {
		return <ModalLoading isOpen={true} title="Cargando..." />;
	}

	if (!validateToken) return <Navigate to="/login" replace />;

	if (!allowed) return <Navigate to="/unauthorized" replace />;

	return <>{children}</>;
};
