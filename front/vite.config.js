import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
	base: '/gawm-front/',
	plugins: [
		react(),
		VitePWA({
			registerType: 'autoUpdate',
			devOptions: { enabled: true }
		})
	],
	server: {
		port: 4000
	}
})
