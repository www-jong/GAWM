import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path';


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
	resolve: {
		alias: {
		  '@': path.resolve(__dirname, './src')
		}
	  }
	// build: {
	// 	rollupOptions: {
	// 		input: {
	// 			main: "./index.html",
	// 			sw: "./sw.js",
	// 		},
	// 	},
	// },
})
