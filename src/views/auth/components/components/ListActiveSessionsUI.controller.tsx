import { ICheckSessionResult, ICloseSessionRequest } from "@/interfaces/login";
import { useCloseSessions } from "@/store/auth/useCloseSessions";
import { useLoginStore } from "@/store/auth/useLoginStore";
import { useModalStore } from "@ITSA-Nucleo/itsa-fe-components";
import { useCallback, useMemo, useState } from "react";
import { UAParser } from "ua-parser-js";
import { ListActiveSessionsUIView } from "./ListActiveSessionsUI.view";

interface PropsListActiveSessionsUI {
	activeSessions: ICheckSessionResult[];
	username: string;
	password: string;
}

export const ListActiveSessionsUI: React.FC<PropsListActiveSessionsUI> = ({ activeSessions, username, password }) => {
	const [sessions, setSessions] = useState<ICheckSessionResult[]>(activeSessions);
	const { closeSession, isLoading: isLoadingCloseSession } = useCloseSessions();
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
			onSuccess: () => {
				closeModal();
			}
		});
	}, [closeModal, login, username, password]);

	const disableContinue = useMemo(() => {
		if (sessions.length === activeSessions.length) return true;
		if (isLoadingCloseSession || isLoadingLogin) return true;
		return false;
	}, [activeSessions.length, isLoadingCloseSession, isLoadingLogin, sessions.length]);

	return <ListActiveSessionsUIView activeSessions={sessions} parser={parser} handleContinue={handleContinue} closeModal={closeModal} handleCloseSession={handleCloseSession} disableContinue={disableContinue} />
}