import { MainLayoutUIView } from "./MainLayoutUI.view";

const MainLayoutUI = () => {

	// const { getPermissions, data, isLoading, currentAgency, currentModule } = useGetPermissions(
	// 	state => ({
	// 		getPermissions: state.getPermissions,
	// 		data: state.data,
	// 		isLoading: state.isLoading,
	// 		currentAgency: state.currentAgency,
	// 		currentModule: state.currentModule,
	// 	}),
	// 	shallow
	// );
	// useEffect(() => {
	// 	if (data) return;
	// 	getPermissions();
	// }, [getPermissions, data]);

	// const noop = () => { };

	// const agencies = useMemo(() => getFormattedDataMenu(data ?? [], noop), [data]);
	// const lines = useMemo(() => getFormattedDataMenu(currentAgency?.modules ?? [], noop), [currentAgency]);



	return (
		<MainLayoutUIView />
	);
};

export default MainLayoutUI;



// const {
// 	isLoading,
// 	agencies,
// 	currentAgency,
// 	setCurrentAgency,
// 	currentModules,
// 	currentModule,
// 	setCurrentModule,
// 	setCurrentSubModules
// } = useMainLayoutHook();
// // const { validateNavigate } = useValidateNavigate();

// const { setCurrentAgencyId, setCurrentModuleId } = useSettingsStore();

// const agenciesAppLayout = useMemo(() => {
// 	return agencies.map(agency => ({
// 		title: agency.name,
// 		action: () => {
// 			if (!agency.modules?.length) return;
// 			const firstModule = agency.modules[0];
// 			setCurrentAgency(agency);
// 			setCurrentModule(firstModule);
// 			setCurrentSubModules(firstModule.submodules);
// 			setCurrentAgencyId(agency.id);
// 			setCurrentModuleId(firstModule.id);
// 		},
// 	}));
// }, [agencies, setCurrentAgency, setCurrentModule, setCurrentSubModules, setCurrentAgencyId, setCurrentModuleId]);

// const currentModulosAppLayout: IActionPanelOption[] = useMemo(() => {
// 	return currentModules.map(modulo => ({
// 		title: modulo.name,
// 		action: () => {
// 			setCurrentModule(modulo);
// 			setCurrentSubModules(modulo.submodules);
// 			setCurrentAgencyId(currentAgency?.id || 0);
// 			setCurrentModuleId(modulo.id);
// 		},
// 	}));
// }, [currentModules, setCurrentModule, setCurrentSubModules, setCurrentAgencyId, setCurrentModuleId, currentAgency]);

// const menuOptions = useMemo(() => {
// 	const res = currentModule?.submodules.map((submodule: ISubModules) => {
// 		return {
// 			title: submodule.name,
// 			icon: mdiAccountGroup,
// 			route: submodule.path,
// 			action: () => {
// 				console.log('submodule =>', submodule.name);
// 			},
// 		};
// 	});
// 	return res ?? [];
// }, [currentModule?.submodules]);

