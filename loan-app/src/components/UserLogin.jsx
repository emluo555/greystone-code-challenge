import React, { useEffect, useState } from 'react'
import { TextField, Button, Box,Grid2 } from '@mui/material'



function UserLogin({usernameToID, setUsername, setUserID,setLoginStatus}) {
  const [loginField, setLoginField] = useState('')
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('')

  const handleExistingUserLogin = (e) => {
      e.preventDefault()
      console.log(loginField,usernameToID )

      // Check if entered username (loginField) exists in the map of all users
      if (usernameToID.has(loginField)) { 
        console.log('user found')
        setUsername(loginField)
        setUserID(usernameToID.get(loginField))
        setTimeout(setLoginStatus(true),1000)
      }
      else {
        setError(true)
        setHelperText("Username not found, please try again or create new user")
      }
      setLoginField('')
  }
  return (
      <div>
      <h2 className="text-lg pb-3">Existing User:</h2>
      <form onSubmit={handleExistingUserLogin}>
          <Grid2 display={"flex"} flexDirection={"column"} width={"30vw"} gap={2}>
            <TextField
              label="Username"
              value={loginField}
              onChange={(e) => setLoginField(e.target.value)}
              placeholder="Please enter your username"
              variant="outlined"
              required
              error={error}
              helperText={helperText}
            />
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </Grid2>
      </form>
    </div>
  )
}

export default UserLogin