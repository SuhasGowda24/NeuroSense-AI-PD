import { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Heart, Activity, BookOpen, House } from "lucide-react";
import SignInButton from "./ui/signInButton";

export default function NavbarHome() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const [currentLang, setCurrentLang] = useState("English");
  // const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");
  const location = useLocation(); 

  const navigationLinks = useMemo(() => [
    { name: "Home", path: "/", icon: House },
    { name: "Assessment", path: "/assignment", icon: Activity },
    { name: "Learning", path: "/Learning", icon: BookOpen },
  ], []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  // const handleLanguageChange = (lang) => setCurrentLang(lang);

    useEffect(() => {
    const current = navigationLinks.find(
      (link) => link.path.toLowerCase() === location.pathname.toLowerCase()
    );
    if (current) {
      setActiveItem(current.name);
    } else {
      setActiveItem("Home");
    }
  }, [location.pathname, navigationLinks]);

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ✅ Navbar Top Row */}
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-lg">NeuroHealth</h2>
              <p className="text-xs text-blue-600 font-medium -mt-1">
                AI Parkinson's Screening
              </p>
            </div>
          </Link>

          {/* ✅ Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                {link.icon && <link.icon className="w-4 h-4" />}
                {link.name}
              </Link>
            ))}

            {/* 🌐 Language Dropdown */}
            {/* <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 border rounded-md bg-white shadow-sm hover:bg-gray-50"
              >
                <Globe className="w-5 h-5 text-gray-600" />
                <span>{currentLang}</span>
              </button>

              {langMenuOpen && (
                <div className="absolute top-full mt-2 left-0 flex flex-col gap-1 bg-white border rounded-md shadow-lg z-20 w-40">
                  {["English", "Kannada", "Hindi"]
                    .filter((lang) => lang !== currentLang)
                    .map((lang) => (
                      <button
                        key={lang}
                        className="px-3 py-2 text-left hover:bg-blue-500 hover:text-white rounded-md transition"
                        onClick={() => {
                          handleLanguageChange(lang);
                          setLangMenuOpen(false);
                        }}
                      >
                        {lang}
                      </button>
                    ))}
                </div>
              )}
            </div> */}

            {/* 👤 User + Sign In */}
          <SignInButton />
          </div>

          {/* ✅ Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              className="flex flex-col gap-1.5 p-1.5 bg-blue-500 hover:bg-blue-400"
              onClick={toggleMobileMenu}
            >
              <span
                className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
                  isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${
                  isMobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              ></span>
            </Button>
          </div>
        </div>

        {/* ✅ Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-md border-t border-gray-200">
            <div className="flex flex-col px-4 py-2 space-y-2">
              {navigationLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.icon && <link.icon className="w-4 h-4" />}
                  {link.name}
                </Link>
              ))}

              {/* 🌐 Mobile Language Selector */}
              {/* <div className="flex flex-col gap-2 border-t pt-2">
                <p className="text-sm font-medium text-gray-600">Language</p>
                <div className="flex gap-2">
                  {["English", "Kannada", "Hindi"].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className={`px-3 py-1 rounded-md text-sm border ${
                        currentLang === lang
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-700"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div> */}

              {/* 👤 Sign In for Mobile */}
              <SignInButton />
              </div>
          </div>
        )}
      </div>
    </nav>
  );
}
