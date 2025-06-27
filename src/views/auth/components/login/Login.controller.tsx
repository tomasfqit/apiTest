import { ICheckSessionResult, ILoginRequest } from '@/interfaces/login';
import { useCheckSessionsStore } from '@/store/auth/useCheckSessionsStore';
import { useLoginStore } from '@/store/auth/useLoginStore';
import { useModalStore } from '@ITSA-Nucleo/itsa-fe-components';
import { useCallback } from 'react';
import { TOAST_ERROR } from '../../../../utils/toast';
import { ListActiveSessionsUI } from '../components/ListActiveSessionsUI.controller';
import { useLoginUIHook } from './LoginUI.hook';
import { LoginUIView } from './LoginUI.view';

const LoginUIController = () => {
	const { openModal, closeModal } = useModalStore();
	const hookData = useLoginUIHook();
	const { checkSession, isLoading: isLoadingCheckSessions } = useCheckSessionsStore();
	const { login, isLoading: isLoadingLogin } = useLoginStore();


	const openModalActiveSessions = useCallback((data: ICheckSessionResult[], username: string, password: string) => {
		openModal(
			'Sesiones activas',
			'md',
			<ListActiveSessionsUI activeSessions={data} username={username} password={password} />,
			null,
			closeModal
		);
	}, [closeModal, openModal]);


	const onSubmit = useCallback((dataForm: ILoginRequest) => {
		checkSession(dataForm, {
			onSuccess: (data: ICheckSessionResult[]) => {
				if (data.length === 0) {
					login(dataForm, {
						onSuccess: (data: string) => {
							console.log("onSuccess", data);
						},
						onError: (error: string) => {
							TOAST_ERROR(error);
						}
					})
				} else {
					openModalActiveSessions(data, dataForm.username, dataForm.password);
				}
			}
		})
	}, [checkSession, login, openModalActiveSessions]);

	return <LoginUIView {...hookData} onSubmit={onSubmit} isLoading={isLoadingCheckSessions || isLoadingLogin} />;
};

export default LoginUIController;
