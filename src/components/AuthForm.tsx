import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function AuthForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLogin, setIsLogin] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Check for active session on load
    const getSession = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
    }
    getSession()
  }, [])

  const handleSubmit = async () => {
    setError('')
    setSuccess('')
    if (isLogin) {
      const { error, data } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message)
      else {
        setSuccess('Logged in!')
        setUser(data.user)
      }
    } else {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setError(error.message)
      else setSuccess('Check your email to confirm your sign-up!')
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  if (user) {
    return (
      <div className="max-w-md mx-auto my-8 p-4 border rounded shadow text-center">
        <p className="mb-2">👋 Welcome, {user.email}</p>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto my-8 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">{isLogin ? 'Login' : 'Sign Up'}</h2>
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 mb-2 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 mb-2 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="text-red-600 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">{success}</p>}
      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded mb-2 w-full"
      >
        {isLogin ? 'Login' : 'Sign Up'}
      </button>
      <p
        className="text-sm text-blue-600 cursor-pointer text-center"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? "Need to create an account?" : "Already have an account?"}
      </p>
    </div>
  )
}
