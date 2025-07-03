/** @type {import('tailwindcss').Config} */

export default {
	content: ['./src/**/*.{ts,tsx}', './.storybook/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		colors: {
			// tokens - default honey
			'primary-50': '#FFF8EB',
			'primary-100': '#FFEDC6',
			'primary-200': '#FFD888',
			'primary-300': '#FFBE4A',
			'primary-400': '#FFA726',
			'primary-500': '#EF8329',
			'primary-600': '#EB5C29',
			'primary-700': '#B73D06',
			'primary-800': '#942E0C',
			'primary-900': '#7A260D',

			// Primitive colors

			// white
			'white-100': '#FFFFFF',

			// alpine
			'alpine-50': '#F6F8F9',
			'alpine-100': '#CFD8DC',
			'alpine-200': '#B0BEC5',
			'alpine-300': '#90A4AE',
			'alpine-400': '#78909C',
			'alpine-500': '#607D8B',
			'alpine-600': '#546E7A',
			'alpine-700': '#455A64',
			'alpine-800': '#37474F',
			'alpine-900': '#263238',

			// grey
			'grey-50': '#F7F7F7',
			'grey-100': '#EDEDED',
			'grey-200': '#E0E0E0',
			'grey-300': '#C7C7C7',
			'grey-400': '#ADADAD',
			'grey-500': '#999999',
			'grey-600': '#878787',
			'grey-700': '#666666',
			'grey-800': '#555555',
			'grey-900': '#363636',
			'grey-950': '#292727',

			// red
			'red-50': '#FEF2F2',
			'red-100': '#FFE2E1',
			'red-200': '#FFC9C8',
			'red-300': '#FFA9A0',
			'red-400': '#FD6F6C',
			'red-500': '#F5423E',
			'red-600': '#E53935',
			'red-700': '#BE1B17',
			'red-800': '#9D1A17',
			'red-900': '#821C1A',

			// green
			'green-50': '#F6FEF6',
			'green-100': '#E3FDE5',
			'green-200': '#BFF8C3',
			'green-300': '#99F1A0',
			'green-400': '#6BBD6E',
			'green-500': '#4CAE4F',
			'green-600': '#2C962F',
			'green-700': '#26782A',
			'green-800': '#226325',
			'green-900': '#1E5223',

			// blue
			'blue-50': '#F6FDFE',
			'blue-100': '#E1FAFF',
			'blue-200': '#B0EEFF',
			'blue-300': '#88EAFF',
			'blue-400': '#6DCCE6',
			'blue-500': '#54B0CF',
			'blue-600': '#3B95B9',
			'blue-700': '#2279A2',
			'blue-750': '#10709A',
			'blue-800': '#055988',
			'blue-900': '#034A6F',

			// honey
			'honey-50': '#FFF8EB',
			'honey-100': '#FFEDC6',
			'honey-200': '#FFD888',
			'honey-300': '#FFBE4A',
			'honey-400': '#FFA726',
			'honey-500': '#EF8329',
			'honey-600': '#EB5C29',
			'honey-700': '#B73D06',
			'honey-800': '#942E0C',
			'honey-900': '#7A260D',

			// yellow
			'yellow-50': '#FEFDE8',
			'yellow-100': '#FEFCC7',
			'yellow-200': '#FEF590',
			'yellow-300': '#FFFF74',
			'yellow-400': '#FADF01',
			'yellow-500': '#F8D312',
			'yellow-600': '#E8BB0A',
			'yellow-700': '#C89106',
			'yellow-800': '#A06808',
			'yellow-900': '#84520F',

			'black-100': '#343434',
		},
		extend: {
			clipPath: {
				'inset-50': 'inset(50%)',
			},
			clip: {
				'rect-0': 'rect(0 0 0 0)',
			},
			transitionProperty: {
				height: 'height',
			},
			boxShadow: {
				xs: '0 1px 2px 0 rgba(38, 50, 56, 0.50)',
				sm: '0 1px 4px 0 rgba(38, 50, 56, 0.50)',
				md: '0 1px 4px 0 rgba(207, 126, 220, 0.50)',
				lg: '0 0.5px 8px 0 rgba(207, 216, 220, 1)',
				xl: '', // TBD
			},
			keyframes: {
				ripple: {
					'0%': { width: 0, height: 0, opacity: 0.5 },
					'100%': { width: '500px', height: '500px', opacity: 0 },
				},
				shimmer: {
					'100%': {
						transform: 'translateX(100%)',
					},
				},
			},
			animation: {
				ripple: 'ripple 1s linear',
			},
			fontFamily: {
				montserrat: ['Montserrat', 'sans-serif'],
				roboto: ['Roboto', 'sans-serif'],
			},
		},
		screens: {
			xs: '360px',
			sm: '600px',
			md: '960px',
			lg: '1240px',
			xl: '1440px',
		},
	},
	container: {
		center: true,
		screens: {
			xs: '360px',
			sm: '600px',
			md: '960px',
			lg: '1240px',
		},
	},
	plugins: [],
};
