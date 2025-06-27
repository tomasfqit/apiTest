type ZustandSet<T> = Parameters<import('zustand').StateCreator<T>>[0];

export const safeAxiosCall = async <StoreType, ResponseType>(
	axiosCall: () => Promise<ResponseType>,
	onSuccess: (data: ResponseType) => void,
	onError: (error: unknown) => void,
	set: ZustandSet<StoreType>,
	loadingKey: keyof StoreType = 'isLoading' as keyof StoreType,
	errorKey: keyof StoreType = 'error' as keyof StoreType,
) => {
	set({
		[loadingKey]: true,
		[errorKey]: null,
	} as Partial<StoreType>);

	try {
		const response = await axiosCall();
		onSuccess(response);
	} catch (error) {
		onError(error);
		set({
			[loadingKey]: false,
			[errorKey]: error,
		} as Partial<StoreType>);
	} finally {
		set({
			[loadingKey]: false,
		} as Partial<StoreType>);
	}
};
