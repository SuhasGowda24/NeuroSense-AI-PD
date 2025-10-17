import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../src/layouts/Layouts";
import PatientLayout from "../src/layouts/PatientLayout";
import Home from "./Pages/Home";
import Assignment from "./Pages/Assignment";
import AuthPage from "./authentication/AuthPage";
import ProtectedRoute from "./components/ProtectedRoute";
import PatientDashboard from "./Pages/Dashboard/Patient/PatientDashboard";
import Medication from "./Pages/Dashboard/Patient/Medication";
import Learning from "./Pages/Learning";
import AdminDashboard from "./Pages/Dashboard/Admin/AdminDashboard";


function App() {
  return (
     <Router>
        <Routes>
          {/* Home Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/assignment" element={<Assignment />} />
          <Route path="/learning" element={<Learning />} />
        </Route>
           
           {/* Patient Routes */}
          <Route element={<ProtectedRoute allowedRoles={["patient"]} />}>
          <Route  element={<PatientLayout />}>
            <Route path="/patientdashboard" element={<PatientDashboard />} />
            <Route path="/medication" element={<Medication />} />
          </Route>
        </Route>
          
          {/* Patient Routes */}
           <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        {/* <Route  element={<AdminLayout />}></Route> */}
            <Route path="/admindashboard" element={<AdminDashboard />} />
          </Route>

        {/* Auth route (no navbar/footer) */}
           <Route path="/AuthPage" element={<AuthPage />} />
        </Routes>
    </Router>
    
  );
}

export default App;
