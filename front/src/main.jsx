import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { registerSW } from 'virtual:pwa-register';

if ('serviceWorker' in navigator) {
	registerSW({
	  onNeedRefresh() {
		// 사용자에게 업데이트가 필요하다고 알림
	  },
	  onOfflineReady() {
		// PWA가 오프라인에서 사용 가능하다고 알림
	  },
	});
  }

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
)
