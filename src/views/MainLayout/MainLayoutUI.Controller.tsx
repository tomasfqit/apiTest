import { IActionPanelOption, IAppLayoutMenu } from "@ITSA-Nucleo/itsa-fe-components";
import { mdiAccountGroup } from "@mdi/js";
import { useMemo } from "react";
import { useCustomsParams } from "../../hooks/useCustomsParams";
import { useMainLayoutHook } from "./MainLayoutUI.hook";
import { MainLayoutUIView } from "./MainLayoutUI.view";


const MainLayoutUI = () => {
	const { isLoading, agencies, currentAgency, setCurrentAgency, currentModules, currentModule, setCurrentModule, currentSubModules, setCurrentSubModules } = useMainLayoutHook();
	const { setSearchParams } = useCustomsParams();



	const agenciesAppLayout = useMemo(() => {
		return agencies.map(agency => ({
			title: agency.name,
			action: () => {
				setCurrentAgency(agency);
				setCurrentModule(agency.modules[0]);
				setCurrentSubModules(agency.modules[0].submodules);
				console.log('agency =>', agency);
				setSearchParams({
					agency: agency.name,
					module: agency.modules[0].id.toString(),
				});
			},
		}));
	}, [agencies, setCurrentAgency, setCurrentModule, setCurrentSubModules, setSearchParams]);


	const currentModulosAppLayout: IActionPanelOption[] = useMemo(() => {
		return currentModules.map(modulo => ({
			title: modulo.name,
			action: () => {
				setCurrentModule(modulo);
				setCurrentSubModules(modulo.submodules);
				setSearchParams({
					agency: currentAgency?.name || '',
					module: modulo.id.toString(),
				});
			},
		}));
	}, [currentModules, setCurrentModule, setCurrentSubModules, setSearchParams, currentAgency]);


	const currentSubModulesAppLayout: IAppLayoutMenu[] = useMemo(() => {
		return currentSubModules.map(subModule => ({
			title: subModule.name,
			icon: mdiAccountGroup,
			action: () => { }
		}));
	}, [currentSubModules]);



	return <MainLayoutUIView isLoading={isLoading} agencies={agenciesAppLayout} currentAgency={currentAgency} lines={currentModulosAppLayout} currentModule={currentModule} options={currentSubModulesAppLayout} />;
};

export default MainLayoutUI;