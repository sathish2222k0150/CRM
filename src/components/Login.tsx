import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import logo from '../assets/logo.png'  // Import your logo here

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        phoneNumber,
        password
      })
      
      sessionStorage.setItem('token', response.data.token)
      sessionStorage.setItem('userId', response.data.userId)
      sessionStorage.setItem('loginTime', new Date().toISOString())
      
      toast.success('Login successful')
      navigate('/dashboard')
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('Unknown error occurred')
      }
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-12 bg-white rounded-lg shadow-md min-h-[520px] flex flex-col items-center"> {/* increased padding and min height */}
        {/* Logo */}
        <img src={logo} alt="Logo" className="w-70 h-20 mb-4" />

        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-4">
          Login
        </h2>

        <form className="mt-4 w-full" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="phoneNumber" className="sr-only">
                Phone Number
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                required
                maxLength={10}
                pattern="\d{10}"
                title="Please enter exactly 10 digits"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^\d*$/.test(val) && val.length <= 10) {
                    setPhoneNumber(val);
                  }
                }}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
