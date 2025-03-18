import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/scss/pages/_signupForm.scss";

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    
    const [email, setEmail] = useState("");
    const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""]);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const [realCode, setRealCode] = useState(null);
    const [loading, setLoading] = useState(false);
    
    // 📌 E-posta doğrulama
    const handleEmailSubmit = async () => {
        setLoading(true);
        try {
            const response = await axios.get("https://67c98ac5102d684575c2808b.mockapi.io/users/users");
            const user = response.data.find(u => u.email === email);
            
            if (user) {
                const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
                setRealCode(generatedCode);
                setStep(2);
                alert(`Doğrulama kodu: ${generatedCode}`); // Mock API olduğu için kullanıcıya gösteriyoruz
            } else {
                alert("Bu e-posta adresiyle kayıtlı bir hesap bulunamadı.");
            }
        } catch (error) {
            console.error("E-posta doğrulama hatası:", error);
            alert("E-posta doğrulama sırasında bir hata oluştu.");
        }
        setLoading(false);
    };

    // 📌 Doğrulama kodu kontrolü
    const handleCodeSubmit = () => {
        if (verificationCode.join("") === realCode) {
            setStep(3);
        } else {
            alert("Girilen doğrulama kodu hatalı!");
        }
    };

    // 📌 Şifre format kontrolü
    const isPasswordValid = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        return regex.test(password);
    };

    // 📌 Yeni şifre belirleme
    const handlePasswordSubmit = async () => {
        if (newPassword !== confirmPassword) {
            alert("Şifreler uyuşmuyor!");
            return;
        }

        if (!isPasswordValid(newPassword)) {
            alert("Şifreniz en az 1 büyük harf, 1 küçük harf, 1 rakam ve 1 özel karakter içermelidir.");
            return;
        }

        try {
            const response = await axios.get("https://67c98ac5102d684575c2808b.mockapi.io/users/users");
            const user = response.data.find(u => u.email === email);

            if (user) {
                await axios.put(`https://67c98ac5102d684575c2808b.mockapi.io/users/users/${user.id}`, {
                    password: newPassword
                });
                setStep(4);
            }
        } catch (error) {
            console.error("Şifre sıfırlama hatası:", error);
            alert("Şifre sıfırlama sırasında bir hata oluştu.");
        }
    };

    // 📌 6 haneli kod girişini yönetir
    const handleCodeChange = (index, value) => {
        if (!/\d?/.test(value)) return;
        const newCode = [...verificationCode];
        newCode[index] = value;
        setVerificationCode(newCode);

        if (value && index < 5) {
            document.getElementById(`code-${index + 1}`)?.focus();
        }
    };

    return (
        <div className="singup_container d-flex align-items-center justify-content-center vh-100">
            <div className="container">
                <div className="row justify-content-center mobile">
                    <h4 className="signup-title pb-5">
                        <span>
                            <img src="/assets/images/geik_logo_blue.svg" alt="Logo" className="forgotpassword-logo" />
                        </span>
                    </h4>

                    <div className="forgot-password-box">
                        {/* 📌 ADIM 1: E-posta Girişi */}
                        {step === 1 && (
                            <div>
                                <p className="forgot-step1-title">ŞİFRE SIFIRLA</p>
                                <input 
                                    type="email"
                                    className="transparent-input" 
                                    placeholder="E-posta adresiniz" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <button className="form-btn-primary" onClick={handleEmailSubmit} disabled={loading}>
                                    {loading ? "Gönderiliyor..." : "Sıfırlama Kodu Gönder"}
                                </button>
                            </div>
                        )}

                        {/* 📌 ADIM 2: 6 Haneli Doğrulama Kodu */}
                        {step === 2 && (
                            <div className="forgot-step2">
                                <h3>KODU GİR</h3>
                                <p>Mail adresinize gelen 6 haneli doğrulama kodunu giriniz.</p>
                                <div className="code-inputs">
                                    {verificationCode.map((digit, index) => (
                                        <input
                                            key={index}
                                            id={`code-${index}`}
                                            type="text"
                                            maxLength="1"
                                            value={digit}
                                            onChange={(e) => handleCodeChange(index, e.target.value)}
                                        />
                                    ))}
                                </div>
                                <button className="form-btn-primary" onClick={handleCodeSubmit}>Devam Et</button>
                            </div>
                        )}

                        {/* 📌 ADIM 3: Yeni Şifre Belirleme */}
                        {step === 3 && (
                            <div className="forgot-step3">
                                <h3>ŞİFRENİ SIFIRLA</h3>
                                <p>Yeni şifreni oluşturabilirsin</p>
                                <input type="password" className="transparent-input" placeholder="Yeni şifre" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                                <input type="password" className="transparent-input mb-5" placeholder="Şifreyi tekrar gir" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                <button className="form-btn-primary" onClick={handlePasswordSubmit}>Şifreyi Kaydet</button>
                            </div>
                        )}

                        {/* 📌 ADIM 4: Şifre Başarıyla Değiştirildi */}
                        {step === 4 && (
                            <div className="success-step">
                                <h3>TEBRİKLER!</h3>
                                <p>Şifreni başarılı bir şekilde değiştirdin.</p>
                                <button className="form-btn-primary mb-2" onClick={() => navigate("/giris-secenekleri")}>Giriş Yap</button>
                                <button className="form-btn-primary" onClick={() => navigate("/")}>Anasayfaya devam et</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
