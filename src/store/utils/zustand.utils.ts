import { StateCreator } from 'zustand';

type ZustandSet<T> = Parameters<StateCreator<T>>[0];

export const setStateKey = <T>(set: ZustandSet<T>, key: keyof T, value: T[keyof T]) => {
	set({ [key]: value } as Partial<T>);
};

export const resetListState = <T>(
	set: ZustandSet<T>,
	itemKey: keyof T, // Ej: 'people', 'carriers', etc
	defaultValue: unknown[] | null = null,
	options: Partial<T> = {},
) => {
	set({
		[itemKey]: defaultValue,
		...(options as Partial<T>),
		page: 1,
		hasMore: true,
		error: null,
		isLoading: false,
	} as Partial<T>);
};
