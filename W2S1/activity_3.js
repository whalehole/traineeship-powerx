// Activity 3: sum_odd_numbers(arr)

const sum_odd_numbers = arr => {
    let onlyPosOdd = arr.filter(num=>{return num%2 !== 0 && num > 0});
    return onlyPosOdd.reduce((sum,num)=>{return sum+num})
}

console.log(sum_odd_numbers([43,30,27,-3]));