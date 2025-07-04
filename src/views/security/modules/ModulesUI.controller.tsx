import { PageContainer } from "@ITSA-Nucleo/itsa-fe-components";
import { ModulesUIView } from "./ModulesUI.view";
import { Link as RouterLink } from 'react-router-dom';
import { useSettingsStore } from "@/store/settings.store";
import { useModulesUIHook } from "./ModulesUI.hook";
import { useLayoutWidth } from "@/views/MainLayout/MainLayoutUI.view";

export const ModulesUI = () => {
	const { programLocalPath } = useSettingsStore();
	const layoutWidth = useLayoutWidth();
	const { program, breadcrumbsList } = programLocalPath();
	const { control } = useModulesUIHook();


	return <PageContainer
		linkComponent={RouterLink}
		breadCrumbsList={{
			list: breadcrumbsList,
			lastBreadcrumbLabel: program,	
		}}
		title={{
			text: program,
			level: 4,
		}}
		isSmall
	>
		
			<ModulesUIView control={control} layoutWidth={layoutWidth} />
	</PageContainer>;
};

export default ModulesUI;