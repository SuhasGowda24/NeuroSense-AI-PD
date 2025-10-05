import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../src/layouts/Layouts";
import Home from "./Pages/Home";
import Assignment from "./Pages/Assignment";
import PatientDashboard from "./Pages/Dashboard/Patient/PatientDashboard";


function App() {
  return (
     <Router>
        <Routes>
          <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
           <Route path="/assignment" element={<Assignment />} />
            <Route path="/PatientDashboard" element={<PatientDashboard />} />
           </Route>
        </Routes>
    </Router>
  );
}

export default App;
