import { useState } from "react"
import { useAuth } from "../context/useAuth"
import { useNavigate } from "react-router-dom"
import { MessageCircle } from "lucide-react"
import { signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from "../config/firebase"

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export default function Login() {
  const { login, googleLogin, loading } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({})

  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {}

    if (!email) {
      newErrors.email = "Email is required"
    } else if (!isValidEmail(email)) {
      newErrors.email = "Please enter a valid email address"
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
    if (!validateForm()) return

    const success = await login(email, password)
    if (success) {
      navigate('/chat')
    }
  }

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user
      const idToken = await user.getIdToken()
      
      const success = await googleLogin(idToken, {
        email: user.email || "",
        name: user.displayName || user.email || "",
        photoURL: user.photoURL || undefined
      })
      
      if (success) {
        navigate('/chat')
      }
    } catch (error) {
      console.log("Google login error:", error)
      setErrors({ general: 'Google login failed' })
    }
  }

  return (
    <div className="h-screen px-4 flex flex-col items-center justify-center gap-6 bg-transparent">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-4 flex flex-col gap-4">

        <h2 className="text-xl font-bold font-[ClashDisplay] text-black">Login</h2>

        {errors.general && <p className="text-sm text-red-500">{errors.general}</p>}

        <div>
          <input 
            type="email"
            placeholder="Enter you email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (errors.email) setErrors({ ...errors, email: undefined, general: undefined })
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
              if (errors.password) setErrors({ ...errors, password: undefined, general: undefined })
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

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-xs text-gray-500">or</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full bg-black border border-gray-200 text-white rounded-xl p-2.5 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 hover:bg-"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          {loading ? "Signing in..." : "Continue with Google"}
        </button>



        <p className="text-xs text-gray-500 text-center">
          Don’t have an account?{" "}
          <span className="text-black cursor-pointer" onClick={() => navigate("/signup")}>Signup</span>
        </p>
      </div>

      <div className="w-full max-w-md bg-white rounded-md shadow-lg p-4 flex items-center justify-center gap-4 cursor-pointer" onClick={() => navigate("/chat")}>
        <MessageCircle strokeWidth={0.8} size={16} />
        <p className="text-xs text-gray-700 text-center">Continue as Guest</p>
      </div>
    </div>
  )
}