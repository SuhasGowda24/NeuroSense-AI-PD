import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Activity, Pill, Calendar, Heart, Brain } from 'lucide-react';
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import SignInButton from "./ui/signInButton";
import SignOutButton from "./ui/signOutButton";

export default function NavbarPatient() {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const navigationLinks = [
    { title: "Dashboard", icon: LayoutDashboard, path: "/patientdashboard" },
    { title: "Medications", icon: Pill, path: "/medication" },
    { title: "My Journey", icon: Calendar, path: "/journey" },
    { title: "Caregiver Corner", icon: Heart, path: "/caregiver" },
    { title: "AI Assessment", icon: Brain, path: "/aiassessment" },
  ];

  // update login state when location changes (simple heuristic)
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, [location.pathname]);

  useEffect(() => {
    const current = navigationLinks.find(
      (link) => link.path.toLowerCase() === location.pathname.toLowerCase()
    );
    if (current) {
      setActiveItem(current.title);
    } else {
      setActiveItem("Dashboard"); // fallback default
    }
  }, [location.pathname]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <nav className="bg-white/95 backdrop-blur-sm border-b border-teal-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navbar Top Row */}
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              {/* Logo */}
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900 text-lg">PD Care</h2>
                <p className="text-xs text-teal-600 font-medium -mt-1">Your Parkinson's Support</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationLinks.map((link) => (
                <Link
                  key={link.title}
                  to={link.path}
                  onClick={() => setActiveItem(link.title)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    activeItem === link.title
                      ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md shadow-teal-500/20'
                      : 'text-gray-700 hover:text-teal-600 hover:bg-teal-50'
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  <span className="text-sm">{link.title}</span>
                </Link>
              ))}

              {/* User: show Logout when logged in, otherwise Sign In */}
              {isLoggedIn ? <SignOutButton /> : <SignInButton />}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Button
                className="flex flex-col gap-1.5 p-2 bg-teal-500 hover:bg-teal-400 rounded-lg transition-colors"
                onClick={toggleMobileMenu}
              >
                <span
                  className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                  }`}
                ></span>
                <span
                  className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${
                    isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                ></span>
                <span
                  className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
                    isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                ></span>
              </Button>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden bg-white shadow-md border-t border-teal-100">
              <div className="flex flex-col px-4 py-2 space-y-2">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.title}
                    to={link.path}
                    onClick={() => {
                      setActiveItem(link.title);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                      activeItem === link.title
                        ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md'
                        : 'text-gray-700 hover:text-teal-600 hover:bg-teal-50'
                    }`}
                  >
                    <link.icon className="w-4 h-4" />
                    <span className="font-medium">{link.title}</span>
                  </Link>
                ))}
                {/* Sign In / Logout for Mobile */}
                {isLoggedIn ? <SignOutButton /> : <SignInButton />}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}