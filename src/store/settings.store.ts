import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { LOCAL_STORAGE_NAMES } from '../context';

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
			localStorage.setItem(LOCAL_STORAGE_NAMES.agency, agencyId.toString());
			set({ currentAgencyId: agencyId });
		},
		setCurrentModuleId: (moduleId: number) => {
			localStorage.setItem(LOCAL_STORAGE_NAMES.module, moduleId.toString());
			set({ currentModuleId: moduleId });
		},
		getCurrentAgencyId: () => {
			const currentAgencyId = localStorage.getItem(LOCAL_STORAGE_NAMES.agency);
			if (!currentAgencyId) return null;
			return parseInt(currentAgencyId, 10);
		},
		getCurrentModuleId: () => {
			const currentModuleId = localStorage.getItem(LOCAL_STORAGE_NAMES.module);
			if (!currentModuleId) return null;
			return parseInt(currentModuleId, 10);
		},
	})),
);
