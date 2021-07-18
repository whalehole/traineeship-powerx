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