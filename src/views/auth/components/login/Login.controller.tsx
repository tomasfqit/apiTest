"use client";
import { useValidateToken } from '@/hooks/useValidateToken';
import { ICheckSessionResult, IExchangeCodeResult, ILoginRequest } from '@/interfaces/login';
import { useCheckSessionsStore } from '@/store/auth/useCheckSessionsStore';
import { useLoginStore } from '@/store/auth/useLoginStore';
import { TOAST_ERROR } from '@/utils/toast';
import { useModalStore } from '@ITSA-Nucleo/itsa-fe-components';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExchangeCodeStore } from '../../../../store/auth/useExchangeCode';
import { ListActiveSessionsUI } from '../components/ListActiveSessionsUI.controller';
import { useLoginUIHook } from './LoginUI.hook';
import { LoginUIView } from './LoginUI.view';

const LoginUIController = () => {
	const { openModal, closeModal } = useModalStore();
	const hookData = useLoginUIHook();
	const { checkSession, isLoading: isLoadingCheckSessions } = useCheckSessionsStore();
	const { login, isLoading: isLoadingLogin } = useLoginStore();
	const { exchangeCode, isLoading: isLoadingExchangeCode } = useExchangeCodeStore();
	const { setToken } = useValidateToken();
	const navigate = useNavigate();

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
							exchangeCode({ claim_code: data }, {
								onSuccess: (data: IExchangeCodeResult) => {
									setToken(data);
									navigate("/home");
								}
							})
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
	}, [checkSession, exchangeCode, login, navigate, openModalActiveSessions, setToken]);

	return <LoginUIView {...hookData} onSubmit={onSubmit} isLoading={isLoadingCheckSessions || isLoadingLogin || isLoadingExchangeCode} />;
};

export default LoginUIController;
