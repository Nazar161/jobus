import { Box, Button, TextField } from '@mui/material'
import React, { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { Role } from '../../types.generated'
import { useSignInMutation } from './SignIn.generated'
import style from './SignInForm.module.css'

const SignInForm: React.FC = () => {
  const { setAuth } = useAuth()
  const navigate = useNavigate()

  const [nickname, setNickname] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [signInMutation] = useSignInMutation()

  const signIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await signInMutation({
      variables: { nickname, password },
      onCompleted: data => {
        const userId: string | undefined = data.signIn?.id
        const role: Role | undefined = data.signIn?.role

        setAuth({ userId, role })
        navigate('/me', { replace: true, state: { userId, role } })

        setNickname('')
        setPassword('')
      },
    })
  }

  return (
    <Box>
      <form className={style.form} onSubmit={signIn}>
        <h1>Авторизация</h1>
        <TextField
          required
          id="outlined-required"
          label="Никнейм"
          sx={{ marginBottom: 3, width: 300 }}
          value={nickname}
          onChange={e => setNickname(e.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          type="password"
          label="Пароль"
          sx={{ marginBottom: 3, width: 300 }}
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Войти
        </Button>
      </form>
    </Box>
  )
}

export default SignInForm
