import React, { useEffect, useState } from 'react'
import { TextField, Button } from '@mui/material'
import { getAmortizationTerm } from '../functions/apiCalls'
import ScheduleTable from './ScheduleTable'

function LoanSchedule({loanSet, userID}) {
    const [loanID, setLoanID] = useState('')
    const [showTable, setShowTable] = useState(false)
    const [loanSchedule, setLoanSchedule ] = useState([])

    const handleGetLoan = async (e) => {
        e.preventDefault()
        const loan_id = parseInt(loanID)
        
        if (loanSet.has(loan_id)) {
            console.log('here')
            const res = await getAmortizationTerm(loan_id, userID)
            if (res) {
                setShowTable(true)
                console.log(loan_id)
                setLoanSchedule(res)
            }

        }
        else {
            setShowTable(false)
            setLoanSchedule([])
            alert("please enter a valid loan id")
        }
    }

    return (
        <div>
            <form onSubmit={handleGetLoan}>
                <TextField
                        label="Loan ID"
                        value={loanID}
                        onChange={(e) => setLoanID(e.target.value)}
                        placeholder="Please enter a loan ID"
                        variant="outlined"
                        required
                    />
                <Button type="submit" variant="contained" color="primary">
                    Get Loan Schedule
                </Button>
            </form>
            {showTable && 
            <ScheduleTable loanSchedule={loanSchedule}/>}
        </div>
    )
}

export default LoanSchedule