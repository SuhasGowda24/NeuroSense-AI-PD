import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../src/layouts/Layouts";
import Home from "./Pages/Home";
import Assignment from "./Pages/Assignment";
import PatientDashboard from "./Pages/Dashboard/Patient/PatientDashboard";
import AdminDashboard from "./Pages/Dashboard/Admin/AdminDashboard";
import AuthPage from "./authentication/AuthPage";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  return (
     <Router>
        <Routes>
          {/* Layout routes (navbar + footer) */}
          <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
           <Route path="/assignment" element={<Assignment />} />
           
           
           {/* Protected dashboards */}
          <Route element={<ProtectedRoute allowedRoles={["patient"]} />}>
            <Route path="/patientdashboard" element={<PatientDashboard />} />
          </Route>

           <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admindashboard" element={<AdminDashboard />} />
          </Route>
        </Route>

        {/* Auth route (no navbar/footer) */}
           <Route path="/AuthPage" element={<AuthPage />} />
        </Routes>
    </Router>
  );
}

export default App;
