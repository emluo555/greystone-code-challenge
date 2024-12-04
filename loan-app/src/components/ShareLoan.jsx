import React, { useEffect, useState } from 'react'
import { TextField, Button, Grid2, Modal, Box} from '@mui/material'
import { shareLoan } from '../functions/apiCalls'

function ShareLoan({userID, loanSet, usernameToId}) {
    const [showForm, setShowForm] = useState(false)
    const [loanID, setLoanID] = useState('')
    const [shareToUsername, setShareToUsername] = useState('')
    const [shareUserID, setShareUserID] = useState('')
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [errors, setErrors] = useState({});
    const [helperText, setHelperText] = useState({})
    const [successSubmit, setSuccessSubmit] = useState(false)

    const handleShareLoan = async (e) => {
        e.preventDefault()
        const loanIDInt = parseInt(loanID)
        const userIDInt = parseInt(userID)
        const shareUserIDInt = parseInt(shareUserID)

        console.log(loanIDInt, userIDInt,shareUserIDInt)

        const res = await shareLoan(loanIDInt, userIDInt, shareUserIDInt)
        if (res) { 
            console.log('success', res)
            setSuccessSubmit(true)
            // setTimeout(() => {
            //     handleClose()
            //     }, 5000); 
        }
        setLoanID('')
        setShareToUsername('')
    }
    const handleConfirm = () => {
        setSuccessSubmit(false)
        const newErrors = {}
        const newHelperText = {}

        // Validate loanID
        const loanIdInt = Number(loanID)
        if (!Number.isInteger(loanIdInt) || loanIdInt < 0) {
            newErrors["loanID"]=true
            newHelperText["loanID"]="Loan ID must be a positive integer"
        }
        else if (!loanSet.has(loanIdInt)) {
            newErrors["loanID"]=true
            newHelperText["loanID"]=`You do not have access to loan ${loanIdInt}`
        }
        else {
            newErrors["loanID"]=false
        }

        // Validate entered username
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

        if (newErrors["loanID"]==false && newErrors["user"]==false) {
            handleOpen()
        }
    }

    return (
        <Grid2 width={"50%"} paddingLeft={'2%'}>
            <Button variant="contained" color="secondary"fullWidth onClick={()=>setShowForm(!showForm)} className="!rounded-2xl !font-bold !normal-case !text-base !text-left">
                <p>Share a Loan</p>
            </Button>
            {showForm && <form onSubmit={handleShareLoan} id={"shareLoan"}>
                <Grid2 display={'flex'} flexDirection={'column'} gap={2} paddingTop={2}>
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
                    {/* Share loan confirmation modal pop-up */}
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-200 bg-white border-2 border-black shadow-2xl p-5 flex flex-col justify-center content-center">
                            {!successSubmit && <>
                            <p className="pb-5"> Are you sure you want to share Loan {loanID} with {shareToUsername}? </p>
                            <Button onClick={() => {
                                document.querySelector('#shareLoan').requestSubmit(); 
                            }} variant="contained" color="primary" >
                                Share Loan
                            </Button>
                            </>}
                            {successSubmit && <p>Loan successfully shared!</p>}
                        </Box>
                    </Modal>
                </Grid2> 
            </form>}
        </Grid2>
    )
}
export default ShareLoan