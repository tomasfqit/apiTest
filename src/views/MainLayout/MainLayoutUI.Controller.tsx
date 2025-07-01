import { IActionPanelOption, IAppLayoutMenu } from "@ITSA-Nucleo/itsa-fe-components";
import { mdiAccountGroup } from "@mdi/js";
import { useMemo } from "react";
import { useSettingsStore } from "../../store/settings.store";
import { useMainLayoutHook } from "./MainLayoutUI.hook";
import { MainLayoutUIView } from "./MainLayoutUI.view";

const MainLayoutUI = () => {
	const {
		isLoading,
		agencies,
		currentAgency,
		setCurrentAgency,
		currentModules,
		currentModule,
		setCurrentModule,
		currentSubModules,
		setCurrentSubModules
	} = useMainLayoutHook();

	const { setCurrentAgencyId, setCurrentModuleId } = useSettingsStore();

	const agenciesAppLayout = useMemo(() => {
		return agencies.map(agency => ({
			title: agency.name,
			action: () => {
				if (!agency.modules?.length) return;
				const firstModule = agency.modules[0];
				setCurrentAgency(agency);
				setCurrentModule(firstModule);
				setCurrentSubModules(firstModule.submodules);
				setCurrentAgencyId(agency.id);
				setCurrentModuleId(firstModule.id);
			},
		}));
	}, [agencies, setCurrentAgency, setCurrentModule, setCurrentSubModules, setCurrentAgencyId, setCurrentModuleId]);

	const currentModulosAppLayout: IActionPanelOption[] = useMemo(() => {
		return currentModules.map(modulo => ({
			title: modulo.name,
			action: () => {
				setCurrentModule(modulo);
				setCurrentSubModules(modulo.submodules);
				setCurrentAgencyId(currentAgency?.id || 0);
				setCurrentModuleId(modulo.id);
			},
		}));
	}, [currentModules, setCurrentModule, setCurrentSubModules, setCurrentAgencyId, setCurrentModuleId, currentAgency]);

	const currentSubModulesAppLayout: IAppLayoutMenu[] = useMemo(() => {
		return currentSubModules.map(subModule => ({
			title: subModule.name,
			icon: mdiAccountGroup,
			action: () => {
				console.log(`Clicked submodule: ${subModule.name}`);
				// TODO: implementar navegación u otra lógica
			}
		}));
	}, [currentSubModules]);

	return (
		<MainLayoutUIView
			isLoading={isLoading}
			agencies={agenciesAppLayout}
			currentAgency={currentAgency}
			lines={currentModulosAppLayout}
			currentModule={currentModule}
			options={currentSubModulesAppLayout}
		/>
	);
};

export default MainLayoutUI;
