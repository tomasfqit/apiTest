import { Button } from "@ITSA-Nucleo/itsa-fe-components";
import { useNavigate } from "react-router-dom";

export const ModulesUIView = () => {
	const navigate = useNavigate();
	return <div className="flex flex-col gap-4 ">
		<div className="flex flex-col gap-2">
			<h1 className="text-2xl font-bold text-red-500 ">Módulosss</h1>
			<Button text="Test" onClick={() => navigate('/home')} />
		</div>
	</div>;
};