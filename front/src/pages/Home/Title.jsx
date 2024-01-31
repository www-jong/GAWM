import { Link } from "react-router-dom";
import HomeLogo from "../../assets/images/HomeLogo.svg";

function Title() {
	return (
		<Link to="/gawm-front/">
			<img src={HomeLogo} />
		</Link>
	);
}

export default Title;
