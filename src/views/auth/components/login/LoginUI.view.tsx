import { Button, Card, EInput, ESize, Input } from "@ITSA-Nucleo/itsa-fe-components";
import { getBackgroundImageByDay } from "../../../../helpers/functions";
import { ILoginUIHookProps } from "./LoginUI.hook";



export const LoginUIView: React.FC<ILoginUIHookProps> = ({ control, watch, register }) => {
	const backgroundImage = getBackgroundImageByDay();
	const onSubmit = () => {
		console.log('variables =>', watch());
	};

	return <div
		className={`min-h-screen flex items-center justify-center relative bg-cover bg-center bg-no-repeat`}
		style={{ backgroundImage: `url(${backgroundImage})` }}
	>
		<div className="absolute inset-0 bg-black/50"></div>
		<div className="relative z-10 flex justify-center items-center">
			<Card elevation={ESize.large}>
				<div className="flex flex-col gap-8 w-[380px] h-[420px] items-center">
					<div className="flex justify-center items-center w-[320px]">
						<img
							src="/logo-tomebamba-negro.png"
							alt="Importadora Tomebamba Logo"
							className="object-contain w-full h-full"
						/>
					</div>
					<div className="text-3xl font-bold text-black">Iniciar Sesión</div>
					<Input type={EInput.text} label="Usuario" control={control} {...register("username")} />
					<Input type={EInput.password} label="Contraseña" control={control} {...register("password")} />
					<Button text="Iniciar sesión" onClick={onSubmit} />
				</div>
			</Card>
		</div>
	</div>;
};