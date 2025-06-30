"use client";
import { AppLayout } from "@ITSA-Nucleo/itsa-fe-components";
import { Outlet } from "react-router-dom";
import { IMainLayoutUI } from "./MainLayoutUI.hook";

export const MainLayoutUIView: React.FC<IMainLayoutUI> = ({ agencies, currentAgency, currentModules }) => {
	console.log('currentModules =>', currentModules);
	return <div className="h-[100vh] w-[100vw]">
		<AppLayout
			agencies={agencies}
			avatar={{
				name: 'John Doe'
			}}
			currentPath="/sub-route-1"
			headerTitles={
				{
					agency: currentAgency?.nombre || '',
					module: currentModules[0]?.title as string,
				}
			}
			notifications={[
				{
					action: () => { },
					title: <p>Notification 1</p>
				}
			]}
			options={[
				{
					icon: 'M21,15.61L19.59,17L14.58,12L19.59,7L21,8.39L17.44,12L21,15.61M3,6H16V8H3V6M3,13V11H13V13H3M3,18V16H16V18H3Z',
					subList: [
						{
							icon: 'M21,15.61L19.59,17L14.58,12L19.59,7L21,8.39L17.44,12L21,15.61M3,6H16V8H3V6M3,13V11H13V13H3M3,18V16H16V18H3Z',
							route: '/sub-route-1',
							title: 'sub Route 1'
						},
						{
							icon: 'M21,15.61L19.59,17L14.58,12L19.59,7L21,8.39L17.44,12L21,15.61M3,6H16V8H3V6M3,13V11H13V13H3M3,18V16H16V18H3Z',
							route: '/sub-route-2',
							title: 'sub Route 2'
						},
						{
							icon: 'M21,15.61L19.59,17L14.58,12L19.59,7L21,8.39L17.44,12L21,15.61M3,6H16V8H3V6M3,13V11H13V13H3M3,18V16H16V18H3Z',
							route: '/sub-route-3',
							title: 'sub Route 3'
						}
					],
					title: 'Route 1'
				},
				{
					hidden: false,
					icon: 'M21,15.61L19.59,17L14.58,12L19.59,7L21,8.39L17.44,12L21,15.61M3,6H16V8H3V6M3,13V11H13V13H3M3,18V16H16V18H3Z',
					route: '/route-example-2',
					title: 'Route 2'
				},
				{
					hidden: true,
					icon: 'M21,15.61L19.59,17L14.58,12L19.59,7L21,8.39L17.44,12L21,15.61M3,6H16V8H3V6M3,13V11H13V13H3M3,18V16H16V18H3Z',
					subList: [
						{
							icon: 'M21,15.61L19.59,17L14.58,12L19.59,7L21,8.39L17.44,12L21,15.61M3,6H16V8H3V6M3,13V11H13V13H3M3,18V16H16V18H3Z',
							route: '/sub-route-31',
							title: 'sub Route 31'
						},
						{
							icon: 'M21,15.61L19.59,17L14.58,12L19.59,7L21,8.39L17.44,12L21,15.61M3,6H16V8H3V6M3,13V11H13V13H3M3,18V16H16V18H3Z',
							route: '/sub-route-32',
							title: 'sub Route 32'
						},
						{
							icon: 'M21,15.61L19.59,17L14.58,12L19.59,7L21,8.39L17.44,12L21,15.61M3,6H16V8H3V6M3,13V11H13V13H3M3,18V16H16V18H3Z',
							route: '/sub-route-33',
							title: 'sub Route 33'
						}
					],
					title: 'Route 3'
				},
				{
					hidden: false,
					icon: 'M21,15.61L19.59,17L14.58,12L19.59,7L21,8.39L17.44,12L21,15.61M3,6H16V8H3V6M3,13V11H13V13H3M3,18V16H16V18H3Z',
					route: '/route-example-4',
					title: 'Route 4'
				},
				{
					icon: 'M21,15.61L19.59,17L14.58,12L19.59,7L21,8.39L17.44,12L21,15.61M3,6H16V8H3V6M3,13V11H13V13H3M3,18V16H16V18H3Z',
					subList: [
						{
							icon: 'M21,15.61L19.59,17L14.58,12L19.59,7L21,8.39L17.44,12L21,15.61M3,6H16V8H3V6M3,13V11H13V13H3M3,18V16H16V18H3Z',
							route: '/sub-route-51',
							title: 'sub Route 51'
						},
						{
							icon: 'M21,15.61L19.59,17L14.58,12L19.59,7L21,8.39L17.44,12L21,15.61M3,6H16V8H3V6M3,13V11H13V13H3M3,18V16H16V18H3Z',
							route: '/sub-route-52',
							target: '_blank',
							title: 'sub Route 52'
						},
						{
							hidden: true,
							icon: 'M21,15.61L19.59,17L14.58,12L19.59,7L21,8.39L17.44,12L21,15.61M3,6H16V8H3V6M3,13V11H13V13H3M3,18V16H16V18H3Z',
							route: '/sub-route-53',
							title: 'sub Route 53'
						}
					],
					title: 'Route 5'
				},
				{
					hidden: true,
					icon: 'M21,15.61L19.59,17L14.58,12L19.59,7L21,8.39L17.44,12L21,15.61M3,6H16V8H3V6M3,13V11H13V13H3M3,18V16H16V18H3Z',
					route: '/route-example-6',
					title: 'Route 6'
				}
			]}
			settings={[
				{
					hidden: false,
					route: '/route-example',
					title: 'Option 1'
				},
				{
					action: () => { },
					hidden: false,
					title: 'Option 2'
				},
				{
					hidden: true,
					route: '/route-example-2',
					target: '_blank',
					title: 'Option 3'
				},
				{
					action: () => { },
					confirm: {
						message: 'random text to confirm',
						title: 'Confirm'
					},
					title: 'Option 4'
				}
			]}
			lines={currentModules}
		>
			<Outlet />
		</AppLayout>
	</div>;
};