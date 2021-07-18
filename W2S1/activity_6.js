// Activity 6 - Exam adjustments

const grade_adjustment = grades_table => {
    for (let _ = 1; _ <= grades_table.length-1; _++) {
        grades_table[_][1] *= 1.5;
        grades_table[_][3] = (Number(grades_table[_][1]) + Number(grades_table[_][2]))/2;
    }
    return grades_table
}

console.log(grade_adjustment([
    ["Student Name", "MidTerm Score", "FinalExam Score", "Average Score"],
    ["Bruce", "55", "66", "60.5"],
    ["Alice", "40", "70", "55"],
    ["Denise", "30", "50", "40"],
    ["John", "80", "60", "70"]
]));