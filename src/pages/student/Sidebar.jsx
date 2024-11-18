import Logo from "../../assets/autoxcell-high-resolution-logo-white-transparent.png";
import User from "../../assets/user.png";
import { useState } from "react";

const Sidebar = () => {
	const [isOpenUserDropdown, setIsOpenUserDropdown] = useState(false);
	const [isOpenSettingsDropdown, setIsOpenSettingsDropdown] = useState(false);

	return (
		<div>
			<nav className="fixed top-0 z-20 w-full bg-[#1F2937] border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
				<div className="px-3 py-3 lg:px-5 lg:pl-3">
					<div className="flex items-center justify-between">
						<div className="flex items-center justify-start rtl:justify-end">
							<img
								src={Logo}
								className="w-32 mx-auto"
								alt="logo"
							/>
						</div>
						<div className="flex items-center">
							<div className="flex items-center ms-3">
								<div>
									<div
										className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
										onMouseEnter={() => {
											setIsOpenUserDropdown(true);
										}}
									>
										<img
											src={User}
											className="w-8 h-8 rounded-full"
											alt="user photo"
										/>
									</div>
								</div>
								{isOpenUserDropdown && (
									<div
										onMouseLeave={() => {
											setIsOpenUserDropdown(false);
										}}
										className="absolute right-4 mt-7 top-6 w-48 z-50 text-base list-none bg-white divide-y divide-gray-100 rounded shadow-lg dark:bg-gray-700 dark:divide-gray-600"
									>
										<div className="px-4 py-3" role="none">
											<p
												className="text-sm text-gray-900 dark:text-white"
												role="none"
											>
												User Name
											</p>
											<p
												className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
												role="none"
											>
												User Email
											</p>
										</div>
										<ul className="py-1" role="none">
											<li>
												<a
													href="#"
													className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
													role="menuitem"
												>
													Dashboard
												</a>
											</li>
											<li>
												<a
													href="#"
													className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
													role="menuitem"
												>
													Settings
												</a>
											</li>
											<li>
												<a
													href="#"
													className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
													role="menuitem"
												>
													Sign out
												</a>
											</li>
										</ul>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</nav>

			<aside
				className="fixed top-0 left-0 z-10 w-64 h-screen pt-20 transition-transform -translate-x-full bg-gray-50 border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
				aria-label="Sidebar"
			>
				<div className="h-full px-3 pb-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
					<ul className="space-y-2 font-medium">
						<li>
							<a
								href="/faculty/students"
								className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
							>
								<svg
									className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									viewBox="0 0 20 18"
								>
									<path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
								</svg>
								<span className="flex-1 ms-3 whitespace-nowrap">
									Manage
								</span>
							</a>
						</li>
						<li>
							<a
								href="/faculty/courses"
								className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
							>
								<svg
									className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									viewBox="0 0 18 18"
								>
									<path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
								</svg>
								<span className="flex-1 ms-3 whitespace-nowrap">
									Analyse Progress
								</span>
							</a>
						</li>

						<li>
							<a
								href="/faculty/grades"
								className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
							>
								<svg
									className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									viewBox="0 0 640 512"
								>
									<path
										d="M470.7,280.2c3-11.2,4.7-22.9,4.7-35c0-75.8-61.4-137.1-137.1-137.1c-19.5,0-38,4.1-54.7,11.4
										c-16.8-39-55.6-66.3-100.7-66.3c-60.6,0-109.7,49.1-109.7,109.7c0,4.1,0.8,7.9,1.2,11.9C30.5,195.1,0,239.3,0,290.9 c0,70.7,57.3,128,128,128h310.9c40.4,0,73.1-32.7,73.1-73.1C512,316.8,495.1,292.1,470.7,280.2z M256,364l-91.4-91.4h54.9v-91.4
										h73.1v91.4h54.9L256,364z"
									/>
								</svg>
								<span className="flex-1 ms-3 whitespace-nowrap">
									Downaloads
								</span>
							</a>
						</li>
						<li>
							<button
								type="button"
								className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
								onClick={() => {
									setIsOpenSettingsDropdown(
										!isOpenSettingsDropdown
									);
								}}
							>
								<svg
									className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									viewBox="0 0 512 512"
								>
									<path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" />
								</svg>
								<span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
									Settings
								</span>
								<svg
									className="w-3 h-3"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 10 6"
								>
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="m1 1 4 4 4-4"
									/>
								</svg>
							</button>
							<ul
								className={
									isOpenSettingsDropdown
										? "py-2 space-y-2"
										: "hidden py-2 space-y-2"
								}
							>
								<li>
									<a
										href="/operator/home/settings/create-rooms"
										className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
									>
										Rooms
									</a>
								</li>
								<li>
									<a
										href="#"
										className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
									>
										Users
									</a>
								</li>
								<li>
									<a
										href="#"
										className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
									>
										Courses
									</a>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</aside>
		</div>
	);
};

export default Sidebar;
