/* eslint-disable no-unused-vars */
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import {
	getCourseList,
	courseStructureUpdate,
	scheduleISE,
	uploadTheoryMarks,
	scheduleLabESE,
	uploadLabMarks,
} from "../../services/faculty";

const FacultyCourses = () => {
	// Input fields for theory course structure
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

	const [theoryModal, setTheoryModal] = useState(false);
	const [labModal, setLabModal] = useState(false);
	const [labModalPage, setLabModalPage] = useState(1);
	const [theoryModalPage, setTheoryModalPage] = useState(1);
	const [theoryFileName, setTheoryFileName] = useState("");
	const [csvTheoryFile, setTheoryCsvFile] = useState(null);
	const [labFileName, setLabFileName] = useState("");
	const [csvLabFile, setLabCsvFile] = useState(null);
	const [modalSubject, setModalSubject] = useState({});
	const [theoryISEschedule, setTheoryISEschedule] = useState({
		name: "",
		code: "",
		ISE: "ISE 1",
		date: "",
		time: "",
	});
	const [labESEschedule, setLabESEschedule] = useState({
		name: "",
		code: "",
		date: "",
		time: "",
	});
	// uncomment this when actual data is fetched
	// const [courseData, setCourseData] = useState([]);

	// uncomment this when actual data is fetched
	// useEffect(() => {
	// 	getCourseList().then((data) => {
	// 		setCourseData(data);
	// 	});
	// }, []);

	// assumed structure of course data that will be returned by fetch request
	// delete this when actual data is fetched
	const courseData = [
		{
			name: "System Programming and Compiler Construction",
			code: "CE404-21",
			year: "Third",
			semester: "VI",
			theory: {
				"ISE 1 Weightage": 0.5,
				"ISE 1 Marks": 20,
				"ISE 2 Weightage": 0.5,
				"ISE 2 Marks": 20,
				"MSE Weightage": 0.2,
				"MSE Marks": 30,
				"ESE Weightage": 0.7,
				"ESE Marks": 100,
			},
			lab: {
				"Experiment Weightage": 0.8,
				"Experiment Marks": 10,
				"ESE Weightage": 0.2,
				"ESE Marks": 50,
			},
		},
		{
			name: "Data Structures and Algorithms",
			code: "CE201-19",
			year: "Second",
			semester: "III",
			theory: {
				"ISE 1 Weightage": 0.4,
				"ISE 1 Marks": 25,
				"ISE 2 Weightage": 0.4,
				"ISE 2 Marks": 25,
				"MSE Weightage": 0.3,
				"MSE Marks": 35,
				"ESE Weightage": 0.6,
				"ESE Marks": 90,
			},
			lab: {
				"Experiment Weightage": 0.7,
				"Experiment Marks": 15,
				"ESE Weightage": 0.3,
				"ESE Marks": 40,
			},
		},
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

	const { mutate: updateCourseMutation } = useMutation({
		mutationFn: () => {
			return courseStructureUpdate(modalSubject);
		},
		onSuccess: (data) => {
			toast.success("Course Updated Successfully");
		},
		onError: (error) => {
			toast.error(error);
		},
	});

	const { mutate: scheduleISEMutation } = useMutation({
		mutationFn: () => {
			theoryISEschedule.name = modalSubject.name;
			theoryISEschedule.code = modalSubject.code;
			return scheduleISE(theoryISEschedule);
		},
		onSuccess: (data) => {
			toast.success("ISE Scheduled Successfully");
		},
		onError: (error) => {
			toast.error(error);
		},
	});

	const { mutate: uploadTheoryMarksMutation } = useMutation({
		mutationFn: ({ name, code, csvTheoryFile }) => {
			return uploadTheoryMarks({ name, code, csvTheoryFile });
		},
		onSuccess: (data) => {
			toast.success("Theory Marks Uploaded Successfully");
		},
		onError: (error) => {
			toast.error(error);
		},
	});

	const { mutate: scheduleLabESEMutation } = useMutation({
		mutationFn: () => {
			labESEschedule.name = modalSubject.name;
			labESEschedule.code = modalSubject.code;
			return scheduleLabESE(labESEschedule);
		},
		onSuccess: (data) => {
			toast.success("Lab ESE Scheduled Successfully");
		},
		onError: (error) => {
			toast.error(error);
		},
	});

	const { mutate: uploadLabMarksMutation } = useMutation({
		mutationFn: ({ name, code, csvTheoryFile }) => {
			return uploadLabMarks({ name, code, csvLabFile });
		},
		onSuccess: (data) => {
			toast.success("Lab Marks Uploaded Successfully");
		},
		onError: (error) => {
			toast.error(error);
		},
	});

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
							<div className="relative bg-white rounded-lg shadow h-[490px]">
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
								<h2 className="ml-8 mb-7 text-lg font-semibold text-blue-600">
									{modalSubject.name} ({modalSubject.code})
								</h2>
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
															value={
																modalSubject
																	.theory[
																	field.label
																]
															}
															readOnly={
																!field.label.includes(
																	"ISE"
																)
															}
															onChange={(e) => {
																setModalSubject(
																	{
																		...modalSubject,
																		theory: {
																			...modalSubject.theory,
																			[field.label]:
																				e
																					.target
																					.value,
																		},
																	}
																);
															}}
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
												<select
													className="px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:bg-white w-full"
													onChange={(e) => {
														setTheoryISEschedule({
															...theoryISEschedule,
															ISE: e.target.value,
														});
													}}
												>
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
													onChange={(e) => {
														setTheoryISEschedule({
															...theoryISEschedule,
															date: e.target
																.value,
														});
													}}
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
													onChange={(e) => {
														setTheoryISEschedule({
															...theoryISEschedule,
															time: e.target
																.value,
														});
													}}
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
															<span className="mt-2 text-sm text-gray-500">
																File uploaded:{" "}
																<span className="font-semibold">
																	{
																		theoryFileName
																	}
																</span>
															</span>
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
										onClick={() => {
											if (theoryModalPage === 1) {
												updateCourseMutation();
											} else if (theoryModalPage === 2) {
												scheduleISEMutation();
											} else if (theoryModalPage === 3) {
												uploadTheoryMarksMutation({
													name: modalSubject.name,
													code: modalSubject.code,
													csvTheoryFile,
												});
											}
											setTheoryModal(false);
										}}
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
							<div className="relative bg-white rounded-lg shadow h-[490px]">
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
								<h2 className="ml-8 mb-7 text-lg font-semibold text-blue-600">
									{modalSubject.name} ({modalSubject.code})
								</h2>
								{labModalPage === 1 && (
									<>
										<div className="ml-8 mr-12 grid grid-cols-2 gap-x-10 gap-y-5 mb-[20px]">
											<div className="mb-5">
												<label className="text-gray-700 text-sm font-semibold mb-2">
													Lab Experiment Weightage
												</label>
												<input
													type="number"
													placeholder="Lab Experiment Weightage"
													className="px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:bg-white w-full"
													value={
														modalSubject.lab[
															"Experiment Weightage"
														]
													}
													onChange={(e) => {
														setModalSubject({
															...modalSubject,
															lab: {
																...modalSubject.lab,
																"Experiment Weightage":
																	e.target
																		.value,
															},
														});
													}}
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
													value={
														modalSubject.lab[
															"Experiment Marks"
														]
													}
													onChange={(e) => {
														setModalSubject({
															...modalSubject,
															lab: {
																...modalSubject.lab,
																"Experiment Marks":
																	e.target
																		.value,
															},
														});
													}}
												/>
											</div>
											<div className="mb-5">
												<label className="text-gray-700 text-sm font-semibold mb-2">
													Lab ESE Weightage
												</label>
												<input
													type="number"
													placeholder="Lab ESE Weightage"
													className="px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:bg-white w-full"
													value={
														modalSubject.lab[
															"ESE Weightage"
														]
													}
													onChange={(e) => {
														setModalSubject({
															...modalSubject,
															lab: {
																...modalSubject.lab,
																"ESE Weightage":
																	e.target
																		.value,
															},
														});
													}}
												/>
											</div>
											<div className="mb-5">
												<label className="text-gray-700 text-sm font-semibold mb-2">
													Lab ESE Marks
												</label>
												<input
													type="number"
													placeholder="Lab ESE Marks"
													className="px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:bg-white w-full"
													value={
														modalSubject.lab[
															"ESE Marks"
														]
													}
													onChange={(e) => {
														setModalSubject({
															...modalSubject,
															lab: {
																...modalSubject.lab,
																"ESE Marks":
																	e.target
																		.value,
															},
														});
													}}
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
													onChange={(e) => {
														setLabESEschedule({
															...labESEschedule,
															date: e.target
																.value,
														});
													}}
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
													onChange={(e) => {
														setLabESEschedule({
															...labESEschedule,
															time: e.target
																.value,
														});
													}}
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
															<span className="mt-2 text-sm text-gray-500">
																File uploaded:{" "}
																<span className="font-semibold">
																	{
																		labFileName
																	}
																</span>
															</span>
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
										onClick={() => {
											if (labModalPage === 1) {
												updateCourseMutation();
											} else if (labModalPage === 2) {
												scheduleLabESEMutation();
											} else if (labModalPage === 3) {
												uploadLabMarksMutation({
													name: modalSubject.name,
													code: modalSubject.code,
													csvLabFile,
												});
												setLabModal(false);
											}
										}}
									>
										Submit
									</button>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
			<Sidebar />
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
											className="px-6 py-3 text-center border-r w-1/12"
										>
											Course Code
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-center border-r w-1/12"
										>
											Year
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-center border-r w-1/12"
										>
											Semester
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-center border-r w-2/12"
										>
											Actions
										</th>
									</tr>
								</thead>
								<tbody>
									{courseData.map((course, index) => (
										<tr key={index}>
											<td className="text-center py-3 border text-md">
												{index + 1}.
											</td>
											<td className="pl-5 text-left py-3 border text-md">
												{course.name}
											</td>
											<td className="text-center py-3 border text-md">
												{course.code}
											</td>
											<td className="text-center py-3 border text-md">
												{course.year}
											</td>
											<td className="text-center py-3 border text-md">
												{course.semester}
											</td>
											<td className="px-3 text-center py-3 border text-md">
												<div className="grid grid-cols-2">
													<span
														className="text-blue-600 underline cursor-pointer"
														onClick={() => {
															setTheoryModal(
																true
															);
															setModalSubject(
																course
															);
														}}
													>
														Theory
													</span>
													<span
														className="text-blue-600 underline cursor-pointer"
														onClick={() => {
															setLabModal(true);
															setModalSubject(
																course
															);
														}}
													>
														Lab
													</span>
												</div>
											</td>
										</tr>
									))}
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
