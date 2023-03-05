import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import RequireAuth from './components/RequireAuth'
import SignUpAsRecruiter from './components/SignUp/SignUpAsRecruiter'
import SignUpAsUser from './components/SignUp/SignUpAsUser'
import useAuth from './hooks/useAuth'
import Candidates from './pages/Candidates'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Unauthorized from './pages/Unauthorized'
import Vacancies from './pages/Vacancies'
import { Role } from './types.generated'

const App: React.FC = () => {
  const { auth } = useAuth()
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        <Route element={<RequireAuth allowedRole={Role.Candidate} />}>
          <Route path="vacancies" element={<Vacancies />} />
        </Route>

        <Route element={<RequireAuth allowedRole={Role.Recruiter} />}>
          <Route path="candidates" element={<Candidates />} />
        </Route>

        <Route path="register" element={<Register />}>
          <Route path="" element={<SignUpAsUser />} />
          <Route path="recruiter" element={<SignUpAsRecruiter />} />
        </Route>

        <Route path="me" element={auth.userId ? <Profile /> : <Login />} />
      </Route>
    </Routes>
  )
}

export default App
