export const calculateGradeDistribution = (SA, marks) => {
	const span = 9;
	const median = calculateMedian(marks);

	const gradeRanges = [
		{ grade: "AA", range: `Greater than ${SA} upto 100` },
		{ grade: "AB", range: `${SA - span + 1} to ${SA}` },
		{ grade: "BB", range: `${SA - 2 * span + 1} to ${SA - span}` },
		{ grade: "BC", range: `${SA - 3 * span + 1} to ${SA - 2 * span}` },
		{ grade: "CC", range: `${SA - 4 * span + 1} to ${SA - 3 * span}` },
		{ grade: "CD", range: `${SA - 5 * span + 1} to ${SA - 4 * span}` },
		{ grade: "DD", range: `${Math.ceil(median / 2)} to ${SA - 5 * span}` },
		{ grade: "FF", range: `Less than ${Math.ceil(median / 2)}` },
	];

	const gradeFrequencies = {
		AA: 0,
		AB: 0,
		BB: 0,
		BC: 0,
		CC: 0,
		CD: 0,
		DD: 0,
		FF: 0,
	};

	marks.forEach((mark) => {
		const grade = categorizeMark(mark, SA, span, median);
		gradeFrequencies[grade]++;
	});

	return {
		SA,
		gradeRanges,
		gradeFrequencies,
	};
};

const categorizeMark = (mark, SA, span, median) => {
	const ddStart = Math.ceil(median / 2);

	if (mark > SA) return "AA";
	if (mark >= SA - span + 1) return "AB";
	if (mark >= SA - 2 * span + 1) return "BB";
	if (mark >= SA - 3 * span + 1) return "BC";
	if (mark >= SA - 4 * span + 1) return "CC";
	if (mark >= SA - 5 * span + 1) return "CD";
	if (mark >= ddStart) return "DD";
	return "FF";
};

const calculateMedian = (numbers) => {
	const sorted = [...numbers].sort((a, b) => a - b);
	const middle = Math.floor(sorted.length / 2);

	if (sorted.length % 2 === 0) {
		return (sorted[middle - 1] + sorted[middle]) / 2;
	}

	return sorted[middle];
};
