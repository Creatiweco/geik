import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaCheck } from "react-icons/fa";
import axios from "axios";
import "../assets/scss/pages/_signupForm.scss";
import "bootstrap/dist/css/bootstrap.min.css";

export default function SignupForm() {
    const navigate = useNavigate();

    // Şifre göster/gizle durumunu kontrol eden state
    const [showPassword, setShowPassword] = useState(false);

    // Formdaki tüm alanların değerlerini tutan state
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        termsAccepted: false,
        privacyAccepted: false,
    });

    // Şifre göster/gizle butonu
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Input ve checkbox değişikliklerini izleyen fonksiyon
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    // Formdaki tüm alanların dolu olup olmadığını ve checkbox'ların işaretlenip işaretlenmediğini kontrol eden fonksiyon
    const validateForm = () => {
        const requiredFields = ["firstName", "lastName", "email", "phone", "password"];
        const emptyFields = requiredFields.filter(field => !formData[field].trim());

        if (emptyFields.length > 0 || !formData.termsAccepted || !formData.privacyAccepted) {
            alert("Lütfen tüm alanları eksiksiz doldurun ve gerekli onayları verin.");
            return false;
        }
        return true;
    };

    // Form submit olduğunda çalışır
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const userData = {
                name: `${formData.firstName} ${formData.lastName}`,  // Ad ve soyadı birleştirip gönderiyoruz
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
            };

            // Kullanıcıyı mock API'ye kaydetme
            axios.post("https://67c98ac5102d684575c2808b.mockapi.io/users/users", userData)
                .then(response => {
                    console.log("Kayıt başarılı", response.data);
                    navigate("/");  // Başarılı kayıt sonrası ana sayfaya yönlendir
                })
                .catch(error => {
                    console.log("Kayıt başarısız", error);
                });
        }
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
                    <div className="p-0">
                        {/* Başlık alanı */}
                        <h4 className="signup-title">
                            HESABINI OLUŞTUR VE 
                            <span>
                                <img src="/assets/images/geik_logo_blue.svg" alt="Logo" className="signup-logo" />'LE!
                            </span>
                        </h4>

                        {/* Kayıt formu */}
                        <form style={{ zIndex: "2", position: "relative" }} onSubmit={handleSubmit}>
                            <h5 className="signup-desc">KİŞİSEL BİLGİLER</h5>

                            {/* Ad ve Soyad alanları */}
                            <div className="row">
                                <div className="col-lg-6 col-12">
                                    <input
                                        type="text"
                                        className="form-control transparent-input mb-3"
                                        placeholder="Ad"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-lg-6 col-12">
                                    <input
                                        type="text"
                                        className="form-control transparent-input mb-3"
                                        placeholder="Soyad"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            {/* Mail ve Telefon alanları */}
                            <input
                                type="email"
                                className="form-control transparent-input mb-3"
                                placeholder="Mail"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <input
                                type="tel"
                                className="form-control transparent-input mb-3"
                                placeholder="Telefon 0(546) 276 05 68"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />

                            {/* Şifre alanı - göster/gizle butonuyla */}
                            <div className="password-container mb-4">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control transparent-input"
                                    placeholder="Şifre"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <span className="password-toggle" onClick={togglePasswordVisibility}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>

                            {/* Hizmet Koşulları onay kutusu */}
                            <div className="form-check-wrapper mb-2">
                                <input
                                    type="checkbox"
                                    className="custom-checkbox"
                                    id="terms"
                                    name="termsAccepted"
                                    checked={formData.termsAccepted}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="terms">
                                    <span className="checkbox-icon">{formData.termsAccepted && <FaCheck />}</span>
                                    <Link to="/hizmet-kosullari">Hizmet Koşullarını</Link> kabul ediyorum.
                                </label>
                            </div>

                            {/* Aydınlatma Metni onay kutusu */}
                            <div className="form-check-wrapper mb-4">
                                <input
                                    type="checkbox"
                                    className="custom-checkbox"
                                    id="privacy"
                                    name="privacyAccepted"
                                    checked={formData.privacyAccepted}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="privacy">
                                    <span className="checkbox-icon">{formData.privacyAccepted && <FaCheck />}</span>
                                    <Link to="/aydinlatma-metni">Aydınlatma Metnini</Link> okudum ve onaylıyorum.
                                </label>
                            </div>

                            {/* Hesap oluşturma butonu */}
                            <button type="submit" className="form-btn-primary">
                                Hesap Oluştur
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
