import React, { useEffect, useState } from 'react'
import { TextField, Button, Grid2, Modal, Box} from '@mui/material'
import { shareLoan } from '../functions/apiCalls'

function ShareLoan({userID, loanSet, usernameToId}) {
    const [loanID, setLoanID] = useState('')
    const [shareToUsername, setShareToUsername] = useState('')
    const [shareUserID, setShareUserID] = useState('')
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [errors, setErrors] = useState({});
    const [helperText, setHelperText] = useState({})

    const handleShareLoan = async (e) => {
        e.preventDefault()
        console.log('share loan')
    }
    const handleConfirm = () => {
        const newErrors = {}
        const newHelperText = {}

        // check errors with loanID
        const loanIdInt = parseInt(loanID)
        if (isNaN(loanIdInt)) {
            newErrors["loanID"]=true
            newHelperText["loanID"]="Loan Id must be a positive integer"
        }
        else if (!loanSet.has(loanIdInt)) {
            newErrors["loanID"]=true
            newHelperText["loanID"]=`You do not have access to loan ${loanIdInt}`
        }
        else {
            newErrors["loanID"]=false
        }

        // check errors with user
        if (!shareToUsername) {
            newErrors["user"]="true"
            newHelperText["user"]="Please enter a username to share loan to"
        }
        else if (!usernameToId.has(shareToUsername)) {
            newErrors["user"]=true
            newHelperText["user"]=`User ${shareToUsername} does not exist`
        }
        else {
            setShareUserID(usernameToId.get(shareToUsername))
            newErrors["user"]=false
        }
        setErrors(newErrors)
        setHelperText(newHelperText)

        if (errors["loanID"]==false && errors["user"]==false) {
            handleOpen()
        }
        else {
            // setTimeout(() => {
            //     setLoanID('')
            //     setShareToUsername('')
            // }, 1000); 
        }
        
    }

    return (
        <div>
           <form onSubmit={handleShareLoan} id={"shareLoan"}>
                <Grid2>
                    <TextField
                        label="Loan ID"
                        value={loanID}
                        onChange={(e) => setLoanID(e.target.value)}
                        placeholder="Please enter loan id"
                        variant="outlined"
                        required
                        id="outlined-error-helper-text"
                        error={errors.loanID}
                        helperText={helperText.loanID}
                    />
                    <TextField
                        label="Share to User"
                        value={shareToUsername}
                        onChange={(e) => setShareToUsername(e.target.value)}
                        placeholder="Please enter a username"
                        variant="outlined"
                        required
                        id="outlined-error-helper-text"
                        error={errors.user}
                        helperText={helperText.user}
                    />
                    <Button onClick={handleConfirm} variant="contained" color="primary">Confirm</Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        
                    >
                        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-white border-2 border-black shadow-2xl p-4">
                            <p> Are you sure you want to share loan {loanID} with {shareToUsername} </p>
                            <Button onClick={() => {
                                document.querySelector('#shareLoan').requestSubmit(); 
                            }} variant="contained" color="primary">
                                Share Loan
                            </Button>
                        </Box>
                        
                    </Modal>
                </Grid2> 
            </form>
        </div>
    )
}
export default ShareLoan