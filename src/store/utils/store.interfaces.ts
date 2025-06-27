export interface IStatesStore {
	isLoading: boolean;
	isFetchingMore: boolean;
	error: string | null;
	page: number;
	perPage: number;
	hasMore: boolean;
	totalCount: number;
	oneTimeCall: boolean;
}
