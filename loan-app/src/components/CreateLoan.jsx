import React, { useEffect, useState } from 'react'
import { TextField, Button, Box, Grid2, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { createLoan } from '../functions/apiCalls'

function CreateLoan({owner_id, userLoans, setUserLoans, loanSet, setLoanSet}) {
    const [amountField, setAmountField] = useState('')
    const [aprField, setAprField] = useState('')
    const [termField, setTermField] = useState('')
    const [statusField, setStatusField] = useState('')
    const [showForm, setShowForm] = useState(false)

    const handleCreateLoan = async (e) => {
        e.preventDefault()

        console.log(parseFloat(amountField), parseFloat(aprField), parseInt(termField), statusField, owner_id)
        const res = await createLoan(parseFloat(amountField), parseFloat(aprField), parseInt(termField), statusField, owner_id)
        if (res) {
            console.log('success', res)
            setUserLoans([...userLoans, res]) // add the new loan to the state variable
            setLoanSet(loanSet.add(res.id))
            setShowForm(false)
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
            <Button variant="contained" color="secondary" fullWidth onClick={()=>setShowForm(!showForm)} className="!rounded-2xl !font-bold !normal-case !text-base !text-left">
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
                    />
                    <TextField
                        label="Loan APR"
                        value={aprField}
                        onChange={(e) => setAprField(e.target.value)}
                        placeholder="Please enter APR"
                        variant="outlined"
                        required
                        fullWidth
                    />
                    <TextField
                        label="Loan Term"
                        value={termField}
                        onChange={(e) => setTermField(e.target.value)}
                        placeholder="Please enter loan term"
                        variant="outlined"
                        required
                        fullWidth
                    />
                    <FormControl fullWidth >
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={statusField}
                            label="Status"
                            onChange={(e) => setStatusField(e.target.value)}
                        >
                            <MenuItem value={"active"}>Active</MenuItem>
                            <MenuItem value={"inactive"}>Inactive</MenuItem>
                        </Select>
                    </FormControl>
                    <Button type="submit" variant="contained" color="primary">
                        Submit New Loan
                    </Button>
                </Grid2>
            </form>}
       </Grid2>
     )
}

export default CreateLoan
