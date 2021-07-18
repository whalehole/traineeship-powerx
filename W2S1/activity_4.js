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