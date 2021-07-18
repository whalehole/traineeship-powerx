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