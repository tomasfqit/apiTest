import { PageContainer } from "@ITSA-Nucleo/itsa-fe-components";
import { ModulesUIView } from "./ModulesUI.view";
import { Link as RouterLink } from 'react-router-dom';

export const ModulesUI = () => {
	return <PageContainer
		linkComponent={RouterLink}
		breadCrumbsList={{
			list: [{ route: '/', label: 'Módulos' }],
			lastBreadcrumbLabel: 'Módulos',	
		}}
		title={{
			text: 'Módulos',
			level: 4,
		}}
	>
		<ModulesUIView />
	</PageContainer>;
};

export default ModulesUI;