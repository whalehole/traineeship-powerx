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