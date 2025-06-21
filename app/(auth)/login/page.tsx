"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
      callbackUrl: params.get("callbackUrl") || "/",
    });
    if (res?.error) setError(res.error);
    else router.push(res?.url || "/");
  }

  return (
    <div className="max-w-md mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="input input-bordered w-full"
          placeholder="Email"
          type="email"
          required
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="input input-bordered w-full"
          placeholder="Password"
          type="password"
          required
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
        <button className="btn btn-primary w-full" type="submit">Login</button>
      </form>
      <button
        className="btn btn-outline w-full mt-4"
        onClick={() => signIn("google", { callbackUrl: "/" })}
      >
        Sign in with Google
      </button>
      {error && <p className="text-red-500 mt-3">{error}</p>}
      <p className="mt-4 text-sm">Don&apos;t have an account? <a href="/register" className="text-blue-500">Register</a></p>
    </div>
  );
}