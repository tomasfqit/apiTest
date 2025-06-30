
import ModalLoading from "@/components/layout/ModalLoading";
import { useValidateToken } from "@/store/auth/useValidateToken";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export const PermissionRoute = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const { validateToken } = useValidateToken();
	const [allowed, setAllowed] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (validateToken) {
			setAllowed(true);
			setTimeout(() => {
				setIsLoading(false);
			}, 1000);
		}
	}, [validateToken]);


	// Mostrar loading mientras se cargan los datos
	if (isLoading) {
		return <ModalLoading isOpen={true} title="Cargando..." />;
	}

	if (!validateToken) return <Navigate to="/login" replace />;

	if (!allowed) return <Navigate to="/unauthorized" replace />;

	return <>{children}</>;
};
