import Logo from "../../assets/autoxcell-high-resolution-logo-transparent.png";
import { useState } from "react";
import { login, signUp } from "../../services/operator";
import { useMutation } from "react-query";

const OperatorLogin = () => {
	const [isRegister, setIsRegister] = useState(false);
	const [loginData, setLoginData] = useState({
		email: "",
		password: "",
	});
	const [registerData, setRegisterData] = useState({
		name: "",
		id: "",
		address: "",
		phone_number: "",
		email: "",
		password: "",
	});

	const { mutate: mutateLogin } = useMutation({
		mutationFn: (loginData) => {
			return login(loginData);
		},
	});

	const { mutate: mutateSignUp } = useMutation({
		mutationFn: (registerData) => {
			return signUp(registerData);
		},
	});

	return (
		<div className="h-full bg-gray-100 text-gray-900 flex justify-center">
			<div className="w-full m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
				<div className="lg:w-1/2 xl:w-2/3 p-6 sm:p-12 h-full">
					<div className="mt-4">
						<img src={Logo} className="w-60 mx-auto" />
					</div>
					<div className="my-4 flex flex-col items-center">
						{isRegister ? (
							<form>
								<div className="w-full grid grid-cols-2 gap-x-10 mt-4">
									<div className="mx-auto max-w-s">
										<input
											className="w-full mb-6 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
											type="text"
											placeholder="Name of Institute"
											onChange={(e) => {
												setRegisterData({
													...registerData,
													name: e.target.value,
												});
											}}
										/>
										<input
											className="w-full mb-6 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
											type="text"
											placeholder="Institute Address"
											onChange={(e) => {
												setRegisterData({
													...registerData,
													address: e.target.value,
												});
											}}
										/>
										<input
											className="w-full mb-6 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
											type="email"
											placeholder="Institute Email"
											onChange={(e) => {
												setRegisterData({
													...registerData,
													email: e.target.value,
												});
											}}
										/>
									</div>
									<div className="mx-auto max-w-s">
										<input
											className="w-full mb-6 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
											type="text"
											placeholder="Institute Id"
											onChange={(e) => {
												setRegisterData({
													...registerData,
													id: e.target.value,
												});
											}}
										/>
										<input
											className="w-full mb-6 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
											type="text"
											placeholder="Institute Phone Number"
											onChange={(e) => {
												setRegisterData({
													...registerData,
													phone_number:
														e.target.value,
												});
											}}
										/>
										<input
											className="w-full mb-6 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
											type="password"
											placeholder="Password"
											onChange={(e) => {
												setRegisterData({
													...registerData,
													password: e.target.value,
												});
											}}
										/>
									</div>
								</div>
								<button
									type="submit"
									onClick={() => {
										mutateSignUp(registerData);
									}}
									className="mt-3 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
								>
									<span className="ml-3">Register Now</span>
								</button>
							</form>
						) : (
							<form className="w-full flex-1 mt-8">
								<div className="mx-auto max-w-xs">
									<input
										className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
										type="email"
										placeholder="Email"
										onChange={(e) => {
											setLoginData({
												...loginData,
												email: e.target.value,
											});
										}}
									/>
									<input
										className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
										type="password"
										placeholder="Password"
										onChange={(e) => {
											setLoginData({
												...loginData,
												password: e.target.value,
											});
										}}
									/>
									<button
										type="submit"
										className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
										onClick={() => {
											mutateLogin(loginData);
										}}
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

export default OperatorLogin;
