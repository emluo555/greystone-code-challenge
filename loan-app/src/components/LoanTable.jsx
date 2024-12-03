import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Paper } from '@mui/material';


function LoanTable({loanData, idToUsername}) {
    const rows = loanData
    const columns = [
        { field: 'id', headerName: 'Loan ID', width: 100 },
        { field: 'amount', headerName: 'Amount', type: 'number', width: 100 },
        { field: 'apr', headerName: 'APR', type: 'number', width: 100 },
        { field: 'term', headerName: 'Term', type: 'number', width: 100 },
        { field: 'status', headerName: 'Status', type: 'string', width: 100 },
        {
          field: 'owner_id',
          headerName: 'Owned by',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 160,
          valueGetter: (value) => idToUsername.get(value),
        },
      ];
    const paginationModel = {page: 0, pageSize: 5};

    
    return (
        <Paper sx={{ height: 400, width: '60%' }}>
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
                }}
                getRowClassName={(params) =>
                    params.row.status === 'inactive' ? 'bg-gray-100' : ''
                 }
            />
        </Paper>
    )

}
export default LoanTable