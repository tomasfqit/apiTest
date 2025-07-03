"use client";

import { useCheckSessionsStore } from '@/store/auth/useCheckSessionsStore';
import { useLoginStore } from '@/store/auth/useLoginStore';
import { TOAST_ERROR } from '@/utils/toast';
import { useModalStore } from '@ITSA-Nucleo/itsa-fe-components';
import { useCallback } from 'react';
import { useExchangeCodeStore } from '@/store/auth/useExchangeCode';
import { useLoginUIHook } from './LoginUI.hook';
import { LoginUIView } from './LoginUI.view';
import { ListActiveSessionsUI } from './components/ListActiveSessionsUI.controller';
import { ICheckSessionResult, IExchangeCodeResult, ILoginRequest } from '@/store/auth/IAuth';
import { useAuthStore } from '@/store/auth/auth.store';

const LoginUIController = () => {
    const { openModal, closeModal } = useModalStore();
    const hookData = useLoginUIHook();
    const { checkSession, isLoading: isLoadingCheckSessions } = useCheckSessionsStore();
    const { login, isLoading: isLoadingLogin } = useLoginStore();
    const { exchangeCode, isLoading: isLoadingExchangeCode } = useExchangeCodeStore();
    const { setToken } = useAuthStore.getState();
    // const { getPermissions, isLoading: isLoadingPermissions } = useSettingsStore.getState();
    // const navigate = useNavigate();

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
        console.log('dataForm =>',dataForm);
        checkSession(dataForm, {
            onSuccess: (data: ICheckSessionResult[]) => {
                if (data.length === 0) {
                    login(dataForm, {
                        onSuccess: (data: string) => {
                            exchangeCode({ claim_code: data }, {
                                onSuccess: async (data: IExchangeCodeResult) => {
                                    localStorage.setItem('refresh_token', data.refresh);
                                    setToken(data.access);
                                    //await getPermissions();
                                    //navigate("/home");
                                    window.location.href = '/home';
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
    }, [checkSession, exchangeCode, login, openModalActiveSessions, setToken]);

    return <LoginUIView {...hookData} onSubmit={onSubmit} isLoading={isLoadingCheckSessions || isLoadingLogin || isLoadingExchangeCode} />;
};

export default LoginUIController;
