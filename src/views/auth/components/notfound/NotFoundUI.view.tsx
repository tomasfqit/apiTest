import { ErrorPage } from "@ITSA-Nucleo/itsa-fe-components";

export const NotFoundUI = () => {
	return <ErrorPage
		error="404"
		handleClick={() => { }}
		message="Página no encontrada"
	/>;
};