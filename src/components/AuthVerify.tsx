import { useEffect, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

interface AuthVerifyProps {
  children: ReactNode
}

const AuthVerify = ({ children }: AuthVerifyProps) => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = sessionStorage.getItem('token')
    if (!token) {
      toast.error('Please login to access this page')
      navigate('/login')
    }
  }, [navigate])

  return <>{children}</>
}

export default AuthVerify
