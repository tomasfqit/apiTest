import { ToastErrorForm } from "@/utils/ToastErrorForm";
import { Button, EInput, Input } from "@ITSA-Nucleo/itsa-fe-components";
import { ILoginUIHookProps } from "./LoginUI.hook";


export const LoginUIView: React.FC<ILoginUIHookProps> = ({ control, register, handleSubmit, errors, onSubmit, isLoading, backgroundImage }) => {

	return <div
		className={`min-h-screen flex items-center justify-center relative bg-cover bg-center bg-no-repeat px-4`}
		style={{ backgroundImage: `url(${backgroundImage})` }}
	>
		<div className="absolute inset-0 bg-black/50"></div>
		<div className="relative z-10 flex justify-center items-center w-full">
			{/* <Card elevation={ESize.large}> */}
			<div className="w-full max-w-[400px] sm:max-w-[60%] lg:max-w-[30%] 2xl:max-w-[25%] bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl p-4 sm:p-6 md:p-8">
				<form onSubmit={handleSubmit(onSubmit, ToastErrorForm)}>
					<div className="flex flex-col gap-4 sm:gap-6 md:gap-8 w-full items-center">
						<div className="flex justify-center items-center w-32 sm:w-40 md:w-48 lg:w-56">
							<img
								src="/logo-tomebamba-negro.png"
								alt="Importadora Tomebamba Logo"
								className="object-contain w-full h-full"
							/>
						</div>
						<div className="text-2xl sm:text-3xl md:text-4xl font-bold text-black text-center">Iniciar Sesión</div>
						<div className="w-full space-y-4 sm:space-y-6">
							<Input type={EInput.text} label="Usuario" control={control} {...register("username")} error={errors?.username?.message as string} />
							<Input type={EInput.password} label="Contraseña" control={control} {...register("password")} error={errors?.password?.message as string} />
						</div>
						<div className="flex gap-2 w-full justify-center pt-2">
							<Button text="Iniciar sesión" type="submit" isLoading={isLoading} />
						</div>
					</div>
				</form>
			</div>
			{/* </Card> */}
		</div>
	</div>;
};