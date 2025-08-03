"use client";

import { useState } from "react";
import axios from "axios";

export default function EmployeeRegisterPage() {
  const [employee, setEmployee] = useState({
    name: "",
    birthdate: "",
    email: "",
    contact: "",
    password: "",
    designation: "",
  });

  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/employee/register", employee);
      setMessage(res.data.message);
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 space-y-4 border shadow rounded"
    >
      <h2 className="text-2xl font-bold text-center">Employee Registration</h2>

      {message && <p className="text-center text-blue-600">{message}</p>}

      <input
        type="text"
        placeholder="Employee Name"
        value={employee.name}
        onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
        required
        className="w-full p-2 border rounded"
      />

      <input
        type="date"
        placeholder="Birthdate"
        value={employee.birthdate}
        onChange={(e) => setEmployee({ ...employee, birthdate: e.target.value })}
        required
        className="w-full p-2 border rounded"
      />

      <input
        type="email"
        placeholder="Email"
        value={employee.email}
        onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
        required
        className="w-full p-2 border rounded"
      />

      <input
        type="tel"
        placeholder="Contact Number"
        value={employee.contact}
        onChange={(e) => setEmployee({ ...employee, contact: e.target.value })}
        required
        className="w-full p-2 border rounded"
      />

      <input
        type="password"
        placeholder="Password"
        value={employee.password}
        onChange={(e) => setEmployee({ ...employee, password: e.target.value })}
        required
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        placeholder="Designation"
        value={employee.designation}
        onChange={(e) => setEmployee({ ...employee, designation: e.target.value })}
        required
        className="w-full p-2 border rounded"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
      >
        Register
      </button>
    </form>
  );
}
