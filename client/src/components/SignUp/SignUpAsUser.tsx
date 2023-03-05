import { Box, Button, TextField } from '@mui/material'
import React, { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { Role } from '../../types.generated'
import { useSignUpMutation } from './SignUp.generated'
import style from './SignUpForm.module.css'

const SignUpAsUser: React.FC = () => {
  const { setAuth } = useAuth()
  const navigate = useNavigate()

  const [nickname, setNickname] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [signUpMutation] = useSignUpMutation()

  const signUp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    signUpMutation({
      variables: { nickname, password, role: Role.Candidate },
      onCompleted: data => {
        const userId: string | undefined = data.signUp?.id
        const role: Role | undefined = data.signUp?.role

        setAuth({ userId, role })
        navigate('/me', { replace: true, state: { userId, role } })

        setNickname('')
        setPassword('')
      },
    })
  }
  return (
    <Box>
      <form className={style.form} onSubmit={signUp}>
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
          Зарегистрироваться
        </Button>
      </form>
    </Box>
  )
}

export default SignUpAsUser
