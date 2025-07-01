"use client";
import { AppLayout, IActionPanelOption, IAppLayoutMenu } from "@ITSA-Nucleo/itsa-fe-components";
import { Outlet } from "react-router-dom";
import { IAgencyModules, IModules } from "../../interfaces/IMenuItems";

interface IMainLayoutUIView {
	isLoading: boolean;
	agencies: IActionPanelOption[];
	currentAgency: IAgencyModules | null;
	lines: IActionPanelOption[];
	currentModule: IModules | null;
	options: IAppLayoutMenu[]
}

export const MainLayoutUIView: React.FC<IMainLayoutUIView> = ({ isLoading, agencies, currentAgency, lines, currentModule, options }) => {

	return <div className="h-[100vh] w-[100vw]">
		<AppLayout
			agencies={agencies}
			avatar={{
				name: 'John Doe'
			}}
			currentPath="/sub-route-1"
			headerTitles={
				{
					agency: currentAgency?.name || '',
					module: currentModule?.name || '',
				}
			}
			notifications={[
				{
					action: () => { },
					title: <p>Notification 1</p>
				}
			]}
			options={options}
			settings={[
				{
					action: () => { },
					confirm: {
						message: 'random text to confirm',
						title: 'Confirm'
					},
					title: 'Option 4'
				}
			]}
			lines={lines}
			isLoading={isLoading}
		>
			<Outlet />
		</AppLayout>
	</div>;
};