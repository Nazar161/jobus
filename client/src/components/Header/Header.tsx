import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { IAuth } from '../../context/AuthProvider'
import useAuth from '../../hooks/useAuth'
import { Role } from '../../types.generated'

const Header: React.FC = () => {
  const { auth, setAuth } = useAuth()
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="" style={{ textDecoration: 'none', color: 'white' }}>
              Портал для поиска работы
            </Link>
          </Typography>
          {auth.userId && (
            <Button color="inherit">
              <Link
                to={auth.role === Role.Recruiter ? 'candidates' : 'vacancies'}
                style={{ textDecoration: 'none', color: 'white' }}
              >
                {auth.role === Role.Recruiter
                  ? 'Поиск Кандидатов'
                  : 'Поиск Вакансий'}
              </Link>
            </Button>
          )}
          {!auth.userId ? (
            <>
              <Button color="inherit">
                <Link
                  to="login"
                  style={{ textDecoration: 'none', color: 'white' }}
                >
                  Войти
                </Link>
              </Button>
              <Button color="inherit">
                <Link
                  to="register"
                  style={{ textDecoration: 'none', color: 'white' }}
                >
                  Зарегистрироваться
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit">
                <Link
                  to="me"
                  style={{ textDecoration: 'none', color: 'white' }}
                >
                  Мой профиль
                </Link>
              </Button>
              <Button color="inherit" onClick={() => setAuth({} as IAuth)}>
                Выйти
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
