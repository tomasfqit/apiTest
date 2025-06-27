import { ICheckSessionResult } from "@/interfaces/login";
import { Button, ESize, IconButton } from "@ITSA-Nucleo/itsa-fe-components";
import { mdiTrashCan } from "@mdi/js";


interface IListActiveSessionsProps {
	activeSessions: ICheckSessionResult[];
	parser: (res: string) => string;
	handleContinue: () => void;
	closeModal: () => void;
	isLoading: boolean;
	handleCloseSession: (session: ICheckSessionResult) => void;
}


export const ListActiveSessionsUIView: React.FC<IListActiveSessionsProps> = ({ activeSessions, parser, handleContinue, closeModal, isLoading, handleCloseSession }) => {


	return <div className="flex flex-col gap-4 w-full">
		<span className="text-sm text-gray-500">Eliminar una sesión activa para continuar</span>
		{activeSessions.map((session) => (
			<div key={session.id} className='flex bg-red-100 border border-gray-200 rounded-md p-2 justify-between items-center'>
				<div className='flex flex-col gap-1'>
					<p>{parser(session.dispositivo_conexion)}</p>
					<small>
						Se inició sesión el:
						{new Date(session.hora_inicio).toLocaleDateString("es-EC", {
							weekday: "long",
							year: "numeric",
							month: "long",
							day: "numeric",
							hour: "2-digit",
							minute: "2-digit",
						})}
					</small>
				</div>
				<IconButton
					ariaLabel="Eliminar sesión"
					icon={mdiTrashCan}
					className="text-red-500 bg-white rounded-full p-2"
					onClick={() => handleCloseSession(session)}
					size={ESize.large}
				/>
			</div>
		))}
		<div className="flex justify-end gap-2">
			<Button text="Cancelar" variant="outlined" onClick={closeModal} isDisabled={isLoading} />
			<Button text="Continuar" variant="contained" onClick={handleContinue} isDisabled={isLoading} />
		</div>
	</div>;
};