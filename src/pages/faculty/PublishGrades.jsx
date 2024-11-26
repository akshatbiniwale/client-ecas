/* eslint-disable no-unused-vars */
import Sidebar from "./Sidebar";
import Plot from "react-plotly.js";
import { useEffect, useState } from "react";
import {
	getFilteredCourses,
	getSubjectMarks,
	getSAValue,
	setFinalSAValue,
} from "../../services/faculty";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { calculateGradeDistribution } from "../../functions/saValue.js";

const PublishGrades = () => {
	const [filterYear, setFilterYear] = useState("1");
	const [filterSemester, setFilterSemester] = useState("Odd");
	const [filterSubject, setFilterSubject] = useState("");
	const [courseList, setCourseList] = useState(null);
	const [subjectMarks, setSubjectMarks] = useState([]);
	const [optimalSAValue, setOptimalSAValue] = useState(null);
	// expected array of objects for gradeRanges
	// {
	// 	grade: "AA",
	// 	range: "Greater than 90",
	// }
	const [manualSAValue, setManualSAValue] = useState(0);
	const [manualSAObject, setManualSAObject] = useState({});

	useEffect(() => {
		getFilteredCourses(filterYear, filterSemester).then((data) => {
			setCourseList(data);
		});
	}, [filterYear, filterSemester]);

	//unecessary
	// useEffect(() => {
	// 	getSubjectMarks(filterSubject).then((data) => {
	// 		setSubjectMarks(data);
	// 	});
	// }, [filterSubject]);

	const { mutate: saValueMutation } = useMutation({
		mutationFn: () => {
			getSAValue(filterSubject).then((data) => {
				setOptimalSAValue(data);
			});
		},
		onSuccess: () => {
			toast.success("SA Value generated successfully");
		},
		onError: (error) => {
			toast.error(error);
		},
	});

	const { mutate: publishGradeMutation } = useMutation({
		mutationFn: (finalSA) => {
			setFinalSAValue(finalSA, filterSubject);
		},
		onSuccess: () => {
			toast.success("Grade published successfully");
		},
		onError: (error) => {
			toast.error(error);
		},
	});

	// uncomment below code when backend is ready
	// const gradesManual = Object.keys(manualSAObject?.gradeRanges);
	// const frequenciesManual = Object.values(manualSAObject?.gradeRanges);
	// const maxFrequencyManual = Math.max(...frequenciesManual);

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
							<select
								className="px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 text-gray-500 text-sm focus:bg-white w-full"
								onChange={(e) => setFilterYear(e.target.value)}
							>
								<option>1</option>
								<option>2</option>
								<option>3</option>
								<option>4</option>
							</select>
						</div>
						<div className="col-span-1">
							<label
								className="block text-gray-700 text-sm font-semibold mb-2"
								onChange={(e) =>
									setFilterSemester(e.target.value)
								}
							>
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
							<select
								className="px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 text-gray-500 text-sm focus:bg-white w-full"
								onChange={(e) =>
									setFilterSubject(e.target.value)
								}
							>
								<option key={"None"} value="None">
									None
								</option>
								{courseList &&
									courseList?.map((course) => (
										<option
											key={course._id}
											value={course._id}
										>
											{course.name}
										</option>
									))}
							</select>
						</div>
						<div className="col-span-1">
							<button
								className="mt-7 w-full bg-blue-700 rounded-xl text-white text-lg font-semibold py-2"
								type="submit"
								onClick={() => {
									saValueMutation();
								}}
							>
								Generate
							</button>
						</div>
					</div>
					{optimalSAValue && (
						<div className={`grid grid-cols-3 mt-5`}>
							<div className="grid-cols-1 pt-4 mr-7">
								<div className="mb-2">
									<p className="font-semibold text-lg mb-1">
										Optimal SA Value
									</p>
									<p className="text-md px-2 py-0.5 bg-blue-300 w-fit rounded-lg">
										{optimalSAValue?.sa}
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
											{optimalSAValue?.gradeRanges?.map(
												(item, index) => (
													<tr key={index}>
														<td className="text-center py-1.5 border text-md">
															{item.grade}
														</td>
														<td className="text-center py-1.5 border text-md">
															{item.range}
														</td>
													</tr>
												)
											)}
										</tbody>
									</table>
								</div>
							</div>
							<div className="grid-cols-2">
								<Plot
									data={[
										{
											x: Object.keys(
												optimalSAValue?.gradeFrequencies
											),
											y: Object.values(
												optimalSAValue?.gradeFrequencies
											),
											type: "bar",
											// text: frequencies?.map(String),
											textposition: "outside",
										},
									]}
									layout={{
										title: `Distribution of Grades (SA=${optimalSAValue?.sa})`,
										xaxis: { title: "Grade" },
										yaxis: {
											title: "No. of Students",
											range: [
												0,
												Math.max(
													...Object.values(
														optimalSAValue?.gradeFrequencies
													)
												),
											],
										},
										height: 500,
										width: 800,
									}}
								/>
							</div>
						</div>
					)}
					<p className="font-bold text-xl mt-5">
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
								onChange={(e) =>
									setManualSAValue(e.target.value)
								}
							/>
						</div>
						<div className="mb-5 col-span-1">
							<button
								className="mt-[25px] w-full bg-blue-700 rounded-xl text-white text-lg font-semibold py-2"
								type="submit"
								onClick={() => {
									setManualSAObject(
										calculateGradeDistribution(
											manualSAValue,
											subjectMarks
										)
									);
								}}
							>
								Generate
							</button>
						</div>
					</div>
					<div
						className={`grid grid-cols-3 mt-5 ${
							Object.keys(manualSAObject).length === 0
								? "hidden"
								: ""
						}`}
					>
						<div className="grid-cols-1 pt-4 mr-7">
							<div className="mb-2">
								<p className="font-semibold text-lg mb-1">
									Chosen SA Value
								</p>
								<p className="text-md px-2 py-0.5 bg-blue-300 w-fit rounded-lg">
									{manualSAObject.SA}
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
										{manualSAObject?.gradeRanges?.map(
											(item, index) => (
												<tr key={index}>
													<td className="text-center py-1.5 border text-md">
														{item.grade}
													</td>
													<td className="text-center py-1.5 border text-md">
														{item.range}
													</td>
												</tr>
											)
										)}
									</tbody>
								</table>
							</div>
						</div>
						<div className="grid-cols-2">
							{/* uncomment code when backend is ready */}
							{/* <Plot
								data={[
									{
										x: gradesManual,
										y: frequenciesManual,
										type: "bar",
										text: frequenciesManual?.map(String),
										textposition: "outside",
									},
								]}
								layout={{
									title: `Distribution of Grades (SA=${manualSAObject.SA}) for ${filterSubject}`,
									xaxis: { title: "Grade" },
									yaxis: {
										title: "No. of Students",
										range: [0, maxFrequencyManual + 10],
									},
									height: 500,
									width: 800,
								}}
							/> */}
						</div>
					</div>
					<p className="font-bold text-xl mt-5">Publish Grade</p>
					<p className="my-5">
						Enter the final SA to be used for the course and
						publish:
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
								onChange={(e) =>
									setManualSAValue(e.target.value)
								}
							/>
						</div>
						<div className="mb-5 col-span-1">
							<button
								className="mt-[25px] w-full bg-blue-700 rounded-xl text-white text-lg font-semibold py-2"
								type="submit"
								onClick={() => {
									publishGradeMutation(manualSAValue);
								}}
							>
								Publish
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PublishGrades;
