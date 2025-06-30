import { useMainLayoutHook } from "./MainLayoutUI.hook";
import { MainLayoutUIView } from "./MainLayoutUI.view";
const MainLayoutUI = () => {
	const { agencies, currentAgency, currentModules } = useMainLayoutHook();

	return <MainLayoutUIView agencies={agencies} currentAgency={currentAgency} currentModules={currentModules} />;
};

export default MainLayoutUI;