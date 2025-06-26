import { Button, Card, EInput, ESize, Input } from "@ITSA-Nucleo/itsa-fe-components";
import { getBackgroundImageByDay } from "../../../../helpers/functions";
import { ILoginUIHookProps } from "./LoginUI.hook";



export const LoginUI: React.FC<ILoginUIHookProps> = ({ control }) => {
	const backgroundImage = getBackgroundImageByDay();
	return <div
		className={`min-h-screen flex items-center justify-center relative bg-cover bg-center bg-no-repeat`}
		style={{ backgroundImage: `url(${backgroundImage})` }}
	>
		<div className="absolute inset-0 bg-black/50"></div>
		<div className="relative z-10 flex justify-center items-center">
			<Card elevation={ESize.large}>
				<div className="flex flex-col gap-8 w-[360px] h-[420px] items-center">
					<div className="flex justify-center items-center w-[250px]">
						<img
							src="/logo-tomebamba-negro.png"
							alt="Importadora Tomebamba Logo"
							className="object-contain w-full h-full"
						/>
					</div>
					<div className="text-3xl font-bold text-black">Iniciar Sesión</div>
					<Input type={EInput.text} label="Usuario" name="user" control={control} />
					<Input type={EInput.password} label="Contraseña" name="password" control={control} />
					<Button text="Iniciar sesión" />
				</div>
			</Card>
		</div>
	</div>;
};