import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoShareSocialOutline, IoClose } from "react-icons/io5";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaCheck } from 'react-icons/fa';
import { GoPencil } from "react-icons/go";
import { LuMicVocal, LuCopy } from "react-icons/lu";
import { CgCalendarDates } from "react-icons/cg";
import { GrLocation } from "react-icons/gr";
import EventSlider from "../components/EventSlider";
import "../assets/scss/pages/_profile.scss";
import { latestReleases, tickets } from "../data/eventData";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";

export default function Profile() {
    const location = useLocation(); 
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState(location.state?.openTab || "upcoming-events");
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [isEditingNickname, setIsEditingNickname] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [user, setUser] = useState(null);
    const [borderColor, setBorderColor] = useState("transparent");
    const [notifications, setNotifications] = useState({ sms: false, email: false });    
    
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [showDeletePopup, setshowDeletePopup] = useState(false);
    
    //2FA
    const [showAuthenticator, setShowAuthenticator] = useState(false);
    const [authStep, setAuthStep] = useState(1);
    const [enteredPassword, setEnteredPassword] = useState("");
    const [generatedSecret, setGeneratedSecret] = useState("eVGNCZ KJjwnq HXn5Kn AdEJV6 FYEKYU"); 
    const [entered2FACode, setEntered2FACode] = useState(["", "", "", "", "", ""]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const correct2FACode = "123456"; 

    // Şifre doğrulama
    const handlePasswordSubmit = async () => {
        if (!user) return;

        if (enteredPassword !== user.password) {
            alert("Şifre yanlış!");
            return;
        }
        setAuthStep(2);
    };

    // 2FA durumunu API'ye gönderme
    const update2FAStatus = async (status) => {
        if (!user) return;
        
        try {
            const response = await axios.put(`https://67c98ac5102d684575c2808b.mockapi.io/users/users/${user.id}`, {
                is2FAEnabled: status
            });
            setIsAuthenticated(status);
            setShowAuthenticator(false);

            if(!status){
                setAuthStep(1);
                setEnteredPassword("");
                setEntered2FACode(["", "", "", "", "", ""])
            }

        } catch (error) {
            console.error("2FA güncellenemedi:", error);
        }
    };

    // 2FA doğrulama kodu girme
    const handle2FACodeChange = (index, value) => {
        if (!/^\d?$/.test(value)) return;
        const newCode = [...entered2FACode];
        newCode[index] = value;
        setEntered2FACode(newCode);

        if (value && index < 5) {
            document.getElementById(`code-${index + 1}`)?.focus();
        }
    };

    // 2FA kod doğrulama
    const handle2FASubmit = () => {
        if (entered2FACode.join("") === correct2FACode) {
            alert("2FA Başarıyla etkinleştirildi!");
            update2FAStatus(true);
        } else {
            alert("Girilen kod yanlış!");
        }
    };

    const setCloseAuthenticator = () => {
        setShowAuthenticator(false);
        setAuthStep(1);
        setEnteredPassword("");
        setEntered2FACode(["", "", "", "", "", ""])
    }

    const setCloseDeletePopup = () => {
        setshowDeletePopup(false);
    }

    // Kullanıcı bilgilerini API'den al.
    const fetchUser = async () => {
        const userId = localStorage.getItem("userId");
        if (userId) {
            try {
                const response = await axios.get(`https://67c98ac5102d684575c2808b.mockapi.io/users/users/${userId}`);
                setUser(response.data);
                setNickname(response.data.name);
                setEmail(response.data.email);
                setIsAuthenticated(response.data.is2FAEnabled);

                // Kullanıcı abonelik ve öğrenci belgesi durumuna göre çerçeve rengi belirle.
                if (response.data.isSubscriber && response.data.isStudentVerified) {
                    setBorderColor("rgba(45, 255, 60, 1)");
                } else if (response.data.isSubscriber) {
                    setBorderColor("rgba(45, 255, 60, 1)");
                } else if (response.data.isStudentVerified) {
                    setBorderColor("rgba(255, 255, 255, 0.8)");
                } else {
                    setBorderColor("transparent");
                }
            } catch (error) {
                console.error("Kullanıcı bilgisi alınamadı:", error);
            }
        }
    };

    // Sayfa açıldığında kullanıcı bilgilerini çek.
    useEffect(() => {
        fetchUser();
    }, []);

    // Kullanıcı bilgilerini güncelle.
    const updateUserInfo = async () => {
        if (!user) return;

        const updatedUser = { ...user, name: nickname, email: email };

        try {
            const response = await axios.put(`https://67c98ac5102d684575c2808b.mockapi.io/users/users/${user.id}`, updatedUser);
            setUser(response.data);
            localStorage.setItem("user", JSON.stringify(response.data));
            fetchUser(); // Bilgileri yenile.
            alert("Bilgileriniz güncellendi.");
        } catch (error) {
            console.error("Bilgiler güncellenemedi:", error);
            alert("Bilgiler güncellenirken hata oluştu.");
        }
    };

    // Kullanıcı adı düzenleme kaydetme fonksiyonu.
    const handleNicknameSave = () => {
        if (isEditingNickname) updateUserInfo();
        setIsEditingNickname(!isEditingNickname);
    };

    // E-posta düzenleme kaydetme fonksiyonu.
    const handleEmailSave = () => {
        if (isEditingEmail) updateUserInfo();
        setIsEditingEmail(!isEditingEmail);
    };

    // Şifre format kontrolü (en az bir harf, bir rakam, bir büyük harf ve bir özel karakter içermeli)
    const isPasswordValid = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        return regex.test(password);
    };

    // Şifreyi güncelle.
    const updatePassword = async () => {
        if (!user) return;
    
        // Eski şifre doğru mu kontrol et
        if (currentPassword !== user.password) {
            alert("Eski şifre yanlış!");
            return;
        }
    
        // Şifre geçerli mi kontrol et
        if (!isPasswordValid(newPassword)) {
            alert("Şifreniz en az 1 büyük harf, 1 küçük harf, 1 rakam ve 1 özel karakter içermelidir.");
            return;
        }
    
        // API'ye şifreyi güncellemek için istek at
        try {
            const response = await axios.put(`https://67c98ac5102d684575c2808b.mockapi.io/users/users/${user.id}`, {
                password: newPassword
            });
    
            setUser(response.data);
            localStorage.setItem("user", JSON.stringify(response.data));
            fetchUser();  // Bilgileri güncelle
            setCurrentPassword("");
            setNewPassword("");
    
            alert("Şifreniz güncellendi.");
        } catch (error) {
            console.error("Şifre güncellenemedi:", error);
            alert("Şifre güncellenirken hata oluştu.");
        }
    };
    

    // Hesabı silme fonksiyonu.
    const deleteUserAccount = async () => {
        if (!user) return;

        try {
            await axios.delete(`https://67c98ac5102d684575c2808b.mockapi.io/users/users/${user.id}`);
            localStorage.removeItem("userId");
            localStorage.removeItem("user");
            setUser(null);
            window.location.href = "/";
        } catch (error) {
            console.error("Hesap silme hatası:", error);
            alert("Hesap silinirken bir hata oluştu.");
        }
    };

    // Bildirim checkbox değişikliklerini yönetir.
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setNotifications((prev) => ({ ...prev, [name]: checked }));
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("userId");
        setUser(null);
        navigate("/");
    };

    return (
        <div className="profile-page">
            {/* Sayfa genel container'ı */}

            <div className="container">
                {/* Profil üst bilgileri */}
                <div className='container detail-info-mobile'>
                    <button className='prev-button' onClick={() => navigate("/")}><FaArrowLeftLong/></button>
                    <div>
                        <button className="geik-action-btn"><IoShareSocialOutline/></button>
                        <button className="geik-action-btn" onClick={() => setActiveTab("settings")}><GoPencil/></button>
                    </div>
                </div>
                <div className="profile-header">
                    <div className="profile-info">
                        {/* Kullanıcı profil fotoğrafı ve çerçeve rengi */}
                        <div className="profile-photo">
                            <img src={user?.avatar || "/assets/images/profilePhoto.png"} alt="pp" style={{ border: `5px solid ${borderColor}` }} />
                        </div>
                        <div className="profile-details">
                            {/* Kullanıcı adı ve profil aksiyon butonları */}
                            <h3>{nickname}</h3>
                            <div className="profile-actions">
                                <button className="geik-action-btn"><IoShareSocialOutline /></button>
                                <button className="geik-action-btn" onClick={() => setActiveTab("settings")}><GoPencil /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sekme alanı */}
            <div className="detail-profile">
                <div className="container">
                    {/* Sekme butonları */}
                    <div className="tab-buttons">
                        <Swiper
                            slidesPerView="auto"
                            spaceBetween={10}
                            freeMode={true}
                            modules={[FreeMode]}
                            className="tab-swiper"
                        >
                            {[
                                { key: "upcoming-events", label: "Yaklaşan Etkinliklerim" },
                                { key: "past-events", label: "Geçmiş Etkinliklerim" },
                                { key: "favorites", label: "Favorilerim" },
                                { key: "settings", label: "Hesap Ayarları" },
                                { key: "payment", label: "Ödeme Yöntemi" },
                                { key: "notification", label: "Bildirimler" }
                            ].map(tab => (
                                <SwiperSlide key={tab.key} className="tab-slide">
                                    <button
                                        key={tab.key}
                                        className={`geik-button-1 ${activeTab === tab.key ? "active" : ""}`}
                                        onClick={() => setActiveTab(tab.key)}
                                    >
                                        {tab.label}
                                    </button>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>

                {/* Sekme içerik alanı */}
                <div className="tab-content">

                    {/* Yaklaşan etkinlikler sekmesi */}
                    {activeTab === "upcoming-events" && (
                        <div className="container">
                            {tickets.map(ticket => (
                                <button className="ticket-card" key={ticket.eventIdid} onClick={() => setSelectedTicket(ticket)}>
                                    <div className="ticket-image-wrapper">
                                        <img src={ticket.image} alt={ticket.name} />
                                    </div>
                                    <div className="ticket-details">
                                        <div className="ticket-info">
                                            <h4><LuMicVocal />{ticket.name}</h4>
                                            <p className="ticket-date"><CgCalendarDates />{ticket.date} <span>{ticket.time}</span></p>
                                            <p className="ticket-location"><GrLocation />{ticket.venue}</p>
                                        </div>
                                        {/* QR kod gösterim alanı */}
                                        <div className="ticket-qr">
                                            {ticket.qrCodes.map((qrTicket, index) => (
                                                <img key={index} src={qrTicket.qrCode} alt={`${ticket.name} QR`} />
                                            ))}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Geçmiş etkinlikler sekmesi */}
                    {activeTab === "past-events" && <EventSlider sectionTitle="" events={latestReleases} />}

                    {/* Favorilerim sekmesi */}
                    {activeTab === "favorites" && <EventSlider sectionTitle="" events={latestReleases} />}

                    {/* Hesap ayarları sekmesi */}
                    {activeTab === "settings" && (
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-7 col-12">
                                    <div className="profile-settings">
                                        <h4 className="settings-title">Hesap Ayarları</h4>
                    
                                        <div className="settings-section nickname-settings">
                                            <h5 className="settings-subtitle">Kullanıcı Adı</h5>
                                            <div className="settings-content">
                                                {isEditingNickname ? (
                                                    <input
                                                        type="text"
                                                        value={nickname}
                                                        onChange={(e) => setNickname(e.target.value)}
                                                        className="nickname-field"
                                                    />
                                                ) : (
                                                    <p className="settings-text">{nickname}</p>
                                                )}
                                                <div className="mobile-button-width">
                                                    <button
                                                        className="settings-button"
                                                        onClick={handleNicknameSave}
                                                    >
                                                        {isEditingNickname ? "Kaydet" : "Değiştir"}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                            
                                        <div className="settings-section email-settings">
                                            <h5 className="settings-subtitle">Mail Adresi</h5>
                                            <div className="settings-content">
                                                {isEditingEmail ? (
                                                    <input
                                                        type="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        className="mail-field"
                                                    />
                                                ) : (
                                                    <p className="settings-text">{email}</p>
                                                )}
                                                <div className="mobile-button-width">
                                                    <button
                                                        className="settings-button"
                                                        onClick={handleEmailSave}
                                                    >
                                                        {isEditingEmail ? "Kaydet" : "Değiştir"}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                    
                                        <div className="settings-section password-settings">
                                            <h5 className="settings-subtitle">Şifre</h5>
                                            <div className="settings-content">
                                                <div className="password-inputs">
                                                    <input
                                                        type="password"
                                                        placeholder="Eski Şifre"
                                                        className="password-field"
                                                        value={currentPassword}
                                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                                    />
                                                    <input
                                                        type="password"
                                                        placeholder="Yeni Şifre"
                                                        className="password-field"
                                                        value={newPassword}
                                                        onChange={(e) => setNewPassword(e.target.value)}
                                                    />
                                                </div>
                                                <div className="mobile-button-width">
                                                    <button className="settings-button" onClick={updatePassword}>Şifreni Kaydet</button>
                                                </div>
                                            </div>
                                            <p className="password-forgot">Şifreni hatırlamıyor musun? <button className="password-forgot-button">Şifreni sıfırla</button></p>
                                        </div>
                    
                                        <div className="settings-section student-certificate">
                                            <h5 className="settings-subtitle">Öğrenci Belgesi</h5>
                                            <p className="settings-subdesc">İndirimli abonelik ve özel fırsatlar için öğrenci hesabına geç!</p>
                                            <div className="settings-content">
                                                <div className="file-upload-wrapper">
                                                    <label htmlFor="file-upload" className="file-upload-label">
                                                        <span>Dosya Seç</span>
                                                        <img src="/assets/images/uploadicon.svg" alt="Upload Icon" className="upload-icon" />
                                                    </label>
                                                    <input type="file" id="file-upload" className="file-upload-input" />
                                                </div>
                                                <div className="mobile-button-width">
                                                    <button className="settings-button">Ekle</button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="settings-section delete-account">
                                            <h5 className="settings-subtitle">Hesap doğrulama {isAuthenticated ? "(Etkin)" : ""}</h5>
                                            <div className="settings-content">
                                                <p className="settings-warning">
                                                    İki faktörlü kimlik doğrulama 
                                                </p>
                                                <div className="mobile-button-width">
                                                    <button
                                                        className={`settings-button ${isAuthenticated ? "danger" : ""}`}
                                                        onClick={() => isAuthenticated ? update2FAStatus(false) : setShowAuthenticator(true)}
                                                    >
                                                        {isAuthenticated ? "Kaldır" : "Etkinleştir"}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="settings-section delete-account">
                                            <h5 className="settings-subtitle">Çıkış Yap</h5>
                                            <div className="settings-content">
                                                <p className="settings-warning">
                                                Hesabından çıkış yap.
                                                </p>
                                                <div className="mobile-button-width">
                                                    <button onClick={handleLogout} className="settings-button danger">Çıkış Yap</button>
                                                </div>
                                            </div>
                                        </div>
                    
                    
                                        <div className="settings-section delete-account">
                                            <h5 className="settings-subtitle">Hesabı Sil</h5>
                                            <div className="settings-content">
                                                <p className="settings-warning">
                                                    Bu işlem geri alınamaz ve tüm verileriniz kalıcı olarak silinir.
                                                </p>
                                                <div className="mobile-button-width">
                                                    <button onClick={() => setshowDeletePopup(true)} className="settings-button danger">Hesabımı Sil</button>
                                                </div>      
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "payment" && (
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-4 payment-section">
                                    <h4 className="payment-title">Ödeme Yöntemi</h4>
                                    <div className="payment-summary">
                                        <p className="payment-summary-label">Toplam abonelik tutarı</p>
                                        <p className="payment-summary-amount">xxx ₺</p>
                                    </div>
                        
                                    <form className="payment-form">
                                        <input type="text" placeholder="Kart Üzerindeki Ad" className="payment-input" />
                                        <input type="text" placeholder="Kart Numarası" className="payment-input" />
                                        <div className="payment-row">
                                            <input type="text" placeholder="AA/YY" className="payment-input" />
                                            <input type="text" placeholder="CCV" className="payment-input" />
                                        </div>
                                        <button className="payment-button">Abone Ol</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* Bildirimler sekmesi */}
                    {activeTab === "notification" && (
                        <div className="container notifications-section">
                            <div className="row">
                                <div className="col-lg-10">
                                    
                                    <h4>Bildirimler</h4>
                                    <p>Bildirim tercihlerinizi buradan yönetebilirsiniz. Önemli etkinlik hatırlatmalarını, bilet onaylarını ve özel fırsatları kaçırmamak için e-posta ve SMS bildirimlerini açık tutmanızı öneririz. Bildirimlerinizi dilediğiniz zaman değiştirebilirsiniz.</p>
                        
                                    <div className="form-check-wrapper mb-4">
                                        <input
                                            type="checkbox"
                                            className="custom-checkbox"
                                            id="smsNotifications"
                                            name="sms"
                                            checked={notifications.sms}
                                            onChange={handleCheckboxChange}
                                        />
                                        <label className="form-check-label" htmlFor="smsNotifications">
                                            <span className="checkbox-icon">{notifications.sms && <FaCheck />}</span>
                                            Sms Bildirimleri
                                        </label>
                                    </div>
                        
                                    <div className="form-check-wrapper mb-4">
                                        <input
                                            type="checkbox"
                                            className="custom-checkbox"
                                            id="emailNotifications"
                                            name="email"
                                            checked={notifications.email}
                                            onChange={handleCheckboxChange}
                                        />
                                        <label className="form-check-label" htmlFor="emailNotifications">
                                            <span className="checkbox-icon">{notifications.email && <FaCheck />}</span>
                                            E-Posta Bildirimleri
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {selectedTicket && (
                <div className="qr-popup">
                    <div className="qr-popup-content">
                        <button onClick={() => setSelectedTicket(null)}><IoClose /></button>
                        <h4>{selectedTicket.name} - QR Kodları</h4>
                        <p>{selectedTicket.date} - {selectedTicket.venue}</p>
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={0}
                            pagination={{ clickable: true }}
                            modules={[Pagination]}
                            className="qr-swiper"
                        >
                            {selectedTicket.qrCodes.map((qr, i) => (
                                <SwiperSlide key={i} className="qr-slide">
                                    <div className="qr-wrapper">
                                        <span className="qr-label">Katılımcı {i + 1}</span>
                                        <img src={qr.qrCode} alt={`QR ${i}`} className="qr-image" />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            )}

            {showAuthenticator && (
                <div className="auth-popup">
                    <div className="auth-popup-content">
                        <button className="close-btn" onClick={setCloseAuthenticator}>
                            <IoClose />
                        </button>

                        {/* Adım 1: Kullanıcı şifresi girme */}
                        {authStep === 1 && (
                            <div className="auth-step pt-5 pb-5 auth-content">
                                <h3>İki aşamalı kimlik doğrulama etkinleştirme</h3>
                                <div>
                                    <input
                                        type="password"
                                        placeholder="Şifrenizi girin"
                                        value={enteredPassword}
                                        onChange={(e) => setEnteredPassword(e.target.value)}
                                    />
                                    <button className="auth-button" onClick={handlePasswordSubmit}>Devam Et</button>
                                </div>
                                <div></div>
                            </div>
                        )}

                        {/* Adım 2: QR ve Kopyalanabilir Kod */}
                        {authStep === 2 && (
                            <div className="auth-step">
                                <div className="auth-content">
                                    <h3 className="step-2-title">İki aşamalı kimlik doğrulama etkinleştirme</h3>
                                    <img src="/assets/images/qrkod.png" alt="eventqr" />
                                    <p className="mt-3 mb-4">Authenticator uygulamasından telefonunuz ile <br/> qr kodu okutunuz.</p>
                                    <p>ya da aşağıdaki kodu giriniz</p>
                                    <div className="copy-container">
                                        <span>{generatedSecret}</span>
                                        <button onClick={() => navigator.clipboard.writeText(generatedSecret)}>
                                            <LuCopy />
                                        </button>
                                    </div>
                                </div>
                                <button className="auth-button" onClick={() => setAuthStep(3)}>Devam Et</button>
                            </div>
                        )}

                        {/* Adım 3: Kullanıcıdan 6 haneli kod isteme */}
                        {authStep === 3 && (
                            <div className="auth-step-last">
                                <div className="auth-content">
                                    <h3 className="pb-4">İki aşamalı kimlik doğrulama etkinleştirme</h3>
                                    <p>Authenticator uygulamasındaki 6 haneli kodu giriniz.</p>
                                </div>
                                <div>
                                    <div className="code-inputs">
                                        {entered2FACode.map((digit, index) => (
                                            <input
                                                key={index}
                                                id={`code-${index}`}
                                                type="text"
                                                maxLength="1"
                                                value={digit}
                                                onChange={(e) => handle2FACodeChange(index, e.target.value)}
                                            />
                                        ))}
                                    </div>
                                    <button className="auth-button danger" onClick={handle2FASubmit}>Doğrula</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {showDeletePopup && (
                <div className="auth-popup">
                    <div className="auth-popup-content">
                        <button className="close-btn" onClick={setCloseDeletePopup}>
                            <IoClose />
                        </button>

                        <div className="delete-popup">
                            <div className="popup-text">
                                <h5>Hesabını silmek üzeresin!</h5>
                                <p>Geik hesabını kalıcı olarak silmek üzeresin.<br/>Hesabını silmek istediğine emin misin?</p>
                            </div>
                            <div className="popup-buttons">
                                <button className="geik-button-1 danger" onClick={setCloseDeletePopup}>İptal et</button>
                                <button className="geik-button-1 delete-button" onClick={deleteUserAccount}>Hesabımı sil</button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            )}

        </div>
    );
}