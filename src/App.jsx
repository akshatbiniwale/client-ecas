import { Routes, Route } from "react-router-dom";
import Footer from "./components/footer";
import Home from "./pages/home";
import OperatorLogin from "./pages/OperatorLogin";
import OperatorCreateUsers from "./pages/OperatorCreateUsers";
import OperatorCreateCourse from "./pages/OperatorCreateCourse";

const App = () => {
	return (
		<div>
			<Routes>
				<Route index path="/" element={<Home />} />
				<Route path="/operator">
					<Route path="login" element={<OperatorLogin />} />
					<Route path="home">
						<Route
							path="create-users"
							element={<OperatorCreateUsers />}
						/>
						<Route
							path="create-course"
							element={<OperatorCreateCourse />}
						/>
					</Route>
				</Route>
			</Routes>
			<Footer />
		</div>
	);
};

export default App;
