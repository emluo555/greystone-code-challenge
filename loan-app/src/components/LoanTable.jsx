import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Paper, Grid2 } from '@mui/material';


function LoanTable({loanData, idToUsername}) {
    const rows = loanData
    const columns = [
        { field: 'id', headerName: 'Loan ID', flex: 0.5 },
        { field: 'amount', headerName: 'Amount', type: 'number', flex: 1 },
        { field: 'apr', headerName: 'APR', type: 'number', flex: 1 },
        { field: 'term', headerName: 'Term', type: 'number', flex: 1 },
        { field: 'status', headerName: 'Status', type: 'number', flex: 1 },
        {
          field: 'owner_id',
          headerName: 'Owned by',
          type: 'number',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          flex: 1,
          valueGetter: (value) => idToUsername.get(value),
        },
      ];
    const paginationModel = {page: 0, pageSize: 5};

    
    return (
        <Grid2 borderRadius={3} paddingX={3} paddingY={1} paddingBottom={4} alignContent={'center'} className="bg-gray-300">
            <h1 className='text-xl font-bold pl-1 pt-2 pb-3'>My Loans</h1>
            <Paper sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{ pagination: { paginationModel }, 
                sorting: {
                    sortModel: [{ field: 'id', sort: 'asc' }],
                },}}
                pageSizeOptions={[5, 10]}
                sx={{ 
                    border: 1, 
                    borderColor: '#405373',
                    paddingX:2
                }}
                getRowClassName={(params) =>
                    params.row.status === 'inactive' ? 'bg-gray-100' : ''
                 }
            />
            </Paper>
        </Grid2>
        
    )

}
export default LoanTable