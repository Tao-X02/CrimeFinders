import React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

export default function LoadingComponent() {
    return (
        <Box justifyContent="center" alignItems="center" sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <CircularProgress color="secondary" />
            <Typography sx={{ marginTop: '2%' }} fontStyle='oblique' component="h5" variant="h5">Loading data...</Typography>
        </Box>
    )
}