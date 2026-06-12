"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "خطا در ثبت‌نام");
    } else {
      const loginRes = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (loginRes?.ok) router.push("/tasks");
      else router.push("/login");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">ثبت‌نام</h1>
      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="نام"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
        />
        <input
          type="email"
          placeholder="ایمیل"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="رمز عبور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          ثبت‌نام
        </button>
      </form>
      <div className="mt-4 text-center">
        <p>قبلاً ثبت‌نام کرده‌اید؟</p>
        <a href="/login" className="text-blue-600 hover:underline">
          ورود
        </a>
      </div>
    </div>
  );
}
