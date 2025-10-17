import React from "react";
import NavbarPatient from "../components/NavbarPatient";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function PatientLayout() {
  return (
    <>
      <NavbarPatient />
      <main>
        <Outlet /> {/* Will render nested patient pages like Dashboard, Medications */}
      </main>
      <Footer />
    </>
  );
}
