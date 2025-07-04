import { PageContainer } from "@ITSA-Nucleo/itsa-fe-components";
import { ModulesUIView } from "./ModulesUI.view";
import { Link as RouterLink } from 'react-router-dom';
import { useSettingsStore } from "@/store/settings.store";

export const ModulesUI = () => {
	const { currentModule } = useSettingsStore();
	const program = "MÓDULOS";
	
	return <PageContainer
		linkComponent={RouterLink}
		breadCrumbsList={{
			list: [{ route: '/', label: currentModule ?? '' }],
			lastBreadcrumbLabel: program,	
		}}
		title={{
			text: program,
			level: 4,
		}}
		isSmall
	>
		<ModulesUIView />
	</PageContainer>;
};

export default ModulesUI;