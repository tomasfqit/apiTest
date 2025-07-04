import { Table } from "@ITSA-Nucleo/itsa-fe-components";
import { useModuleListHook } from "./ModuleList.hook";

export const ModuleList = () => {
    const { moduleList } = useModuleListHook();

    console.log('moduleList =>',moduleList);

	return (
        <Table
            columns={[
                'Nombre'
            ]}
            data={moduleList}
            fields={[
                'nombre',
            ]}
            id="table-test-sb"  
        />)
};