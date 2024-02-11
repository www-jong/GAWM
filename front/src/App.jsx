import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Live from "./pages/Live";
import Browse from "./pages/Browse";
import Closet from "./pages/Closet";
import MyPage from "./pages/MyPage";
import Landing from "./pages/Landing";
import Look from './pages/Look';
import EditLook from './pages/Look/EditLookBook.jsx';
import Loading from './pages/Loading';
import AddClothes from "./pages/AddFashion/AddClothes";
import AddLook from "./pages/AddFashion/AddLookBook";
import MyPageMenu from "./pages/MyPage/Menu";
import MyPageSettings from "./pages/MyPage/Settings";
import MyPageBookmark from "./pages/MyPage/Bookmark";
import MyPageSettingsPropertySetter from "./pages/MyPage/Settings/PropertySetter";
import MyPageAccountList from "./pages/MyPage/AccountList";


function App() {
	return (
		<BrowserRouter basename="/gawm">
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="live" element={<Live />} />
					<Route path="browse" element={<Browse />} />
					<Route path="closet" element={<Closet />} />
					<Route path="mypage" element={<MyPage />}>
						<Route index element={<MyPageMenu />} />
						<Route path="settings">
							<Route index element={<MyPageSettings />} />
							<Route path="nickname" element={<MyPageSettingsPropertySetter />} />
							<Route path="gender" element={<MyPageSettingsPropertySetter />} />
							<Route path="age" element={<MyPageSettingsPropertySetter />} />
						</Route>
						<Route path="bookmark" element={<MyPageBookmark />} />
						<Route path="following" element={<MyPageAccountList />} />
						<Route path="followers" element={<MyPageAccountList />} />
					</Route>
					<Route path="look" element={<Look />} />
					<Route path="look/:lookbookId" element={<Look />} />
                    <Route path="look/edit" element={<EditLook />} />
					<Route path="look/:lookbookId" element={<EditLook />} />                    
				</Route>
				<Route path="closet/add" element={<AddClothes />} />
				<Route path="look/add" element={<AddLook />} />
				<Route path="landing" element={<Landing />} />
				<Route path="loading" element={<Loading />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App;
