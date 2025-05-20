// src/components/Navbar.tsx
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"

const Navbar = () => {
  const [user, setUser] = useState<any>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      setUser(data.session?.user || null)
    }

    getSession()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    navigate("/")
  }

 const goToAuth = () => {
  navigate("/signup")
}


  const goToProfile = () => {
    navigate("/profile")
  }

  return (
    <nav className="bg-white py-4 px-6 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <h1
          onClick={() => navigate("/")}
          className="text-pitch-green text-2xl font-bold cursor-pointer"
        >
          FiveASide Manager
        </h1>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-dark-text hover:text-pitch-green">Features</a>
          <a href="#how-it-works" className="text-dark-text hover:text-pitch-green">How It Works</a>
          <a href="#testimonials" className="text-dark-text hover:text-pitch-green">Testimonials</a>
        </div>
        <div className="space-x-4">
          {user ? (
            <>
              <Button variant="outline" onClick={goToProfile}>
                Profile
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              className="bg-action-orange hover:bg-action-orange/90 text-white"
              onClick={goToAuth}
            >
              Sign Up
            </Button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
