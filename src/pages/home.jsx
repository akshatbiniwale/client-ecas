import Logo from "../assets/autoxcell-high-resolution-logo-transparent.png";
import { useState, useEffect } from "react";
import { studentLogin } from "../services/student";
import { facultyLogin } from "../services/faculty";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { studentAction } from "../store/reducers/studentReducer";
import { facultyAction } from "../store/reducers/facultyReducer";
import { toast } from "react-hot-toast";

const Home = () => {
	const [loginData, setLoginData] = useState({
		email: "",
		password: "",
	});
	const [isStudentLogin, setIsStudentLogin] = useState(true);
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const studentState = useSelector((state) => state.student);
	const facultyState = useSelector((state) => state.faculty);

	const { mutate: studentLoginMutate } = useMutation({
		mutationFn: ({ email, password }) => {
			return studentLogin({ email, password });
		},
		onSuccess: (data) => {
			dispatch(studentAction.setStudentInfo(data));
			localStorage.setItem("studentAccount", JSON.stringify(data));
		},
		onError: (error) => {
			toast.error(error.message);
			console.log(error);
		},
	});

	useEffect(() => {
		if (studentState?.studentInfo) {
			navigate("/student/downloads");
		}
	}, [navigate, studentState?.studentInfo]);

	const { mutate: facultyLoginMutate } = useMutation({
		mutationFn: ({ email, password }) => {
			return facultyLogin({ email, password });
		},
		onSuccess: (data) => {
			dispatch(facultyAction.setFacultyInfo(data));
			localStorage.setItem("facultyAccount", JSON.stringify(data));
		},
		onError: (error) => {
			toast.error(error.message);
			console.log(error);
		},
	});

	useEffect(() => {
		if (facultyState?.facultyInfo) {
			navigate("/faculty/courses");
		}
	}, [navigate, facultyState?.facultyInfo]);

	return (
		<div className="h-full bg-gray-100 text-gray-900 flex justify-center">
			<div className="w-full m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
				<div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 h-full">
					<div className="mt-8">
						<img src={Logo} className="w-60 mx-auto" />
					</div>
					<p className="mt-14 text-[#3498DB] font-semibold text-2xl text-center">
						{isStudentLogin ? "Student" : "Faculty"} login
					</p>
					<div className="mt-1 mb-14 flex flex-col items-center">
						<div className="w-full flex-1 mt-8">
							<div className="mx-auto max-w-xs">
								<form action="">
									<input
										className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
										type="email"
										placeholder="Email"
										onChange={(e) =>
											setLoginData({
												...loginData,
												email: e.target.value,
											})
										}
									/>
									<input
										className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
										type="password"
										placeholder="Password"
										onChange={(e) =>
											setLoginData({
												...loginData,
												password: e.target.value,
											})
										}
									/>
									{error && (
										<p className="text-red-500 mt-2">
											{error}
										</p>
									)}
									<button
										type="submit"
										className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
										onClick={(e) => {
											e.preventDefault();
											setError("");
											if (isStudentLogin) {
												studentLoginMutate(loginData);
											} else {
												facultyLoginMutate(loginData);
											}
										}}
									>
										<span className="ml-3">Sign In</span>
									</button>
								</form>
								<p className="mt-6 text-xs text-gray-600 text-center">
									<span
										onClick={() => {
											setIsStudentLogin(!isStudentLogin);
										}}
										className="border-b border-gray-500 border-dotted cursor-pointer"
									>
										Click here
									</span>{" "}
									for faculty login.{" "}
									<a
										href="operator/login"
										className="border-b border-gray-500 border-dotted cursor-pointer"
									>
										Click here
									</a>{" "}
									for operator login.
								</p>
								<p className="mt-6 text-xs text-gray-600 text-center">
									I agree to abide by AutoXcell{" "}
									<span className="border-b border-gray-500 border-dotted cursor-pointer">
										Terms of Service
									</span>{" "}
									and its{" "}
									<span className="border-b border-gray-500 border-dotted cursor-pointer">
										Privacy Policy
									</span>
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
					<div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat bg-[url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')]"></div>
				</div>
			</div>
		</div>
	);
};

export default Home;
