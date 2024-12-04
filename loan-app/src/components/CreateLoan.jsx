import React, { useState } from 'react'
import { TextField, Button, Grid2, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { createLoan } from '../functions/apiCalls'

function CreateLoan({owner_id, userLoans, setUserLoans, loanSet, setLoanSet}) {
    const [amountField, setAmountField] = useState('')
    const [aprField, setAprField] = useState('')
    const [termField, setTermField] = useState('')
    const [statusField, setStatusField] = useState('')
    const [showForm, setShowForm] = useState(false)
    const [errors, setErrors] = useState({});
    const [helperText, setHelperText] = useState({})
    const [success, setSuccess] = useState(false)

    const handleCreateLoan = async (e) => {
        e.preventDefault()
        setSuccess(false)
        const amount = Number(amountField)
        const apr = aprField
        const term = Number(termField)

        const newErrors = {}
        const newHelperText = {}

        newErrors["amount"]= (!/^\d*\.?\d{0,2}$/.test(amount) || amount < 0) ? true : false
        newHelperText["amount"]= newErrors["amount"] ? "Amount must be a valid positive monetary value" : ''
        
        newErrors["apr"]=(!/^\d*\.?\d+$/.test(apr)|| apr < 0 ) ? true : false
        newHelperText["apr"]= newErrors["apr"] ? "APR must be positive decimal or number" : ''
        
        newErrors["term"]= (!Number.isInteger(term) || term < 0 ) ? true : false
        newHelperText["term"]= newErrors["term"] ? "Term must be a positive whole number" : ''

        setErrors(newErrors)
        setHelperText(newHelperText)
        
        if(!newErrors["amount"] && !newErrors["apr"] && !newErrors["term"]) {
            console.log(newErrors)
            const res = await createLoan(amount, apr, term, statusField, owner_id)
            if (res) {
                console.log('success', res)
                setUserLoans([...userLoans, res]) // add the new loan to the state variable
                setLoanSet(loanSet.add(res.id))
                setSuccess(true)
            }
        }
        else {
            console.log('failed', newErrors, newHelperText)
        }
        resetForm()
    }

    const resetForm = () => {
        setAmountField('')
        setAprField('')
        setTermField('')
        setStatusField('')
    }

    return (
       <Grid2 width={"50%"} paddingRight={'2%'}>
            <Button variant="contained" color="secondary" fullWidth onClick={()=>{setShowForm(!showForm); setSuccess(false); setErrors({}); setHelperText({})}} className="!rounded-2xl !font-bold !normal-case !text-base !text-left">
                <p>Create New Loan</p>
            </Button>
            {showForm && <form onSubmit={handleCreateLoan}>
                <Grid2 display={'flex'} flexDirection={'column'} width={'100%'} gap={2} paddingTop={2}>
                    <TextField
                        label="Loan Amount"
                        value={amountField}
                        onChange={(e) => setAmountField(e.target.value)}
                        placeholder="Please enter loan amount"
                        variant="outlined"
                        required
                        fullWidth
                        id="outlined-error-helper-text"
                        error={errors.amount}
                        helperText={helperText.amount}
                    />
                    <TextField
                        label="Loan APR"
                        value={aprField}
                        onChange={(e) => setAprField(e.target.value)}
                        placeholder="Please enter APR"
                        variant="outlined"
                        required
                        fullWidth
                        id="outlined-error-helper-text"
                        error={errors.apr}
                        helperText={helperText.apr}
                    />
                    <TextField
                        label="Loan Term (Months)"
                        value={termField}
                        onChange={(e) => setTermField(e.target.value)}
                        placeholder="Please enter loan term"
                        variant="outlined"
                        required
                        fullWidth
                        id="outlined-error-helper-text"
                        error={errors.term}
                        helperText={helperText.term}
                    />
                    <FormControl fullWidth >
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={statusField}
                            label="Status"
                            onChange={(e) => setStatusField(e.target.value)}
                            required
                        >
                            <MenuItem value={"active"}>Active</MenuItem>
                            <MenuItem value={"inactive"}>Inactive</MenuItem>
                        </Select>
                    </FormControl>
                    {success && <h1>Loan submitted successfully!</h1>}
                    <Button type="submit" variant="contained" color="primary">
                        Submit New Loan
                    </Button>
                
                </Grid2>
            </form>}
       </Grid2>
     )
}

export default CreateLoan
