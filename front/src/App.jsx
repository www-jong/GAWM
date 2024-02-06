import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Live from "./pages/Live";
import Browse from "./pages/Browse";
import Closet from "./pages/Closet";
import MyPage from "./pages/MyPage";
import Landing from "./pages/Landing";
import Look from './pages/Look';
import AddClothes from "./pages/AddFashion/AddClothes";
import AddLook from "./pages/AddFashion/AddLookBook";


function App() {
	return (
		<BrowserRouter basename="/gawm">
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="live" element={<Live />} />
					<Route path="browse" element={<Browse />} />
					<Route path="closet" element={<Closet />} />
					<Route path="closet/add" element={<AddClothes />} />
					<Route path="mypage" element={<MyPage />} />
					<Route path="look" element={<Look />} />
					<Route path="look/add" element={<AddLook />} />
					{/* <Route path="/look/:id" element={<Look />} /> */}
				</Route>
				<Route path="landing" element={<Landing />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App;
