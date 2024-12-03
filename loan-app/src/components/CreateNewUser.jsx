import React, { useEffect, useState } from 'react'
import { createUser } from '../functions/apiCalls'
import { TextField, Button, Box } from '@mui/material'


function CreateNewUser({setUsername, setUserID, setIdToUsername,setUsernameToID,usernameToID,idToUsername}) {
    const [createField, setCreateField] = useState('')

    const handleNewUser = async(e) => {
        e.preventDefault()
        const res = await createUser(createField)
        if (res) {
          console.log(`user ${res.username} created`)
          setUsername(res.username)
          setUserID(res.id)
          setIdToUsername(new Map(idToUsername).set(res.username, res.id))
          setUsernameToID(new Map(usernameToID).set(res.username, res.id))
        } 
        else {
          alert('error creating user')
        }
        setCreateField('')
      }

    return (
        <div>
        <h2>Create new User</h2>
        <form onSubmit={handleNewUser}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Username"
              value={createField}
              onChange={(e) => setCreateField(e.target.value)}
              placeholder="Please enter your username"
              variant="outlined"
              fullWidth
              required
            />
            <Button type="submit" variant="contained" color="primary">
              Create
            </Button>
          </Box>
        </form>
      </div>
    )
}

export default CreateNewUser