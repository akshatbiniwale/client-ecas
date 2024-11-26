/* eslint-disable no-unused-vars */
import Sidebar from "./Sidebar";
import jsPDF from "jspdf";
import "jspdf-autotable";
import spit_logo from "../../assets/spit_logo.jpg";
import check_by from "../../assets/check_by.png";
import verify_by from "../../assets/verify_by.png";
import coe from "../../assets/coe.png";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getStudentGrades, getTimetable } from "../../services/student";
import { toast } from "react-hot-toast";

const Downloads = () => {
	const [year, setYear] = useState(1);
	const [semester, setSemester] = useState("Odd");
	const [grades, setGrades] = useState({});
	const [timetable, setTimetable] = useState({});

	// Sample grades object

	// grades = {
	// 	examDate: "April 2022",
	// 	previousCGPA: [9.23],
	// 	courses: [
	// 		{
	// 			course_code: "MA101",
	// 			course_name: "Engineering Calculus",
	// 			credits: "4",
	// 			grade: "AA",
	// 			credits_earned: "4",
	// 			grade_points: "10",
	// 		},
	// 	],
	// };

	// Sample timetable object

	// timetable = {
	// 	year: "First",
	// 	semester: "II",
	// 	table: [
	// 		{
	// 			date: "01/12/2023",
	// 			time: "10:00 AM",
	// 			program: "COMPS", // department is program
	// 			course_code: "MA101",
	// 			course_name: "Engineering Calculus",
	// 		},
	// 	],
	// };

	// const studentState = useSelector((state) => state.student);

	useEffect(() => {
		getStudentGrades({
			year,
			semester
		}).then((data) => {
			setGrades(data);
		}).catch((error) => {
			toast.error("Data not found");
		});
	}, [year, semester]);

	// useEffect(() => {
	// 	getTimetable({
	// 		year,
	// 		semester,
	// 		uid: studentState.studentInfo.user.uid,
	// 	}).then((data) => {
	// 		setTimetable(data);
	// 	}).catch((error) => {
	// 		toast.error("Data not found");
	// 	});
	// }, [year, semester, studentState.studentInfo]);

	const handleGradeSheetDownload = () => {
		// Create new jsPDF instance
		const doc = new jsPDF();

		// Function to convert image to base64
		const getImageAsBase64 = (imgUrl) => {
			return new Promise((resolve, reject) => {
				const img = new Image();
				img.crossOrigin = "Anonymous"; // Handle CORS issues

				img.onload = () => {
					const canvas = document.createElement("canvas");
					canvas.width = img.width;
					canvas.height = img.height;

					const ctx = canvas.getContext("2d");
					ctx.drawImage(img, 0, 0);

					const dataURL = canvas.toDataURL("image/jpeg");
					resolve(dataURL);
				};

				img.onerror = reject;
				img.src = imgUrl;
			});
		};

		// Main function to generate PDF
		const generatePDF = async () => {
			try {
				// Get base64 image
				const imageSpit = await getImageAsBase64(spit_logo);
				const imageCheckBy = await getImageAsBase64(check_by);
				const imageVerifyBy = await getImageAsBase64(verify_by);
				const imageCoe = await getImageAsBase64(coe);

				// Set background color
				doc.setFillColor(254, 254, 255);
				doc.rect(
					0,
					0,
					doc.internal.pageSize.width,
					doc.internal.pageSize.height,
					"F"
				);

				// Add logo
				doc.addImage(imageSpit, "JPEG", 15, 10, 20, 20);

				// Add header
				doc.setFontSize(16);
				doc.setFont("helvetica", "bold");
				doc.text(
					"BHARATIYA VIDYA BHAVAN'S",
					doc.internal.pageSize.width / 2,
					20,
					{
						align: "center",
					}
				);
				doc.text(
					"SARDAR PATEL INSTITUTE OF TECHNOLOGY",
					doc.internal.pageSize.width / 2,
					28,
					{
						align: "center",
					}
				);

				// Rest of your existing code for generating the PDF
				// Add subheader
				doc.setFontSize(10);
				doc.setFont("helvetica", "normal");
				doc.text(
					"(An Autonomous Institute Affiliated to University of Mumbai)",
					doc.internal.pageSize.width / 2,
					35,
					{ align: "center" }
				);
				doc.text(
					"MUNSHI NAGAR, ANDHERI (WEST), MUMBAI - 400 058",
					doc.internal.pageSize.width / 2,
					40,
					{ align: "center" }
				);

				// Add "SEMESTER GRADE CARD" title
				doc.setFillColor(200, 200, 255);
				doc.rect(65, 45, 80, 8, "F");
				doc.setFontSize(12);
				doc.setFont("helvetica", "bold");
				doc.text(
					"SEMESTER GRADE CARD",
					doc.internal.pageSize.width / 2,
					51,
					{
						align: "center",
					}
				);

				// Add student details
				doc.setFontSize(10);
				doc.setFont("helvetica", "normal");
				doc.text(`Name: ${grades.studentDetails.name}`, 15, 65);
				doc.text(
					`Seat Number (UID): ${grades.studentDetails.uid}`,
					15,
					79
				);
				doc.text(`Academic Year: ${year}`, 120, 72);
				doc.text(`Semester: ${semester.toUpperCase()}`, 120, 79);

				// Create grade table
				doc.autoTable({
					startY: 85,
					head: [
						[
							"Course Code",
							"Course Name",
							"Course Credits",
							"Grade",
							"Credits Earned (C)",
							"Grade Points (GP)",
							"C*GP",
						],
					],
					// uncomment the below line and comment the next line to use actual data
					body: grades.courses.map((course) => [
						course.code,
						course.name,
						course.credits,
						course.grade,
						course.creditsEarned,
						course.gradePoint,
						parseInt(course.creditsEarned) * parseInt(course.gradePoint),
					]),
					// body: [
					// 	[
					// 		"MA101",
					// 		"Engineering Calculus",
					// 		"4",
					// 		"AA",
					// 		"4",
					// 		"10",
					// 		"40",
					// 	],
					// 	[
					// 		"AS102",
					// 		"Engineering Chemistry",
					// 		"3",
					// 		"AB",
					// 		"3",
					// 		"9",
					// 		"27",
					// 	],
					// 	[
					// 		"AS103",
					// 		"Biology for Engineers",
					// 		"2",
					// 		"AB",
					// 		"2",
					// 		"6",
					// 		"18",
					// 	],
					// 	[
					// 		"AS105",
					// 		"Engineering Mechanics",
					// 		"3",
					// 		"AA",
					// 		"3",
					// 		"10",
					// 		"30",
					// 	],
					// 	[
					// 		"CS101",
					// 		"Problem Solving Using Imperative Programming",
					// 		"4",
					// 		"AB",
					// 		"4",
					// 		"9",
					// 		"36",
					// 	],
					// 	[
					// 		"EE101",
					// 		"Digital Systems and Microprocessor",
					// 		"2",
					// 		"BB",
					// 		"2",
					// 		"8",
					// 		"16",
					// 	],
					// 	[
					// 		"AS107",
					// 		"Communication Skills",
					// 		"2",
					// 		"AA",
					// 		"2",
					// 		"10",
					// 		"20",
					// 	],
					// ],
					theme: "grid",
					styles: {
						fontSize: 9,
						cellPadding: 2,
					},
					headStyles: {
						fillColor: [255, 255, 255],
						textColor: [0, 0, 0],
						fontStyle: "bold",
					},
					columnStyles: {
						0: { cellWidth: 25 },
						1: { cellWidth: 65 },
						2: { cellWidth: 20 },
						3: { cellWidth: 20 },
						4: { cellWidth: 20 },
						5: { cellWidth: 20 },
						6: { cellWidth: 20 },
					},
				});

				// Add total row
				const finalY = doc.autoTable.previous.finalY;
				doc.autoTable({
					startY: finalY,
					body: [["", "Total", grades.total.totalCredits, "", grades.total.earnedCredits, "", grades.total.earnedCGPA]],
					// body: [["", "Total", "22", "", "22", "", "203"]],
					theme: "grid",
					styles: {
						fontSize: 9,
						cellPadding: 2,
						fontStyle: "bold",
					},
					columnStyles: {
						0: { cellWidth: 25 },
						1: { cellWidth: 65 },
						2: { cellWidth: 20 },
						3: { cellWidth: 20 },
						4: { cellWidth: 20 },
						5: { cellWidth: 20 },
						6: { cellWidth: 20 },
					},
				});

				// Add SGPA table
				doc.text("Semester Performance (SGPA)", 15, finalY + 30);
				doc.autoTable({
					startY: finalY + 35,
					head: [
						[
							"I",
							"II",
							"III",
							"IV",
							"V",
							"VI",
							"VII",
							"VIII",
							"CGPA",
						],
					],
					body: [grades.gpa.map(({sgpa}) => sgpa).concat(Array(8 - grades.gpa.length).fill(""))],
					theme: "grid",
					styles: {
						fontSize: 9,
						cellPadding: 2,
					},
					headStyles: {
						fillColor: [255, 255, 255],
						textColor: [0, 0, 0],
						fontStyle: "bold",
					},
				});

				// Add footer
				const footerY = doc.autoTable.previous.finalY + 15;
				doc.text("Remark: Successful", 15, footerY);
				doc.text("Result Declared On: 16th May 2024", 15, footerY + 7);

				// Add signature fields with better positioning
				const signatureY = footerY + 25; // Adjust base Y position for signature section

				// Add signature images
				doc.addImage(imageCheckBy, "JPEG", 25, signatureY, 30, 15);
				doc.addImage(imageVerifyBy, "JPEG", 85, signatureY, 30, 15);
				doc.addImage(imageCoe, "JPEG", 145, signatureY, 30, 15);

				// Add signature labels below the images
				doc.setFontSize(10);
				doc.text("Checked By", 40, signatureY + 25, {
					align: "center",
				});
				doc.text("Verified By", 100, signatureY + 25, {
					align: "center",
				});
				doc.text("Controller of Examinations", 160, signatureY + 25, {
					align: "center",
				});

				// Optional: Add signature lines
				doc.setLineWidth(0.5);
				doc.line(25, signatureY + 20, 55, signatureY + 20); // Line for Checked By
				doc.line(85, signatureY + 20, 115, signatureY + 20); // Line for Verified By
				doc.line(145, signatureY + 20, 175, signatureY + 20); // Line for Controller
				// Save the PDF
				doc.save("semester-grade-card.pdf");
			} catch (error) {
				console.error("Error generating PDF:", error);
			}
		};

		// Call the generate PDF function
		generatePDF();
	};

	const handleTimetableDownload = () => {
		// Create new jsPDF instance
		const doc = new jsPDF();

		// Function to convert image to base64
		const getImageAsBase64 = (imgUrl) => {
			return new Promise((resolve, reject) => {
				const img = new Image();
				img.crossOrigin = "Anonymous"; // Handle CORS issues

				img.onload = () => {
					const canvas = document.createElement("canvas");
					canvas.width = img.width;
					canvas.height = img.height;

					const ctx = canvas.getContext("2d");
					ctx.drawImage(img, 0, 0);

					const dataURL = canvas.toDataURL("image/jpeg");
					resolve(dataURL);
				};

				img.onerror = reject;
				img.src = imgUrl;
			});
		};

		// Main function to generate PDF
		const generatePDF = async () => {
			try {
				// Get base64 image
				const imageSpit = await getImageAsBase64(spit_logo);
				const imageCoe = await getImageAsBase64(coe);

				// Set background color
				doc.setFillColor(254, 254, 255);
				doc.rect(
					0,
					0,
					doc.internal.pageSize.width,
					doc.internal.pageSize.height,
					"F"
				);

				// Add logo
				doc.addImage(imageSpit, "JPEG", 15, 10, 20, 20);

				// Add header
				doc.setFontSize(16);
				doc.setFont("helvetica", "bold");
				doc.text(
					"BHARATIYA VIDYA BHAVAN'S",
					doc.internal.pageSize.width / 2,
					20,
					{
						align: "center",
					}
				);
				doc.text(
					"SARDAR PATEL INSTITUTE OF TECHNOLOGY",
					doc.internal.pageSize.width / 2,
					28,
					{
						align: "center",
					}
				);

				// Rest of your existing code for generating the PDF
				// Add subheader
				doc.setFontSize(10);
				doc.setFont("helvetica", "normal");
				doc.text(
					"(An Autonomous Institute Affiliated to University of Mumbai)",
					doc.internal.pageSize.width / 2,
					35,
					{ align: "center" }
				);
				doc.text(
					"MUNSHI NAGAR, ANDHERI (WEST), MUMBAI - 400 058",
					doc.internal.pageSize.width / 2,
					40,
					{ align: "center" }
				);

				doc.setFillColor(255, 255, 255);
				doc.rect(65, 45, 80, 8, "F");
				doc.setFontSize(12);
				doc.setFont("helvetica", "bold");
				// uncomment the below line and comment the next line to use actual data
				// doc.text(
				// 	`End Semester Timetable - ${timetable.year} Year Engineering (${timeable.semester} Semester)`,
				// 	doc.internal.pageSize.width / 2,
				// 	51,
				// 	{
				// 		align: "center",
				// 	}
				// );
				doc.text(
					"End Semester Timetable - First Year Engineering (Semester I)",
					doc.internal.pageSize.width / 2,
					51,
					{
						align: "center",
					}
				);

				// Create timetable table
				doc.autoTable({
					startY: 85,
					head: [
						[
							"Date",
							"Time",
							"Program",
							"Course Code",
							"Course Name",
						],
					],

					body: [
						[
							"01/12/2023",
							"10:00 AM",
							"B.Tech",
							"MA101",
							"Engineering Calculus",
						],
						[
							"02/12/2023",
							"10:00 AM",
							"B.Tech",
							"AS102",
							"Engineering Chemistry",
						],
						[
							"03/12/2023",
							"10:00 AM",
							"B.Tech",
							"AS103",
							"Biology for Engineers",
						],
						[
							"04/12/2023",
							"10:00 AM",
							"B.Tech",
							"AS105",
							"Engineering Mechanics",
						],
						[
							"05/12/2023",
							"10:00 AM",
							"B.Tech",
							"CS101",
							"Problem Solving Using Imperative Programming",
						],
						[
							"06/12/2023",
							"10:00 AM",
							"B.Tech",
							"EE101",
							"Digital Systems and Microprocessor",
						],
						[
							"07/12/2023",
							"10:00 AM",
							"B.Tech",
							"AS107",
							"Communication Skills",
						],
					],
					// uncomment the below line and comment the next line to use actual data
					// body: timetable.table.map((course) => [
					// 	course.date,
					// 	course.time,
					// 	course.program,
					// 	course.course_code,
					// 	course.course_name,
					// ]),
					theme: "grid",
					styles: {
						fontSize: 9,
						cellPadding: 2,
						lineWidth: 0.2, // Bold border width
						lineColor: [0, 0, 0], // Border color
					},
					headStyles: {
						fillColor: [255, 255, 255],
						textColor: [0, 0, 0],
						fontStyle: "bold",
					},
					columnStyles: {
						0: { cellWidth: 25 },
						1: { cellWidth: 25 },
						2: { cellWidth: 25 },
						3: { cellWidth: 30 },
						4: { cellWidth: 77 },
					},
				});

				// Add footer
				const footerY = doc.autoTable.previous.finalY + 15;

				// Add signature fields with better positioning
				const signatureY = footerY + 25; // Adjust base Y position for signature section

				// Add signature image
				doc.addImage(imageCoe, "JPEG", 145, signatureY, 30, 15);

				// Add signature labels below the images
				doc.setFontSize(10);

				doc.text("Controller of Examinations", 160, signatureY + 25, {
					align: "center",
				});

				// Optional: Add signature lines
				doc.setLineWidth(0.5);
				doc.line(145, signatureY + 20, 175, signatureY + 20); // Line for Controller
				// Save the PDF
				doc.save("timetable.pdf");
			} catch (error) {
				console.error("Error generating PDF:", error);
			}
		};

		// Call the generate PDF function
		generatePDF();
	};

	return (
		<div>
			<Sidebar />
			<div className="p-4 sm:ml-64">
				<div className="p-4 mt-14">
					<p className="font-bold text-4xl mb-5">Downloads</p>
					<p className="font-bold text-xl mb-5">Grade Cards</p>
					<p className="mb-5">
						Using the below filters for year and semester, you can
						download your grade cards:
					</p>
					<div className="grid grid-cols-5 gap-x-10">
						<div className="col-span-2">
							<label className="block text-gray-700 text-sm font-semibold mb-2">
								Year
							</label>
							<select
								className="px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 text-gray-500 text-sm focus:bg-white w-full"
								onChange={(e) => setYear(e.target.value)}
							>
								<option>1</option>
								<option>2</option>
								<option>3</option>
								<option>4</option>
							</select>
						</div>
						<div className="col-span-2">
							<label className="block text-gray-700 text-sm font-semibold mb-2">
								Semester
							</label>
							<select
								className="px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 text-gray-500 text-sm focus:bg-white w-full"
								onChange={(e) => setSemester(e.target.value)}
							>
								<option>Odd</option>
								<option>Even</option>
							</select>
						</div>
						<div className="col-span-1">
							<button
								className="mt-7 w-full bg-blue-700 rounded-xl text-white text-lg font-semibold py-2"
								type="button"
								onClick={handleGradeSheetDownload}
							>
								Search
							</button>
						</div>
					</div>
					<p className="font-bold text-xl my-5">Time Table</p>
					<p className="mb-5">
						Using the below filters for year and semester, you can
						download your timetable:
					</p>
					<div className="grid grid-cols-5 gap-x-10">
						<div className="col-span-2">
							<label className="block text-gray-700 text-sm font-semibold mb-2">
								Year
							</label>
							<select
								className="px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 text-gray-500 text-sm focus:bg-white w-full"
								onChange={(e) => setYear(e.target.value)}
							>
								<option>1</option>
								<option>2</option>
								<option>3</option>
								<option>4</option>
							</select>
						</div>
						<div className="col-span-2">
							<label className="block text-gray-700 text-sm font-semibold mb-2">
								Semester
							</label>
							<select
								className="px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 text-gray-500 text-sm focus:bg-white w-full"
								onChange={(e) => setSemester(e.target.value)}
							>
								<option>Odd</option>
								<option>Even</option>
							</select>
						</div>
						<div className="col-span-1">
							<button
								className="mt-7 w-full bg-blue-700 rounded-xl text-white text-lg font-semibold py-2"
								type="button"
								onClick={handleTimetableDownload}
							>
								Search
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Downloads;
