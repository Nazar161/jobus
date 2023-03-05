import React from 'react'
import CandidateProfile from '../components/Profile/CandidateProfile'
import RecruiterProfile from '../components/Profile/RecruiterProfile'
import useAuth from '../hooks/useAuth'
import { Role } from '../types.generated'

const Profile: React.FC = () => {
  const { auth } = useAuth()

  return (
    <div>
      {auth.role === Role.Recruiter ? (
        <RecruiterProfile />
      ) : (
        <CandidateProfile />
      )}
    </div>
  )
}

export default Profile
