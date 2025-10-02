import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../src/layouts/Layouts";
import Home from "./Pages/Home";
import Assignment from "./Pages/Assignment";
import Card1 from "./Pages/Card1";
import Card2 from "./Pages/Card2";
import Card3 from "./Pages/Card3";
import Card4 from "./Pages/Card4";

function App() {
  return (
     <Router>
        <Routes>
          <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
           <Route path="/assignment" element={<Assignment />} />
           <Route path="/card1" element={<Card1 />} />
           <Route path="/card2" element={<Card2 />} />
           <Route path="/card3" element={<Card3 />} />
           <Route path="/card4" element={<Card4 />} />
           </Route>
        </Routes>
    </Router>
  );
}

export default App;
