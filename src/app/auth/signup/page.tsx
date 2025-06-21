'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

export default function SignUpPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axios.post("/api/auth/signup", { email, username, password })
      router.push("/auth/login")
    } catch (err: any) {
      setError(err.response?.data?.error || "Signup failed")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Sign Up</button>
    </form>
  )
}
