import { Button, Card, EInput, ESize, Input } from "@ITSA-Nucleo/itsa-fe-components";
import { ILoginUIHookProps } from "./LoginUI.hook";



export const LoginUI: React.FC<ILoginUIHookProps> = ({ control }) => {

	return <div className="w-full h-full flex justify-center items-center">
		<div className="flex justify-center items-center">
			<Card elevation={ESize.large}>
				<div className="flex flex-col gap-8 w-[300px] h-[300px] justify-center items-center">
					<Input type={EInput.text} label="Usuario" name="user" control={control} />
					<Input type={EInput.password} label="Contraseña" name="password" control={control} />
					<Button text="Iniciar sesión" />
				</div>
			</Card>
		</div>
	</div>;
};