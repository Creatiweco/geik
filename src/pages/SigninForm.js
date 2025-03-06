import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import "../assets/scss/pages/_signupForm.scss";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

export default function SigninForm() {
    // Şifre görünürlüğünü kontrol eden state
    const [showPassword, setShowPassword] = useState(false);

    // Formdaki email ve şifre değerlerini tutan state
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();
    const location = useLocation();
    const [returnUrl, setReturnUrl] = useState("/"); // Login sonrası yönlendirilecek URL (varsayılan ana sayfa)

    // Sayfa yüklendiğinde URL'den returnUrl parametresini alıp state'e set eder
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const returnPath = params.get("returnUrl");
        if (returnPath) {
            setReturnUrl(returnPath);
        }
    }, [location.search]);

    // Şifre göster/gizle butonu
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    // Form input değişikliklerini izleyen fonksiyon
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Form submit edildiğinde çalışacak fonksiyon
    const handleSubmit = (e) => {
        e.preventDefault();

        // Kullanıcıları mock API'den çekiyoruz
        axios.get("https://67c98ac5102d684575c2808b.mockapi.io/users/users") 
            .then(response => {
                const users = response.data;  // API'den gelen kullanıcı listesi
                console.log("Kullanıcılar:", users);

                // Girilen email ve şifre ile eşleşen kullanıcıyı bul
                const foundUser = users.find(user =>
                    user.email.trim().toLowerCase() === formData.email.trim().toLowerCase() &&
                    user.password === formData.password
                );

                if (foundUser) {
                    // Eşleşen kullanıcı bulunduysa localStorage'a kaydedip ilgili sayfaya yönlendir
                    localStorage.setItem("user", JSON.stringify(foundUser));
                    localStorage.setItem("userId", foundUser.id);
                    navigate(returnUrl);
                } else {
                    // Kullanıcı bulunamazsa hata mesajı göster
                    alert("Geçersiz email veya şifre!");
                }
            })
            .catch(error => {
                console.error("Kullanıcı bilgileri alınırken hata oluştu:", error);
                alert("Giriş sırasında bir hata oluştu.");
            });
    };

    return (
        <div 
            className="singup_container d-flex align-items-center justify-content-center vh-100"
            style={{
                backgroundImage: "url('/assets/images/geik_background_logo.svg')",
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}
        >
            <div className="container">
                <div className="row justify-content-center mobile">
                    {/* Başlık alanı */}
                    <h4 className="signup-title pb-5">
                        HESABINA GİRİŞ YAP VE 
                        <span>
                            <img src="/assets/images/geik_logo_blue.svg" alt="Logo" className="signup-logo" />
                            'LE!
                        </span>
                    </h4>

                    {/* Giriş formu */}
                    <form 
                        className="signup-form" 
                        style={{ zIndex: "2", position: "relative" }} 
                        onSubmit={handleSubmit}
                    >
                        {/* Email input */}
                        <input 
                            type="email" 
                            className="form-control transparent-input mb-3" 
                            placeholder="Mail" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />

                        {/* Şifre input (göster/gizle butonuyla) */}
                        <div className="password-container mb-4">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                className="form-control transparent-input" 
                                placeholder="Şifre" 
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {/* Şifre görünürlüğü butonu */}
                            <span className="password-toggle" onClick={togglePasswordVisibility}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>

                        {/* Giriş butonu */}
                        <button type="submit" className="form-btn-primary">
                            Giriş Yap
                        </button>
                    </form>

                    {/* Alt linkler: Kayıt ol ve Şifremi unuttum */}
                    <div className="signup-footer">
                        <Link to="/kayit-ol">Hemen Kayıt Ol</Link>
                        <Link to="/">Şifremi Unuttum</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
