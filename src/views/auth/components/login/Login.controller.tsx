import { useLoginUIHook } from './LoginUI.hook';
import { LoginUIView } from './LoginUI.view';

const LoginUI = () => {
	const hookData = useLoginUIHook();

	return <LoginUIView {...hookData} />;
};

export default LoginUI;
