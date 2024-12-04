// Turn the json data into hashmaps for easier lookup
export const makeUserMaps = (userData) => {
    const idToUsername = new Map()
    const usernameToID = new Map()

    userData.forEach(user => {
        idToUsername.set(user.id, user.username)
        usernameToID.set(user.username, user.id)
      })
    
    return { idToUsername, usernameToID }
}

export const makeLoanMap = (loanData, setLoanSet) => {
    const loanMap = new Set()
    loanData.forEach(loan => {
        loanMap.add(loan.id)
    })
    setLoanSet(loanMap)
}
