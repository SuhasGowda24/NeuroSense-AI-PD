import React from "react";
import { Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  Calendar, 
  FileText, 
  Pill, 
  BarChart3, 
  Settings, 
  User 
} from "lucide-react";

export default function NavbarAdmin() {
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo / Brand */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow">
              <User className="text-blue-600 w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-white">Patient Portal</h1>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex space-x-6">
            <Link to="/dashboard" className="flex items-center gap-2 text-white hover:text-yellow-300 transition">
              <LayoutDashboard size={18} /> Dashboard
            </Link>
            <Link to="/appointments" className="flex items-center gap-2 text-white hover:text-yellow-300 transition">
              <Calendar size={18} /> Appointments
            </Link>
            <Link to="/records" className="flex items-center gap-2 text-white hover:text-yellow-300 transition">
              <FileText size={18} /> Records
            </Link>
            <Link to="/medicines" className="flex items-center gap-2 text-white hover:text-yellow-300 transition">
              <Pill size={18} /> Medicines
            </Link>
            <Link to="/reports" className="flex items-center gap-2 text-white hover:text-yellow-300 transition">
              <BarChart3 size={18} /> Reports
            </Link>
            <Link to="/settings" className="flex items-center gap-2 text-white hover:text-yellow-300 transition">
              <Settings size={18} /> Settings
            </Link>
          </div>

          {/* Profile */}
          <div className="flex items-center gap-3">
            <img
              src="https://via.placeholder.com/40"
              alt="profile"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <span className="hidden md:inline text-white font-medium">John Doe</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
