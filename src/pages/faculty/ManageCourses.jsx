import FacultySidebar from "./Sidebar";
import { useState } from "react";

const FacultyCourses = () => {
	const [modal, setModal] = useState(false);
	const [modalPage, setModalPage] = useState(1);

	return (
		<div>
			{modal && (
				<>
					<div
						className="fixed inset-0 bg-black opacity-50 z-50 w-full h-full top-0 left-0"
						onClick={() => {
							setModal(false);
						}}
					/>
					<div className="fixed justify-items-center z-50 top-[120px] justify-center items-center w-full">
						<div className="relative p-4 w-full max-w-7xl">
							<div className="relative bg-white rounded-lg shadow h-[450px]">
								<div className="pl-[370px] flex items-center justify-between p-4 rounded-t mb-4">
									<ol className="pt-8 pb-5 justify-center space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse">
										<li
											className="flex items-center text-blue-600 space-x-2.5 rtl:space-x-reverse cursor-pointer"
											onClick={() => {
												setModalPage(1);
											}}
										>
											<span className="flex items-center justify-center w-8 h-8 border border-blue-600 rounded-full shrink-0 ">
												1
											</span>
											<span>
												<h3 className="font-medium leading-tight">
													Course Structure
												</h3>
											</span>
										</li>
										<li
											className="flex items-center text-gray-500 space-x-2.5 rtl:space-x-reverse cursor-pointer"
											onClick={() => {
												setModalPage(2);
											}}
										>
											<span className="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0">
												2
											</span>
											<span>
												<h3 className="font-medium leading-tight">
													Schedule ISE
												</h3>
											</span>
										</li>
										<li
											className="flex items-center text-gray-500 space-x-2.5 rtl:space-x-reverse cursor-pointer"
											onClick={() => {
												setModalPage(3);
											}}
										>
											<span className="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0">
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
											setModal(false);
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
								{modalPage === 1 && (
									<>
										<div className="ml-8 mr-12 grid grid-cols-4 gap-x-10 gap-y-5 mb-5">
											<div className="mb-5">
												<label className="text-gray-700 text-sm font-semibold mb-2">
													ISE 1 Weightage
												</label>
												<input
													type="number"
													placeholder="ISE 1 Weightage"
													className="px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:bg-white w-full"
												/>
											</div>
											<div className="mb-5">
												<label className="text-gray-700 text-sm font-semibold mb-2">
													ISE 1 Marks
												</label>
												<input
													type="number"
													placeholder="ISE 1 Marks"
													className="px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:bg-white w-full"
												/>
											</div>
											<div className="mb-5">
												<label className="text-gray-700 text-sm font-semibold mb-2">
													ISE 2 Weightage
												</label>
												<input
													type="number"
													placeholder="ISE 2 Weightage"
													className="px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:bg-white w-full"
												/>
											</div>
											<div className="mb-5">
												<label className="text-gray-700 text-sm font-semibold mb-2">
													ISE 2 Marks
												</label>
												<input
													type="number"
													placeholder="ISE 2 Marks"
													className="px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:bg-white w-full"
												/>
											</div>
											<div className="mb-5">
												<label className="text-gray-700 text-sm font-semibold mb-2">
													MSE Weightage
												</label>
												<input
													type="number"
													placeholder="ISE 1 Weightage"
													className="px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:bg-white w-full"
												/>
											</div>
											<div className="mb-5">
												<label className="text-gray-700 text-sm font-semibold mb-2">
													MSE Marks
												</label>
												<input
													type="number"
													placeholder="MSE Marks"
													className="px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:bg-white w-full"
												/>
											</div>
											<div className="mb-5">
												<label className="text-gray-700 text-sm font-semibold mb-2">
													ESE Weightage
												</label>
												<input
													type="number"
													placeholder="ESE Weightage"
													className="px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:bg-white w-full"
												/>
											</div>
											<div className="mb-5">
												<label className="text-gray-700 text-sm font-semibold mb-2">
													ESE Marks
												</label>
												<input
													type="number"
													placeholder="ESE Marks"
													className="px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:bg-white w-full"
												/>
											</div>
										</div>
									</>
								)}
								{modalPage === 2 && <></>}
								<div className="flex justify-between ml-8 mr-12 py-4 border-gray-200 rounded-b">
									<button
										className="py-2.5 w-32 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
										onClick={() => {
											setModal(false);
										}}
									>
										Cancel
									</button>
									<button
										type="button"
										className="text-white w-32 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
									>
										I accept
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
														setModal(true);
													}}
												>
													Theory
												</span>
												<span className="text-blue-600 underline cursor-pointer">
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
