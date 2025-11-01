import React from "react";
import { Outlet } from "react-router-dom";
import NavbarHome from "../components/NavbarHome";
import Footer from "../components/Footer";

export default function Layout() {

  return (
    <>
      <NavbarHome /> 
      <main>
        <Outlet /> {/* Contents of pages goes here */}
      </main>
      <Footer />
    </>
  );
}
