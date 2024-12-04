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
import { Grid2 } from '@mui/material'

function MainPage() {
  const [loginStatus, setLoginStatus] = useState(false)
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
      {!loginStatus && 
      <Grid2 marginLeft={"10%"} marginRight={"10%"} display={"flex"} flexDirection={"column"} justifyContent={"center"} height={"90vh"}>
        <motion.div className="text-xl"
            initial={{ opacity: 0, y: -75 }} 
            animate={{ opacity: 1, y: 0, transition:{ duration: 0.9 } }} 
            >
          <div>
          Welcome to
          </div>
        </motion.div>
        <motion.div className="text-3xl font-bold underline"
            initial={{ opacity: 0, y: -25 }} 
            animate={{ opacity: 1, y: 0, transition:{ duration: 1, delay:0.2 } }} 
            >
          <div>
          Greystone's Loan Amortization App 
          </div>
        </motion.div>
        <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0, transition:{ duration: 1, delay: 1.1 } }} 
            >
        <Grid2 display={"flex"} gap={"5%"} marginTop={'3%'}>
            <UserLogin 
            usernameToID={usernameToID}
            setUsername={setUsername}
            setUserID={setUserID}
            setLoginStatus={setLoginStatus}
          />
          <CreateNewUser 
            setUsername={setUsername}
            setUserID={setUserID}
            setIdToUsername={setIdToUsername}
            setUsernameToID={setUsernameToID}
            usernameToID={usernameToID}
            idToUsername={idToUsername}
            setLoginStatus={setLoginStatus}
          />
        </Grid2>
        </motion.div>
      </Grid2>}
      
      {loginStatus &&
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1, y: 0, transition:{ duration: 1 }}} > 
        <Grid2 display={"flex"} flexDirection={"column"} paddingX={'5%'} paddingY={'3%'} container gap={2}>
          <h2 className='text-2xl font-bold pl-1'>Welcome, {username}!</h2>
          <Grid2 display={'flex'} width={'100%'} justifyContent={'center'} marginBottom={1}>
            <CreateLoan 
              owner_id={userID}
              userLoans={userLoans}
              setUserLoans={setUserLoans}
              loanSet={loanSet}
              setLoanSet={setLoanSet}
            />
            <ShareLoan 
              userID={userID}
              loanSet={loanSet}
              usernameToId={usernameToID}
            />
          </Grid2>
          <Grid2 display={'flex'} width={'100%'}>
            <LoanSchedule
              loanData={userLoans}
              loanSet={loanSet}
              userID={userID}
            />
          </Grid2>
          <Grid2 display={'flex'} width={'100%'}>
          <LoanTable 
            loanData={userLoans}
            idToUsername={idToUsername}
          />
          </Grid2>
          
          
        </Grid2>
        </motion.div> }
      
    </div> 

  )
}

export default MainPage
