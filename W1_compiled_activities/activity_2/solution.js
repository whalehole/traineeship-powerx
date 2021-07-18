const quadratic = (a,b,c) => {
    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        console.log("Invalid quadratic equation.")
    }
    else {
        let delta = b**2-4*a*c
        let x1 = (-b-(delta**(1/2)))/(2*a)
        let x2 = (-b+(delta**(1/2)))/(2*a)
        console.log(`delta = ${delta}, x1 = ${x1}, x2 = ${x2}`)
        return {delta: delta, x1: x1, x2: x2}
    }
}

console.log(quadratic(2,-2,-24))
