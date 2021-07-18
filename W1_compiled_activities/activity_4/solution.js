const taxPayable = (income) => {
    console.log((income > 20000) ? `The tax payable on an income of ${income} is ${(income-20000)*0.05} dollars.` : `No tax is charged on an income of ${income} dollars`)
    return {taxPayable: (income-20000)*0.05}
}

console.log(taxPayable(30000))