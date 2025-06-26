"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      window.location.href = "/";
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6  mx-auto text-zinc-600 dark:text-zinc-400"
    >
      {error && (
        <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 p-2 rounded">
          {error}
        </p>
      )}

      <div>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-800"
        />
      </div>

      <div>
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-800"
        />
      </div>

      <button
        type="submit"
        className="rounded w-full px-6 py-2 mt-2 bg-fuchsia-800 text-white disabled:opacity-50 transition hover:bg-fuchsia-900"
      >
        Login
      </button>
    </form>
  );
}
