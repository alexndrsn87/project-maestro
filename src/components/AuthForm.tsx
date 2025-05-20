import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useNavigate } from "react-router-dom"

export default function AuthForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [position, setPosition] = useState("")
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSignUp = async () => {
    setError("")

    // Basic form validation
    if (!email || !password || !confirmPassword || !fullName || !position) {
      setError("All fields are required.")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password
    })

    if (signUpError) {
      setError(signUpError.message)
      return
    }

    const userId = signUpData.user?.id
    if (!userId) {
      setError("User ID not found after sign up.")
      return
    }

    let avatarUrl = null

    if (avatarFile) {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(`public/${userId}/${avatarFile.name}`, avatarFile, {
          cacheControl: "3600",
          upsert: true
        })

      if (uploadError) {
        setError("Image upload failed: " + uploadError.message)
        return
      }

      const { data: publicUrlData } = supabase
        .storage
        .from("avatars")
        .getPublicUrl(`public/${userId}/${avatarFile.name}`)

      avatarUrl = publicUrlData?.publicUrl || null
    }

    const { error: profileError } = await supabase
      .from("profiles")
      .insert([
        {
          id: userId,
          full_name: fullName,
          position,
          avatar_url: avatarUrl
        }
      ])

    if (profileError) {
      setError("Profile setup failed: " + profileError.message)
      return
    }

    navigate("/profile")
  }

  return (
    <div className="max-w-md mx-auto my-12 p-6 border rounded shadow bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Your Account</h2>

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

      <label className="block mb-2 font-medium text-sm text-gray-700">
        Upload Profile Picture
      </label>
      <input
        type="file"
        accept="image/*"
        className="mb-4"
        onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
      />

      {error && <p className="text-red-600 mb-4 text-sm">{error}</p>}

      <button
        onClick={handleSignUp}
        className="w-full bg-action-orange hover:bg-action-orange/90 text-white py-2 rounded text-lg"
      >
        Sign Up
      </button>
    </div>
  )
}