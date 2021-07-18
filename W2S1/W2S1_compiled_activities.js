// Activity 1: median(arr)

const medianOf = arr => {
    const mySort = (num1,num2) => {return num1 === num2 ? 0 : (num1 > num2 ? 1 : -1)}
    sortedArray = arr.sort(mySort);
    console.log(sortedArray);
    const n = sortedArray.length
    if (n % 2 === 0) {
        return (sortedArray[(n/2)-1] + sortedArray[n/2])/2
    }
    else {
        return sortedArray[(n-1)/2]
    }
}

console.log(medianOf([5,4,3,33,29,99]))

// Activity 2: middle_array(arr)

const middleArray = arr => {
    n = arr.length;
    return arr.slice(1,n-1)
}

console.log(middleArray([1,9,4]));

// Activity 3: sum_odd_numbers(arr)

const sum_odd_numbers = arr => {
    let onlyPosOdd = arr.filter(num=>{return num%2 !== 0 && num > 0});
    return onlyPosOdd.reduce((sum,num)=>{return sum+num})
}

console.log(sum_odd_numbers([43,30,27,-3]));

// Activity 4: moving_average(arr)

const moving_average = arr => {
    let ma = [];
    for (let _ = 2; _ <= arr.length-1; _++) {
        console.log(_);
        ma.push(((arr[_]+arr[_-1]+arr[_-2])/3).toFixed(1));
    }
    return ma
}

console.log(moving_average([30.0,20.0,40.0,50.0,25.0,70.0]));

// Activity 5 : swap_elements(arr, index1, index2)

const swap_elements = (arr, index1, index2) => {
    let aLength = arr.length;
    if (index1 < 0 || index1 > aLength-1 || index2 < 0 || index2 > aLength-1) {return null}
    else {
        let arrCopy = [...arr];
        // arrCopy[index1] = arr[index2];
        // arrCopy[index2] = arr[index1];
        console.log(arrCopy);
        [arrCopy[index1], arrCopy[index2]] = [arrCopy[index2], arrCopy[index1]];
        return arrCopy
    }
}

console.log(swap_elements([1,2,3,4,5], 1,3));

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


