const compute_landing_point = (initSpeed, initAngle) => {
    const g = 9.81
    initAngle = initAngle/180 * Math.PI
    distance = initSpeed**2 * Math.sin(2*initAngle) / g
    console.log(`The bird will land ${distance}m away.`)
    return {distance: distance}
}

console.log(compute_landing_point(30, 30))