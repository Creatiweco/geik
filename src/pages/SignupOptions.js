import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/scss/pages/_signupOptions.scss";
import { FaGoogle, FaApple } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

export default function SignupOptions() {
    const navigate = useNavigate();  // Sayfalar arası yönlendirme için `useNavigate` hook'u kullanılıyor.

    return (
        <div
            className="singup_options d-flex align-items-center justify-content-center vh-100"
            style={{
                backgroundImage: "url('/assets/images/geik_background_logo.svg')",  // Arka plan resmi ayarlanıyor.
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}
        >
            {/* İçerik kapsayıcı */}
            <div className="container">
                <div className="row justify-content-center mobile">
                    {/* Logo alanı */}
                    <img src="/assets/images/geik_logo_blue.svg" alt="Logo" className="singup_logo" />

                    {/* Açıklama metni */}
                    <p className="description">HESABINI OLUŞTUR VE GEİKLE!</p>

                    {/* Kaydol ve Giriş Yap butonları */}
                    <button className="singup_btn_primary" onClick={() => navigate("/kayit-ol")}>
                        Kaydol
                    </button>
                    <button className="singup_btn_primary" onClick={() => navigate("/giris-yap")}>
                        Giriş Yap
                    </button>

                    {/* Alternatif giriş metni */}
                    <p className="or-text">Ya da</p>

                    {/* Google ile giriş butonu */}
                    <button className="singup_second_primary">
                        <FaGoogle className="icon me-2" /> Google ile Giriş Yap
                    </button>

                    {/* Apple ile giriş butonu */}
                    <button className="singup_second_primary">
                        <FaApple className="icon me-2" /> Apple ile Giriş Yap
                    </button>
                </div>
            </div>
        </div>
    );
}
