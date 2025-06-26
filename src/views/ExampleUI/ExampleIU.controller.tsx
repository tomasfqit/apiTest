import { IExampleUIHookProps, useExampleUIHook } from './ExampleUI.hook';
import ExampleUIView from './ExampleUI.view';

const ExampleUI = () => {
	const hookData: IExampleUIHookProps = useExampleUIHook();

	return <ExampleUIView {...hookData} />;
};

export default ExampleUI;
