import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';

export default defineConfig({
	build: {
		target: 'modules',
		outDir: 'es',
		minify: false,
		cssCodeSplit: true,
		rollupOptions: {
			external: ['vue'],
			input: ['src/index.ts'],
			output: [
				{
					format: 'es',
					entryFileNames: '[name].js',
					preserveModules: true,
					dir: 'dist/es',
					preserveModulesRoot: 'src',
				},
				{
					format: 'cjs',
					entryFileNames: '[name].js',
					preserveModules: true,
					dir: 'dist/lib',
					preserveModulesRoot: 'src',
				},
			],
		},
		lib: {
			entry: './index.ts',
			formats: ['es', 'cjs'],
		},
	},
	plugins: [
		vue(),
		dts({
			outputDir: 'dist/es',
			tsConfigFilePath: '../../tsconfig.json',
		}),
		dts({
			outputDir: 'dist/lib',
			tsConfigFilePath: '../../tsconfig.json',
		}),
	],
});
