import { Table } from "@ITSA-Nucleo/itsa-fe-components";

export const ModulesUIView = () => {
	return <div className="flex flex-col gap-4 w-full h-full">
		
		<Table
			columns={[
				'ID',
				'Partner Name',
				'Country',
				'City',
				'Connection',
				'Date of creation',
				'Last update',
				'Opt1',
				'Opt2',
				'Opt3'
			]}
			data={[
				{
					address: {
						city: 'Berlin',
						country: 'Germany'
					},
					connection_type: [
						'API_PULL'
					],
					created_on: '01.01.2021',
					id: '1',
					modified_on: '01.01.2021',
					name: 'Ota 4',
					opt1: '1',
					opt2: '2',
					opt3: '3'
				},
				{
					address: {
						city: 'Caracas',
						country: 'Venezuela'
					},
					connection_type: [
						'API_PULL'
					],
					created_on: '01.01.2021',
					id: '2',
					modified_on: '01.01.2021',
					name: 'Ota 4',
					opt1: '1',
					opt2: '2',
					opt3: '3'
				},
				{
					address: {
						city: 'Quito',
						country: 'Ecuador'
					},
					connection_type: [
						'API_PULL'
					],
					created_on: '01.01.2021',
					id: '3',
					modified_on: '01.01.2021',
					name: 'Ota 4',
					opt1: '1',
					opt2: '2',
					opt3: '3'
				},
				{
					address: {
						city: 'Lublin',
						country: 'Poland'
					},
					connection_type: [
						'API_PULL'
					],
					created_on: '01.01.2021',
					id: '4',
					modified_on: '01.01.2021',
					name: 'Ota 4',
					opt1: '1',
					opt2: '2',
					opt3: '3'
				},
				{
					address: {
						city: 'Lublin',
						country: 'Poland'
					},
					connection_type: [
						'API_PULL'
					],
					created_on: '01.01.2021',
					id: '11',
					modified_on: '01.01.2021',
					name: 'Ota 4',
					opt1: '1',
					opt2: '2',
					opt3: '3'
				},
				{
					address: {
						city: 'Lublin',
						country: 'Poland'
					},
					connection_type: [
						'API_PULL'
					],
					created_on: '01.01.2021',
					id: '22',
					modified_on: '01.01.2021',
					name: 'Ota 4',
					opt1: '1',
					opt2: '2',
					opt3: '3'
				},
				{
					address: {
						city: 'Lublin',
						country: 'Poland'
					},
					connection_type: [
						'API_PULL'
					],
					created_on: '01.01.2021',
					id: '33',
					modified_on: '01.01.2021',
					name: 'Ota 4',
					opt1: '1',
					opt2: '2',
					opt3: '3'
				},
				{
					address: {
						city: 'Lublin',
						country: 'Poland'
					},
					connection_type: [
						'API_PULL'
					],
					created_on: '01.01.2021',
					id: '44',
					modified_on: '01.01.2021',
					name: 'Ota 4',
					opt1: '1',
					opt2: '2',
					opt3: '3'
				}
			]}
			fields={[
				'id',
				'name',
				'address.country',
				'address.city',
				'connection_type',
				'created_on',
				'modified_on',
				'opt1',
				'opt2',
				'opt3'
			]}
			id="table-test-sb"
		/>
	</div>;
};