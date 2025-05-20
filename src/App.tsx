// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Index from "@/pages/Index"
import AuthPage from "@/pages/AuthPage"
import SetupProfile from "@/pages/SetupProfile"
import PlayerProfile from "@/pages/PlayerProfile"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/signup" element={<AuthPage />} />
        <Route path="/setup-profile" element={<SetupProfile />} />
        <Route path="/profile" element={<PlayerProfile />} />
      </Routes>
    </Router>
  )
}

export default App
