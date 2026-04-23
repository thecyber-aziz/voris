import { useEffect, useState } from "react"
import { useAuth } from "../context/useAuth"
import { MessageCircle } from "lucide-react"

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export default function LoginPopup() {
  const { login, signup, loading } = useAuth()
  
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; general?: string }>({})

  const [isAlertBoxOpen, isSetAlertBoxOpen] = useState(false)
  const [isLoginBoxOpen, setIsLoginBoxOpen] = useState(true)
  const isLoginPopupClosed = localStorage.getItem("isAlertClosed")

  const validateLoginForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {}

    if (!email) {
      newErrors.email = "Email is required"
    } else if (!isValidEmail(email)) {
      newErrors.email = "Invalid email format"
    }

    if (!password) {
      newErrors.password = "Password is required"
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateSignupForm = (): boolean => {
    const newErrors: { name?: string; email?: string; password?: string } = {}

    if (!name) {
      newErrors.name = "Name is required"
    } else if (name.length < 2) {
      newErrors.name = "Name must be at least 2 characters"
    }

    if (!email) {
      newErrors.email = "Email is required"
    } else if (!isValidEmail(email)) {
      newErrors.email = "Invalid email format"
    }

    if (!password) {
      newErrors.password = "Password is required"
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = async () => {
    if (!validateLoginForm()) return
    const success = await login(email, password)
    if (!success) {
      setErrors({ general: 'Login failed. Please check your credentials.' })
    }
  }

  const handleSignup = async () => {
    if (!validateSignupForm()) return
    const success = await signup(name, email, password)
    if (!success) {
      setErrors({ general: 'Signup failed. Please try again.' })
    }
  }
  
  useEffect(() => {
    if (isLoginPopupClosed || useAuth.getState().user) return
    isSetAlertBoxOpen(true)
  }, [])

  return isAlertBoxOpen && (
    <div className="fixed z-50 inset-0 flex flex-col items-center justify-center gap-6 bg-black/20">
      <div className="w-full max-w-md">

        {/* login */}
        {isLoginBoxOpen && 
          <div className="w-full max-w-md bg-white rounded-xl shadow-md p-4 flex flex-col gap-4">

            <h2 className="text-xl font-bold font-[ClashDisplay] text-black">Login</h2>

            {errors.general && <p className="text-sm text-red-500">{errors.general}</p>}

            <div>
              <input 
                type="email"
                placeholder="Enter you email e.g bbs@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (errors.email) {
                    const newErrors = { ...errors }
                    delete newErrors.email
                    setErrors(newErrors)
                  }
                }}
                className="w-full text-sm bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none focus:ring-1 focus:ring-black"
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (errors.password) {
                    const newErrors = { ...errors }
                    delete newErrors.password
                    setErrors(newErrors)
                  }
                }}
                className="w-full text-sm bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none focus:ring-1 focus:ring-black"
              />
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
            </div>

            <button
              onClick={handleLogin}
              disabled={loading || !email || !password}
              className="w-full bg-black text-white rounded-xl p-2.5 cursor-pointer disabled:opacity-50"
            >
              {loading ? "Loading..." : "Login"}
            </button>

            <p className="text-xs text-gray-500 text-center">
              Don’t have an account?{" "}
              <span className="text-black cursor-pointer" onClick={() => { 
                setIsLoginBoxOpen(false)
                setErrors({})
                setEmail('')
                setPassword('')
              }}>Signup</span>
            </p>
          </div>
        }

        {!isLoginBoxOpen &&
          <div className="w-full max-w-md bg-white rounded-xl shadow-md p-4 flex flex-col gap-4">

          <h2 className="text-xl font-bold font-[ClashDisplay] text-black">Signup</h2>

          {errors.general && <p className="text-sm text-red-500">{errors.general}</p>}

          <div>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (errors.name) {
                  const newErrors = { ...errors }
                  delete newErrors.name
                  setErrors(newErrors)
                }
              }}
              className="w-full text-sm bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none focus:ring-1 focus:ring-black"
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>

          <div>
            <input 
              type="email"
              placeholder="Enter you email e.g bbs@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (errors.email) {
                  const newErrors = { ...errors }
                  delete newErrors.email
                  setErrors(newErrors)
                }
              }}
              className="w-full text-sm bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none focus:ring-1 focus:ring-black"
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (errors.password) {
                  const newErrors = { ...errors }
                  delete newErrors.password
                  setErrors(newErrors)
                }
              }}
              className="w-full text-sm bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none focus:ring-1 focus:ring-black"
            />
            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
          </div>

          <button
            onClick={handleSignup}
            disabled={loading || !name || !email || !password}
            className="w-full bg-black text-white rounded-xl p-2.5 cursor-pointer disabled:opacity-50"
          >
            {loading ? "Loading..." : "Signup"}
          </button>

          <p className="text-xs text-gray-500 text-center">
            Already have an account?{" "}
            <span className="text-black cursor-pointer" onClick={() => { 
              setIsLoginBoxOpen(true)
              setErrors({})
              setName('')
              setEmail('')
              setPassword('')
            }}>Login</span>
          </p>
        </div>
        }
      </div>

      <div className="w-full max-w-md bg-white rounded-md shadow-lg p-4 flex items-center justify-center gap-4 cursor-pointer" 
        onClick={() => { localStorage.setItem("isAlertClosed", "true"); isSetAlertBoxOpen(false)}}
      >
        <MessageCircle strokeWidth={0.8} size={16} />
        <p className="text-xs text-gray-700 text-center">Continue as Guest</p>
      </div>
    </div>
  )
}
