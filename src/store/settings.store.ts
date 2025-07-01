import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type SettingsState = {
	currentAgencyId: number | null;
	currentModuleId: number | null;
	setCurrentAgencyId: (agencyId: number) => void;
	setCurrentModuleId: (moduleId: number) => void;
	getCurrentAgencyId: () => number | null;
	getCurrentModuleId: () => number | null;
};

export const useSettingsStore = create<SettingsState>()(
	devtools(set => ({
		setCurrentAgencyId: (agencyId: number) => {
			localStorage.setItem('currentAgencyId', agencyId.toString());
			set({ currentAgencyId: agencyId });
		},
		setCurrentModuleId: (moduleId: number) => {
			localStorage.setItem('currentModuleId', moduleId.toString());
			set({ currentModuleId: moduleId });
		},
		getCurrentAgencyId: () => {
			const currentAgencyId = localStorage.getItem('currentAgencyId');
			if (!currentAgencyId) return null;
			return parseInt(currentAgencyId, 10);
		},
		getCurrentModuleId: () => {
			const currentModuleId = localStorage.getItem('currentModuleId');
			if (!currentModuleId) return null;
			return parseInt(currentModuleId, 10);
		},
	})),
);
