/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import OperatorSidebar from "./OperatorSidebar";
import { useMutation } from "react-query";
import {
	publishTimetable,
	getRooms,
	getFilterCourses,
} from "../../services/operator";

const OperatorPublish = () => {
	const [filterCourses, setFilterCourses] = useState({
		semester: "",
		year: "",
	});
	const [timeTableData, setTimeTableData] = useState({
		courses: [],
		rooms: [],
		startDate: "",
		startTime: "",
	});

	// const [rooms, setRooms] = useState([]);
	// const [subjects, setSubjects] = useState({});

	const heading = [
		"Core",
		"Program Electives",
		"Open Elective",
		"SEVA/SATVA",
	];
	const subHeadings = ["COMPS", "CSE-AIML", "CSE-DS", "EXTC"];

	const rooms = [];
	for (let i = 1; i <= 4; i++)
		for (let j = 1; j <= 8; j++) rooms.push(`Room ${i * 100 + j}`);

	const subjects = {
		Core: {
			COMPS: ["DS", "CCN", "CAO", "SPCC"],
			"CSE-AIML": ["FOSIP", "AIML"],
			"CSE-DS": ["BDA", "DWM"],
			EXTC: ["BEE", "DSM"],
		},
		"Program Electives": ["BCT", "DL", "NLP"],
		"Open Elective": ["HMI", "CE"],
		"SEVA/SATVA": ["Film Appreciation", "Yoga I", "Yoga II"],
	};

	// useEffect(() => {
	// 	getRooms().then((data) => {
	// 		setRooms(data);
	// 	});
	// }, []);

	// useEffect(() => {
	// 	if (filterCourses?.semester && filterCourses?.year) {
	// 		getFilterCourses(filterCourses).then((data) => {
	// 			setSubjects(data);
	// 		});
	// 	}
	// }, [filterCourses]);

	const { mutate: mutatePublishTimetable } = useMutation({
		mutationFn: (filterCourses, timeTableData) => {
			return publishTimetable({ ...filterCourses, ...timeTableData });
		},
	});

	const flattenedSubjects = [
		...Object.entries(subjects.Core).map(([key, value]) => ({
			category: key,
			subjects: value,
		})),
		{
			category: "Program Electives",
			subjects: subjects["Program Electives"],
		},
		{ category: "Open Elective", subjects: subjects["Open Elective"] },
		{ category: "SEVA/SATVA", subjects: subjects["SEVA/SATVA"] },
	];

	const maxRows = Math.max(
		...flattenedSubjects.map((col) => col.subjects.length)
	);

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
						1. Filter courses using Semster and the Year:
					</p>
					<form>
						<div className="grid grid-cols-2 gap-x-10 mb-3">
							<div className="mb-5">
								<label className="block text-gray-700 text-sm font-semibold mb-2">
									Semester
								</label>
								<select
									className="px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 text-gray-500 text-sm focus:bg-white w-full"
									onChange={(e) => {
										setFilterCourses({
											...filterCourses,
											semester: e.target.value,
										});
									}}
								>
									<option>Odd</option>
									<option>Even</option>
								</select>
							</div>
							<div className="mb-5">
								<label className="block text-gray-700 text-sm font-semibold mb-2">
									Year
								</label>
								<select
									onChange={(e) => {
										setFilterCourses({
											...filterCourses,
											year: e.target.value,
										});
									}}
									className="px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 text-gray-500 text-sm focus:bg-white w-full"
								>
									<option>First</option>
									<option>Second</option>
									<option>Third</option>
									<option>Final</option>
								</select>
							</div>
						</div>
						<p className="mb-5">
							2. From the list of created courses, select courses
							that must be included to form a timetable:
						</p>
						<div className="flex items-center mb-5 px-3.5">
							<input
								type="checkbox"
								id="select-all-table"
								className="mr-2 w-3 h-3"
								onChange={(e) => {
									const checkboxes =
										document.querySelectorAll(
											".table-checkbox"
										);
									checkboxes.forEach((checkbox) => {
										if (
											checkbox.id !== "select-all-table"
										) {
											checkbox.checked = e.target.checked;
										}
									});
								}}
							/>
							<label
								htmlFor="select-all-table"
								className="text-sm font-semibold text-gray-500"
							>
								Select All
							</label>
						</div>
						<div className="relative overflow-x-auto rounded-lg mb-5">
							<table className="w-full text-sm text-left rtl:text-right text-gray-500 rounded-lg">
								<thead className="text-xs uppercase bg-gray-300 text-gray-700 rounded-t-lg">
									<tr>
										{heading.map((head, index) =>
											head === "Core" ? (
												<th
													key={index}
													scope="col"
													className="px-6 py-3 text-center border-r"
													colSpan="4"
												>
													{head}
												</th>
											) : (
												<th
													key={index}
													scope="col"
													className="px-6 py-3 text-center border-r"
													rowSpan="2"
												>
													{head}
												</th>
											)
										)}
									</tr>
									<tr className="border-t">
										{subHeadings.map((subHead, index) => (
											<th
												key={index}
												scope="col"
												className="px-6 py-3 border-r"
											>
												{subHead}
											</th>
										))}
									</tr>
								</thead>
								<tbody>
									{Array.from({ length: maxRows }).map(
										(_, rowIndex) => (
											<tr
												key={rowIndex}
												className="bg-white border-b"
											>
												{flattenedSubjects.map(
													(col, colIndex) => (
														<td
															key={colIndex}
															className="px-3 py-4 border text-xs"
														>
															{col.subjects[
																rowIndex
															] ? (
																<>
																	<input
																		type="checkbox"
																		className="mr-2 w-3 h-3 table-checkbox"
																		onChange={() => {
																			if (
																				timeTableData.courses.includes(
																					col
																						.subjects[
																						rowIndex
																					]
																				)
																			) {
																				setTimeTableData(
																					{
																						...timeTableData,
																						courses:
																							timeTableData.courses.filter(
																								(
																									course
																								) =>
																									course !==
																									col
																										.subjects[
																										rowIndex
																									]
																							),
																					}
																				);
																			} else {
																				setTimeTableData(
																					{
																						...timeTableData,
																						courses:
																							[
																								...timeTableData.courses,
																								col
																									.subjects[
																									rowIndex
																								],
																							],
																					}
																				);
																			}
																		}}
																	/>
																	{
																		col
																			.subjects[
																			rowIndex
																		]
																	}
																</>
															) : null}
														</td>
													)
												)}
											</tr>
										)
									)}
								</tbody>
							</table>
						</div>
						<p className="mb-5">
							3. Select the start date and time for the timetable:
						</p>
						<div className="grid grid-cols-2 gap-x-10 mb-3">
							<div className="mb-5">
								<label className="block text-gray-700 text-sm font-semibold mb-2">
									Start Date
								</label>
								<input
									type="date"
									placeholder="Enter Start Date"
									className="px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:bg-white w-full"
									onChange={(e) => {
										setTimeTableData({
											...timeTableData,
											startDate: e.target.value,
										});
									}}
								/>
							</div>
							<div className="mb-5">
								<label className="block text-gray-700 text-sm font-semibold mb-2">
									Start Time
								</label>
								<input
									type="time"
									placeholder="Enter Start Time"
									className="px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:bg-white w-full"
									onChange={(e) => {
										setTimeTableData({
											...timeTableData,
											startTime: e.target.value,
										});
									}}
								/>
							</div>
						</div>
						<p className="mb-5">
							4. Select which exam rooms to include in the
							timetable:
						</p>
						<div className="grid grid-cols-8 text-sm gap-x-12 gap-y-4 mb-5 text-gray-500">
							{rooms.map((room, index) => (
								<div key={index} className="flex items-center">
									<input
										type="checkbox"
										id={`room-${index}`}
										className="mr-2 w-3 h-3 room-checkbox"
										onChange={() => {
											if (
												timeTableData.rooms.includes(
													room
												)
											) {
												setTimeTableData({
													...timeTableData,
													rooms: timeTableData.rooms.filter(
														(r) => r !== room
													),
												});
											} else {
												setTimeTableData({
													...timeTableData,
													rooms: [
														...timeTableData.rooms,
														room,
													],
												});
											}
										}}
									/>
									<label htmlFor={`room-${index}`}>
										{room}
									</label>
								</div>
							))}
						</div>

						<div className="flex items-center mb-5">
							<input
								type="checkbox"
								id="select-all"
								className="mr-2 w-3 h-3"
								onChange={(e) => {
									const checkboxes =
										document.querySelectorAll(
											".room-checkbox"
										);
									checkboxes.forEach((checkbox) => {
										if (checkbox.id !== "select-all") {
											checkbox.checked = e.target.checked;
										}
									});
								}}
							/>
							<label
								htmlFor="select-all"
								className="text-sm font-semibold text-gray-500"
							>
								Select All
							</label>
						</div>
						<div className="flex justify-center">
							<button
								className="mt-7 w-2/3 bg-blue-700 rounded-xl text-white text-lg font-semibold py-2"
								type="submit"
								onClick={() => {
									mutatePublishTimetable(
										filterCourses,
										timeTableData
									);
								}}
							>
								Publish Timetable
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default OperatorPublish;
