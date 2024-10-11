import { Routes, Route } from "react-router-dom";
import Footer from "./components/footer";
import Home from "./pages/home";
import { Toaster } from "react-hot-toast";
import OperatorLogin from "./pages/operator/OperatorLogin";
import OperatorCreateUsers from "./pages/operator/OperatorCreateUsers";
import OperatorCreateCourse from "./pages/operator/OperatorCreateCourse";
import OperatorPublish from "./pages/operator/OperatorPublish";
import StudentHome from "./pages/student/StudentHome";

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
						<Route path="publish" element={<OperatorPublish />} />
					</Route>
				</Route>
				<Route path="/student">
					<Route path="home" element={<StudentHome />} />
				</Route>
			</Routes>
			<Footer />
			<Toaster />
		</div>
	);
};

export default App;
