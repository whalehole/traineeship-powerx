// Activity #3: Euclide Algorithm for the GCD

const gcd = (a, b) => {
    if (a == b) {
        return a
    }
    while (a > b) {
        a -= b
    }
    while (a < b) {
        b -= a
    }
    return gcd(a, b)
}

console.log(gcd(4,28))