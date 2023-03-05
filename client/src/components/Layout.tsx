import { CssBaseline } from '@mui/material'
import { Container } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header/Header'

const Layout: React.FC = () => {
  return (
    <main>
      <CssBaseline />
      <Header />
      <Container maxWidth="xl">
        <Outlet />
      </Container>
    </main>
  )
}

export default Layout
