import Sidebar from "./Sidebar";
import Plot from "react-plotly.js";

const PublishGrades = () => {
	const gradeFrequencies = {
		AA: 21,
		AB: 49,
		BB: 65,
		BC: 35,
		CC: 22,
		CD: 11,
		DD: 2,
	};

	const gradeRanges = [
		{ grade: "AA", range: "Greater than 90" },
		{ grade: "AB", range: "80-89" },
		{ grade: "BB", range: "70-79" },
		{ grade: "BC", range: "60-69" },
		{ grade: "CC", range: "50-59" },
		{ grade: "CD", range: "40-49" },
		{ grade: "DD", range: "30-39" },
		{ grade: "FF", range: "Less than 30" },
	];

	const grades = Object.keys(gradeFrequencies);
	const frequencies = Object.values(gradeFrequencies);
	const maxFrequency = Math.max(...frequencies);

	return (
		<div>
			<Sidebar />
			<div className="p-4 sm:ml-64">
				<div className="p-4 mt-14">
					<p className="font-bold text-4xl mb-5">
						Scaling Anchor (SA) Value Selector
					</p>
					<p className="font-bold text-xl mb-5">
						Optimal SA Value Calculator
					</p>
					<p className="mb-5">
						Using the below filters for year and semester, select
						the course for which you want to find out the optimal SA
						value:
					</p>
					<div className="grid grid-cols-6 gap-x-10">
						<div className="col-span-1">
							<label className="block text-gray-700 text-sm font-semibold mb-2">
								Year
							</label>
							<select className="px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 text-gray-500 text-sm focus:bg-white w-full">
								<option>1</option>
								<option>2</option>
								<option>3</option>
								<option>4</option>
							</select>
						</div>
						<div className="col-span-1">
							<label className="block text-gray-700 text-sm font-semibold mb-2">
								Semester
							</label>
							<select className="px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 text-gray-500 text-sm focus:bg-white w-full">
								<option>Odd</option>
								<option>Even</option>
							</select>
						</div>
						<div className="col-span-3">
							<label className="block text-gray-700 text-sm font-semibold mb-2">
								Course
							</label>
							<select className="px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 text-gray-500 text-sm focus:bg-white w-full">
								<option>
									System Programming and Compiler Construction
								</option>
								<option>Data Structures and Algorithms</option>
								<option>Operating Systems</option>
								<option>Database Management Systems</option>
							</select>
						</div>
						<div className="col-span-1">
							<button
								className="mt-7 w-full bg-blue-700 rounded-xl text-white text-lg font-semibold py-2"
								type="submit"
							>
								Generate
							</button>
						</div>
					</div>
					<div className="grid grid-cols-3 mt-5">
						<div className="grid-cols-1 pt-4 mr-7">
							<div className="mb-2">
								<p className="font-semibold text-lg mb-1">
									Optimal SA Value
								</p>
								<p className="text-md px-2 py-0.5 bg-blue-300 w-fit rounded-lg">
									75
								</p>
							</div>
							<div>
								<h2 className="text-lg font-semibold mb-2">
									Range of Marks for Grades
								</h2>
								<table className="w-full text-sm text-left rtl:text-right text-gray-500 rounded-t-lg overflow-hidden">
									<thead className="text-xs uppercase bg-gray-300 text-gray-700 rounded-t-lg">
										<tr>
											<th
												scope="col"
												className="px-6 py-3 text-center border-r"
											>
												Grade
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-center border-r"
											>
												Range
											</th>
										</tr>
									</thead>
									<tbody>
										{gradeRanges.map((item, index) => (
											<tr key={index}>
												<td className="text-center py-1.5 border text-md">
													{item.grade}
												</td>
												<td className="text-center py-1.5 border text-md">
													{item.range}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
						<div className="grid-cols-2">
							<Plot
								data={[
									{
										x: grades,
										y: frequencies,
										type: "bar",
										text: frequencies.map(String),
										textposition: "outside",
									},
								]}
								layout={{
									title: "Distribution of Grades (SA=75) for DBMS",
									xaxis: { title: "Grade" },
									yaxis: {
										title: "No. of Students",
										range: [0, maxFrequency + 10],
									},
									height: 500,
									width: 800,
								}}
							/>
						</div>
					</div>
					<p className="font-bold text-xl ">
						Manual SA Value Selector
					</p>
					<p className="my-5">
						Enter the SA value manually to find out the grade
						distribution:
					</p>
					<div className="grid grid-cols-3 gap-x-5 w-1/3">
						<div className="mb-5 col-span-2">
							<label className="text-gray-700 text-sm font-semibold mb-2">
								SA Value
							</label>
							<input
								type="number"
								placeholder="Enter SA Value"
								className="px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:bg-white w-full"
							/>
						</div>
						<div className="mb-5 col-span-1">
							<button
								className="mt-[25px] w-full bg-blue-700 rounded-xl text-white text-lg font-semibold py-2"
								type="submit"
							>
								Generate
							</button>
						</div>
					</div>
					<div className="grid grid-cols-3 mt-5">
						<div className="grid-cols-1 pt-4 mr-7">
							<div className="mb-2">
								<p className="font-semibold text-lg mb-1">
									Chosen SA Value
								</p>
								<p className="text-md px-2 py-0.5 bg-blue-300 w-fit rounded-lg">
									75
								</p>
							</div>
							<div>
								<h2 className="text-lg font-semibold mb-2">
									Range of Marks for Grades
								</h2>
								<table className="w-full text-sm text-left rtl:text-right text-gray-500 rounded-t-lg overflow-hidden">
									<thead className="text-xs uppercase bg-gray-300 text-gray-700 rounded-t-lg">
										<tr>
											<th
												scope="col"
												className="px-6 py-3 text-center border-r"
											>
												Grade
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-center border-r"
											>
												Range
											</th>
										</tr>
									</thead>
									<tbody>
										{gradeRanges.map((item, index) => (
											<tr key={index}>
												<td className="text-center py-1.5 border text-md">
													{item.grade}
												</td>
												<td className="text-center py-1.5 border text-md">
													{item.range}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
						<div className="grid-cols-2">
							<Plot
								data={[
									{
										x: grades,
										y: frequencies,
										type: "bar",
										text: frequencies.map(String),
										textposition: "outside",
									},
								]}
								layout={{
									title: "Distribution of Grades (SA=75) for DBMS",
									xaxis: { title: "Grade" },
									yaxis: {
										title: "No. of Students",
										range: [0, maxFrequency + 10],
									},
									height: 500,
									width: 800,
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PublishGrades;
