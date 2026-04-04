import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Lock, Mail, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import "../styles/style.css";

export default function AuthPage() {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    userType: "patient",
    termsAccepted: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
/*----- Handles Logins By Using Fetch -----*/
  const handleLogin = async () => {
    if (!formData.username || !formData.password) {
      alert("Please fill in all fields");
      return;
    }
   
     try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
        role: formData.userType
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Login failed");
      return;
    }

    // Save JWT token in localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role); // 'admin' or 'patient'
    localStorage.setItem("userId", data.userId);
    
    // Redirect based on role
    if (data.role === "admin") {
      navigate("/admindashboard");
    } else {
      navigate("/patientdashboard");
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong!");
  }
};

  const handleSignup = async () => {
    if (!formData.username || !formData.email || !formData.password) {
      alert("Please fill in all fields");
      return;
    }
    if (!formData.termsAccepted) {
      alert("Please accept the Terms & Conditions");
      return;
    }
   
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: formData.userType,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Signup failed");
        return;
      }

      alert("Account created successfully!");

      // After signup, log in automatically
      setShowLogin(true);
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };


  return (
    <div className="auth-container">
      {/* <div className="mb-auto">   
        <Link to="/" style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1000 }}>
  <Button variant="ghost">
    <ArrowLeft className="w-4 h-4 mr-2" />
    Back
  </Button>
</Link>
      </div> */}
      {/* Desktop View */}
      <div className="auth-box mobile-hide">
        {/* Forms Container */}
        <div
          className={`forms-wrapper ${showLogin ? "show-login" : "show-signup"}`}
        >
          <div className="form-section left-form">
            <Login
              formData={formData}
              handleInputChange={handleInputChange}
              handleLogin={handleLogin}
              setFormData={setFormData}
              setShowLogin={setShowLogin}
            />
          </div>
          <div className="form-section right-form">
            <Signup
              formData={formData}
              handleInputChange={handleInputChange}
              handleSignup={handleSignup}
              setFormData={setFormData}
              setShowLogin={setShowLogin}
            />
          </div>
        </div>

        {/* Sliding Panel */}
        <div
          className={`panel ${showLogin ? "panel-login" : "panel-signup"}`}
        >
         <div className="form-icon w-28 h-28 rounded-full overflow-hidden shadow-md">
            <img 
              src="/assets/L2.png" 
              alt="Brain Logo" 
              className="w-full h-full object-cover"
            />
          </div>

          {showLogin ? (
            <>
              <h2>New User?</h2>
              <p>
                Register to access AI-powered Parkinson's
                <br />
                disease prediction and monitoring
              </p>
              <div className="signup">
              <PanelButton text="Create Account" onClick={() => setShowLogin(false)} />
            </div>
            </>
          ) : (
            <>
              <h2>Have an Account?</h2>
              <p>
                Sign in to view your predictions,
                <br />
                track progress, and access reports
              </p>
               <div className="signin">
              <PanelButton text="Sign In" onClick={() => setShowLogin(true)} />
            </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile View */}
      <div className="auth-mobile mobile-full">
        <div className="mobile-header">
          <div className="mobile-icon">
            <div className="form-icon w-20 h-19 rounded-full overflow-hidden shadow-md mt-5">
            <img 
              src="/assets/L2.png" 
              alt="Brain Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          </div>
          <h2>{showLogin ? "Welcome Back" : "Create Account"}</h2>
          <p>{showLogin ? "Sign in to your dashboard" : "Join our AI platform"}</p>
        </div>

        <div className="mobile-forms">
          {showLogin ? (
            <Login
              formData={formData}
              handleInputChange={handleInputChange}
              handleLogin={handleLogin}
              setFormData={setFormData}
              setShowLogin={setShowLogin}
              isMobile={true}
            />
          ) : (
            <Signup
              formData={formData}
              handleInputChange={handleInputChange}
              handleSignup={handleSignup}
              setFormData={setFormData}
              setShowLogin={setShowLogin}
              isMobile={true}
            />
          )}
        </div>

        <div className="mobile-toggle">
          <p>{showLogin ? "Don't have an account?" : "Already have an account?"}</p>
          <button onClick={() => setShowLogin(!showLogin)}>
            {showLogin ? "Create Account" : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Login Component
function Login({ formData, handleInputChange, handleLogin, setFormData, setShowLogin, isMobile }) {
  return (
    <div className="form-container">
      {!isMobile && (
        <>
        <div className="form-icon w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-lg border border-gray-100 overflow-hidden">
  <img
    src="/assets/Logo.png"
    alt="Brain Logo"
    className="w-20 h-20 object-contain transition-transform duration-300 hover:scale-105"
  />
</div>


          <h1>Welcome Back</h1>
          <p>Sign in to access your dashboard</p>
        </>
      )}

      <InputField
        icon={<User size={20} color="#64748b" />}
        name="username"
        placeholder="Username or User ID"
        value={formData.username}
        onChange={handleInputChange}
      />

      <InputField
        icon={<Lock size={20} color="#64748b" />}
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleInputChange}
      />

      <div className="toggle-buttons">
        <button
          className={formData.userType === "patient" ? "active" : ""}
          onClick={() => setFormData({ ...formData, userType: "patient" })}
        >
          Patient
        </button>
        <button
          className={formData.userType === "admin" ? "active" : ""}
          onClick={() => setFormData({ ...formData, userType: "admin" })}
        >
          Admin
        </button>
      </div>

      <div className="remember-forgot">
        <label> <input type="checkbox" /> Remember me</label>
      </div>

      <ActionButton text="Sign In" onClick={handleLogin} />

       <span  className="form-footer">Don't have an account? <button onClick={() => setShowLogin(false)}>Sign up</button></span>
    </div>
  );
}

// Signup Component
function Signup({ formData, handleInputChange, handleSignup, setFormData, setShowLogin, isMobile }) {
  return (
    <div className="form-container">
      {!isMobile && (
        <>
           <div className="form-icon w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg border border-gray-100 overflow-hidden">
              <img
                src="/assets/Logo.png"
                alt="Brain Logo"
                className="w-16 h-18 object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>

          <h1>Create Account</h1>
          <p>Join our AI-powered platform</p>
        </>
      )}

      <InputField
        icon={<User size={20} color="#64748b" />}
        name="username"
        placeholder="Full Name"
        value={formData.username}
        onChange={handleInputChange}
      />
      <InputField
        icon={<Mail size={20} color="#64748b" />}
        name="email"
        type="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleInputChange}
      />
      <InputField
        icon={<Lock size={20} color="#64748b" />}
        name="password"
        type="password"
        placeholder="Create Password"
        value={formData.password}
        onChange={handleInputChange}
      />
      {/* Role Toggle */}
      <div className="toggle-buttons">
        <button
          className={formData.userType === "patient" ? "active" : ""}
          onClick={() => setFormData({ ...formData, userType: "patient" })}
        >
          Patient
        </button>
        <button
          className={formData.userType === "admin" ? "active" : ""}
          onClick={() => setFormData({ ...formData, userType: "admin" })}
        >
          Admin
        </button>
      </div>
      {/* Terms */}
      <label className="terms-label">
        <input
          type="checkbox"
          name="termsAccepted"
          checked={formData.termsAccepted}
          onChange={handleInputChange}
        />
        I agree to the Terms & Conditions
      </label>
      <ActionButton  text="Create Account" onClick={handleSignup} />
      <span className="form-footer">Already have an account? <button onClick={() => setShowLogin(true)}>Sign in</button></span>
    </div>
  );
}

// Reusable Components
function InputField({ icon, name, type = "text", placeholder, value, onChange }) {
  return (
    <div className="input-wrapper">
      <div className="input-icon">{icon}</div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="input-field"
      />
    </div>
  );
}

function ActionButton({ text, onClick }) {
  return (
    <button className="action-btn" onClick={onClick}>
      {text}
    </button>
  );
}

function PanelButton({ text, onClick }) {
  return (
    <button className="panel-btn" onClick={onClick}>
      {text}
    </button>
  );
}


