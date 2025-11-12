import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./ScrollToTop";
import Layout from "../src/layouts/Layouts";
import PatientLayout from "../src/layouts/PatientLayout";
import AdminLayout from "../src/layouts/AdminLayout";
import Home from "./Pages/Home";
import Assignment from "./Pages/Assignment";
import Learning from "./Pages/Learning";
import AuthPage from "./authentication/AuthPage";
import PatientDashboard from "./Pages/Dashboard/Patient/PatientDashboard";
import AdminDashboard from "./Pages/Dashboard/Admin/AdminDashboard";
import Medication from "./Pages/Dashboard/Patient/Medication";
import TrackSymptoms from "./Pages/Dashboard/Patient/TrackSymptoms";
import Journey from "./Pages/Dashboard/Patient/Journey";
import Caregiver from "./Pages/Dashboard/Patient/Caregiver";
import Exercise from "./Pages/Dashboard/Patient/Exercise";
import Community from "./Pages/Dashboard/Patient/Community";
import AIAssessment from "./Pages/Dashboard/Patient/AIAssessment";
import ReportCenter from "./Pages/Dashboard/Patient/ReportCenter";

function App() {
  useEffect(() => {
    // Check if the script is already loaded to avoid duplicates
    if (!window.chatbase || window.chatbase("getState") !== "initialized") {
      window.chatbase = (...args) => {
        if (!window.chatbase.q) {
          window.chatbase.q = [];
        }
        window.chatbase.q.push(args);
      };
      window.chatbase = new Proxy(window.chatbase, {
        get(target, prop) {
          if (prop === "q") {
            return target.q;
          }
          return (...args) => target(prop, ...args);
        }
      });

      const onLoad = function() {
        const script = document.createElement("script");
        script.src = "https://www.chatbase.co/embed.min.js";
        script.id = "fRW7lC9kjy6f6BXOoHJzV";
        script.domain = "www.chatbase.co";
        document.body.appendChild(script);
      };

      if (document.readyState === "complete") {
        onLoad();
      } else {
        window.addEventListener("load", onLoad);
      }
    }
  }, []);

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
             <Route path="/reportcenter" element={<ReportCenter />} />
          </Route>
        </Route>
          
          {/* Admin Routes */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route  element={<AdminLayout />}>
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
