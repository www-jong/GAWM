import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Live from "./pages/Live";
import Browse from "./pages/Browse";
import Closet from "./pages/Closet";
import MyPage from "./pages/MyPage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/gawm-front/" element={<Layout />}>
					<Route path="home" element={<Home />} />
					<Route path="live" element={<Live />} />
					<Route path="browse" element={<Browse />} />
					<Route path="closet" element={<Closet />} />
					<Route path="mypage" element={<MyPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App;
