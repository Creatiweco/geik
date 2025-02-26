import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function MainLayout({ children }) {
  const location = useLocation();
  const hideNavbarPages = ["/giris-secenekleri", "/giris-secenekleri", "/kayit-ol", "/kayit-ol-ogrenci"];
  const hidefooterPages = ["/giris-secenekleri", "/giris-secenekleri", "/kayit-ol", "/kayit-ol-ogrenci", "/takvim"];

  return (
    <div style={{position:"relative"}}>
      {!hideNavbarPages.includes(location.pathname) && <Navbar />}
      {children}
      {!hidefooterPages.includes(location.pathname) && <Footer />}
    </div>
  );
}
