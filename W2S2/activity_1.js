// Activity #1: Fibonacci sequence

const fibonacci = index => {
    if (index <= 1) {
        return (index == 1 ? 1 : 0)
    }
    return fibonacci(index-1) + fibonacci(index-2)
}

console.log(fibonacci(12))