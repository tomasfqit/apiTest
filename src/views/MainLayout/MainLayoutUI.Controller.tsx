import { IActionPanelOption, IAppLayoutMenu } from "@ITSA-Nucleo/itsa-fe-components";
import { mdiAccountGroup } from "@mdi/js";
import { useMemo } from "react";
import { useValidateNavigate } from "../../hooks/useValidateNavigate";
import { IPrograms, ISubModules } from "../../interfaces/IMenuItems";
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
		setCurrentSubModules
	} = useMainLayoutHook();
	const { validateNavigate } = useValidateNavigate();

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

	const menuOptions: IAppLayoutMenu[] = useMemo(() => {
		const res = currentModule?.submodules.map((submodule: ISubModules) => ({
			title: submodule.name,
			icon: mdiAccountGroup,
			subList: submodule.programs.map((program: IPrograms) => ({
				title: program.name,
				icon: mdiAccountGroup,
				action: () => {
					console.log('variables =>', program.id, currentAgency?.id);
					validateNavigate(program.path, program.id, currentAgency?.id || 0);
				},
			})),
		}));
		return res ?? [];
	}, [currentAgency?.id, currentModule?.submodules, validateNavigate]);

	return (
		<MainLayoutUIView
			isLoading={isLoading}
			agencies={agenciesAppLayout}
			currentAgency={currentAgency}
			lines={currentModulosAppLayout}
			currentModule={currentModule}
			options={menuOptions}
		/>
	);
};

export default MainLayoutUI;
