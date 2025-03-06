import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Bu component, sayfa yapısının genel şablonunu oluşturur (Navbar, Footer ve içerik bileşenleri)
// Tüm sayfaları bu layout'un içine sararak kullanılır.

export default function MainLayout({ children }) {
  const location = useLocation(); // Sayfanın mevcut URL bilgisini alır.

  // Navbar'ın gösterilmeyeceği sayfa yolları
  const hideNavbarPages = [
    "/giris-secenekleri",
    "/giris-yap",
    "/kayit-ol",
    "/kayit-ol-ogrenci"
  ];

  // Footer'ın gösterilmeyeceği sayfa yolları
  const hidefooterPages = [
    "/giris-secenekleri",
    "/giris-yap",
    "/kayit-ol",
    "/kayit-ol-ogrenci",
    "/takvim"
  ];

  return (
    <div style={{ position: "relative" }}>
      {/* Eğer mevcut sayfa, hideNavbarPages içinde değilse Navbar gösterilir */}
      {!hideNavbarPages.includes(location.pathname) && <Navbar />}

      {/* Sayfanın ana içeriği (children olarak gelen bileşenler) */}
      {children}

      {/* Eğer mevcut sayfa, hideFooterPages içinde değilse Footer gösterilir */}
      {!hidefooterPages.includes(location.pathname) && <Footer />}
    </div>
  );
}
