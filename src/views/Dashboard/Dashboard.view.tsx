import { capitalize, Card, PageContainer, Progress, useNotification } from '@ITSA-Nucleo/itsa-fe-components';
import { Link as RouterLink } from 'react-router-dom';

import { LOCAL_STORAGE_NAMES, THEME } from '@/constants/index';
import { useSettingsStore } from '@/store/settings.store';
import { getIconByName } from '@/helpers';
import { SvgIcon } from '@/utils/SvgIcon';

const DashboardView = () => {
	const { isLoading, modules, setCurrentModule } = useSettingsStore(state => state);
	const { addInfo } = useNotification();

	const handleModule = (line: string) => {
		addInfo(`Línea seleccionada: ${line}`);
		setCurrentModule(line);
		localStorage.setItem(LOCAL_STORAGE_NAMES.line, line);
	};

	if (isLoading) {
		return <Progress />;
	}

	return (
		<PageContainer
			linkComponent={RouterLink}
			breadCrumbsList={{
				lastBreadcrumbLabel: '',
			}}
			title={{
				text: 'Dashboard',
				level: 4,
			}}
		>
			<div className="grid grid-cols-4 gap-6">
				{modules?.map(modulo => (
					<div key={modulo.id} onClick={() => handleModule(modulo.name)}>
						<Card key={`dashboard-modules-${modulo.id}`} onClick={() => handleModule(modulo.name)}>
							<SvgIcon path={getIconByName(modulo.icon)} size={32} color={THEME.primaryColor} /> {capitalize(modulo.name)}
						</Card>
					</div>
				))}
			</div>
		</PageContainer>
	);
};

export default DashboardView;
