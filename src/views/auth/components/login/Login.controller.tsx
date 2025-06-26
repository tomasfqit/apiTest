import { useLoginUIHook } from "./LoginUI.hook";
import { LoginUI } from "./LoginUI.view";

const LoginControllerUI = () => {
	const hookData = useLoginUIHook();

	return <LoginUI {...hookData} />;
};

export default LoginControllerUI;
