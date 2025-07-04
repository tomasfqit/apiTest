import { capitalize, Card, Input, Progress, useNotification } from '@ITSA-Nucleo/itsa-fe-components';

import { LOCAL_STORAGE_NAMES, THEME } from '@/constants/index';
import { useSettingsStore } from '@/store/settings.store';
import { getIconByName } from '@/helpers';
import { SvgIcon } from '@/utils/SvgIcon';
import { IDashboardUIHook } from './DashboardUI.hook';

const DashboardView: React.FC<IDashboardUIHook> = ({ control, shareText }) => {
	const { isLoading, modules, setCurrentModule } = useSettingsStore(state => state);
	const { addInfo } = useNotification();

	console.log('shareText =>', shareText);

	const handleModule = (line: string) => {
		addInfo(`Línea seleccionada: ${line}`);
		setCurrentModule(line);
		localStorage.setItem(LOCAL_STORAGE_NAMES.line, line);
	};

	if (isLoading) {
		return <Progress />;
	}

	return (

		<div className="flex flex-col gap-6  w-full h-full">
			<Input name="shareText" label="Buscar modulo" control={control} />
			{modules?.map(modulo => (
				<div key={modulo.id} onClick={() => handleModule(modulo.name)} className="flex items-center justify-center gap-2 max-w-auto">
					<Card onClick={() => handleModule(modulo.name)}>
						<div className="flex items-center justify-center gap-2 w-full min-w-[150px]">
							<SvgIcon path={getIconByName(modulo.icon)} size={32} color={THEME.primaryColor} />
							<span className="text-lg">{capitalize(modulo.name)}</span>
						</div>
					</Card>
				</div>
			))}
		</div>
	);
};

export default DashboardView;
