import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavbarHome from "../components/NavbarHome";
import NavbarPatient from "../components/NavbarPatient";
import NavbarAdmin from "../components/NavbarAdmin";
import Footer from "../components/Footer";


export default function Layout() {
  const location = useLocation();
  const path = location.pathname.toLowerCase(); 

  // picks navbar based on route
  let Navbar = <NavbarHome />;

  if (path.startsWith("/patient")) {
    Navbar = <NavbarPatient />;
  } else if (path.startsWith("/admin")) {
    Navbar = <NavbarAdmin />;
  }

  return (
    <>
      {Navbar }
      <main>
        <Outlet /> {/* Contents of pages goes here */}
      </main>
      <Footer />
    </>
  );
}
