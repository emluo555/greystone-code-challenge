import React, { useEffect, useState } from 'react'
import { TextField, Button,Grid2, Grid } from '@mui/material'
import { getAmortizationTerm } from '../functions/apiCalls'
import ScheduleTable from './ScheduleTable'

function LoanSchedule({loanSet, userID}) {
    const [loanID, setLoanID] = useState('')
    const [showTable, setShowTable] = useState(false)
    const [loanSchedule, setLoanSchedule ] = useState([])
    const [dynamicPadding, setDynamicPadding] = useState(1)
    const [errors, setErrors] = useState(false);
    const [helperText, setHelperText] = useState('')

    const handleGetLoan = async (e) => {
        e.preventDefault()
        const loan_id = parseInt(loanID)

        if (isNaN(loan_id) && loan_id >= 0) {
            setErrors(true)
            setHelperText('Loan ID must be an positive integer')
            setShowTable(false)
            setLoanSchedule([])
            setLoanID('')
        }
        else if (loanSet.has(loan_id)) {
            console.log('here')
            const res = await getAmortizationTerm(loan_id, userID)
            if (res) {
                setShowTable(true)
                console.log(loan_id)
                setLoanSchedule(res)
                setDynamicPadding(3)
                setErrors(false)
                setHelperText('')
            }
        }
        else {
            setErrors(true)
            setHelperText('Please enter a Loan ID you have access to')
            setShowTable(false)
            setLoanSchedule([])
            setLoanID('')
        }
    }

    return (
        <Grid2 borderRadius={5} paddingX={3} paddingY={dynamicPadding} alignContent={'center'} className="bg-gray-300">
            <form onSubmit={handleGetLoan}>
                <Grid2 container spacing={0} width={"100%"}  >
                    <Grid2 width={'35%'} alignContent={'center'} >
                        <h2 className="text-xl font-bold pl-1">View Amortization Schedule:</h2>
                    </Grid2>
                    <Grid2 width={'38%'}  borderRadius={2}> 
                    <TextField
                            label="Loan ID"
                            value={loanID}
                            onChange={(e) => setLoanID(e.target.value)}
                            placeholder="Please enter a loan ID"
                            variant="outlined"
                            fullWidth
                            size="small"
                            required
                            error={errors}
                            helperText={helperText}
                            className="bg-white"
                        />
                    </Grid2>
                    <Grid2 width={'27%'} alignContent={'center'} justifyContent={'center'} display={'flex'}>
                        <Button type="submit" variant="contained" color="primary" className="!rounded !font-bold !normal-case !text-base !w-4/6" >
                            Get Loan Schedule
                        </Button>
                        {showTable && <Button onClick={()=>{setShowTable(false); setDynamicPadding(1); setLoanID('')}} className="!rounded !font-bold !text-lg">X</Button>}
                    </Grid2>
                </Grid2>
                </form>
            
            {showTable && 
            <Grid2 paddingTop={2} display={'flex'}>
                <ScheduleTable loanSchedule={loanSchedule}/>
            </Grid2>
                
            }
        </Grid2>
    )
}

export default LoanSchedule