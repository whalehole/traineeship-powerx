// Activity #1: Fibonacci sequence

const fibonacci = index => {
    if (index <= 1) {
        return (index == 1 ? 1 : 0)
    }
    return fibonacci(index-1) + fibonacci(index-2)
}

console.log(fibonacci(12))

// Activity #2: McCarthy 91 function

const mc91 = n => {
    if (n > 100) {return n-10}
    else {
        return mc91(mc91(n+11))
    }
}

console.log(mc91(99))

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

// Activity #4: Towers of Hanoi

const move_disks = (n, from_tower, to_tower, aux_tower) => {
    result = []
    const move = (n, from_tower, to_tower, aux_tower) => {
        if (n > 0) {
            move(n - 1, from_tower, aux_tower, to_tower)
            result.push(`Move disk ${n} from ${from_tower} to ${to_tower}.`)
            move(n - 1, aux_tower, to_tower, from_tower)
        }
    }
    move(n, from_tower, to_tower, aux_tower)  
    return result
}

console.log(move_disks(3, "A", "B", "C"))