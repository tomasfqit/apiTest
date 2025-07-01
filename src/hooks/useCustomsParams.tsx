import { useSearchParams } from "react-router-dom";

export const useCustomsParams = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	return { searchParams, setSearchParams };
};