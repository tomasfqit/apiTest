import { THEME } from '@/constants';
import React from 'react';
interface ModalLoadingProps {
	isOpen: boolean;
	title: string;
}

const LoadingSpinner: React.FC<ModalLoadingProps> = ({ isOpen, title }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
			<div className="flex flex-col items-center space-y-4 rounded-lg bg-transparent p-8">
				<div className="flex justify-center items-center">
					<svg
						className="animate-spin"
						style={{ animationDuration: '2s' }}
						fill={THEME.primaryColor}
						height="80px"
						width="80px"
						version="1.1"
						id="Layer_1"
						xmlns="http://www.w3.org/2000/svg"
						xmlnsXlink="http://www.w3.org/1999/xlink"
						viewBox="0 0 330 330"
						xmlSpace="preserve"
					>
						<g id="XMLID_19_">
							<path id="XMLID_20_" d="M307.5,150h-60c-8.284,0-15,6.716-15,15s6.716,15,15,15h60c8.284,0,15-6.716,15-15S315.784,150,307.5,150z" />
							<path id="XMLID_21_" d="M52.5,150h-30c-8.284,0-15,6.716-15,15s6.716,15,15,15h30c8.284,0,15-6.716,15-15S60.784,150,52.5,150z" />
							<path id="XMLID_22_" d="M157.5,240c-8.284,0-15,6.716-15,15v60c0,8.284,6.716,15,15,15c8.284,0,15-6.716,15-15v-60
								C172.5,246.716,165.784,240,157.5,240z"/>
							<path id="XMLID_23_" d="M157.5,0c-8.284,0-15,6.716-15,15v60c0,8.284,6.716,15,15,15c8.284,0,15-6.716,15-15V15
								C172.5,6.716,165.784,0,157.5,0z"/>
							<path id="XMLID_24_" d="M231.746,218.033c-5.857-5.858-15.355-5.858-21.213,0c-5.858,5.858-5.858,15.355,0,21.213l42.427,42.427
								c2.929,2.929,6.767,4.393,10.606,4.393s7.678-1.464,10.607-4.393c5.858-5.858,5.858-15.355,0-21.213L231.746,218.033z"/>
							<path id="XMLID_25_" d="M62.04,48.328c-5.857-5.857-15.355-5.858-21.213,0c-5.858,5.858-5.858,15.356,0,21.213l42.427,42.426
								c2.929,2.929,6.768,4.393,10.606,4.393c3.839,0,7.678-1.464,10.607-4.394c5.857-5.858,5.857-15.355,0-21.213L62.04,48.328z"/>
							<path id="XMLID_26_" d="M221.14,116.36c3.838,0,7.678-1.465,10.607-4.393l42.427-42.426c5.858-5.858,5.858-15.355,0-21.213
								c-5.859-5.858-15.355-5.857-21.213,0l-42.427,42.426c-5.858,5.858-5.858,15.355,0,21.213
								C213.462,114.896,217.3,116.36,221.14,116.36z"/>
						</g>
					</svg>
				</div>
				<p className="text-lg font-medium text-gray-900 dark:text-gray-100">{title}</p>
			</div>
		</div>
	);
};

export default LoadingSpinner;
