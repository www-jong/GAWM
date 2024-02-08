import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
	base: '/gawm/',
	plugins: [
		react(),
		VitePWA({
			registerType: 'autoUpdate',
<<<<<<< HEAD
			devOptions: {
				enabled: true,
				type: 'module',
			},
=======
>>>>>>> f666414edf321619a2e869a23d5b18e413b22148
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
