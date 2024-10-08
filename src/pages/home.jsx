import Logo from "../assets/autoxcell-high-resolution-logo-transparent.png";
import { useState } from "react";
import { login } from "../services/student";
import { useMutation } from "react-query";

const Home = () => {
	const [loginData, setLoginData] = useState({
		email: "",
		password: "",
	});
	const [error, setError] = useState("");

	const { mutate } = useMutation({
		mutationFn: ({ email, password }) => {
			return login({ email, password });
		},
	});

	return (
		<div className="h-full bg-gray-100 text-gray-900 flex justify-center">
			<div className="w-full m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
				<div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 h-full">
					<div className="mt-8">
						<img src={Logo} className="w-60 mx-auto" />
					</div>
					<div className="my-14 flex flex-col items-center">
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
										onClick={() => {
											setError("");
											mutate(loginData);
										}}
									>
										<span className="ml-3">Sign In</span>
									</button>
								</form>
								<p className="mt-6 text-xs text-gray-600 text-center">
									<a
										href="operator/login"
										className="border-b border-gray-500 border-dotted"
									>
										Click here
									</a>{" "}
									for operator login
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
				<div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
					<div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat bg-[url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')]"></div>
				</div>
			</div>
		</div>
	);
};

export default Home;
