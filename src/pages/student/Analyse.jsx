/* eslint-disable no-unused-vars */
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import Papa from "papaparse";
import { getCourseList, getCourseMarks } from "../../services/student";

const Analyze = () => {
	const studentDetails = {
		name: "akshat",
		uid: 2021300014,
		email: "akshat.biniwale@edu.ac.in",
		branch: "COMPS",
		ise1: 6,
		ise2: 8,
		mse: 22,
		ese: 69,
	};
	const [subjects, setSubjects] = useState(["ECL", "DSM", "BEE", "CAO"]);
	const [selectedSubject, setSelectedSubject] = useState("ECL");
	const [examType, setExamType] = useState("ISE 1");
	const [data, setData] = useState(null);
	const [activeTab, setActiveTab] = useState("distribution");


	useEffect(()=>{
		getCourseList()
		.then(data=>setSubjects(data))
		.catch(err=>console.log(err))

	},[])



	// Load data from CSV
	useEffect(() => {
		// const loadData = async () => {
		// 	try {
		// 		const response = await fetch(
		// 			`/datasets/${selectedSubject}.csv`
		// 		);
		// 		const csvText = await response.text();
		// 		const result = Papa.parse(csvText, {
		// 			header: true,
		// 			dynamicTyping: true,
		// 			skipEmptyLines: true,
		// 			trimHeaders: true,
		// 			trim: true,
		// 		});
		// 		setData(result.data);
		// 	} catch (error) {
		// 		console.error("Error loading data:", error);
		// 	}
		// };
		// loadData();
		getCourseMarks(selectedSubject)
		.then(res=>{
			setData(res.marks)
		})
		.catch(err=>console.log(err))
	}, [selectedSubject]);

	// Helper function to normalize marks
	const normalizeMarks = (mark, examType) => {
		const maxMarks = {
			"ISE 1": 10,
			"ISE 2": 10,
			MSE: 30,
			ESE: 100,
		};
		return mark / maxMarks[examType];
	};

	// Plot Components
	const BranchDistribution = () => {
		if (!data) {
			return <div>Loading...</div>;
		}

		const branchCounts = data.reduce((acc, curr) => {
			acc[curr.branch] = (acc[curr.branch] || 0) + 1;
			return acc;
		}, {});

		return (
			<Plot
				data={[
					{
						values: Object.values(branchCounts),
						labels: Object.keys(branchCounts),
						type: "pie",
						textinfo: "label+percent",
						hoverinfo: "label+value",
					},
				]}
				layout={{
					title: `Branch Distribution`,
					height: 500,
					width: 800,
					margin: {
						l: 50, // left margin
						r: 150, // Increased right margin to create space for legend
						b: 50, // bottom margin
						t: 80, // top margin
					},
					legend: {
						x: 1.05, // Move legend further to the right
						y: 0.5, // Center vertically
						xanchor: "left",
						yanchor: "middle",
					},
					autosize: false,
				}}
			/>
		);
	};

	const MarksHistogram = () => {
		const studentMark =
			studentDetails[examType.toLowerCase().replace(" ", "")];

		return (
			<Plot
				data={[
					{
						x: data.map((d) => d[examType.toLowerCase()]),
						type: "histogram",
						nbinsx: 20,
						name: "Class Distribution",
					},
					{
						x: [studentMark],
						type: "scatter",
						mode: "markers",
						marker: { color: "red", size: 10 },
						name: "Your Mark",
					},
				]}
				layout={{
					title: `Distribution of ${examType} Marks`,
					xaxis: { title: "Marks" },
					yaxis: { title: "Count" },
					showlegend: true,
					height: 500,
					width: 800,
					margin: {
						l: 50,
						r: 150,
						b: 50,
						t: 80,
					},
					legend: {
						x: 1.05,
						y: 0.5,
						xanchor: "left",
						yanchor: "middle",
					},
					autosize: false,
					shapes: [
						{
							type: "line",
							x0: studentMark,
							y0: 0,
							x1: studentMark,
							y1: 1,
							yref: "paper",
							line: {
								color: "red",
								width: 2,
								dash: "dash",
							},
						},
					],
				}}
			/>
		);
	};

	const AverageMarksChart = () => {
		const examTypes = ["ISE 1", "ISE 2", "MSE", "ESE"];
		const avgMarks = examTypes.map(
			(exam) =>
				data.reduce((sum, curr) => sum + curr[exam.toLowerCase()], 0) /
				data.length
		);

		const studentMarks = examTypes.map(
			(exam) => studentDetails[exam.toLowerCase().replace(" ", "")]
		);

		return (
			<Plot
				data={[
					{
						x: examTypes,
						y: avgMarks,
						type: "scatter",
						mode: "lines+markers",
						name: "Class Average",
					},
					{
						x: examTypes,
						y: studentMarks,
						type: "scatter",
						mode: "markers",
						marker: { color: "red", size: 10 },
						name: "Your Marks",
					},
				]}
				layout={{
					title: `Average Marks Across Exams`,
					xaxis: { title: "Exam Type" },
					yaxis: { title: "Marks" },
					height: 500,
					width: 800,
					margin: {
						l: 50, // left margin
						r: 150, // Increased right margin to create space for legend
						b: 50, // bottom margin
						t: 80, // top margin
					},
					legend: {
						x: 1.05, // Move legend further to the right
						y: 0.5, // Center vertically
						xanchor: "left",
						yanchor: "middle",
					},
					autosize: false,
				}}
			/>
		);
	};

	const CorrelationHeatmap = () => {
		const examTypes = ["ISE 1", "ISE 2", "MSE", "ESE"];
		const correlationMatrix = examTypes.map((exam1) =>
			examTypes.map((exam2) => {
				const x = data.map((d) => d[exam1.toLowerCase().replace(" ","")]);
				const y = data.map((d) => d[exam2.toLowerCase().replace(" ","")]);
				return (
					Math.round(
						(x.reduce(
							(a, b, i) =>
								a +
								(b - x.reduce((c, d) => c + d, 0) / x.length) *
									(y[i] -
										y.reduce((c, d) => c + d, 0) /
											y.length),
							0
						) /
							(Math.sqrt(
								x.reduce(
									(a, b) =>
										a +
										Math.pow(
											b -
												x.reduce((c, d) => c + d, 0) /
													x.length,
											2
										),
									0
								)
							) *
								Math.sqrt(
									y.reduce(
										(a, b) =>
											a +
											Math.pow(
												b -
													y.reduce(
														(c, d) => c + d,
														0
													) /
														y.length,
												2
											),
										0
									)
								))) *
							100
					) / 100
				);
			})
		);

		return (
			<Plot
				data={[
					{
						z: correlationMatrix,
						x: examTypes,
						y: examTypes,
						type: "heatmap",
						colorscale: "RdBu",
						text: correlationMatrix.map((row) => row.map(String)),
						texttemplate: "%{text}",
						textfont: { color: "white" },
						hoverongaps: false,
					},
				]}
				layout={{
					title: `Correlation Between Exams`,
					height: 500,
					width: 800,
					margin: {
						l: 50, // left margin
						r: 150, // Increased right margin to create space for legend
						b: 50, // bottom margin
						t: 80, // top margin
					},
					legend: {
						x: 1.05, // Move legend further to the right
						y: 0.5, // Center vertically
						xanchor: "left",
						yanchor: "middle",
					},
					autosize: false,
				}}
			/>
		);
	};

	const RadarChart = () => {
		const examTypes = ["ISE 1", "ISE 2", "MSE", "ESE"];
		const avgMarksNormalized = examTypes.map((exam) => {
			const avgMark =
				data.reduce((sum, curr) => sum + curr[exam.toLowerCase()], 0) /
				data.length;
			return normalizeMarks(avgMark, exam);
		});

		const studentMarksNormalized = examTypes.map((exam) =>
			normalizeMarks(
				studentDetails[exam.toLowerCase().replace(" ", "")],
				exam
			)
		);

		return (
			<Plot
				data={[
					{
						type: "scatterpolar",
						r: avgMarksNormalized,
						theta: examTypes,
						fill: "toself",
						name: "Class Average",
					},
					{
						type: "scatterpolar",
						r: studentMarksNormalized,
						theta: examTypes,
						fill: "toself",
						name: "Your Performance",
					},
				]}
				layout={{
					polar: {
						radialaxis: {
							visible: true,
							range: [0, 1],
						},
					},
					showlegend: true,
					title: `Performance Comparison`,
					height: 500,
					width: 800,
					margin: {
						l: 50, // left margin
						r: 150, // Increased right margin to create space for legend
						b: 50, // bottom margin
						t: 80, // top margin
					},
					legend: {
						x: 1.05, // Move legend further to the right
						y: 0.5, // Center vertically
						xanchor: "left",
						yanchor: "middle",
					},
					autosize: false,
				}}
			/>
		);
	};

	const BoxPlot = () => {
		const branches = [...new Set(data.map((d) => d.branch))];
		const traces = branches.map((branch) => ({
			y: data
				.filter((d) => d.branch === branch)
				.map((d) => d[examType.toLowerCase()]),
			type: "box",
			name: branch,
		}));

		const studentMark =
			studentDetails[examType.toLowerCase().replace(" ", "")];

		traces.push({
			y: [studentMark],
			type: "scatter",
			mode: "markers",
			marker: { color: "red", size: 10, symbol: "star" },
			name: "Your Mark",
		});

		return (
			<Plot
				data={traces}
				layout={{
					title: `${examType} Marks by Branch`,
					yaxis: { title: "Marks" },
					height: 500,
					width: 800,
					margin: {
						l: 50, // left margin
						r: 150, // Increased right margin to create space for legend
						b: 50, // bottom margin
						t: 80, // top margin
					},
					legend: {
						x: 1.05, // Move legend further to the right
						y: 0.5, // Center vertically
						xanchor: "left",
						yanchor: "middle",
					},
					autosize: false,
				}}
			/>
		);
	};

	const renderContent = () => {
		switch (activeTab) {
			case "distribution":
				return <BranchDistribution />;
			case "histogram":
				return <MarksHistogram />;
			case "trends":
				return <AverageMarksChart />;
			case "correlation":
				return <CorrelationHeatmap />;
			case "comparison":
				return <RadarChart />;
			case "boxplot":
				return <BoxPlot />;
			default:
				return null;
		}
	};

	return (
		<div>
			<Sidebar />
			<div className="p-4 sm:ml-64">
				<div className="p-4 mt-14">
					<p className="font-bold text-4xl mb-5">Analyse Progress</p>
					<p className="mb-5">
						Using the below filters for subject and exam type, you
						can view the analysis of your performance in the
						selected subject and exam type:
					</p>
					<div className="grid grid-cols-4 gap-x-10">
						<div className="col-span-1">
							<label className="block text-gray-700 text-sm font-semibold mb-2">
								Course
							</label>
							<select
								className="px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 text-gray-500 text-sm focus:bg-white w-full"
								value={selectedSubject}
								onChange={(e) =>
									setSelectedSubject(e.target.value)
								}
							>
								{subjects.map((subject) => (
									<option key={subject._id} value={subject._id}>
										{subject.name}
									</option>
								))}
							</select>
						</div>
						<div className="col-span-1">
							<label className="block text-gray-700 text-sm font-semibold mb-2">
								Exam Type
							</label>
							<select
								className="px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 text-gray-500 text-sm focus:bg-white w-full"
								value={examType}
								onChange={(e) => setExamType(e.target.value)}
							>
								{["ISE 1", "ISE 2", "MSE", "ESE"].map(
									(exam) => (
										<option key={exam} value={exam}>
											{exam}
										</option>
									)
								)}
							</select>
						</div>
					</div>

					<div className="text-md mt-7 font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 w-fit">
						<ul className="flex flex-wrap -mb-px">
							{[
								{
									id: "distribution",
									label: "Branch Distribution",
								},
								{
									id: "histogram",
									label: "Marks Distribution",
								},
								{
									id: "trends",
									label: "Performance Trends",
								},
								{
									id: "correlation",
									label: "Correlation Analysis",
								},
								{
									id: "comparison",
									label: "Performance Comparison",
								},
								{
									id: "boxplot",
									label: "Branch Performance Comparison",
								},
							].map((tab) => (
								<li
									key={tab.id}
									onClick={() => setActiveTab(tab.id)}
									className={`cursor-pointer me-2 inline-block py-4 px-[13.5px] border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${
										activeTab === tab.id
											? "border-b-2 border-blue-500"
											: ""
									}`}
								>
									{tab.label}
								</li>
							))}
						</ul>
					</div>

					<div className="pt-4">
						<div className="rounded p-4">
							<div className="text-xl font-bold mb-4">
								{activeTab === "distribution" &&
									"Branch-wise Distribution"}
								{activeTab === "histogram" &&
									"Marks Distribution"}
								{activeTab === "trends" && "Performance Trends"}
								{activeTab === "correlation" &&
									"Correlation Analysis"}
								{activeTab === "comparison" && "Radar Analysis"}
								{activeTab === "boxplot" && "Box Plot Analysis"}
							</div>
							{renderContent()}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Analyze;
