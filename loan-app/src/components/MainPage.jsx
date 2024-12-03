import React, { useEffect, useState } from 'react'
import { motion } from "motion/react"
import { getAllUsers, createUser, getUserLoans } from '../functions/apiCalls'
import { makeUserMaps, makeLoanMap } from '../functions/setMaps'
import UserLogin from  './UserLogin'
import CreateNewUser from './CreateNewUser'
import CreateLoan from './CreateLoan'
import LoanTable from './LoanTable'
import ScheduleTable from './ScheduleTable'
import LoanSchedule from './LoanSchedule'
import ShareLoan from './ShareLoan'

function MainPage() {
  const [idToUsername, setIdToUsername] = useState(new Map())
  const [usernameToID, setUsernameToID] = useState(new Map())
  const [username, setUsername] = useState('')
  const [userID, setUserID] = useState(null)
  const [userLoans, setUserLoans] = useState([])
  const [loanSet, setLoanSet] = useState(new Set())

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getAllUsers();
      if (userData) {
        const { idToUsername, usernameToID } = makeUserMaps(userData)

        setIdToUsername(idToUsername)
        setUsernameToID(usernameToID)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (userID) {
      const fetchLoans = async () => {
        const allLoans = await getUserLoans(userID)
        if (allLoans) {
          setUserLoans(allLoans)
          makeLoanMap(allLoans, setLoanSet)
        }
      }
      fetchLoans()
    }
  }, [userID])

  

  return (
    <div>
      <div>
        TEST
      </div>
      <motion.div className="text-3xl font-bold underline"
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0, transition:{ duration: 2 } }} 
          >
        <div>
        Welcome
        </div>
      </motion.div>
      <UserLogin 
        usernameToID={usernameToID}
        setUsername={setUsername}
        setUserID={setUserID}
      />
      <CreateNewUser 
        setUsername={setUsername}
        setUserID={setUserID}
        setIdToUsername={setIdToUsername}
        setUsernameToID={setUsernameToID}
        usernameToID={usernameToID}
        idToUsername={idToUsername}
      />
      <CreateLoan 
        owner_id={userID}
        userLoans={userLoans}
        setUserLoans={setUserLoans}
        loanSet={loanSet}
        setLoanSet={setLoanSet}
      />
      <LoanTable 
        loanData={userLoans}
        idToUsername={idToUsername}
      />
      <LoanSchedule
        loanData={userLoans}
        loanSet={loanSet}
        userID={userID}
      />
      <ShareLoan 
        userID={userID}
        loanSet={loanSet}
        usernameToId={usernameToID}
      />
    </div> 

  );
}

export default MainPage;
