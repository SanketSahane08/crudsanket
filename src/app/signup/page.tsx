"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function signup() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("/api/users/signup", user);
      if (res.status === 201) {
        router.push("/login");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-20 space-y-4 p-6 border shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>

      {error && <p className="text-red-600">{error}</p>}

      <input
        type="text"
        placeholder="Name"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="w-full p-2 border rounded"
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        disabled={loading}
      >
        {loading ? "Signuping..." : "Signup"}
      </button>
    </form>
  );
}
