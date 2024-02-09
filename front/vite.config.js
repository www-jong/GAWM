import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
	base: '/gawm/',
	plugins: [
		react(),
		VitePWA({
			registerType: 'autoUpdate',
		})
	],
	server: {
		port: 4000
	},
	// build: {
	// 	rollupOptions: {
	// 		input: {
	// 			main: "./index.html",
	// 			sw: "./sw.js",
	// 		},
	// 	},
	// },
})
