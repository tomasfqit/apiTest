import { destroy as deleteConfig, get as getConfig, patch as patchConfig, post as postConfig } from '@/api/config';
import { safeAxiosCall } from '@/api/safeAxiosCall';
import { AxiosResponse } from 'axios';
import { StateCreator } from 'zustand';
import { TActionType } from '../../types';
import { resetListState } from './zustand.utils';
type ZustandSetFunction<T> = Parameters<StateCreator<T>>[0];

export async function fetchInitialList<T>(
	endpoint: string,
	filters: string,
	set: ZustandSetFunction<T>,
	get: () => { perPage: number },
	handleError: (error: unknown) => void,
	dataKey: keyof T,
): Promise<void> {
	const { perPage } = get();

	await safeAxiosCall<T, AxiosResponse>(
		() => getConfig(`${endpoint}?page=1&perPage=${perPage}&order=name&${filters}`),
		response => {
			const result = response.data;
			set({
				[dataKey]: result.data,
				hasMore: result.metadata.page < result.metadata.totalPages,
				totalCount: result.metadata.total,
				page: 1,
				oneTimeCall: filters ? false : true,
			} as unknown as Partial<T>);
		},
		handleError,
		set,
	);
}

export async function fetchMoreList<T, U>(
	endpoint: string,
	order: string,
	filters: string,
	set: ZustandSetFunction<T>,
	get: () => {
		page: number;
		perPage: number;
	},
	handleError: (error: unknown) => void,
	dataKey: keyof T,
	loadingKey: keyof T,
	ignoreLoadMore?: boolean,
): Promise<void> {
	const { page, perPage } = get();

	const nextPage = ignoreLoadMore ? 1 : page + 1;
	const nextPerPage = ignoreLoadMore ? page * perPage : perPage;
	await safeAxiosCall<T, AxiosResponse>(
		() => getConfig(`${endpoint}?page=${nextPage}&perPage=${nextPerPage}&order=${order}&${filters}`),
		response => {
			const result = response.data;

			set(state => {
				const currentData = (state[dataKey] as U[]) || [];
				return {
					[dataKey]: ignoreLoadMore ? result.data : [...currentData, ...result.data],
					page: nextPage,
					hasMore: result.metadata.page < result.metadata.totalPages,
					totalCount: result.metadata.total,
					[loadingKey]: false,
				} as unknown as Partial<T>;
			});
		},
		handleError,
		set,
		loadingKey,
	);
}

export async function createItem<T, CreateData, IdType = number>(
	endpoint: string,
	itemData: CreateData,
	onSuccess: (action: TActionType, id: IdType) => void,
	handleError: (error: unknown) => void,
	set: ZustandSetFunction<T>,
	resetKey: keyof T,
): Promise<void> {
	await safeAxiosCall<T, AxiosResponse>(
		() => postConfig(endpoint, itemData),
		response => {
			const id = response.data?.data?.personId as IdType;
			onSuccess('create', id);
			resetListState(set, resetKey);
		},
		handleError,
		set,
	);
}

export async function updateItem<T, UpdateData, IdType = number>(
	endpoint: string,
	id: IdType,
	itemData: UpdateData,
	onSuccess: (action: TActionType, id: IdType) => void,
	handleError: (error: unknown) => void,
	set: ZustandSetFunction<T>,
	resetKey: keyof T,
): Promise<void> {
	await safeAxiosCall<T, AxiosResponse>(
		() => patchConfig(`${endpoint}${id}/`, itemData),
		response => {
			const updatedId = response.data?.data?.personId as IdType;
			onSuccess('update', updatedId);
			resetListState(set, resetKey);
		},
		handleError,
		set,
	);
}

export async function deleteItem<T, IdType = number>(
	endpoint: string,
	id: IdType,
	onSuccess: (action: TActionType) => void,
	handleError: (error: unknown) => void,
	set: ZustandSetFunction<T>,
	resetKey: keyof T,
): Promise<void> {
	await safeAxiosCall<T, AxiosResponse>(
		() => deleteConfig(`${endpoint}${id}/`),
		() => {
			onSuccess('delete');
			resetListState(set, resetKey);
		},
		handleError,
		set,
	);
}
