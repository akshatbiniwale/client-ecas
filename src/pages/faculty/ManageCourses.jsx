/* eslint-disable no-unused-vars */
import FacultySidebar from "./Sidebar";
import { useState } from "react";

const FacultyCourses = () => {
	const [theoryModal, setTheoryModal] = useState(false);
	const [labModal, setLabModal] = useState(false);
	const [labModalPage, setLabModalPage] = useState(1);
	const [theoryModalPage, setTheoryModalPage] = useState(1);
	const [theoryFileName, setTheoryFileName] = useState("");
	const [csvTheoryFile, setTheoryCsvFile] = useState(null);
	const [labFileName, setLabFileName] = useState("");
	const [csvLabFile, setLabCsvFile] = useState(null);

	const theoryInputFields = [
		{ label: "ISE 1 Weightage", placeholder: "ISE 1 Weightage" },
		{ label: "ISE 1 Marks", placeholder: "ISE 1 Marks" },
		{ label: "ISE 2 Weightage", placeholder: "ISE 2 Weightage" },
		{ label: "ISE 2 Marks", placeholder: "ISE 2 Marks" },
		{ label: "MSE Weightage", placeholder: "MSE Weightage" },
		{ label: "MSE Marks", placeholder: "MSE Marks" },
		{ label: "ESE Weightage", placeholder: "ESE Weightage" },
		{ label: "ESE Marks", placeholder: "ESE Marks" },
	];

	const handleTheoryFileUpload = (event) => {
		const file = event.target.files[0];
		if (file) {
			setTheoryCsvFile(file);
			setTheoryFileName(file.name);
		}
	};

	const handleLabFileUpload = (event) => {
		const file = event.target.files[0];
		if (file) {
			setLabCsvFile(file);
			setLabFileName(file.name);
		}
	};

	return (
		<div>
			{theoryModal && (
				<>
					<div
						className="fixed inset-0 bg-black opacity-50 z-50 w-full h-full top-0 left-0"
						onClick={() => {
							setTheoryModal(false);
						}}
					/>
					<div className="fixed justify-items-center z-50 top-[120px] justify-center items-center w-full">
						<div className="relative p-4 w-full max-w-7xl">
							<div className="relative bg-white rounded-lg shadow h-[450px]">
								<div className="pl-[370px] flex items-center justify-between p-4 rounded-t mb-4">
									<ol className="pt-8 pb-5 justify-center space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse">
										<li
											className={
												"flex items-center space-x-2.5 rtl:space-x-reverse cursor-pointer" +
												(theoryModalPage === 1
													? " text-blue-600"
													: " text-gray-500")
											}
											onClick={() => {
												setTheoryModalPage(1);
											}}
										>
											<span
												className={
													"flex items-center justify-center w-8 h-8 border rounded-full shrink-0" +
													(theoryModalPage === 1
														? " border-blue-600"
														: " border-gray-500")
												}
											>
												1
											</span>
											<span>
												<h3 className="font-medium leading-tight">
													Course Structure
												</h3>
											</span>
										</li>
										<li
											className={
												"flex items-center  space-x-2.5 rtl:space-x-reverse cursor-pointer" +
												(theoryModalPage === 2
													? " text-blue-600"
													: " text-gray-500")
											}
											onClick={() => {
												setTheoryModalPage(2);
											}}
										>
											<span
												className={
													"flex items-center justify-center w-8 h-8 border rounded-full shrink-0" +
													(theoryModalPage === 2
														? " border-blue-600"
														: " border-gray-500")
												}
											>
												2
											</span>
											<span>
												<h3 className="font-medium leading-tight">
													Schedule ISE
												</h3>
											</span>
										</li>
										<li
											className={
												"flex items-center space-x-2.5 rtl:space-x-reverse cursor-pointer" +
												(theoryModalPage === 3
													? " text-blue-600"
													: " text-gray-500")
											}
											onClick={() => {
												setTheoryModalPage(3);
											}}
										>
											<span
												className={
													"flex items-center justify-center w-8 h-8 border rounded-full shrink-0" +
													(theoryModalPage === 3
														? " border-blue-600"
														: " border-gray-500")
												}
											>
												3
											</span>
											<span>
												<h3 className="font-medium leading-tight">
													Upload Marks
												</h3>
											</span>
										</li>
									</ol>

									<button
										className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
										onClick={() => {
											setTheoryModal(false);
										}}
									>
										<svg
											className="w-3 h-3"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 14 14"
										>
											<path
												stroke="currentColor"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
											/>
										</svg>
									</button>
								</div>
								{theoryModalPage === 1 && (
									<>
										<div className="ml-8 mr-12 grid grid-cols-4 gap-x-10 gap-y-5 mb-5">
											{theoryInputFields.map(
												(field, index) => (
													<div
														key={index}
														className="mb-5"
													>
														<label className="text-gray-700 text-sm font-semibold mb-2">
															{field.label}
														</label>
														<input
															type="number"
															placeholder={
																field.placeholder
															}
															className="px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:bg-white w-full"
														/>
													</div>
												)
											)}
										</div>
									</>
								)}
								{theoryModalPage === 2 && (
									<>
										<div className="ml-8 mr-12 grid grid-cols-3 gap-x-10 gap-y-5 mb-[125px]">
											<div className="mb-5">
												<label className="text-gray-700 text-sm font-semibold mb-2">
													Select ISE
												</label>
												<select className="px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:bg-white w-full">
													<option>ISE 1</option>
													<option>ISE 2</option>
												</select>
											</div>
											<div className="mb-5">
												<label className="block text-gray-700 text-sm font-semibold mb-2">
													Date
												</label>
												<input
													type="date"
													placeholder="Enter Date"
													className="px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:bg-white w-full"
												/>
											</div>
											<div className="mb-5">
												<label className="block text-gray-700 text-sm font-semibold mb-2">
													Time
												</label>
												<input
													type="time"
													placeholder="Enter Time"
													className="px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:bg-white w-full"
												/>
											</div>
										</div>
									</>
								)}
								{theoryModalPage === 3 && (
									<>
										<div className="ml-8 mb-5 space-y-1.5">
											<p>
												Upload a .csv file having the
												following columns in the order
												provided:
											</p>
											<p className="py-1 bg-gray-300 w-fit rounded-lg">
												&emsp;Name, Email, Unique ID,
												ISE 1 Marks, ISE 2 Marks, MSE
												Marks, ESE Marks&emsp;
											</p>
										</div>
										<div className="ml-8 mr-12 items-center justify-center max-w-full:">
											<label className="flex flex-col items-center justify-center h-[137px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100">
												<div className="flex flex-col items-center justify-center pt-5 pb-6">
													<svg
														className="w-8 h-8 mb-4 text-gray-500"
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
													<p className="mb-2 text-sm text-gray-500">
														{!theoryFileName && (
															<>
																<span className="font-semibold">
																	Click to
																	upload
																</span>{" "}
																or drag and drop
																CSV File
															</>
														)}
														{theoryFileName && (
															<p className="mt-2 text-sm text-gray-500">
																File uploaded:{" "}
																<span className="font-semibold">
																	{
																		theoryFileName
																	}
																</span>
															</p>
														)}
													</p>
												</div>
												<input
													type="file"
													className="hidden"
													accept=".csv"
													onChange={
														handleTheoryFileUpload
													}
												/>
											</label>
										</div>
									</>
								)}
								<div className="flex justify-between ml-8 mr-12 py-4 border-gray-200 rounded-b">
									<button
										className="py-2.5 w-32 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
										onClick={() => {
											setTheoryModal(false);
										}}
									>
										Cancel
									</button>
									<button
										type="button"
										className="text-white w-32 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
									>
										Submit
									</button>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
			{labModal && (
				<>
					<div
						className="fixed inset-0 bg-black opacity-50 z-50 w-full h-full top-0 left-0"
						onClick={() => {
							setLabModal(false);
						}}
					/>
					<div className="fixed justify-items-center z-50 top-[120px] justify-center items-center w-full">
						<div className="relative p-4 w-full max-w-7xl">
							<div className="relative bg-white rounded-lg shadow h-[450px]">
								<div className="pl-[370px] flex items-center justify-between p-4 rounded-t mb-4">
									<ol className="pt-8 pb-5 justify-center space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse">
										<li
											className={
												"flex items-center space-x-2.5 rtl:space-x-reverse cursor-pointer" +
												(labModalPage === 1
													? " text-blue-600"
													: " text-gray-500")
											}
											onClick={() => {
												setLabModalPage(1);
											}}
										>
											<span
												className={
													"flex items-center justify-center w-8 h-8 border rounded-full shrink-0" +
													(labModalPage === 1
														? " border-blue-600"
														: " border-gray-500")
												}
											>
												1
											</span>
											<span>
												<h3 className="font-medium leading-tight">
													Lab Structure
												</h3>
											</span>
										</li>
										<li
											className={
												"flex items-center  space-x-2.5 rtl:space-x-reverse cursor-pointer" +
												(labModalPage === 2
													? " text-blue-600"
													: " text-gray-500")
											}
											onClick={() => {
												setLabModalPage(2);
											}}
										>
											<span
												className={
													"flex items-center justify-center w-8 h-8 border rounded-full shrink-0" +
													(labModalPage === 2
														? " border-blue-600"
														: " border-gray-500")
												}
											>
												2
											</span>
											<span>
												<h3 className="font-medium leading-tight">
													Schedule Lab ESE
												</h3>
											</span>
										</li>
										<li
											className={
												"flex items-center space-x-2.5 rtl:space-x-reverse cursor-pointer" +
												(labModalPage === 3
													? " text-blue-600"
													: " text-gray-500")
											}
											onClick={() => {
												setLabModalPage(3);
											}}
										>
											<span
												className={
													"flex items-center justify-center w-8 h-8 border rounded-full shrink-0" +
													(labModalPage === 3
														? " border-blue-600"
														: " border-gray-500")
												}
											>
												3
											</span>
											<span>
												<h3 className="font-medium leading-tight">
													Upload Marks
												</h3>
											</span>
										</li>
									</ol>

									<button
										className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
										onClick={() => {
											setLabModal(false);
										}}
									>
										<svg
											className="w-3 h-3"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 14 14"
										>
											<path
												stroke="currentColor"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
											/>
										</svg>
									</button>
								</div>
								{labModalPage === 1 && (
									<>
										<div className="ml-8 mr-12 grid grid-cols-2 gap-x-10 gap-y-5 mb-[130px]">
											<div className="mb-5">
												<label className="text-gray-700 text-sm font-semibold mb-2">
													Lab Experiment Weightage
												</label>
												<input
													type="number"
													placeholder="Lab Experiment Weightage"
													className="px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:bg-white w-full"
												/>
											</div>
											<div className="mb-5">
												<label className="text-gray-700 text-sm font-semibold mb-2">
													Lab Experiment Marks
												</label>
												<input
													type="number"
													placeholder="Lab Experiment Marks"
													className="px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:bg-white w-full"
												/>
											</div>
										</div>
									</>
								)}
								{labModalPage === 2 && (
									<>
										<div className="ml-8 mr-12 grid grid-cols-2 gap-x-10 gap-y-5 mb-[125px]">
											<div className="mb-5">
												<label className="block text-gray-700 text-sm font-semibold mb-2">
													Date
												</label>
												<input
													type="date"
													placeholder="Enter Date"
													className="px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:bg-white w-full"
												/>
											</div>
											<div className="mb-5">
												<label className="block text-gray-700 text-sm font-semibold mb-2">
													Time
												</label>
												<input
													type="time"
													placeholder="Enter Time"
													className="px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:bg-white w-full"
												/>
											</div>
										</div>
									</>
								)}
								{labModalPage === 3 && (
									<>
										<div className="ml-8 mb-5 space-y-1.5">
											<p>
												Upload a .csv file having the
												following columns in the order
												provided:
											</p>
											<p className="py-1 bg-gray-300 w-fit rounded-lg">
												&emsp;Name, Email, Unique ID,
												Lab 1 Marks, Lab 2 Marks... Lab
												10 Marks, Lab ESE Marks&emsp;
											</p>
										</div>
										<div className="ml-8 mr-12 items-center justify-center max-w-full:">
											<label className="flex flex-col items-center justify-center h-[137px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100">
												<div className="flex flex-col items-center justify-center pt-5 pb-6">
													<svg
														className="w-8 h-8 mb-4 text-gray-500"
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
													<p className="mb-2 text-sm text-gray-500">
														{!labFileName && (
															<>
																<span className="font-semibold">
																	Click to
																	upload
																</span>{" "}
																or drag and drop
																CSV File
															</>
														)}
														{labFileName && (
															<p className="mt-2 text-sm text-gray-500">
																File uploaded:{" "}
																<span className="font-semibold">
																	{
																		labFileName
																	}
																</span>
															</p>
														)}
													</p>
												</div>
												<input
													type="file"
													className="hidden"
													accept=".csv"
													onChange={
														handleLabFileUpload
													}
												/>
											</label>
										</div>
									</>
								)}
								<div className="flex justify-between ml-8 mr-12 py-4 border-gray-200 rounded-b">
									<button
										className="py-2.5 w-32 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
										onClick={() => {
											setLabModal(false);
										}}
									>
										Cancel
									</button>
									<button
										type="button"
										className="text-white w-32 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
									>
										Submit
									</button>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
			<FacultySidebar />
			<div className="p-4 sm:ml-64">
				<div className="p-4 mt-14">
					<p className="font-bold text-4xl mb-5">Manage Courses</p>
					<p className="mb-5">
						Below are the list of courses you are teaching this
						semester:
					</p>
					<form>
						<div className="relative overflow-x-auto rounded-lg mb-5">
							<table className="w-full text-sm text-left rtl:text-right text-gray-500 rounded-lg">
								<thead className="text-xs uppercase bg-gray-300 text-gray-700 rounded-t-lg">
									<tr>
										<th
											scope="col"
											className="px-6 py-3 text-center border-r w-1/12"
										>
											Sr No.
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-center border-r w-6/12"
										>
											Course Name
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-center border-r w-2/12"
										>
											Course Code
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-center border-r w-3/12"
										>
											Actions
										</th>
									</tr>
								</thead>
								<tbody>
									<tr className="bg-white border-b">
										<td className="text-center py-3 border text-md">
											1.
										</td>
										<td className="pl-5 text-left py-3 border text-md">
											System Programming and Compiler
											Construction
										</td>
										<td className="text-center py-3 border text-md">
											CE404-21
										</td>
										<td className="px-3 text-center py-3 border text-md">
											<div className="grid grid-cols-2">
												<span
													className="text-blue-600 underline cursor-pointer"
													onClick={() => {
														setTheoryModal(true);
													}}
												>
													Theory
												</span>
												<span
													className="text-blue-600 underline cursor-pointer"
													onClick={() => {
														setLabModal(true);
													}}
												>
													Lab
												</span>
											</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default FacultyCourses;
