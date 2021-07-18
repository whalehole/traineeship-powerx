// Activity #2: McCarthy 91 function

const mc91 = n => {
    if (n > 100) {return n-10}
    else {
        return mc91(mc91(n+11))
    }
}

console.log(mc91(99))