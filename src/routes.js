import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import SignupOptions from "./pages/SignupOptions";
import SignupForm from "./pages/SignupForm";
import Home from "./pages/Home";
import EventCalender from "./pages/EventCalender";

export default function AppRoutes() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/takvim" element={<EventCalender/>}/>
          <Route path="/giris-secenekleri" element={<SignupOptions/>}/>
          <Route path="/kayit-ol" element={<SignupForm isStudent={false}/>}/>
          <Route path="/kayit-ol-ogrenci" element={<SignupForm isStudent={true}/>}/>
        </Routes>
      </MainLayout>
    </Router>
  );
}
