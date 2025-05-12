import Logo from "../../assets/autoxcell-high-resolution-logo-transparent.png";
import { useState, useEffect } from "react";
import { login, signUp } from "../../services/operator";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { operatorAction } from "../../store/reducers/operatorReducer";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const operatorState = useSelector((state) => state.operator);
	const [isRegister, setIsRegister] = useState(false);
	const [loginData, setLoginData] = useState({
		email: "",
		password: "",
	});
	const [registerData, setRegisterData] = useState({
		name: "",
		id: "",
		address: "",
		phoneNumber: "",
		email: "",
		password: "",
	});
	const [registerErrors, setRegisterErrors] = useState({});
	const [loginErrors, setLoginErrors] = useState({});

	const { mutate: mutateLogin } = useMutation({
		mutationFn: (loginData) => {
			return login(loginData);
		},
		onSuccess: (data) => {
			dispatch(operatorAction.setOperatorInfo(data));
			localStorage.setItem("operatorAccount", JSON.stringify(data));
		},
		onError: (error) => {
			toast.error(error.message);
			console.log(error);
		},
	});

	const { mutate: mutateSignUp } = useMutation({
		mutationFn: (registerData) => {
			return signUp(registerData);
		},
		onSuccess: (data) => {
			dispatch(operatorAction.setOperatorInfo(data));
			localStorage.setItem("operatorAccount", JSON.stringify(data));
		},
		onError: (error) => {
			toast.error(error.message);
			console.log(error);
		},
	});

	useEffect(() => {
		if (operatorState?.operatorInfo) {
			navigate("/operator/home/create-user");
		}
	}, [navigate, operatorState?.operatorInfo]);

	// Validation functions
	const validateRegister = () => {
		const errors = {};
		if (!registerData.name.trim()) errors.name = "Name is required";
		if (!registerData.address.trim())
			errors.address = "Address is required";
		if (!registerData.id.trim()) errors.id = "Institute ID is required";
		if (!registerData.phoneNumber.trim())
			errors.phoneNumber = "Phone number is required";
		if (!registerData.email.trim()) errors.email = "Email is required";
		else if (!/\S+@\S+\.\S+/.test(registerData.email))
			errors.email = "Invalid email";
		if (!registerData.password.trim())
			errors.password = "Password is required";
		else if (registerData.password.length < 6)
			errors.password = "Password must be at least 6 characters";
		return errors;
	};

	const validateLogin = () => {
		const errors = {};
		if (!loginData.email.trim()) errors.email = "Email is required";
		else if (!/\S+@\S+\.\S+/.test(loginData.email))
			errors.email = "Invalid email";
		if (!loginData.password.trim())
			errors.password = "Password is required";
		return errors;
	};

	return (
		<div className="h-full bg-gray-100 text-gray-900 flex justify-center">
			<div className="w-full m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
				<div className="lg:w-1/2 xl:w-2/3 p-6 sm:p-12 h-full">
					<div className="mt-4">
						<img src={Logo} className="w-60 mx-auto" />
					</div>
					<div className="my-4 flex flex-col items-center">
						{isRegister ? (
							<form
								onSubmit={(e) => {
									e.preventDefault();
									const errors = validateRegister();
									setRegisterErrors(errors);
									if (Object.keys(errors).length === 0) {
										mutateSignUp(registerData);
									}
								}}
							>
								<div className="w-full grid grid-cols-2 gap-x-10 mt-4">
									<div className="mx-auto max-w-s">
										<input
											className="w-full mb-6 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
											type="text"
											placeholder="Name of Institute"
											value={registerData.name}
											onChange={(e) => {
												setRegisterData({
													...registerData,
													name: e.target.value,
												});
											}}
										/>
										{registerErrors.name && (
											<p className="text-red-500 text-xs mb-2">
												{registerErrors.name}
											</p>
										)}
										<input
											className="w-full mb-6 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
											type="text"
											placeholder="Institute Address"
											value={registerData.address}
											onChange={(e) => {
												setRegisterData({
													...registerData,
													address: e.target.value,
												});
											}}
										/>
										{registerErrors.address && (
											<p className="text-red-500 text-xs mb-2">
												{registerErrors.address}
											</p>
										)}
										<input
											className="w-full mb-6 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
											type="email"
											placeholder="Institute Email"
											value={registerData.email}
											onChange={(e) => {
												setRegisterData({
													...registerData,
													email: e.target.value,
												});
											}}
										/>
										{registerErrors.email && (
											<p className="text-red-500 text-xs mb-2">
												{registerErrors.email}
											</p>
										)}
									</div>
									<div className="mx-auto max-w-s">
										<input
											className="w-full mb-6 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
											type="text"
											placeholder="Institute Id"
											value={registerData.id}
											onChange={(e) => {
												setRegisterData({
													...registerData,
													id: e.target.value,
												});
											}}
										/>
										{registerErrors.id && (
											<p className="text-red-500 text-xs mb-2">
												{registerErrors.id}
											</p>
										)}
										<input
											className="w-full mb-6 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
											type="text"
											placeholder="Institute Phone Number"
											value={registerData.phoneNumber}
											onChange={(e) => {
												setRegisterData({
													...registerData,
													phoneNumber:
														e.target.value,
												});
											}}
										/>
										{registerErrors.phoneNumber && (
											<p className="text-red-500 text-xs mb-2">
												{registerErrors.phoneNumber}
											</p>
										)}
										<input
											className="w-full mb-6 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
											type="password"
											placeholder="Password"
											value={registerData.password}
											onChange={(e) => {
												setRegisterData({
													...registerData,
													password: e.target.value,
												});
											}}
										/>
										{registerErrors.password && (
											<p className="text-red-500 text-xs mb-2">
												{registerErrors.password}
											</p>
										)}
									</div>
								</div>
								<button
									type="submit"
									className="mt-3 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
								>
									<span className="ml-3">Register Now</span>
								</button>
							</form>
						) : (
							<form
								className="w-full flex-1 mt-8"
								onSubmit={(e) => {
									e.preventDefault();
									const errors = validateLogin();
									setLoginErrors(errors);
									if (Object.keys(errors).length === 0) {
										mutateLogin(loginData);
									}
								}}
							>
								<div className="mx-auto max-w-xs">
									<input
										className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
										type="email"
										placeholder="Email"
										value={loginData.email}
										onChange={(e) => {
											setLoginData({
												...loginData,
												email: e.target.value,
											});
										}}
									/>
									{loginErrors.email && (
										<p className="text-red-500 text-xs mb-2">
											{loginErrors.email}
										</p>
									)}
									<input
										className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
										type="password"
										placeholder="Password"
										value={loginData.password}
										onChange={(e) => {
											setLoginData({
												...loginData,
												password: e.target.value,
											});
										}}
									/>
									{loginErrors.password && (
										<p className="text-red-500 text-xs mb-2">
											{loginErrors.password}
										</p>
									)}
									<button
										type="submit"
										className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
									>
										<span className="ml-3">Sign In</span>
									</button>
								</div>
							</form>
						)}
					</div>
					<div className="flex flex-col items-center">
						<p className="mt-6 text-xs text-gray-600 text-center">
							{isRegister
								? "Already Registered? Login to your Institute"
								: "Not Registered? Register your Institute"}{" "}
							<button
								onClick={() => {
									setIsRegister(!isRegister);
									setRegisterErrors({});
									setLoginErrors({});
								}}
								className="border-b border-gray-500 border-dotted"
							>
								here
							</button>
						</p>
						<p className="mt-6 text-xs text-gray-600 text-center">
							<a
								href="/"
								className="border-b border-gray-500 border-dotted"
							>
								Click here
							</a>{" "}
							for student login
						</p>
						<p className="mt-6 text-xs text-gray-600 text-center">
							I agree to abide by AutoXcell{" "}
							<a
								href="#"
								className="border-b border-gray-500 border-dotted"
							>
								Terms of Service
							</a>{" "}
							and its{" "}
							<a
								href="#"
								className="border-b border-gray-500 border-dotted"
							>
								Privacy Policy
							</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
