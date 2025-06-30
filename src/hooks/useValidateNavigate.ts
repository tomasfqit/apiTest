import { useNavigate } from 'react-router-dom';
import { useValidateRoute } from '../store/auth/useValidateRoute';

export const useValidateNavigate = () => {
	const { validateRoute } = useValidateRoute();
	const navigate = useNavigate();

	const validateNavigate = (path: string, progId: number, agenId: number) => {
		validateRoute(
			{
				progId,
				agenId,
			},
			{
				onSuccess: data => {
					if (data) {
						navigate(path);
					} else {
						navigate('/unauthorized');
					}
				},
				onError: error => {
					console.log('error =>', error);
				},
			},
		);
	};

	return { validateNavigate };
};
