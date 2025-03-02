import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/scss/pages/_signupOptions.scss";
import { FaGoogle, FaApple } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

export default function SignupOptions() {
    const navigate = useNavigate();

    return(
        <div 
            className="singup_options d-flex align-items-center justify-content-center vh-100"
            style={{
                backgroundImage:"url('/assets/images/geik_background_logo.svg')",
                backgroundSize:"cover",
                backgroundPosition:"center"
            }}
        >
            <div className="container">
                <div className="row justify-content-center">
                    <img src="/assets/images/geik_logo_blue.svg" alt="Logo" className="singup_logo" />
                    <p className="description">HESABINI OLUŞTUR VE GEİKLE!</p>
                    
                        <button className="singup_btn_primary" onClick={() => navigate("/kayit-ol")}>Kaydol</button>
                    <button className="singup_btn_primary" onClick={() => navigate("/giris-yap")}>Giriş Yap</button>
                    
                    <p className="or-text">Ya da</p>
                    
                    <button className="singup_second_primary">
                      <FaGoogle className="icon me-2" /> Google ile Giriş Yap
                    </button>
                    <button className="singup_second_primary">
                      <FaApple className="icon me-2" /> Apple ile Giriş Yap
                    </button>
                </div>
            </div>
        </div>
    );

}
