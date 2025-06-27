import { AxiosRequestConfig } from 'axios';
import { useState } from 'react';
import { post as postAxios } from '../api/config';
import { ApiKey } from '../constants/ApiKey';

interface UsePostResult<TResponse, TRequest> {
	data: TResponse | null;
	loading: boolean;
	error: string | null;
	post: (body: TRequest) => Promise<TResponse | null>;
}
export function useApiManagmentPost<TResponse, TRequest = unknown>(
	url: ApiKey,
	config?: Omit<AxiosRequestConfig, 'url' | 'method' | 'data'>,
): UsePostResult<TResponse, TRequest> {
	const [data, setData] = useState<TResponse | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const post = async (body: TRequest): Promise<TResponse | null> => {
		setLoading(true);
		setError(null);
		try {
			const response = await postAxios<TResponse>(url, body, config);
			setData(response.data);
			return response.data;
		} catch (err: any) {
			setError(err.response?.data?.message || 'Error al enviar datos');
			return null;
		} finally {
			setLoading(false);
		}
	};

	return { data, loading, error, post };
}
