import { ICheckSessionResult, ILoginRequest } from '@/interfaces/login';
import { useCheckSessionsStore } from '@/store/auth/useCheckSessionsStore';
import { useLoginStore } from '@/store/auth/useLoginStore';
import { useModalStore } from '@ITSA-Nucleo/itsa-fe-components';
import { useCallback } from 'react';
import { ListActiveSessionsUI } from '../components/ListActiveSessionsUI.controller';
import { useLoginUIHook } from './LoginUI.hook';
import { LoginUIView } from './LoginUI.view';

const LoginUIController = () => {
	const { openModal, closeModal } = useModalStore();
	const hookData = useLoginUIHook();
	const { fetchFunction: checkSessions, isLoading: isLoadingCheckSessions } = useCheckSessionsStore();
	const { fetchFunction: login, isLoading: isLoadingLogin } = useLoginStore();


	const openModalActiveSessions = useCallback((data: ICheckSessionResult[], username: string) => {
		openModal(
			'Sesiones activas',
			'md',
			<ListActiveSessionsUI activeSessions={data} username={username} />,
			null,
			closeModal
		);
	}, []);


	const onSubmit = useCallback((dataForm: ILoginRequest) => {
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
					openModalActiveSessions(data, dataForm.username);
				}
			},
			onError: (error: string) => {
				console.log("onError", error);
			}
		})
	}, [checkSessions, login]);

	return <LoginUIView {...hookData} onSubmit={onSubmit} isLoading={isLoadingCheckSessions || isLoadingLogin} />;
};

export default LoginUIController;
