import React from "react";
import NavbarAdmin from "../components/NavbarAdmin";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <>
      <NavbarAdmin />
      <main>
        <Outlet /> {/* Will render nested patient pages like Dashboard, Medications */}
      </main>
      <Footer />
    </>
  );
}
