import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

/**
 * Hook personalizado para obtener el último segmento del pathname de la URL.
 * Por ejemplo:
 * - "/productos/camisas" -> "camisas"
 * - "/usuarios/123/" -> "123"
 * - "/dashboard" -> "dashboard"
 * - "/" -> "" (o un valor predeterminado si se configura)
 *
 * @param {string} [defaultValue=''] - Valor a retornar si el path es la raíz ("/") o está vacío.
 * @returns {string} El último segmento del path.
 */
export const useLastPathSegment = (defaultValue: string = ''): string => {
	const location = useLocation();

	const lastSegment = useMemo(() => {
		// Obtenemos el pathname, por ejemplo "/productos/camisas/detalle/"
		const pathname = location.pathname;

		// Dividimos el path por '/' y filtramos los segmentos vacíos
		// Ejemplo: "/productos/camisas/detalle/" -> ["", "productos", "camisas", "detalle", ""]
		// Después del filter: ["productos", "camisas", "detalle"]
		const segments = pathname.split('/').filter(segment => segment !== '');

		// Si hay segmentos, el último es el que buscamos
		if (segments.length > 0) {
			return segments[segments.length - 1];
		}

		// Si no hay segmentos (e.g., el path es solo "/"), retornamos el valor predeterminado
		return defaultValue;
	}, [location.pathname, defaultValue]); // Recalculamos solo si el pathname cambia

	return lastSegment ?? defaultValue;
};
