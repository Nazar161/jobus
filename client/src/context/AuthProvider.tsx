import React, { createContext, useState } from 'react'
import { Role } from '../types.generated'

type Props = {
  children: React.ReactNode
}

export interface IAuth {
  userId: string | undefined
  role: Role | undefined
}

interface IAuthContext {
  auth: IAuth
  setAuth: (a: IAuth) => void
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState<IAuth>({} as IAuth)

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
