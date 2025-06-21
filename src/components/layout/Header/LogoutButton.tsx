"use client"

import { signOut } from "next-auth/react"

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="block px-3 py-2 transition hover:accent-color"
    >
      Logout
    </button>
  )
}