import { Button } from '@mui/material'
import React from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import style from '../components/SignUp/SignUpForm.module.css'

const Register: React.FC = () => {
  const { pathname } = useLocation()

  return (
    <div className={style.form}>
      <h2>Зарегистрироваться как:</h2>
      <div style={{ marginBottom: '10px' }}>
        <Button variant="text">
          <NavLink
            to={''}
            style={({ isActive }) => ({
              textDecoration: pathname.includes('recruiter') ? 'none' : '',
              color: '#000',
            })}
          >
            Как Соискатель
          </NavLink>
        </Button>
        <Button variant="text">
          <NavLink
            to={'recruiter'}
            style={({ isActive }) => ({
              textDecoration: !isActive ? 'none' : '',
              color: '#000',
            })}
          >
            Как Рекрутер
          </NavLink>
        </Button>
      </div>

      <Outlet />
    </div>
  )
}

export default Register
