import { jwtDecode } from 'jwt-decode';
import { useCallback, useMemo } from 'react';
import { IExchangeCodeResult } from '../../interfaces/login';

interface JwtPayload {
	exp: number;
	iat: number;
	sub: string;
}

export const useValidateToken = () => {
	const validateToken = useMemo(() => {
		const token = localStorage.getItem('token');
		if (!token) return false;

		try {
			const decoded = jwtDecode<JwtPayload>(token);
			const currentTime = Date.now() / 1000;
			return decoded.exp > currentTime;
		} catch {
			return false;
		}
	}, []);

	const setToken = useCallback((token: IExchangeCodeResult) => {
		localStorage.setItem('token', JSON.stringify(token));
	}, []);

	const getToken = useCallback(() => {
		const token = localStorage.getItem('token');
		if (!token) {
			return null;
		}
		return JSON.parse(token);
	}, []);

	return {
		validateToken,
		setToken,
		getToken,
	};
};
