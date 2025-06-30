import { mdiLoading } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';
import { THEME } from '../../constants';
interface ModalLoadingProps {
	isOpen: boolean;
	title: string;
}

const ModalLoading: React.FC<ModalLoadingProps> = ({ isOpen, title }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
			<div className="flex flex-col items-center space-y-4 rounded-lg p-8">
				<Icon path={mdiLoading}
					title="User Profile"
					size={2}
					horizontal
					vertical
					rotate={90}
					color={THEME.primaryColor}
					spin
				/>
				<p className="text-lg font-medium text-gray-900 dark:text-gray-100">{title}</p>
			</div>
		</div>
	);
};

export default ModalLoading;
