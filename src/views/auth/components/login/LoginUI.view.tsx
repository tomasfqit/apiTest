import { getBackgroundImageByDay } from "@/helpers/functions";
import { ICheckSessionResult } from "@/interfaces/login";
import { useCheckSessionsStore } from "@/store/auth/useCheckSessionsStore";
import { ToastErrorForm } from "@/utils/ToastErrorForm";
import { Button, Card, EInput, ESize, Input } from "@ITSA-Nucleo/itsa-fe-components";
import { ILoginUIHookProps } from "./LoginUI.hook";

export const LoginUIView: React.FC<ILoginUIHookProps> = ({ control, register, handleSubmit, errors, watch }) => {
	const { fetchFunction, isLoading } = useCheckSessionsStore();
	const backgroundImage = getBackgroundImageByDay();


	const onSubmit = () => {
		const data = watch();
		fetchFunction(data, {
			onSuccess: (data: ICheckSessionResult[]) => {
				console.log("onSuccess", data);
			},
			onError: (error: string) => {
				console.log("onError", error);
			}
		})
	};

	return <div
		className={`min-h-screen flex items-center justify-center relative bg-cover bg-center bg-no-repeat`}
		style={{ backgroundImage: `url(${backgroundImage})` }}
	>
		<div className="absolute inset-0 bg-black/50"></div>
		<div className="relative z-10 flex justify-center items-center">
			<Card elevation={ESize.large}>
				<form onSubmit={handleSubmit(onSubmit, ToastErrorForm)}>
					<div className="flex flex-col gap-8 w-[380px] h-[auto] items-center p-4">
						<div className="flex justify-center items-center w-[320px]">
							<img
								src="/logo-tomebamba-negro.png"
								alt="Importadora Tomebamba Logo"
								className="object-contain w-full h-full"
							/>
						</div>
						<div className="text-3xl font-bold text-black">Iniciar Sesión</div>

						<Input type={EInput.text} label="Usuario" control={control} {...register("username")} error={errors?.username?.message as string} />

						<Input type={EInput.password} label="Contraseña" control={control} {...register("password")} error={errors?.password?.message as string} />

						<div className="flex gap-2 w-full justify-center">
							<Button text="Iniciar sesión" type="submit" isLoading={isLoading} />
						</div>
					</div>
				</form>
			</Card>
		</div>
	</div>;
};