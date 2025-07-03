import { ICheckSessionResult, ICloseSessionRequest, IExchangeCodeResult } from "@/store/auth/IAuth";
import { useCloseSessions } from "@/store/auth/useCloseSessions";
import { useLoginStore } from "@/store/auth/useLoginStore";
import { useModalStore } from "@ITSA-Nucleo/itsa-fe-components";
import { useCallback, useMemo, useState } from "react";
import { UAParser } from "ua-parser-js";
import { useExchangeCodeStore } from "../../../../store/auth/useExchangeCode";
import { ListActiveSessionsUIView } from "./ListActiveSessionsUI.view";
import { useAuthStore } from "@/store/auth/auth.store";

interface PropsListActiveSessionsUI {
	activeSessions: ICheckSessionResult[];
	username: string;
	password: string;
}

export const ListActiveSessionsUI: React.FC<PropsListActiveSessionsUI> = ({ activeSessions, username, password }) => {
	const [sessions, setSessions] = useState<ICheckSessionResult[]>(activeSessions);
	// const { getPermissions } = useSettingsStore();
	const { closeSession, isLoading: isLoadingCloseSession } = useCloseSessions();
	const { exchangeCode } = useExchangeCodeStore();
	const { setToken } = useAuthStore.getState();
	//const navigate = useNavigate();
	const { login, isLoading: isLoadingLogin } = useLoginStore();
	const { closeModal } = useModalStore();
	const parser = useCallback((res: string) => {
		const parser = new UAParser(res);
		const result = parser.getResult();
		const browserName = result.browser.name;
		const browserVersion = result.browser.version;
		const osName = result.os.name;
		const osVersion = result.os.version;
		if (!browserName || !osName) {
			return 'Desconocido';
		} else {
			const readableInfo = `Navegador: ${browserName} ${browserVersion} / Sistema: ${osName} ${osVersion}`;
			return readableInfo;
		}
	}, []);

	const handleCloseSession = useCallback((session: ICheckSessionResult) => {
		const dataRequest: ICloseSessionRequest = {
			username: username,
			session: session.id
		}
		closeSession(dataRequest, {
			onSuccess: () => {
				const newSessions = sessions.filter(s => s.id !== session.id);
				setSessions(newSessions);
			}
		});
	}, [closeSession, username, sessions]);

	const handleContinue = useCallback(() => {
		login({ username, password }, {
			onSuccess: (data: string) => {
				exchangeCode({ claim_code: data }, {
					onSuccess: async (data: IExchangeCodeResult) => {
						localStorage.setItem('refresh_token', data.refresh);
						// await getPermissions();
						setToken(data.access);
						window.location.href = '/home';
					}
				})
			}
		});
	}, [exchangeCode, login, password, setToken, username]);

	const disableContinue = useMemo(() => {
		if (sessions.length === activeSessions.length) return true;
		if (isLoadingCloseSession || isLoadingLogin) return true;
		return false;
	}, [activeSessions.length, isLoadingCloseSession, isLoadingLogin, sessions.length]);

	return <ListActiveSessionsUIView activeSessions={sessions} parser={parser} handleContinue={handleContinue} closeModal={closeModal} handleCloseSession={handleCloseSession} disableContinue={disableContinue} />
}