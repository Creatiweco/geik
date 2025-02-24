import React, { useState } from "react";
import "../assets/scss/pages/_signupForm.scss";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

export default function SignupForm({ isStudent }) {
    const [step, setStep] = useState(1);
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

    const validateStep1 = () => {
        let errors = [];
        if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.password.trim() || !formData.termsAccepted || !formData.privacyAccepted) errors.push("Tüm Alanları Doldurunuz");

        if (errors.length === 1) {
            alert(errors.join("\n"));
            return false;
        }
        return true;
    };

    const handleNextStep = () => {
        if (validateStep1()) {
            setStep(2);
        }
    };

    return (
        <div 
            className="singup_container d-flex align-items-center justify-content-center vh-100"
            style={{
                backgroundImage:"url('/assets/images/geik_background_logo.svg')",
                backgroundSize:"cover",
                backgroundPosition:"center"
            }}
        >
            <div className="container">
                <div className="row justify-content-center">
                    <div className="p-0">
                        <h2 className="signup-title">HESABINI OLUŞTUR VE <span><img src="/assets/images/geik_logo_blue.svg" alt="Logo" className="signup-logo" />'LE!</span> </h2>
                        {isStudent && (
                            <div className="step-indicator">
                                <span className={step >= 1 ? "active-step" : ""}></span>
                                <span className={step >= 2 ? "active-step" : ""}></span>
                            </div>
                        )}
                        {step === 1 ? (
                            <form style={{zIndex:"2", position:"relative"}} onSubmit={(e) => e.preventDefault()}>
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
                                <div className="form-check mb-2">
                                    <input 
                                        type="checkbox" 
                                        className="form-check-input custom-checkbox" 
                                        id="terms" 
                                        name="termsAccepted"
                                        checked={formData.termsAccepted}
                                        onChange={handleChange}
                                    />
                                    <label className="form-check-label" htmlFor="terms"> 
                                        <span>Hizmet Koşullarını</span> kabul ediyorum. 
                                    </label>
                                </div>
                                <div className="form-check mb-4">
                                    <input 
                                        type="checkbox" 
                                        className="form-check-input custom-checkbox" 
                                        id="privacy" 
                                        name="privacyAccepted"
                                        checked={formData.privacyAccepted}
                                        onChange={handleChange}
                                    />
                                    <label className="form-check-label" htmlFor="privacy">
                                        <span>Aydınlatma Metnini</span> okudum ve onaylıyorum.
                                    </label>
                                </div>
                                {isStudent ? (
                                    <button type="button" className="form-btn-primary" onClick={handleNextStep}>Devam Et</button>
                                ) : (
                                    <button type="submit" className="form-btn-primary">Hesap Oluştur</button>
                                )}
                            </form>
                        ) : (
                            <div style={{zIndex:"2", position:"relative"}}>
                                <h3 className="subtitle">Öğrenci Belgeni Yükle</h3>
                                <p className="description">Lütfen geçerli bir öğrenci belgesi yükle.</p>
                                <div className="file-upload">
                                    <label htmlFor="file-input" className="file-label">
                                        <span>Dosya Seç</span>
                                        <img src="/assets/images/uploadicon.svg" alt="Logo" className="upload-icon" />
                                    </label>
                                    <input type="file" id="file-input" className="file-input" required/>
                                </div>
                                <button type="submit" className="form-btn-primary">Hesap Oluştur</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
