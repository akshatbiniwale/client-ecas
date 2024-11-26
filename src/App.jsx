import { Routes, Route } from "react-router-dom";
import Footer from "./components/footer";
import Home from "./pages/home";
import { Toaster } from "react-hot-toast";
import Login from "./pages/operator/Login";
import CreateUsers from "./pages/operator/CreateUsers";
import CreateCourse from "./pages/operator/CreateCourse";
import Publish from "./pages/operator/Publish";
import Downloads from "./pages/student/Downloads";
import CreateRooms from "./pages/operator/settings/OperatorCreateRooms";
import ManageCourses from "./pages/faculty/ManageCourses";
import PublishGrades from "./pages/faculty/PublishGrades";
import Analyse from "./pages/student/Analyse";

const App = () => {
	return (
		<div>
			<Routes>
				<Route index path="/" element={<Home />} />
				<Route path="/operator">
					<Route path="login" element={<Login />} />
					<Route path="home">
						<Route
							path="create-users"
							element={<CreateUsers />}
						/>
						<Route
							path="create-course"
							element={<CreateCourse />}
						/>
						<Route path="publish" element={<Publish />} />
						<Route path="settings">
							<Route
								path="create-rooms"
								element={<CreateRooms />}
							/>
						</Route>
					</Route>
				</Route>
				<Route path="/student">
					<Route path="downloads" element={<Downloads />} />
					<Route path="analysis" element={<Analyse />} />
				</Route>
				<Route path="/faculty">
					<Route path="courses" element={<ManageCourses />} />
					<Route path="grades" element={<PublishGrades />} />
				</Route>
			</Routes>
			<Footer />
			<Toaster />
		</div>
	);
};

export default App;
