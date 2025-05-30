import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Register = () => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

 const handleRegister = async (e: { preventDefault: () => void }) => {
  e.preventDefault()
  try {
    await axios.post('http://localhost:5000/api/register', { phoneNumber, password })
    toast.success('Registration successful')
    navigate('/login')
  } catch (error: unknown) {
    // Axios error with response from server
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message)  // show backend message
      } else if (error.message) {
        toast.error(error.message)  // network or other errors
      } else {
        toast.error('An unknown error occurred')
      }
    } else if (error instanceof Error) {
      toast.error(error.message)
    } else {
      toast.error('Unknown error occurred')
    }
    console.error(error)
  }
}


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-extrabold text-center text-gray-900">
          Register
        </h2>

        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
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

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
