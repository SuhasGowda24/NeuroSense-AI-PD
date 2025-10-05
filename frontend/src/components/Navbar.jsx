import {useState} from 'react';
import { Link } from 'react-router-dom';
import { Button } from "./ui/button";
import { Heart, Activity, Globe, CircleUser } from 'lucide-react';


export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("English");  
  const [langMenuOpen, setLangMenuOpen] = useState(false);    



//
 const [role, setRole] = useState("Patient");
  const [open, setOpen] = useState(false);

  const handleSelect = (selectedRole) => {
    setRole(selectedRole);
    setOpen(false);
  };
//



const handleLanguageChange = (lang) => {
  setCurrentLang(lang);
};


  const navigationLinks = [
    { name: 'Home', path: "/" },
    { name: 'Assessment', path: "/assignment", icon: Activity },
  ];
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg" >
                <Heart className="w-5 h-5 text-white" />
                </div>
            
            <div>
              <h2 className="font-bold text-gray-900 text-lg">NeuroHealth</h2>
              <p className="text-xs text-blue-600 font-medium -mt-1">AI Parkinson's Screening</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
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
             
             {/* <div className="relative flex items-center gap-2">
  <Globe className="w-5 h-5 text-gray-600" />
  <select className="language-select border rounded-md px-2 py-1">
    <option>English</option>
    <option>Kannada</option>
    <option>Hindi</option>
  </select>
</div> */}
{/* <div className="relative flex items-center gap-2">
  <Globe className="w-5 h-5 text-gray-600" />
  <div className="language-select flex gap-2">
    {["English", "Kannada", "Hindi"].map(lang => (
      <button
        key={lang}
        className={`border rounded-md px-2 py-1 ${
          currentLang === lang ? "bg-blue-600 text-white" : "bg-white text-gray-700"
        }`}
        onClick={() => handleLanguageChange(lang)}
      >
        {lang}
      </button>
    ))}
  </div>
          </div> */}
          {/* <div className="relative group flex items-center gap-2">
  <Globe className="w-5 h-5 text-gray-600" />
  <div className="absolute left-8 top-0 hidden group-hover:flex flex-col gap-1 bg-white border rounded px-2 py-2 shadow-lg z-10">
    {["English", "Kannada", "Hindi"].map(lang => (
      <button
        key={lang}
        className={`px-2 py-1 rounded hover:bg-blue-500 hover:text-white transition ${
         currentLang === lang ? "bg-blue-600 text-white" : "bg-white text-gray-700"
        }`}
        onClick={() => handleLanguageChange(lang)}
      >
        {lang}
      </button>
    ))}
  </div>
</div> */}
<div className="flex flex-col gap-2 ">
  <button
    onClick={() => setLangMenuOpen(!langMenuOpen)}
    className="flex items-center gap-2 px-3 py-2 border rounded-md bg-white shadow-sm hover:bg-gray-50"
  >
    <Globe className="w-5 h-5 text-gray-600" />
    <span>{currentLang}</span>
  </button>

  {/* Dropdown menu */}
  {langMenuOpen && (
    <div className="absolute top-full mt-2 left-0 flex flex-col gap-1 bg-white border rounded-md shadow-lg z-20 w-40">
      {["English", "Kannada", "Hindi"]
        .filter((lang) => lang !== currentLang) // hide the current one
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
</div>
          </div>

  
 <div className="relative inline-block text-left">
      {/* Trigger button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        <CircleUser size={20} className="text-yellow-300" />
        <span>{role}</span>
      </button>

      {/* Dropdown menu */}
      {open && (
        <div  className="flex items-center gap-2 px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">
          <div className="py-1">
            <Link to="/PatientDashboard"
              onClick={() => handleSelect("Patient")}
               className="block w-full px-4 py-2 text-left text-sm hover:bg-blue-100"
            >
              Patient
            </Link>
            <Link to="/AdminDashboard"
              onClick={() => handleSelect("Admin")}
              className="block w-full px-4 py-2 text-left text-sm hover:bg-blue-100"
            >
              Admin
            </Link>
          </div>
        </div>
      )}
    </div>


          {/* Mobile menu button */}
          <div className="md:hidden">
             <Button
          className="md:hidden flex flex-col gap-1.5 p-1.5 bg-blue-400 hover:bg-blue-300"
          onClick={toggleMobileMenu}
        >
          <span
            className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-300 ${
              isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-gray-700 transition-opacity duration-300 ${
              isMobileMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-300 ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          ></span>
        </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? "max-h-96" : "max-h-0"} bg-white shadow-md border-t border-gray-200`}>
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
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
