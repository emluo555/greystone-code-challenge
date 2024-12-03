import React, { useEffect, useState } from 'react'
import { TextField, Button, Box } from '@mui/material'



function UserLogin({usernameToID, setUsername, setUserID}) {
    const [loginField, setLoginField] = useState('')

    const handleExistingUserLogin = (e) => {
        e.preventDefault()
        console.log(loginField,usernameToID )
    
        if (usernameToID.has(loginField)) {
          console.log('user found')
          setUsername(loginField)
          setUserID(usernameToID.get(loginField))
        }
        else {
          alert('user does not exist')
        }
        setLoginField('')
      }
    return (
        <div>
        <h2>Existing User?</h2>
        <form onSubmit={handleExistingUserLogin}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Username"
              value={loginField}
              onChange={(e) => setLoginField(e.target.value)}
              placeholder="Please enter your username"
              variant="outlined"
              fullWidth
              required
            />
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </Box>
        </form>
      </div>
    )
}

export default UserLogin