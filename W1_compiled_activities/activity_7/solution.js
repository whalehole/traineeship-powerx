const isPrime = n => {
    if (n > 1 && Number.isInteger(n)) {
        for (let i = 2; i <= Math.floor(n/2); i++) {
            console.log(n/i)
            if (n%i === 0) {
                console.log(`${n} is not a prime number.`)
                break
            }
            if (i === Math.floor(n/2)) {
                console.log(`${n} is a prime number.`)
            }
        }
    } 
    else (
        console.log("Choose an INTEGER (greater than 1).")
    )
}

isPrime(1)