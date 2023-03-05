import {
  Box,
  Button,
  FormHelperText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
import React, { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { Role } from '../../types.generated'
import {
  useGetCompaniesQuery,
  useSelectCompanyMutation,
} from './GetCompanies.generated'
import { useSignUpMutation } from './SignUp.generated'
import style from './SignUpForm.module.css'

const SignUpAsRecruiter: React.FC = () => {
  const { setAuth } = useAuth()
  const navigate = useNavigate()

  const [company, setCompany] = useState<string>('')

  const [nickname, setNickname] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const { loading, error, data } = useGetCompaniesQuery()

  const [signUpMutation] = useSignUpMutation()
  const [selectCompany] = useSelectCompanyMutation()

  const handleChooseCompany = (event: SelectChangeEvent) => {
    setCompany(event.target.value as string)
  }

  const signUp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    signUpMutation({
      variables: { nickname, password, role: Role.Recruiter },
      onCompleted: data => {
        const userId: string | undefined = data.signUp?.id
        const role: Role | undefined = data.signUp?.role

        setAuth({ userId, role })
        navigate('/me', { replace: true, state: { userId, role } })

        if (userId) {
          selectCompany({
            variables: { companyId: company, userId },
          })
        }

        setNickname('')
        setPassword('')
        setCompany('')
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
        <Select
          value={company}
          onChange={handleChooseCompany}
          sx={{ width: 300 }}
          input={<OutlinedInput />}
          required
        >
          {data?.getCompanies?.map(comp => (
            <MenuItem key={comp.id} value={comp.id}>
              {comp.name}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText sx={{ marginBottom: 2, width: 300 }}>
          Выберите свою компанию
        </FormHelperText>
        <Button type="submit" variant="contained" color="primary">
          Зарегистрироваться
        </Button>
      </form>
    </Box>
  )
}

export default SignUpAsRecruiter
