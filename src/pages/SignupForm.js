import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaCheck } from "react-icons/fa";  // FaCheck eklendi
import "../assets/scss/pages/_signupForm.scss";
import "bootstrap/dist/css/bootstrap.min.css";

export default function SignupForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        termsAccepted: false,
        privacyAccepted: false,
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const validateForm = () => {
        const requiredFields = [
            "firstName",
            "lastName",
            "email",
            "phone",
            "password",
        ];

        const emptyFields = requiredFields.filter(field => !formData[field].trim());

        if (emptyFields.length > 0 || !formData.termsAccepted || !formData.privacyAccepted) {
            alert("Lütfen tüm alanları eksiksiz doldurun ve gerekli onayları verin.");
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Kayıt başarılı:", formData);
            alert("Kayıt başarılı!");
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
                <div className="row justify-content-center">
                    <div className="p-0">
                        <h2 className="signup-title">
                            HESABINI OLUŞTUR VE 
                            <span><img src="/assets/images/geik_logo_blue.svg" alt="Logo" className="signup-logo" />'LE!</span>
                        </h2>

                        <form style={{ zIndex: "2", position: "relative" }} onSubmit={handleSubmit}>
                            <h2 className="signup-desc">KİŞİSEL BİLGİLER</h2>
                            <div className="row mb-3">
                                <div className="col">
                                    <input
                                        type="text"
                                        className="form-control transparent-input"
                                        placeholder="Ad"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col">
                                    <input
                                        type="text"
                                        className="form-control transparent-input"
                                        placeholder="Soyad"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
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

                            {/* Terms Checkbox */}
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

                            {/* Privacy Checkbox */}
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
