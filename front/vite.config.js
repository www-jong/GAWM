import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
	base: '/gawm/',
	plugins: [
		react(),
		VitePWA({
			registerType: 'autoUpdate',
			devOptions: {
				enabled: true,
				type: 'module',
			},
		})
	],
	server: {
		port: 4000
	},
	build: {
		rollupOptions: {
			input: {
				main: "./index.html",
				sw: "./sw.js",
			},
		},
	},
})
