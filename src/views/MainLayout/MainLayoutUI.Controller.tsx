import { useMainLayoutHook } from "./MainLayoutUI.hook";
import { MainLayoutUIView } from "./MainLayoutUI.view";
const MainLayoutUI = () => {
	const { agencies, currentAgency, currentModules, currentModule, isLoading } = useMainLayoutHook();

	return <MainLayoutUIView agencies={agencies} currentAgency={currentAgency} currentModules={currentModules} currentModule={currentModule} isLoading={isLoading} />;
};

export default MainLayoutUI;