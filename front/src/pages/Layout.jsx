import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function App() {
	return (
		<>
			<header className="fixed bottom-0 left-0 right-0 px-8 py-2 bg-[#efefef]">
				<Navbar />
			</header>
			<main>
				<Outlet />
			</main>
		</>
	)
}

export default Layout;
