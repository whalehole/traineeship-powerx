const collatz = n => {
    n = (n<1 || !Number.isInteger(n)) ? window.prompt("Choose an integer (bigger than 1)") : n
    let counter = 1
    while (n !== 1 && counter !== 20) {
        console.log(`#${counter}. ${n}`)
        counter++
        n = (n%2 == 0) ? n/2 : n*3 + 1
    }
    console.log(`#${counter}. ${n}`)
    console.log(counter == 20 ? `Limit reached. n value is ${n}` : "n has reached the value of 1.")
    return {Outcome: counter == 20 ? "Failed" : "Success", nValue: n}
}

console.log(collatz(9.9))