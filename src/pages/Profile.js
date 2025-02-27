import React, { useState }  from "react";
import { useLocation } from "react-router-dom";
import { IoShareSocialOutline, IoSettingsOutline, IoClose } from "react-icons/io5";
import { GoPencil } from "react-icons/go";
import { LuMicVocal } from "react-icons/lu";
import { CgCalendarDates } from "react-icons/cg";
import { GrLocation } from "react-icons/gr";
import EventSlider from "../components/EventSlider";
import "../assets/scss/pages/_profile.scss";

export default function Profile() {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(location.state?.openTab || "upcoming-events");
    const [selectedTicket, setSelectedTicket] = useState(null);

    const latestReleases = [
        { 
          id: 1, 
          image: "/assets/images/event5.png", 
          day: "12",
          month: "Şubat", 
          name: "Dolu kadehi ters tut", 
          venue: "Hangout Performance Hall",
        link: "/detay"
        },
        { 
          id: 2, 
          image: "/assets/images/event4.png", 
          day: "17",
          month: "Şubat", 
          name: "Emircan İğrek", 
          venue: "Bostancı Gösteri Merkezi",
        link: "/detay"
        },
        { 
          id: 3, 
          image: "/assets/images/event3.png", 
          day: "8",
          month: "Mart", 
          name: "Can Ozan", 
          venue: "Hayal Kahvesi",
        link: "/detay"
        },
        { 
          id: 4, 
          image: "/assets/images/event2.png", 
          day: "24",
          month: "Mart", 
          name: "Aleyna Tilki", 
          venue: "Hangout Performance Hall",
        link: "/detay"
        },
        { 
          id: 5, 
          image: "/assets/images/event1.png", 
          day: "30",
          month: "Mart", 
          name: "Madrigal", 
          venue: "Hangout Performance Hall",
        link: "/detay"
        }
    ];

    const tickets = [
        { 
          id: 1, 
          image: "/assets/images/event3.png", 
          name: "Can Ozan", 
          date: "1 Şubat Cuma", 
          time: "22.00",
          venue: "Hayal Kahvesi",
          qrCode: "/assets/images/qrkod.png"
        },
        { 
          id: 2, 
          image: "/assets/images/event5.png", 
          name: "Dolu Kadehi Ters Tut", 
          date: "12 Şubat Pazartesi", 
          time: "20.00", 
          venue: "Bostancı Gösteri Merkezi",
          qrCode: "/assets/images/qrkod.png"
        }
    ];

    return(
        <div className="profile-page">
            <div className="container">
                <div className="profile-header">
                    <div className="profile-info">
                        <div className="profile-photo">
                            <img src="/assets/images/profilePhoto.png" alt="pp" />
                            <button className="geik-action-btn"><GoPencil /></button>
                        </div>
                        <div className="profile-details">
                            <h2>İsim Soyisim</h2>
                            <div className="profile-actions">
                                <button className="geik-action-btn">
                                  <IoShareSocialOutline />
                                </button>
                                <button className="geik-action-btn" onClick={() => setActiveTab("settings")}>
                                  <IoSettingsOutline />
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
                    </div>
                </div>
                <div className="tab-content">
                    {activeTab === "upcoming-events" && (
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6">
                                    {tickets.map(ticket => (
                                        <button className="ticket-card" key={ticket.id}  onClick={() => setSelectedTicket(ticket)}>
                                            <div className="ticket-image-wrapper">
                                                <img src={ticket.image} alt={ticket.name}/>
                                            </div>
                                            <div className="ticket-details">
                                                <div className="ticket-info">
                                                    <h4 className="ticket-title"><LuMicVocal/>{ticket.name}</h4>
                                                    <p className="ticket-date"><CgCalendarDates/>{ticket.date} <span>{ticket.time}</span></p>
                                                    <p className="ticket-location"><GrLocation/>{ticket.venue}</p>
                                                </div>
                                                <div className="ticket-qr">
                                                    <img src={ticket.qrCode} alt={`${ticket.name} QR`}/>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                    {activeTab === "past-events" && (
                        <EventSlider sectionTitle="" events={latestReleases}/>
                    )}
                    {activeTab === "favorites" && (
                        <EventSlider sectionTitle="" events={latestReleases}/>
                    )}
                    {activeTab === "settings" && (
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 profile-settings">
                                    <h3 className="settings-title">Hesap Ayarları</h3>
                                
                                    <div className="settings-section email-settings">
                                        <h4 className="settings-subtitle">Mail Adresi</h4>
                                        <div className="settings-content">
                                            <p className="settings-text">dnm123@gmail.com</p>
                                            <button className="settings-button">Değiştir</button>
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
                    )}
                </div>
            </div>

            {selectedTicket && (
                <div className="qr-popup">
                    <div className="qr-popup-content">
                        <button className="qr-popup-close" onClick={() => setSelectedTicket(null)}>
                            <IoClose />
                        </button>
                        <h4>{selectedTicket.name} - QR Kodu</h4>
                        <img src={selectedTicket.qrCode} alt={`${selectedTicket.name} QR`} />
                        <p>{selectedTicket.date} - {selectedTicket.venue}</p>
                    </div>
                </div>
            )}

        </div>

    );
}