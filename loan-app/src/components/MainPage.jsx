import React, { useEffect, useState } from 'react'
import { motion } from "motion/react"
import { getAllUsers, createUser } from '../functions/apiCalls'
import { makeUserMaps } from '../functions/setMaps'
import UserLogin from  './UserLogin'
import CreateNewUser from './CreateNewUser'

function MainPage() {
  const [idToUsername, setIdToUsername] = useState(new Map())
  const [usernameToID, setUsernameToID] = useState(new Map())
  const [username, setUsername] = useState('')
  const [userID, setUserID] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllUsers();
      if (data) {
        const { idToUsername, usernameToID } = makeUserMaps(data)

        setIdToUsername(idToUsername)
        setUsernameToID(usernameToID)
      }
    }

    fetchData()

  }, [])

  

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
      
    </div> 

  );
}

export default MainPage;
