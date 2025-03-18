import React, { useState, useEffect } from 'react';
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaGoogle, FaApple, FaRegHeart } from "react-icons/fa";
import { IoShareSocialOutline, IoClose, IoPlayOutline } from "react-icons/io5";
import "../assets/scss/pages/_eventDetails.scss";
import { useNavigate, useLocation } from 'react-router-dom';
import { getAverageColor } from '../utils/color';

export default function EventDetails() {
    const navigate = useNavigate();
    const location = useLocation();

    // Aktif sekme ve durumlar
    const [activeTab, setActiveTab] = useState('details');
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [showVideoPlayer, setShowVideoPlayer] = useState(false);
    const [bgColor, setBgColor] = useState('rgba(8, 32, 104, 0.7)');
    const [user, setUser] = useState(null);

    // Sayfa açıldığında kullanıcı bilgilerini localStorage'dan çek
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Arka plan rengi için görselin yüklendiğini takip et
    useEffect(() => {
        const img = document.querySelector('.detail-image');
        if (img && img.complete) {
            updateBackgroundColor(img);
        } else if (img) {
            img.onload = () => updateBackgroundColor(img);
        }
    }, []);

    // Görselin ortalama rengini alıp arka plan rengine uygular
    const updateBackgroundColor = (img) => {
        const color = getAverageColor(img);
        setBgColor(color);
    };

    // İzleme butonuna tıklandığında
    const handleJoinClick = () => {
        if (!user) {
            // Kullanıcı giriş yapmamışsa login popup aç
            setShowLoginPopup(true);
        } else if (!user.isSubscriber) {
            // Kullanıcı giriş yapmış ama abone değilse, ödeme sayfasına yönlendir
            navigate("/profil", { state: { openTab: "payment" } });
        } else {
            // Abone olan kullanıcıya video oynatıcıyı göster
            setShowVideoPlayer(true);
        }
    };

    // Kullanıcıyı giriş sayfasına yönlendir (returnUrl ile geri dönmesi sağlanır)
    const handleGoToLogin = () => {
        const returnUrl = location.pathname + location.search;
        navigate(`/giris-yap?returnUrl=${encodeURIComponent(returnUrl)}`);
    };

    // Etkinlik bilgileri (sabit veri)
    const eventInformation = {
        eventType: "Konser",
        artist: "Cem Adrian",
        time: "45 dk"
    };

    return (
        <div id="detail-page" className="detail-container">
            {/* Mobilde üst bölüm (geri butonu ve paylaş/favori butonları) */}
            <div className='container detail-info-mobile'>
                <button className='prev-button' onClick={() => navigate("/")}><FaArrowLeftLong /></button>
                <div>
                    <button className="geik-action-btn"><FaRegHeart /></button>
                    <button className="geik-action-btn"><IoShareSocialOutline /></button>
                </div>
            </div>

            {/* Banner alanı */}
            <div className={`container detail-banner ${showVideoPlayer ? 'video' : ''}`}>
                <div className='background-blur' style={{ '--dynamic-bg-color': bgColor }}></div>
                
                {/* Video oynatıcı */}
                {showVideoPlayer ? (
                    <div className="video-wrapper">
                        <video controls autoPlay className="detail-video-player">
                            <source src="/assets/video/video-page.mp4" type="video/mp4" />
                            Tarayıcınız video etiketini desteklemiyor.
                        </video>
                        <button className="video-close-btn" onClick={() => setShowVideoPlayer(false)}>
                            <IoClose />
                        </button>
                    </div>
                ) : (
                    // Görsel gösterimi (video yoksa)
                    <div className="detail-image-wrapper">
                        <img src="/assets/images/watch-img.png" alt="detailimg" className="detail-image" />
                    </div>
                )}
                
                {/* Görsel üzerindeki metin ve butonlar (video oynarken gösterilmez) */}
                {!showVideoPlayer && (
                    <div className="detail-info container">
                        <div className="detail-text">
                            <h2>Etkinlik Adı</h2>
                            <p className="detail-location">Konum bilgisi - Kısa bir alt açıklama</p>
                        </div>
                        <div className="detail-actions">
                            <button className="geik-button-1 play-button" onClick={handleJoinClick}>İzle <IoPlayOutline /></button>
                            <button className="geik-action-btn"><FaRegHeart /></button>
                            <button className="geik-action-btn"><IoShareSocialOutline /></button>
                        </div>
                    </div>
                )}
            </div>

            {/* İçerik sekmeleri */}
            <div className="detail-content container">
                <div className="tab-buttons">
                    <button className={`geik-button-2 ${activeTab === "details" ? "active-2" : ""}`} onClick={() => setActiveTab("details")}>Detaylar</button>
                    <button className={`geik-button-2 ${activeTab === "staff" ? "active-2" : ""}`} onClick={() => setActiveTab("staff")}>Kadro</button>
                </div>
                <div className="row">
                    <div className="col-lg-6 col-12">
                        <div className="tab-content">
                            {/* Detaylar sekmesi */}
                            {activeTab === "details" && (
                                <p>
                                    Türk müziğinin en sıra dışı seslerinden biri olan Cem Adrian, geniş ses yelpazesi ve derin duygusal şarkılarıyla sahnede!
                                    <br /><br />
                                    Kendi yazıp bestelediği şarkılarıyla dinleyicilerine duygusal bir yolculuk sunan Cem Adrian, konserlerinde müzikseverleri hem melodilerle hem de derin hislerle buluşturuyor.
                                </p>
                            )}
                            {/* Kadro sekmesi */}
                            {activeTab === "staff" && (
                                <p>
                                    Cem Adrian ve ekibi sahne alacaktır. Katılımcı sanatçılar, konser tarihine yakın açıklanacaktır.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Sağ tarafta etkinlik bilgileri */}
                    <div className="col-lg-6 col-12 information-col">
                        <div className="information-grid">
                            <div className="information-card"><h5>Etkinlik Türü</h5><p>{eventInformation.eventType}</p></div>
                        </div>
                        <div className="information-grid">
                            <div className="information-card"><h5>Sanatçı</h5><p>{eventInformation.artist}</p></div>
                        </div>
                        <div className="information-grid">
                            <div className="information-card"><h5>Süre</h5><p>{eventInformation.time}</p></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Kullanıcı giriş yapmamışsa gösterilen popup */}
            {showLoginPopup && (
                <div className='popup-overlay'>
                    <div className='popup'>
                        <button className='popup-close' onClick={() => setShowLoginPopup(false)}><IoClose /></button>
                        <div className='popup-singup_options'>
                            <div className="container">
                                <div className="row justify-content-center">
                                    <p className="popup-description">BU ETKİNLİĞE KATILMAK <br />İÇİN GİRİŞ YAP YA DA KAYDOL</p>
                                    <button className="popup-singup_btn_primary" onClick={() => navigate("/kayit-ol")}>Kaydol</button>
                                    <button className="popup-singup_btn_primary" onClick={handleGoToLogin}>Giriş Yap</button>
                                    <p className="popup-or-text">Ya da</p>
                                    <button className="popup-singup_second_primary"><FaGoogle className="icon me-2" /> Google ile Giriş Yap</button>
                                    <button className="popup-singup_second_primary"><FaApple className="icon me-2" /> Apple ile Giriş Yap</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
