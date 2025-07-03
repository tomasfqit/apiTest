import path from 'path';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { AliasOptions, defineConfig } from 'vite';

const root = path.resolve(__dirname, 'src');

// https://vite.dev/config/
export default defineConfig({
	plugins: [tailwindcss(), react()],
	resolve: {
		alias: {
			'@': root,
		} as AliasOptions,
	},
});
