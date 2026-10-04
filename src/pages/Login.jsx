import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import Logo from '../components/Logo.jsx'
import InputField from '../components/InputField.jsx'
import Button from '../components/Button.jsx'

export default function Login() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // No backend yet — go straight to the Home screen.
    navigate('/home')
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Light blue top band */}
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-primary-50 to-white" aria-hidden="true" />

      <div className="relative mx-auto flex w-full max-w-md flex-1 flex-col px-6 pb-8 pt-16">
        <div className="flex flex-col items-center text-center">
          <Logo size="lg" />
          <p className="mt-4 text-sm font-bold tracking-wide text-primary-800">Alumni Connect</p>
          <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900">Welcome Back</h1>
          <p className="mt-2 text-[15px] text-slate-500">Connect with your college community</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-5">
          <InputField id="email" label="Email" type="email" icon={Mail} placeholder="you@college.edu" autoComplete="email" />

          <div>
            <InputField
              id="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              icon={Lock}
              placeholder="Enter your password"
              autoComplete="current-password"
              trailing={
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:text-slate-600"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
            />
            <div className="mt-2 text-right">
              <button type="button" className="text-sm font-semibold text-primary-600 hover:text-primary-800">
                Forgot Password?
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>

        <p className="mt-auto pt-10 text-center text-sm text-slate-500">
          Don&apos;t have an account?{' '}
          <button type="button" className="font-bold text-primary-800 hover:underline">
            Sign Up
          </button>
        </p>
      </div>
    </div>
  )
}
