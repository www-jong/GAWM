import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Live from "./pages/Live";
import Browse from "./pages/Browse";
import Closet from "./pages/Closet";
import MyPage from "./pages/MyPage";
// import Look from './pages/Look';

function App() {
	return (
		<BrowserRouter basename="/gawm-front">
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="live" element={<Live />} />
					<Route path="browse" element={<Browse />} />
					<Route path="closet" element={<Closet />} />
					<Route path="mypage" element={<MyPage />} />
					{/* <Route path="/look/:id" element={<Look />} /> */}
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App;
