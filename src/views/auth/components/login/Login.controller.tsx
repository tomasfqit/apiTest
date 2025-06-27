import { ICheckSessionResult, ILoginRequest } from '@/interfaces/login';
import { useCheckSessionsStore } from '@/store/auth/useCheckSessionsStore';
import { useLoginStore } from '@/store/auth/useLoginStore';
import { useLoginUIHook } from './LoginUI.hook';
import { LoginUIView } from './LoginUI.view';

const LoginUIController = () => {
	const hookData = useLoginUIHook();
	const { fetchFunction: checkSessions, isLoading: isLoadingCheckSessions } = useCheckSessionsStore();
	const { fetchFunction: login, isLoading: isLoadingLogin } = useLoginStore();

	const onSubmit = (dataForm: ILoginRequest) => {
		checkSessions(dataForm, {
			onSuccess: (data: ICheckSessionResult[]) => {
				if (data.length === 0) {
					login(dataForm, {
						onSuccess: (data: string) => {
							console.log("onSuccess", data);
						},
						onError: (error: string) => {
							console.log("onError", error);
						}
					})
				} else {
					// Open modal sesiones activas
					console.log('variables =>', data);
				}
			},
			onError: (error: string) => {
				console.log("onError", error);
			}
		})
	}

	return <LoginUIView {...hookData} onSubmit={onSubmit} isLoading={isLoadingCheckSessions || isLoadingLogin} />;
};

export default LoginUIController;
