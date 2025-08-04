// pages/index.js
"use client";
import Head from "next/head";
import {
  UserPlus,
  LogOut,
  CalendarClock,
  FileWarning,
  PlusCircle,
  CheckCircle,
  Upload,
  GraduationCap,
} from "lucide-react";

export default function Home() {
  const cardData = [
    { label: "New Joiners", count: 5, icon: <UserPlus className="text-green-500" /> },
    { label: "Upcoming Exits", count: 2, icon: <LogOut className="text-red-500" /> },
    { label: "Pending Leave Requests", count: 3, icon: <CalendarClock className="text-yellow-500" /> },
    { label: "Document Expiring", count: 4, icon: <FileWarning className="text-orange-500" /> },
  ];

  const quickActions = [
    { label: "Manage Employee", icon: <PlusCircle size={18} /> },
    { label: "Approve Leave", icon: <CheckCircle size={18} /> },
    //{ label: "Upload Document", icon: <Upload size={18} /> },
    { label: "View Training Status", icon: <GraduationCap size={18} /> },
  ];

  return (
    <>
      <Head>
        <title>BITS | Employee Management System</title>
      </Head>

      <div>
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800 transition-colors duration-500">
          {/* Header */}
          
<header className="flex justify-between items-center p-6 bg-white shadow-md">
  <div className="flex items-center gap-3">
    <img src="/logo2.png" alt="Company Logo" className="h-10 w-10 object-contain" />
    <h1 className="text-2xl font-bold">Admin Dashboard</h1>
  </div>
  <nav className="space-x-6 font-medium hidden sm:flex">
  <a href="/login" className="hover:text-blue-600">Employees</a>
  <a href="#" className="hover:text-blue-600">Attendance</a>
  <a href="/leave" className="hover:text-blue-600">Leave</a>
  <a href="/AnnouncementPage" className="hover:text-blue-600">Payroll</a>
</nav>
  <div className="flex items-center gap-4">
    <button className="text-xl">🔔</button>
    <button className="text-xl">👤</button>
  </div>
</header>


          {/* Dashboard Overview Cards */}
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6">
            {cardData.map((item, idx) => (
              <div
                key={idx}
                className="bg-white shadow-md rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="flex justify-end">{item.icon}</div>
                <div className="text-3xl font-bold">{item.count}</div>
                <div className="mt-2 text-gray-600">{item.label}</div>
              </div>
            ))}
          </section>

          {/* Main Grid Sections */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
            {/* Left Column */}
            <div className="space-y-6 lg:col-span-2">
              {/* Leave Requests */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-lg font-semibold mb-4">Leave Requests</h2>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Ravi Kumar - 3 Days</span>
                    <span className="text-sm text-gray-500">Medical Leave</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Neha Singh - 1 Day</span>
                    <span className="text-sm text-gray-500">Personal</span>
                  </li>
                </ul>
              </div>

              {/* New Employees */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-lg font-semibold mb-4">New Employees</h2>
                <ul className="space-y-2">
                  <li>Rahul Sharma - Developer</li>
                  <li>Priya Mehta - HR</li>
                </ul>
              </div>

              {/* Training Status */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-lg font-semibold mb-4">Training Status</h2>
                <div className="flex items-end gap-4 h-32">
                  <div className="w-6 bg-blue-500 h-3/4 rounded"></div>
                  <div className="w-6 bg-green-500 h-1/2 rounded"></div>
                  <div className="w-6 bg-yellow-500 h-1/4 rounded"></div>
                </div>
                <p className="mt-4 text-sm text-gray-500">Training completion status.</p>
              </div>

              {/* Alerts */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-lg font-semibold mb-4">Alerts</h2>
                <ul className="space-y-2 text-sm text-red-600">
                  <li>• Aadhar documents expiring soon.</li>
                  <li>• Employee contract renewal pending.</li>
                </ul>
              </div>
            </div>

            {/* Right Column: Quick Actions */}
            <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
              <h2 className="text-lg font-semibold">Quick Actions</h2>
              {quickActions.map((action, i) => (
                <button
                  key={i}
                  className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded flex items-center justify-center gap-2 transition"
                >
                  {action.icon}
                  {action.label}
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}