// src/components/AuthForm.tsx
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/lib/supabaseClient"

export default function AuthForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [position, setPosition] = useState("")
  const [avatar, setAvatar] = useState<File | null>(null)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSignup = async () => {
    setError("")

    if (!email || !password || !confirmPassword || !fullName || !position || !avatar) {
      setError("Please fill in all fields.")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    const { data, error: signUpError } = await supabase.auth.signUp({ email, password })

    if (signUpError || !data.user) {
      setError(signUpError?.message || "Signup failed.")
      return
    }

    const userId = data.user.id
    const fileExt = avatar.name.split(".").pop()
    const fileName = `${userId}.${fileExt}`
    const filePath = `${fileName}`

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, avatar)

    if (uploadError) {
      setError("Image upload failed.")
      return
    }

    const { error: profileError } = await supabase.from("profiles").upsert({
      id: userId,
      full_name: fullName,
      position,
      avatar_url: filePath,
    })

    if (profileError) {
      setError("Failed to save profile.")
      return
    }

    navigate("/profile")
  }

  return (
    <div className="max-w-md mx-auto my-12 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Your Account</h2>

      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 mb-3 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 mb-3 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="password"
        placeholder="Confirm Password"
        className="w-full p-2 mb-3 border rounded"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <input
        type="text"
        placeholder="Full Name"
        className="w-full p-2 mb-3 border rounded"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />

      <select
        className="w-full p-2 mb-3 border rounded"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
      >
        <option value="">Select Position</option>
        <option value="GK">Goalkeeper</option>
        <option value="DEF">Defender</option>
        <option value="MID">Midfielder</option>
        <option value="ATT">Attacker</option>
      </select>

      <label className="block mb-2 font-medium text-sm">Upload Profile Picture</label>
      <input
        type="file"
        accept="image/*"
        className="mb-4"
        onChange={(e) => setAvatar(e.target.files?.[0] || null)}
      />

      {error && <p className="text-red-600 mb-3 text-sm">{error}</p>}

      <button
        onClick={handleSignup}
        className="w-full bg-action-orange hover:bg-action-orange/90 text-white py-2 rounded"
      >
        Sign Up
      </button>
    </div>
  )
}
