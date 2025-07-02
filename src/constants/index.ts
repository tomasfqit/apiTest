export const EXAMPLE = 'EXAMPLE';

export const THEME = {
	primaryColor: 'rgb(168, 65, 65)',
	contrastText: 'rgb(235, 235, 235)',
};

export const INPUTS_MAX_LEN = {
	string7: 7,
	string20: 20,
	string40: 40,
	string60: 60,
	string80: 80,
	string200: 200,
};

export const ITEM_STATUS_OPTIONS: { label: string; value: boolean | string }[] = [
	{ label: 'Activo', value: true },
	{ label: 'Inactivo', value: false },
];

export const ROW_COMMON_CLASSNAMES = 'flex justify-between';

export const EXTERNALS_URLS = {
	userIp: 'https://api.ipify.org?format=json',
};

export const MODULES = {
	vehicles: 'VEHÍCULOS',
};

export const LOCAL_STORAGE_NAMES = {
	agency: 'agency',
	line: 'line',
	module: 'module',
};

export const PERSON_TYPES = {
	naturalPerson: 'NATURAL_PERSON',
	legalEntity: 'LEGAL_ENTITY',
	clientNatural: 'CLIENT_NATURAL',
	clientLegalEntity: 'CLIENT_LEGAL_ENTITY',
	supplierNatural: 'SUPPLIER_NATURAL',
	supplierLegalEntity: 'SUPPLIER_LEGAL_ENTITY',
	carrier: 'CARRIER',
	seller: 'SELLER',
	cdn: 'CDN',
};

export const COLLABORATOR_TYPES = {
	sellers: 'sellers',
	cdn: 'cdn',
};
