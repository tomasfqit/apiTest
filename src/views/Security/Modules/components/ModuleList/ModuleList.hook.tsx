import { ISecurityModuleResult } from "@/views/Security/IModule";
import { useSecurityModuleStore } from "@/store/security/module/module.store";
import { useEffect } from "react";
import { ActionPanel, TABLE_HEADER_ACTIONS } from "@ITSA-Nucleo/itsa-fe-components";
import { TTableData } from "@ITSA-Nucleo/itsa-fe-components";
import { useSettingsStore } from "@/store/settings.store";


export const useModuleListHook = ()=> {
    	const { fetchModules, securityModules, isLoading } = useSecurityModuleStore();
		const { programLocalPath } = useSettingsStore();
		const { program } = programLocalPath();
		const actions = program?.actions;
		console.log('actions =>',actions);

			useEffect(() => {
				fetchModules({});
			}, [fetchModules]);


	const parsedData: TTableData =
		securityModules?.map((elem: ISecurityModuleResult) => {
			return {
				...elem,
				[TABLE_HEADER_ACTIONS]: (
					<ActionPanel
						id="action-panel-people-management"
						options={[
							{
								title: actions?.update ?? '',
								action: () => {}
							}
						]}
					/>
				),
			};
		}) || [];



	return {
		moduleList: parsedData,
		isLoading,
	};
};



