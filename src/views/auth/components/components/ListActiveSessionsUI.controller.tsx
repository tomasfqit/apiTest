import { useModalStore } from "@ITSA-Nucleo/itsa-fe-components";
import { useCallback, useState } from "react";
import { UAParser } from "ua-parser-js";
import { ICheckSessionResult, ICloseSessionRequest } from "../../../../interfaces/login";
import { useCloseSessions } from "../../../../store/auth/useCloseSessions";
import { ListActiveSessionsUIView } from "./ListActiveSessionsUI.view";

interface PropsListActiveSessionsUI {
	activeSessions: ICheckSessionResult[];
	username: string;
}

export const ListActiveSessionsUI: React.FC<PropsListActiveSessionsUI> = ({ activeSessions, username }) => {
	const [sessions, setSessions] = useState<ICheckSessionResult[]>(activeSessions);
	const { fetchFunction: closeSession, isLoading: isLoadingCloseSession } = useCloseSessions();
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
		})
	}, [closeSession, sessions, username]);

	const handleContinue = useCallback(() => {

	}, []);


	return <ListActiveSessionsUIView activeSessions={sessions} parser={parser} handleContinue={handleContinue} closeModal={closeModal} isLoading={isLoadingCloseSession} handleCloseSession={handleCloseSession} />
}