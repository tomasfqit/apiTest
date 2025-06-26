import { Alert, Button, EInput, Input, InputFile } from '@ITSA-Nucleo/itsa-fe-components';
import { IExampleUIHookProps } from './ExampleUI.hook';

const ExampleUIView = ({ control, errors, onSubmit, handleSubmit, setValue }: IExampleUIHookProps) => {
	return (
		<div className="space-y-4 p-20">
			<Alert content="Random Text" />
			<Input type={EInput.number} name="firstAmount" label="Primer monto" control={control} />
			<Input type={EInput.number} name="secondAmount" label="Segundo monto" control={control} />
			<InputFile
				name="inputFile"
				label="Archivo"
				control={control}
				setValue={setValue}
				rules={{ required: 'required' }}
				error={errors.inputFile ? (errors.inputFile.message as string) : undefined}
			/>
			<Button text="calcular" onClick={handleSubmit(data => onSubmit(data))} />
		</div>
	);
};

export default ExampleUIView;
