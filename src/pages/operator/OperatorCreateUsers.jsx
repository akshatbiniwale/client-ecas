import OperatorSidebar from "./OperatorSidebar";

const OperatorCreateUsers = () => {
	// const [isOpenUserDropdown, setIsOpenUserDropdown] = useState(false);
	// const [dashboardOption, setDashboardOption] = useState("");

	return (
		<div>
			<OperatorSidebar />
			<div className="p-4 sm:ml-64">
				<div className="p-4 mt-14">
					<p className="font-bold text-4xl mb-5">Create Users</p>
					<p className="font-semibold text-2xl mb-1.5">
						Automated Via File Upload
					</p>
					<div className="mb-5 space-y-1.5">
						<p>
							1. Create a .csv file having the following columns
							in the order provided:
						</p>
						<p className="py-1 bg-gray-300 w-fit rounded-lg">
							&emsp;Name, Email, Unique ID, Department&emsp;
						</p>
					</div>
					<div className="flex items-center justify-center w-full">
						<label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
							<div className="flex flex-col items-center justify-center pt-5 pb-6">
								<svg
									className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 20 16"
								>
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
									/>
								</svg>
								<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
									<span className="font-semibold">
										Click to upload
									</span>{" "}
									or drag and drop CSV File
								</p>
							</div>
							<input type="file" className="hidden" />
						</label>
					</div>
					<p className="my-3">2. Choose a default common password:</p>

					<input
						className="w-1/3 px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:bg-white"
						type="password"
						placeholder="Password"
					/>

					<button
						className="mt-7 block w-1/2 bg-blue-700 rounded-xl text-white text-lg font-semibold py-2"
						type="submit"
					>
						Submit
					</button>

					<p className="font-semibold text-2xl mt-5 mb-1.5">Manual</p>
					<p>1. Manually input data for a single user</p>

					<div className="w-full mt-4">
						<form className="grid grid-cols-2 gap-x-10 bg-white rounded mb-4">
							<div className="mb-4">
								<label className="block text-gray-700 text-sm font-semibold mb-2">
									Name
								</label>
								<input
									className="px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:bg-white w-full"
									type="text"
									placeholder="Name"
								/>
							</div>
							<div className="mb-4">
								<label className="block text-gray-700 text-sm font-semibold mb-2">
									Email
								</label>
								<input
									className="px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:bg-white w-full"
									type="email"
									placeholder="Email"
								/>
							</div>
							<div className="mb-4">
								<label className="block text-gray-700 text-sm font-semibold mb-2">
									Unique ID
								</label>
								<input
									className="px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:bg-white w-full"
									type="number"
									placeholder="Unique ID"
								/>
							</div>
							<div className="mb-4">
								<label className="block text-gray-700 text-sm font-semibold mb-2">
									Department
								</label>
								<input
									className="px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:bg-white w-full"
									type="text"
									placeholder="Department"
								/>
							</div>
						</form>
					</div>

					<p className="my-3">2. Choose a default password:</p>

					<input
						className="w-1/3 px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:bg-white"
						type="password"
						placeholder="Password"
					/>

					<button
						className="mt-7 block w-1/2 bg-blue-700 rounded-xl text-white text-lg font-semibold py-2"
						type="submit"
					>
						Submit
					</button>
				</div>
			</div>
		</div>
	);
};

export default OperatorCreateUsers;
