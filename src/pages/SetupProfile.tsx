import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useNavigate } from "react-router-dom"

export default function SetupProfile() {
  const [fullName, setFullName] = useState("")
  const [position, setPosition] = useState("")
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")

    const user = (await supabase.auth.getUser()).data.user
    if (!user) {
      setMessage("User not logged in.")
      return
    }

    // Upload avatar if provided
    let avatar_url = ""
    if (avatarFile) {
      const { data, error: uploadError } = await supabase.storage
        .from("profile-pictures")
        .upload(`${user.id}/${avatarFile.name}`, avatarFile, {
          cacheControl: "3600",
          upsert: true,
        })

      if (uploadError) {
        setMessage("Error uploading avatar.")
        return
      }

      const { data: urlData } = supabase.storage
        .from("profile-pictures")
        .getPublicUrl(`${user.id}/${avatarFile.name}`)

      avatar_url = urlData.publicUrl
    }

    const { error: dbError } = await supabase.from("profiles").upsert({
      id: user.id,
      full_name: fullName,
      position,
      avatar_url,
    })

    if (dbError) {
      setMessage("Failed to save profile.")
    } else {
      navigate("/profile") // redirect to profile view
    }
  }

  return (
    <div className="max-w-md mx-auto p-4 mt-10 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Set up your profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <select
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select your position</option>
          <option value="DEF">DEF</option>
          <option value="MID">MID</option>
          <option value="ATT">ATT</option>
          <option value="GK">GK</option>
        </select>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
          className="w-full"
        />
        <button
          type="submit"
          className="bg-pitch-green text-white px-4 py-2 rounded"
        >
          Save Profile
        </button>
        {message && <p className="text-center mt-2 text-sm">{message}</p>}
      </form>
    </div>
  )
}
