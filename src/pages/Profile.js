import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { IoShareSocialOutline, IoClose } from "react-icons/io5";
import { FaCheck } from 'react-icons/fa';
import { GoPencil } from "react-icons/go";
import { LuMicVocal } from "react-icons/lu";
import { CgCalendarDates } from "react-icons/cg";
import { GrLocation } from "react-icons/gr";
import EventSlider from "../components/EventSlider";
import "../assets/scss/pages/_profile.scss";
import { latestReleases, tickets } from "../data/eventData";

export default function Profile() {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(location.state?.openTab || "upcoming-events");
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [isEditingNickname, setIsEditingNickname] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [user, setUser] = useState(null);
    const [borderColor, setBorderColor] = useState("transparent");

    const [notifications, setNotifications] = useState({
        sms: false,
        email: false,
    });

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setNotifications((prev) => ({ ...prev, [name]: checked }));
    };

    const [nickname, setNickname] = useState("Kullanıcı Adı");
    const [email, setEmail] = useState("dnm123@gmail.com");

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);

            if (parsedUser.isSubscriber && parsedUser.isStudentVerified) {
                setBorderColor("rgba(45, 255, 60, 1)"); 
            } else if (parsedUser.isSubscriber) {
                setBorderColor("rgba(45, 255, 60, 1)"); 
            } else if (parsedUser.isStudentVerified) {
                setBorderColor("rgba(255, 255, 255, 0.8)"); 
            } else {
                setBorderColor("transparent"); 
            }
        }
    }, []);

    return (
        <div className="profile-page">
            <div className="container">
                <div className="profile-header">
                    <div className="profile-info">
                        <div className="profile-photo">
                            <img src="/assets/images/profilePhoto.png" alt="pp" style={{border: `5px solid ${borderColor}`}}/>
                        </div>
                        <div className="profile-details">
                            <h2>İsim Soyisim</h2>
                            <div className="profile-actions">
                                <button className="geik-action-btn">
                                    <IoShareSocialOutline />
                                </button>
                                <button className="geik-action-btn" onClick={() => setActiveTab("settings")}>
                                    <GoPencil />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="detail-profile">
                <div className="container">
                    <div className="tab-buttons">
                        <button className={`geik-button-1 ${activeTab === "upcoming-events" ? "active" : ""}`} onClick={() => setActiveTab("upcoming-events")}>Yaklaşan Etkinliklerim</button>
                        <button className={`geik-button-1 ${activeTab === "past-events" ? "active" : ""}`} onClick={() => setActiveTab("past-events")}>Geçmiş Etkinliklerim</button>
                        <button className={`geik-button-1 ${activeTab === "favorites" ? "active" : ""}`} onClick={() => setActiveTab("favorites")}>Favorilerim</button>
                        <button className={`geik-button-1 ${activeTab === "settings" ? "active" : ""}`} onClick={() => setActiveTab("settings")}>Hesap Ayarları</button>
                        <button className={`geik-button-1 ${activeTab === "payment" ? "active" : ""}`} onClick={() => setActiveTab("payment")}>Ödeme Yöntemi</button>
                        <button className={`geik-button-1 ${activeTab === "notification" ? "active" : ""}`} onClick={() => setActiveTab("notification")}>Bildirimler</button>
                    </div>
                </div>
                <div className="tab-content">
                    {activeTab === "upcoming-events" && (
                        <div className="container">
                            {tickets.map(ticket => (
                                <button className="ticket-card" key={ticket.eventIdid} onClick={() => setSelectedTicket(ticket)}>
                                    <div className="ticket-image-wrapper">
                                        <img src={ticket.image} alt={ticket.name} />
                                    </div>
                                    <div className="ticket-details">
                                        <div className="ticket-info">
                                            <h4 className="ticket-title"><LuMicVocal />{ticket.name}</h4>
                                            <p className="ticket-date"><CgCalendarDates />{ticket.date} <span>{ticket.time}</span></p>
                                            <p className="ticket-location"><GrLocation />{ticket.venue}</p>
                                        </div>
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
                    {activeTab === "past-events" && (
                        <EventSlider sectionTitle="" events={latestReleases} />
                    )}
                    {activeTab === "favorites" && (
                        <EventSlider sectionTitle="" events={latestReleases} />
                    )}
                    {activeTab === "settings" && (
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-7 col-12">
                                    <div className="profile-settings">
                                        <h3 className="settings-title">Hesap Ayarları</h3>
    
                                        <div className="settings-section nickname-settings">
                                            <h4 className="settings-subtitle">Kullanıcı Adı</h4>
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
                                                <button
                                                    className="settings-button"
                                                    onClick={() => setIsEditingNickname(!isEditingNickname)}
                                                >
                                                    {isEditingNickname ? "Kaydet" : "Değiştir"}
                                                </button>
                                            </div>
                                        </div>
                            
                                        <div className="settings-section email-settings">
                                            <h4 className="settings-subtitle">Mail Adresi</h4>
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
                                                <button
                                                    className="settings-button"
                                                    onClick={() => setIsEditingEmail(!isEditingEmail)}
                                                >
                                                    {isEditingEmail ? "Kaydet" : "Değiştir"}
                                                </button>
                                            </div>
                                        </div>
    
                                        <div className="settings-section password-settings">
                                            <h4 className="settings-subtitle">Şifre</h4>
                                            <div className="settings-content">
                                                <div className="password-inputs">
                                                    <input type="password" placeholder="Eski Şifre" className="password-field" />
                                                    <input type="password" placeholder="Yeni Şifre" className="password-field" />
                                                </div>
                                                <button className="settings-button">Şifreni Kaydet</button>
                                            </div>
                                            <p className="password-forgot">Şifreni hatırlamıyor musun? <button className="password-forgot-button">Şifreni sıfırla</button></p>
                                        </div>

                                        <div className="settings-section student-certificate">
                                            <h4 className="settings-subtitle">Öğrenci Belgesi</h4>
                                            <p className="settings-subdesc">İndirimli abonelik ve özel fırsatlar için öğrenci hesabına geç!</p>
                                            <div className="settings-content">
                                                <div className="file-upload-wrapper">
                                                    <label htmlFor="file-upload" className="file-upload-label">
                                                        <span>Dosya Seç</span>
                                                        <img src="/assets/images/uploadicon.svg" alt="Upload Icon" className="upload-icon" />
                                                    </label>
                                                    <input type="file" id="file-upload" className="file-upload-input" />
                                                </div>
                                                <button className="settings-button">Ekle</button>
                                            </div>
                                        </div>

    
                                        <div className="settings-section delete-account">
                                            <h4 className="settings-subtitle">Hesabı Sil</h4>
                                            <div className="settings-content">
                                                <p className="settings-warning">
                                                    Bu işlem geri alınamaz ve tüm verileriniz kalıcı olarak silinir.
                                                </p>
                                                <button className="settings-button danger">Hesabımı Sil</button>
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
                        <button className="qr-popup-close" onClick={() => setSelectedTicket(null)}>
                            <IoClose />
                        </button>
                        <h4>{selectedTicket.name} - QR Kodları</h4>
                
                        <div className="qr-codes-wrapper">
                            {selectedTicket.qrCodes.map((qrTicket, index) => (
                                <img 
                                    key={index} 
                                    src={qrTicket.qrCode} 
                                    alt={`${selectedTicket.name} QR ${index + 1}`} 
                                />
                            ))}
                        </div>
                
                        <p>{selectedTicket.date} - {selectedTicket.venue}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
