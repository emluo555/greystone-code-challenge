import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Paper } from '@mui/material';


function ScheduleTable({loanSchedule}) {
    const rows = loanSchedule
    
    const columns = [
        { field: 'month', headerName: 'Month', flex: 0.5 },
        { field: 'open_balance', headerName: 'Open Balance', type: 'number', flex:1, 
            valueFormatter: (value) => 
                value.toLocaleString(undefined, { 
                  minimumFractionDigits: 2, 
                  maximumFractionDigits: 2 
                }),
        },
        { field: 'total_payment', headerName: 'Total Payment', type: 'number', flex:1,
            valueFormatter: (value) => 
                value.toLocaleString(undefined, { 
                  minimumFractionDigits: 2, 
                  maximumFractionDigits: 2 
                }),
        },
        { field: 'principal_payment', headerName: 'Principal Payment', type: 'number', flex:1,
            valueFormatter: (value) => 
                value.toLocaleString(undefined, { 
                  minimumFractionDigits: 2, 
                  maximumFractionDigits: 2 
                }),
         },
        { field: 'interest_payment', headerName: 'Interest Payment', type: 'number', flex:1,
            valueFormatter: (value) => 
                value.toLocaleString(undefined, { 
                  minimumFractionDigits: 2, 
                  maximumFractionDigits: 2 
                }),
         },
        { field: 'close_balance', headerName: 'Close Balance', type: 'number', flex:1,
            valueFormatter: (value) => {
                const newValue = Math.abs(value) < 1e-4 ? 0 : value
                return (newValue.toLocaleString(undefined, { 
                  minimumFractionDigits: 2, 
                  maximumFractionDigits: 2 
                }))
            }
         },
      ];
    const paginationModel = {page: 0, pageSize: 5};

    
    return (
        <Paper sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{ pagination: { paginationModel }}}
                pageSizeOptions={[5, 10, 25, 50]}
                sx={{ 
                    border: 1, 
                    borderColor: '#405373',
                    paddingX: 2
                }}
                stickyHeader
                getRowId={(row) => row.month}
            />
        </Paper>
    )

}
export default ScheduleTable