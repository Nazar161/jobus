import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { Role } from '../types.generated'

type Props = {
  allowedRole: Role
}
const RequireAuth: React.FC<Props> = ({ allowedRole }: Props) => {
  const { auth } = useAuth()
  const location = useLocation()

  return auth.role === allowedRole ? (
    <Outlet />
  ) : auth.userId ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
}

export default RequireAuth
