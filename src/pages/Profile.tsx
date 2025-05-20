import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

type ProfileData = {
  full_name: string
  position: string
  avatar_url: string
}

const positionMap: Record<string, string> = {
  DEF: "Defender",
  MID: "Midfielder",
  ATT: "Attacker",
  GK: "Goalkeeper",
}

export default function Profile() {
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      const user = (await supabase.auth.getUser()).data.user
      if (!user) return

      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, position, avatar_url")
        .eq("id", user.id)
        .single()

      if (error) {
        console.error("Error fetching profile:", error.message)
      } else {
        setProfile(data)
      }

      setLoading(false)
    }

    fetchProfile()
  }, [])

  if (loading) return <p className="text-center mt-8">Loading profile...</p>
  if (!profile) return <p className="text-center mt-8">No profile found.</p>

  const avatarUrl = profile.avatar_url
    ? supabase.storage.from("profile-pictures").getPublicUrl(profile.avatar_url).data.publicUrl
    : "https://via.placeholder.com/100"

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow text-center">
      <img
        src={avatarUrl}
        alt="Avatar"
        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border"
      />
      <h2 className="text-2xl font-bold">{profile.full_name}</h2>
      <p className="text-muted-foreground text-sm">{positionMap[profile.position]}</p>
    </div>
  )
}
