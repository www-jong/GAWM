import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
	return (
		<>
			<header className="fixed bottom-0 left-0 right-0 p-2 z-50 bg-[#efefef]">
				<Navbar />
			</header>
			<main className="font-pretendard">
				<Outlet />
			</main>
		</>
	)
}

export default Layout;
