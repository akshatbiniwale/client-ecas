import OperatorSidebar from "./OperatorSidebar";

const OperatorPublish = () => {
	return (
		<div>
			<OperatorSidebar />
			<div className="p-4 sm:ml-64">
				<div className="p-4 mt-14">
					<p className="font-bold text-4xl mb-5">Publish Message</p>
					<p className="mb-5">
						Broadcast important messages to all students and
						teachers:
					</p>
					<p className="font-bold text-4xl mb-5">Publish Timetable</p>
					<p className="mb-5">
						From the list of created courses, select courses that
						must be included to form a timetable:
					</p>
					<div className="grid grid-cols-2 gap-x-10 mb-3">
						<div className="mb-5">
							<label className="block text-gray-700 text-sm font-semibold mb-2">
								Semester
							</label>
							<select className="px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 text-gray-500 text-sm focus:bg-white w-full">
								<option>Odd</option>
								<option>Even</option>
							</select>
						</div>
						<div className="mb-5">
							<label className="block text-gray-700 text-sm font-semibold mb-2">
								Year
							</label>
							<select className="px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 text-gray-500 text-sm focus:bg-white w-full">
								<option>First</option>
								<option>Second</option>
								<option>Third</option>
								<option>Final</option>
							</select>
						</div>
					</div>
					<div className="relative overflow-x-auto rounded-lg">
						<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg">
							<thead className="text-xs uppercase bg-gray-300 text-gray-700 rounded-t-lg">
								<tr>
									<th
										scope="col"
										className="px-6 py-3 text-center border-r"
										colSpan="4"
									>
										Core
									</th>
									<th
										scope="col"
										className="px-6 py-3 border-r"
										rowSpan="2"
									>
										Program Electives
									</th>
									<th
										scope="col"
										className="px-6 py-3 border-r"
										rowSpan="2"
									>
										Open Elective
									</th>
									<th
										scope="col"
										className="px-6 py-3"
										rowSpan="2"
									>
										SEVA/SATVA
									</th>
								</tr>
								<tr className="border-t">
									<th
										scope="col"
										className="px-6 py-3 border-r"
									>
										COMPS
									</th>
									<th
										scope="col"
										className="px-6 py-3 border-r"
									>
										CSE-AIML
									</th>
									<th
										scope="col"
										className="px-6 py-3 border-r"
									>
										CSE-DS
									</th>
									<th
										scope="col"
										className="px-6 py-3 border-r"
									>
										EXTC
									</th>
								</tr>
							</thead>
							<tbody>
								<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
									<td className="px-3 py-4 border text-xs">
										<input
											type="checkbox"
											className="mr-2 w-3 h-3"
										/>
										Data Structures
									</td>
									<td className="px-3 py-4 border text-xs">
										<input
											type="checkbox"
											className="mr-2 w-3 h-3"
										/>
										AI Basics
									</td>
									<td className="px-3 py-4 border text-xs">
										<input
											type="checkbox"
											className="mr-2 w-3 h-3"
										/>
										Data Science Intro
									</td>
									<td className="px-3 py-4 border text-xs">
										<input
											type="checkbox"
											className="mr-2 w-3 h-3"
										/>
										Signals & Systems
									</td>
									<td className="px-3 py-4 border text-xs">
										<input
											type="checkbox"
											className="mr-2 w-3 h-3"
										/>
										AI Ethics
									</td>
									<td className="px-3 py-4 border text-xs">
										<input
											type="checkbox"
											className="mr-2 w-3 h-3"
										/>
										Cybersecurity
									</td>
									<td className="px-3 py-4 border text-xs">
										<input
											type="checkbox"
											className="mr-2 w-3 h-3"
										/>
										Social Service
									</td>
								</tr>

								<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
									<td className="px-3 py-4 border text-xs">
										<input
											type="checkbox"
											className="mr-2 w-3 h-3"
										/>
										Algorithms
									</td>
									<td className="px-3 py-4 border text-xs">
										<input
											type="checkbox"
											className="mr-2 w-3 h-3"
										/>
										Machine Learning
									</td>
									<td className="px-3 py-4 border text-xs">
										<input
											type="checkbox"
											className="mr-2 w-3 h-3"
										/>
										Big Data Analytics
									</td>
									<td className="px-3 py-4 border text-xs">
										<input
											type="checkbox"
											className="mr-2 w-3 h-3"
										/>
										Communication Networks
									</td>
									<td className="px-3 py-4 border text-xs">
										<input
											type="checkbox"
											className="mr-2 w-3 h-3"
										/>
										Data Mining
									</td>
									<td className="px-3 py-4 border text-xs">
										<input
											type="checkbox"
											className="mr-2 w-3 h-3"
										/>
										IoT
									</td>
									<td className="px-3 py-4 border text-xs">
										<input
											type="checkbox"
											className="mr-2 w-3 h-3"
										/>
										Environmental Awareness
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="flex justify-center">
						<button
							className="mt-7 w-2/3 bg-blue-700 rounded-xl text-white text-lg font-semibold py-2"
							type="submit"
						>
							Publish Timetable
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OperatorPublish;
