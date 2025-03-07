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
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    // Input ve checkbox değişikliklerini izleyen fonksiyon
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        if(name === "phone") {
            const formattedPhone = formatPhoneNumber(value);
            setFormData({...formData, [name]: formattedPhone});
        } else {
            setFormData({
                ...formData,
                [name]: type === "checkbox" ? checked : value,
            });
        }
    };

    const formatPhoneNumber = (value) => {
        let numbers = value.replace(/[^\d]/g, "");
        if(numbers.startWith("90")) {
            numbers = numbers.slice(2);
        }
        numbers = numbers.slice(0, 10);
        let formatted = "+90"

        if (numbers.length > 0) formatted += ` (${numbers.slice(0, 3)}`;
        if (numbers.length >= 4) formatted += `) ${numbers.slice(3, 6)}`;
        if (numbers.length >= 7) formatted += ` ${numbers.slice(6, 8)}`;
        if (numbers.length >= 9) formatted += ` ${numbers.slice(8, 10)}`;

        return formatted;
    };

    const isPasswordValid = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        return regex.test(password);
    };

    // Formdaki tüm alanların dolu olup olmadığını ve checkbox'ların işaretlenip işaretlenmediğini kontrol eden fonksiyon
    const validateForm = () => {
        const requiredFields = ["firstName", "lastName", "email", "phone", "password", "confirmPassword"];
        const emptyFields = requiredFields.filter(field => !formData[field].trim());

        if(emptyFields.length > 0) {
            alert("lütfen Tüm Alanları Eksiksiz Doldurun")
            return false;
        }

        if(formData.password !== formData.comfirmPassword) {
            alert("Şifreler Eşleşmiyor")
            return false;
        }

        if(!isPasswordValid(formData.password)) {
            alert("Şifreniz en az 1 büyük harf, 1 küçük harf, 1 rakam ve 1 özel karakter içermelidir.")
            return false;
        }

        if (!formData.termsAccepted || !formData.privacyAccepted) {
            alert("Lütfen gerekli onay kutularını işaretleyin.");
            return false;
        }

        return true;
    };

    // Form submit olduğunda çalışır
    const handleSubmit = (e) => {
        e.preventDefault();

        if(!validateForm()) return;

        axios.get("https://67c98ac5102d684575c2808b.mockapi.io/users/users")
        .then(response => {
            const existingUser = response.data.find(user => user.email.toLowerCase() === formData.email.toLowerCase())
            
            if (existingUser) {
                alert("Bu e-posta adresiyle zaten bir hesap var");
                return
            }

            const userData = {
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
            };

            axios.post("https://67c98ac5102d684575c2808b.mockapi.io/users/users", userData)
            .then(() => {
                alert("Kayıt başarılı!")
                navigate("/")
            })
            .catch(error => {
                console.error("Mail kontrolü sırasında hata oluştu:", error);
                alert("Kayıt sırasında bir hata oluştu.");
            });
        })
        .catch(error => {
            console.error("Mail kontrolü sırasında hata oluştu:", error);
            alert("Mail kontrolü sırasında bir hata oluştu")
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

                            {/* Şifre alanı - göster/gizle butonuyla */}
                            <div className="password-container mb-4">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control transparent-input"
                                    placeholder="Şifre Tekrar"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <span className="password-toggle" onClick={togglePasswordVisibility}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>

                            import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaCheck } from "react-icons/fa";
import axios from "axios";
import "../assets/scss/pages/_signupForm.scss";
import "bootstrap/dist/css/bootstrap.min.css";

export default function SignupForm() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        termsAccepted: false,
        privacyAccepted: false,
    });

    // Şifre göster/gizle toggle
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    // Tüm input değişikliklerini dinleyen handler
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        // Telefon için otomatik formatlama
        if (name === "phone") {
            const formattedPhone = formatPhoneNumber(value);
            setFormData({ ...formData, [name]: formattedPhone });
        } else {
            setFormData({
                ...formData,
                [name]: type === "checkbox" ? checked : value,
            });
        }
    };

    // Telefonu otomatik +90 (XXX) XXX XXXX formatına çeviren fonksiyon
    const formatPhoneNumber = (value) => {
        let numbers = value.replace(/[^\d]/g, "");
        if (numbers.startsWith("90")) {
            numbers = numbers.slice(2);
        }
        numbers = numbers.slice(0, 10);
        let formatted = "+90";

        if (numbers.length > 0) formatted += ` (${numbers.slice(0, 3)}`;
        if (numbers.length >= 4) formatted += `) ${numbers.slice(3, 6)}`;
        if (numbers.length >= 7) formatted += ` ${numbers.slice(6, 8)}`;
        if (numbers.length >= 9) formatted += ` ${numbers.slice(8, 10)}`;

        return formatted;
    };

    // Şifre format kontrolü (en az bir harf, bir rakam, bir büyük harf ve bir özel karakter)
    const isPasswordValid = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        return regex.test(password);
    };

    // Form doğrulama
    const validateForm = () => {
        const requiredFields = ["firstName", "lastName", "email", "phone", "password", "confirmPassword"];
        const emptyFields = requiredFields.filter(field => !formData[field].trim());

        if (emptyFields.length > 0) {
            alert("Lütfen tüm alanları eksiksiz doldurun.");
            return false;
        }

        if (formData.password !== formData.confirmPassword) {
            alert("Şifreler eşleşmiyor.");
            return false;
        }

        if (!isPasswordValid(formData.password)) {
            alert("Şifreniz en az 1 büyük harf, 1 küçük harf, 1 rakam ve 1 özel karakter içermelidir.");
            return false;
        }

        if (!formData.termsAccepted || !formData.privacyAccepted) {
            alert("Lütfen gerekli onay kutularını işaretleyin.");
            return false;
        }

        return true;
    };

    // Form gönderme
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        // Mail kontrolü - aynı email varsa uyarı ver
        axios.get("https://67c98ac5102d684575c2808b.mockapi.io/users/users")
            .then(response => {
                const existingUser = response.data.find(user => user.email.toLowerCase() === formData.email.toLowerCase());

                if (existingUser) {
                    alert("Bu e-posta adresiyle zaten bir hesap var.");
                    return;
                }

                // Yeni kullanıcı kaydetme
                const userData = {
                    name: `${formData.firstName} ${formData.lastName}`,
                    email: formData.email,
                    phone: formData.phone,
                    password: formData.password,
                };

                axios.post("https://67c98ac5102d684575c2808b.mockapi.io/users/users", userData)
                    .then(() => {
                        alert("Kayıt başarılı!");
                        navigate("/");
                    })
                    .catch(error => {
                        console.error("Kayıt başarısız:", error);
                        alert("Kayıt sırasında bir hata oluştu.");
                    });
            })
            .catch(error => {
                console.error("Mail kontrolü sırasında hata oluştu:", error);
                alert("Mail kontrolü sırasında bir hata oluştu.");
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
                    <div className="p-0">
                        <h4 className="signup-title">
                            HESABINI OLUŞTUR VE 
                            <span><img src="/assets/images/geik_logo_blue.svg" alt="Logo" className="signup-logo" />'LE!</span>
                        </h4>

                        <form style={{ zIndex: "2", position: "relative" }} onSubmit={handleSubmit}>
                            <h5 className="signup-desc">KİŞİSEL BİLGİLER</h5>
                            <div className="row">
                                <div className="col-lg-6 col-12">
                                    <input type="text" placeholder="Ad" name="firstName" className="form-control transparent-input mb-3" value={formData.firstName} onChange={handleChange} />
                                </div>
                                <div className="col-lg-6 col-12">
                                    <input type="text" placeholder="Soyad" name="lastName" className="form-control transparent-input mb-3" value={formData.lastName} onChange={handleChange} />
                                </div>
                            </div>
                            <input type="email" placeholder="Mail" name="email" className="form-control transparent-input mb-3" value={formData.email} onChange={handleChange} />
                            <input type="text" placeholder="Telefon" name="phone" className="form-control transparent-input mb-3" value={formData.phone} onChange={handleChange} />

                            <div className="password-container mb-4">
                                <input type={showPassword ? "text" : "password"} placeholder="Şifre" name="password" className="form-control transparent-input" value={formData.password} onChange={handleChange} />
                                <span className="password-toggle" onClick={togglePasswordVisibility}>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                            </div>

                            <div className="password-container mb-4">
                                <input type={showPassword ? "text" : "password"} placeholder="Şifre Tekrar" name="confirmPassword" className="form-control transparent-input" value={formData.confirmPassword} onChange={handleChange} />
                                <span className="password-toggle" onClick={togglePasswordVisibility}>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
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

                            <button type="submit" className="form-btn-primary">Hesap Oluştur</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}


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
