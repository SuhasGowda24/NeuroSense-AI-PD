// import React, { useState } from 'react';
// import '../styles/style.css';
// import { Eye, EyeOff, User, Lock, Mail, Shield, CheckCircle, XCircle } from 'lucide-react';

// const AuthSystem = () => {
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });

//   const [errors, setErrors] = useState({});
//   const [passwordStrength, setPasswordStrength] = useState(0);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
    
//     if (name === 'password') {
//       calculatePasswordStrength(value);
//     }
    
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const calculatePasswordStrength = (password) => {
//     let strength = 0;
//     if (password.length >= 8) strength++;
//     if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
//     if (/\d/.test(password)) strength++;
//     if (/[^a-zA-Z0-9]/.test(password)) strength++;
//     setPasswordStrength(strength);
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.username.trim()) {
//       newErrors.username = 'Username is required';
//     }
    
//     if (isSignUp && !formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (isSignUp && !/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Email is invalid';
//     }
    
//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//     }
    
//     if (isSignUp && !formData.confirmPassword) {
//       newErrors.confirmPassword = 'Please confirm your password';
//     } else if (isSignUp && formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = 'Passwords do not match';
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       const userType = isAdmin ? 'Admin' : 'User';
//       const action = isSignUp ? 'Sign Up' : 'Login';
//       alert(`${userType} ${action} successful!\nUsername: ${formData.username}`);
//       setFormData({ username: '', email: '', password: '', confirmPassword: '' });
//       setPasswordStrength(0);
//     }
//   };

//   const getPasswordStrengthColor = () => {
//     const colors = ['#ef4444', '#f59e0b', '#eab308', '#22c55e'];
//     return colors[passwordStrength - 1] || '#ef4444';
//   };

//   const getPasswordStrengthText = () => {
//     const texts = ['Weak', 'Fair', 'Good', 'Strong'];
//     return texts[passwordStrength - 1] || 'Very Weak';
//   };

//   return (
//     <div className={`auth-container ${isAdmin ? 'admin-mode' : 'user-mode'}`}>
//       <div className="auth-card">
//         <div className="toggle-container">
//           <button
//             className={`toggle-btn ${!isAdmin ? 'active' : ''}`}
//             onClick={() => setIsAdmin(false)}
//           >
//             <User size={18} />
//             User
//           </button>
//           <button
//             className={`toggle-btn ${isAdmin ? 'active' : ''}`}
//             onClick={() => setIsAdmin(true)}
//           >
//             <Shield size={18} />
//             Admin
//           </button>
//         </div>

//         <div className="auth-header">
//           <div className="icon-wrapper">
//             {isAdmin ? <Shield size={40} /> : <User size={40} />}
//           </div>
//           <h1>{isAdmin ? 'Admin' : 'User'} {isSignUp ? 'Sign Up' : 'Login'}</h1>
//           <p>Welcome! Please {isSignUp ? 'create your account' : 'enter your credentials'}</p>
//         </div>

//         <form onSubmit={handleSubmit} className="auth-form">
//           <div className="input-group">
//             <div className="input-wrapper">
//               <User className="input-icon" size={20} />
//               <input
//                 type="text"
//                 name="username"
//                 placeholder="Username"
//                 value={formData.username}
//                 onChange={handleInputChange}
//                 className={errors.username ? 'error' : ''}
//               />
//             </div>
//             {errors.username && (
//               <span className="error-message">
//                 <XCircle size={14} /> {errors.username}
//               </span>
//             )}
//           </div>

//           {isSignUp && (
//             <div className="input-group">
//               <div className="input-wrapper">
//                 <Mail className="input-icon" size={20} />
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Email Address"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className={errors.email ? 'error' : ''}
//                 />
//               </div>
//               {errors.email && (
//                 <span className="error-message">
//                   <XCircle size={14} /> {errors.email}
//                 </span>
//               )}
//             </div>
//           )}

//           <div className="input-group">
//             <div className="input-wrapper">
//               <Lock className="input-icon" size={20} />
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 name="password"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 className={errors.password ? 'error' : ''}
//               />
//               <button
//                 type="button"
//                 className="toggle-password"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//               </button>
//             </div>
//             {errors.password && (
//               <span className="error-message">
//                 <XCircle size={14} /> {errors.password}
//               </span>
//             )}
//             {isSignUp && formData.password && (
//               <div className="password-strength">
//                 <div className="strength-bar">
//                   <div
//                     className="strength-fill"
//                     style={{
//                       width: `${(passwordStrength / 4) * 100}%`,
//                       backgroundColor: getPasswordStrengthColor()
//                     }}
//                   />
//                 </div>
//                 <span style={{ color: getPasswordStrengthColor() }}>
//                   {getPasswordStrengthText()}
//                 </span>
//               </div>
//             )}
//           </div>

//           {isSignUp && (
//             <div className="input-group">
//               <div className="input-wrapper">
//                 <Lock className="input-icon" size={20} />
//                 <input
//                   type={showConfirmPassword ? 'text' : 'password'}
//                   name="confirmPassword"
//                   placeholder="Confirm Password"
//                   value={formData.confirmPassword}
//                   onChange={handleInputChange}
//                   className={errors.confirmPassword ? 'error' : ''}
//                 />
//                 <button
//                   type="button"
//                   className="toggle-password"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 >
//                   {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                 </button>
//               </div>
//               {errors.confirmPassword && (
//                 <span className="error-message">
//                   <XCircle size={14} /> {errors.confirmPassword}
//                 </span>
//               )}
//               {formData.confirmPassword && formData.password === formData.confirmPassword && (
//                 <span className="success-message">
//                   <CheckCircle size={14} /> Passwords match
//                 </span>
//               )}
//             </div>
//           )}

//           {!isSignUp && (
//             <div className="form-options">
//               <label className="remember-me">
//                 <input type="checkbox" />
//                 <span>Remember me</span>
//               </label>
//               <a href="#" className="forgot-password">Forgot password?</a>
//             </div>
//           )}

//           <button type="submit" className="submit-btn">
//             {isSignUp ? 'Create Account' : 'Sign In'}
//           </button>
//         </form>

//         <div className="auth-footer">
//           <p>
//             {isSignUp ? 'Already have an account?' : "Don't have an account?"}
//             <button
//               type="button"
//               className="switch-mode"
//               onClick={() => {
//                 setIsSignUp(!isSignUp);
//                 setFormData({ username: '', email: '', password: '', confirmPassword: '' });
//                 setErrors({});
//                 setPasswordStrength(0);
//               }}
//             >
//               {isSignUp ? 'Sign In' : 'Sign Up'}
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthSystem;