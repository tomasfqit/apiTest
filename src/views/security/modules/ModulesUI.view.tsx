import { Button, Input } from "@ITSA-Nucleo/itsa-fe-components";
import { IModulesUIHook } from "./ModulesUI.hook";
import { ModuleList } from "./components/ModuleList";



export const ModulesUIView: React.FC<IModulesUIHook> = ({ control, sWidth, sHeight }) => {

	return (
		<div className="flex flex-col gap-4" style={{ width: sWidth}}>
			<div className="flex flex-row gap-2 w-full items-center justify-between">
				<Input label="Buscar" placeholder="Buscar" name="search" control={control} />
				<Button text="Nuevo" onClick={() => {}} size="large" />
			</div>
			<div className="flex flex-col gap-4 w-full max-h-flex overflow-auto" style={{ height: sHeight }}>
				<ModuleList />
			</div>
		</div>
	);
};