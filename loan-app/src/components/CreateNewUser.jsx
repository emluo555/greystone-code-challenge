import React, { useEffect, useState } from 'react'
import { createUser } from '../functions/apiCalls'
import { TextField, Button, Grid2 } from '@mui/material'


function CreateNewUser({setUsername, setUserID, setIdToUsername,setUsernameToID,usernameToID,idToUsername,setLoginStatus}) {
    const [createField, setCreateField] = useState('')
    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState('')

    const handleNewUser = async(e) => {
        e.preventDefault()

        // Check if entered username (createField) exists in the map of all users
        if (usernameToID.has(createField)) {
            setError(true)
            setHelperText(`Username ${createField} already exists, please enter a new one`)
        }
        else {
            const res = await createUser(createField)
            if (res) {
                console.log(`user ${res.username} created`)
                setUsername(res.username)
                setUserID(res.id)
                setIdToUsername(new Map(idToUsername).set(res.username, res.id))
                setUsernameToID(new Map(usernameToID).set(res.username, res.id))
                setLoginStatus(true)
            } 
        }
        setCreateField('')
      }

    return (
        <div>
            <h2 className="text-lg pb-3">Create New User:</h2>
            <form onSubmit={handleNewUser}>
                <Grid2 display={"flex"} flexDirection={"column"} width={"30vw"} gap={2}>
                    <TextField
                        label="Username"
                        value={createField}
                        onChange={(e) => setCreateField(e.target.value)}
                        placeholder="Please enter your username"
                        variant="outlined"
                        fullWidth
                        required
                        error={error}
                        helperText={helperText}
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Create New User
                    </Button>
                </Grid2>
            </form>
      </div>
    )
}

export default CreateNewUser