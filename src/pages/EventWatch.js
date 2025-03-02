import React, { useState, useEffect } from 'react';
import { FaGoogle, FaApple, FaRegHeart } from "react-icons/fa";
import { IoShareSocialOutline, IoClose, IoPlayOutline } from "react-icons/io5";
import "../assets/scss/pages/_eventDetails.scss";
import { useNavigate, useLocation } from 'react-router-dom';
import { getAverageColor } from '../utils/color';

export default function EventDetails() {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('details');
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [showVideoPlayer, setShowVideoPlayer] = useState(false);
    const [bgColor, setBgColor] = useState('rgba(8, 32, 104, 0.7)');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        const img = document.querySelector('.detail-image');
        if (img && img.complete) {
            updateBackgroundColor(img);
        } else if (img) {
            img.onload = () => updateBackgroundColor(img);
        }
    }, []);

    const updateBackgroundColor = (img) => {
        const color = getAverageColor(img);
        setBgColor(color);
    };

    const handleJoinClick = () => {
        if (!user) {
            // Kullanıcı giriş yapmamışsa login popup göster
            setShowLoginPopup(true);
        } else if (!user.isSubscriber) {
            // Kullanıcı giriş yapmış ama abone değilse profil favorilere yönlendir
            navigate("/profil", { state: { openTab: "payment" } });
        } else {
            setShowVideoPlayer(true);
        }
    };

    const handleGoToLogin = () => {
        const returnUrl = location.pathname + location.search; // Mevcut etkinlik sayfasının tam URL'si
        navigate(`/giris-yap?returnUrl=${encodeURIComponent(returnUrl)}`);
    };

    const eventInformation = {
        eventType: "Konser",
        artist: "Cem Adrian",
        time: "45 dk"
    };

    return (
        <div id="detail-page" className="detail-container">
            <div className={`container detail-banner ${showVideoPlayer ? 'video' : ''}`}>
                <div className='background-blur' style={{ '--dynamic-bg-color': bgColor }}></div>
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
                    <div className="detail-image-wrapper">
                        <img src="/assets/images/watch-img.png" alt="detailimg" className="detail-image" />
                    </div>
                )}
                
                {!showVideoPlayer && (
                    <div className="detail-info container">
                        <div className="detail-text">
                            <h1 className="detail-title">Etkinlik Adı</h1>
                            <p className="detail-location">Konum bilgisi - Kısa bir alt açıklama</p>
                        </div>
                        <div className="detail-actions">
                            <button className="geik-button-1 play-button" onClick={handleJoinClick}>İzle <IoPlayOutline/></button>
                            <button className="geik-action-btn"><FaRegHeart/></button>
                            <button className="geik-action-btn"><IoShareSocialOutline/></button>
                        </div>
                    </div>
                )}
            </div>

            <div className="detail-content container">
                <div className="tab-buttons">
                    <button className={`geik-button-2 ${activeTab === "details" ? "active-2" : ""}`} onClick={() => setActiveTab("details")}>Detaylar</button>
                    <button className={`geik-button-2 ${activeTab === "staff" ? "active-2" : ""}`} onClick={() => setActiveTab("staff")}>Kadro</button>
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="tab-content">
                            {activeTab === "details" && (
                                <p>
                                    Etkinlik genelinde geçerli olan kurallara ek olarak, seanslara özgü ek düzenlemeler de yapılmıştır. Seans listesinde, katılacağınız seansın kurallarını bulabilirsiniz
                                    <br/>
                                    <br/>
                                    Türk müziğinin en sıra dışı seslerinden biri olan Cem Adrian, geniş ses yelpazesi ve derin duygusal şarkılarıyla sahnede! Ses tellerinin ortalama bir insanın üç katı uzunluğunda olması, Adrian’a benzersiz bir vokal yeteneği kazandırıyor ve bas tonlardan soprano tınılara kadar geniş bir aralıkta şarkı söylemesine olanak tanıyor.
                                    <br/>
                                    <br/>
                                    Kendi yazıp bestelediği şarkılarıyla dinleyicilerine duygusal bir yolculuk sunan Cem Adrian, konserlerinde müzikseverleri hem melodilerle hem de derin hislerle buluşturuyor. Unutulmaz bir müzik deneyimi yaşamak için bu konseri kaçırmayın!
                                </p>
                            )}
                            {activeTab === "staff" && (
                                <p>
                                    Cem Adrian ve ekibi sahne alacaktır. Katılımcı sanatçılar, konser tarihine yakın açıklanacaktır.
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="col-6 information-col">
                        <div className="information-grid">
                            <div className="information-card"><h4>Etkinlik Türü</h4><p>{eventInformation.eventType}</p></div>
                        </div>
                        <div className="information-grid">
                            <div className="information-card"><h4>Sanatçı</h4><p>{eventInformation.artist}</p></div>
                        </div>
                        <div className="information-grid">
                            <div className="information-card"><h4>Süre</h4><p>{eventInformation.time}</p></div>
                        </div>
                    </div>
                </div>
            </div>

            {showLoginPopup && (
                <div className='popup-overlay'>
                    <div className='popup'>
                        <button className='popup-close' onClick={() => setShowLoginPopup(false)}><IoClose /></button>
                        <div className='popup-singup_options'>
                            <div className="container">
                                <div className="row justify-content-center">
                                    <p className="popup-description">BU ETKİNLİĞE KATILMAK <br/>İÇİN GİRİŞ YAP YA DA KAYDOL</p>
                                        
                                    <button className="popup-singup_btn_primary" onClick={() => navigate("/kayit-ol")}>Kaydol</button>
                                    <button className="popup-singup_btn_primary" onClick={handleGoToLogin}>Giriş Yap</button>
                                        
                                    <p className="popup-or-text">Ya da</p>
                                        
                                    <button className="popup-singup_second_primary">
                                        <FaGoogle className="icon me-2" /> Google ile Giriş Yap
                                    </button>
                                    <button className="popup-singup_second_primary">
                                        <FaApple className="icon me-2" /> Apple ile Giriş Yap
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}
