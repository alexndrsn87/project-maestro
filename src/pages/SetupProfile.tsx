import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function SetupProfile() {
  const [fullName, setFullName] = useState('')
  const [position, setPosition] = useState('DEF')
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [message, setMessage] = useState('')

  const handleSubmit = async () => {
    setMessage('')

    const user = (await supabase.auth.getUser()).data.user
    if (!user) {
      setMessage('You must be logged in')
      return
    }

    let avatarUrl = ''
    if (avatarFile) {
      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(`avatars/${user.id}`, avatarFile, {
          upsert: true
        })
      if (error) {
        setMessage('Error uploading image')
        return
      }
      avatarUrl = data.path
    }

    const { error } = await supabase.from('profiles').upsert({
      id: user.id,
      full_name: fullName,
      position,
      avatar_url: avatarUrl,
    })

    setMessage(error ? 'Error saving profile' : 'Profile updated!')
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Set up your profile</h2>
      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
      />
      <select
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
      >
        <option value="DEF">Defender</option>
        <option value="MID">Midfielder</option>
        <option value="ATT">Attacker</option>
        <option value="GK">Goalkeeper</option>
      </select>
      <input
        type="file"
        onChange={(e) => setAvatarFile(e.target.files?.[0] ?? null)}
        className="mb-4"
      />
      <button
        onClick={handleSubmit}
        className="bg-pitch-green text-white px-4 py-2 rounded"
      >
        Save Profile
      </button>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </div>
  )
}
