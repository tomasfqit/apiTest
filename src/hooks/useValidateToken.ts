import { useMemo } from 'react';

export const useValidateToken = () => {
	const validateToken = useMemo(() => {
		const token = localStorage.getItem('token');
		if (!token) {
			return false;
		}

		return true;
	}, []);

	return {
		validateToken,
	};
};
