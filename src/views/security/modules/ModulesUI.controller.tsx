import { PageContainer } from "@ITSA-Nucleo/itsa-fe-components";
import { ModulesUIView } from "./ModulesUI.view";
import { Link as RouterLink } from 'react-router-dom';
import { useSettingsStore } from "@/store/settings.store";
import { useModulesUIHook } from "./ModulesUI.hook";

export const ModulesUI = () => {
	const { programLocalPath } = useSettingsStore();
	const { program, breadcrumbsList } = programLocalPath();
	const { control, sWidth, sHeight } = useModulesUIHook();



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
		
			<ModulesUIView control={control} sWidth={sWidth} sHeight={sHeight} />
	</PageContainer>;
};

export default ModulesUI;