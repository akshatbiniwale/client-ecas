/* eslint-disable no-unused-vars */
import OperatorSidebar from "./OperatorSidebar";
import { useState } from "react";
import Papa from "papaparse";
import { useMutation } from "react-query";
import { createCourse } from "../../services/operator";

const OperatorCreateCourse = () => {
	const [csvFile, setCsvFile] = useState(null);
	// const [parsedData, setParsedData] = useState([]);
	const [fileName, setFileName] = useState("");
	const [manualUserUploadData, setManualUserUploadData] = useState({
		course_name: "",
		course_code: "",
		department: "",
		semester: "",
		credits: "",
		category: "",
	});

	const handleFileUpload = (event) => {
		const file = event.target.files[0];
		// if (file) {
		// 	setCsvFile(file);
		// 	setFileName(file.name);
		// 	parseCSV(file);
		// }
		if (file) {
			setCsvFile(file);
			setFileName(file.name);
		}
	};

	//NOTE : Remove this as we are parsing all csvs at backend
	// const parseCSV = (file) => {
	// 	Papa.parse(file, {
	// 		header: true,
	// 		complete: (result) => {
	// 			setParsedData(result.data);
	// 		},
	// 		skipEmptyLines: true,
	// 	});
	// };

	const { mutate: mutateCreateCourse } = useMutation({
		mutationFn: () => {
			return createCourse({ ...manualUserUploadData, file: csvFile });
		},
	});

	return (
		<div>
			<OperatorSidebar />
			<div className="p-4 sm:ml-64">
				<div className="p-4 mt-14">
					<p className="font-bold text-4xl mb-5">Create Course</p>
					<p className="mb-5">
						1. Create a new course by filling in the details below:
					</p>
					<form>
						<div className="grid grid-cols-2 gap-x-10">
							<div className="mb-5">
								<label className="block text-gray-700 text-sm font-semibold mb-2">
									Course Name
								</label>
								<input
									type="text"
									placeholder="Enter Course Name"
									className="px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:bg-white w-full"
									onChange={(e) =>
										setManualUserUploadData({
											...manualUserUploadData,
											course_name: e.target.value,
										})
									}
								/>
							</div>
							<div className="mb-5">
								<label className="block text-gray-700 text-sm font-semibold mb-2">
									Course Code
								</label>
								<input
									type="text"
									placeholder="Enter Course Code"
									className="px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:bg-white w-full"
									onChange={(e) =>
										setManualUserUploadData({
											...manualUserUploadData,
											course_code: e.target.value,
										})
									}
								/>
							</div>
							<div className="mb-5">
								<label className="block text-gray-700 text-sm font-semibold mb-2">
									Department
								</label>
								<input
									placeholder="Enter Department"
									className="px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:bg-white w-full"
									onChange={(e) =>
										setManualUserUploadData({
											...manualUserUploadData,
											department: e.target.value,
										})
									}
								/>
							</div>
							<div className="mb-5">
								<label className="block text-gray-700 text-sm font-semibold mb-2">
									Semester
								</label>
								<input
									type="number"
									placeholder="Enter Semester"
									className="px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:bg-white w-full"
									onChange={(e) =>
										setManualUserUploadData({
											...manualUserUploadData,
											semester: e.target.value,
										})
									}
								/>
							</div>
							<div className="mb-5">
								<label className="block text-gray-700 text-sm font-semibold mb-2">
									Course Credits
								</label>
								<input
									type="number"
									placeholder="Enter Course Credits"
									className="px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:bg-white w-full"
									onChange={(e) =>
										setManualUserUploadData({
											...manualUserUploadData,
											credits: e.target.value,
										})
									}
								/>
							</div>
							<div className="mb-5">
								<label className="block text-gray-700 text-sm font-semibold mb-2">
									Course Category
								</label>
								<select
									className="px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 text-gray-500 text-sm focus:bg-white w-full"
									onChange={(e) =>
										setManualUserUploadData({
											...manualUserUploadData,
											category: e.target.value,
										})
									}
								>
									<option>Core</option>
									<option>Program Elective</option>
									<option>Open Elective</option>
									<option>SEVA / SATVA</option>
								</select>
							</div>
						</div>
						<p className="mb-5 space-y-1.5">
							2. Upload a .csv file containing the list of faculty
							members who will be teaching this course:
						</p>
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
								<input
									type="file"
									className="hidden"
									accept=".csv"
									onChange={handleFileUpload}
								/>
							</label>
						</div>
						{fileName && (
							<p className="mt-2 text-sm text-gray-500">
								File uploaded:{" "}
								<span className="font-semibold">
									{fileName}
								</span>
							</p>
						)}
						<div className="flex justify-center">
							<button
								className="mt-7 w-2/3 bg-blue-700 rounded-xl text-white text-lg font-semibold py-2"
								type="submit"
								onClick={(e) => {
									if (!csvFile) {
										alert("Please upload a CSV file");
									}
									mutateCreateCourse();
								}}
							>
								Create Course
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default OperatorCreateCourse;
