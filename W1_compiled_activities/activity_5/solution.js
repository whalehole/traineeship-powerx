const ask_user_age = () => {
    let userAge = window.prompt("Your age")
    while (userAge <= 0 || userAge > 122) {
        switch (true) {
            case (userAge <= 0):
                console.log("Your age cannot be 0 or less, it must be at least 1.")
                userAge = window.prompt("Your real age")
                break
            case (userAge > 122):
                console.log(`I really doubt you are ${userAge}...`)
                userAge = window.prompt("Your real age")
                break
        }
    }
    console.log(`Your age is ${userAge}`)
    return {userAge: userAge}
}

console.log(ask_user_age())