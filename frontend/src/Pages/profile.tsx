import { Box } from '@mui/material'
import React, { useState, useEffect } from 'react'
import NavBar from '../Components/navBar'
import SideBar from '../Components/sideBar'

export default function Profile() {
    return (
        <Box style={{ display: 'flex', backgroundColor: '#f2f3f5' }}>
            <NavBar />
            <SideBar current="Profile" />
        </Box>
    )
}