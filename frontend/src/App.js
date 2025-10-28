import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
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
import TrackSymptoms from "./Pages/Dashboard/Patient/TrackSymptoms";
import Journey from "./Pages/Dashboard/Patient/Journey";
import Caregiver from "./Pages/Dashboard/Patient/Caregiver";
import Exercise from "./Pages/Dashboard/Patient/Exercise";
import Community from "./Pages/Dashboard/Patient/Community";
import AIAssessment from "./Pages/Dashboard/Patient/AIAssessment";

function App() {
  return (
     <Router>
       <ScrollToTop />
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
            <Route path="/tracksymptoms" element={<TrackSymptoms />} />
             <Route path="/journey" element={<Journey />} />
             <Route path="/caregiver" element={<Caregiver />} />
             <Route path="/exercise" element={<Exercise />} />
             <Route path="/community" element={<Community />} />
             <Route path="/aiassessment" element={<AIAssessment />} />
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
