import React, { useState, useEffect } from 'react';
import { FaGoogle, FaApple, FaRegHeart, FaCheck } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoShareSocialOutline, IoClose } from "react-icons/io5";
import "../assets/scss/pages/_eventDetails.scss";
import EventSlider from "../components/EventSlider";
import CategorySlider from '../components/CategorySlider';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAverageColor } from '../utils/color';
import { latestReleases } from '../data/eventData';  

export default function EventDetails() {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('details');
    const [showPopup, setShowPopup] = useState(false);
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [popupStep, setPopupStep] = useState(1);
    const [bgColor, setBgColor] = useState('rgba(8, 32, 104, 0.7)');
    const [user, setUser] = useState(null);
    const [isInvitingFriend, setIsInvitingFriend] = useState(false);
    const [friendName, setFriendName] = useState("");
    const [isFriendConfirmed, setIsFriendConfirmed] = useState(false);


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
            // Kullanıcı giriş yapmış ve aboneyse popup aç
            setShowPopup(true);
        }
    };

    const handleGoToLogin = () => {
        const returnUrl = location.pathname + location.search; // Mevcut etkinlik sayfasının tam URL'si
        navigate(`/giris-yap?returnUrl=${encodeURIComponent(returnUrl)}`);
    };

    const handleInviteFriend = () => {
        setIsInvitingFriend(true);
        setPopupStep(11);   // 11: Arkadaşını davet et popup adımı
        setFriendName("");
        setIsFriendConfirmed(false);
    };
    
    const handleRegularTicketPurchase = () => {
        setIsInvitingFriend(false);
        setPopupStep(2);  // Normal akışta doğrudan 2. adıma geç
    };
    

    const confirmFriendName = () => {
        if (friendName.trim()) {
            setIsFriendConfirmed(true);
        }
    };
    
    const getStepTwoText = () => {
        const ticketCountText = isInvitingFriend ? "2 kişilik" : "bilet";
        return `
            <span>${eventInformation.date} ${eventInformation.time} tarihli
            ${eventInformation.location}</span> etkinliği için <span>Arka ayakta</span> bölümüne ${ticketCountText} bilet satın
            almak üzeresiniz. Devam etmek istiyor musunuz?
        `;
    };


    const handleNextStep = () => setPopupStep(prev => prev + 1);
    const handlePreviousStep = () => setPopupStep(prev => prev - 1);
    const closePopup = () => {
        setShowPopup(false);
        setPopupStep(1);
    };

    const eventInformation = {
        eventType: "Konser",
        ageLimit : "13+",
        quota: "50",
        location: "Jolly Joker Ankara",
        date: "27 Şubat Perşembe",
        time: "21:00",
        artist: "Cem Adrian"
    };

    return (
        <div id="detail-page" className="detail-container">
            <div className='container detail-info-mobile'>
                <button className='prev-button'><FaArrowLeftLong/></button>
                <div>
                    <button className="geik-action-btn"><FaRegHeart/></button>
                    <button className="geik-action-btn"><IoShareSocialOutline/></button>
                </div>
            </div>
            <div className="container detail-banner">

                <div className='background-blur' style={{ '--dynamic-bg-color': bgColor }}></div>
                <div className="detail-image-wrapper">
                    <img src="/assets/images/detailimg.png" alt="detailimg" className="detail-image"/>
                </div>

                <div className="detail-info container">
                    <div className="detail-text">
                        <h2>Etkinlik Adı</h2>
                        <p className="detail-location">Konum bilgisi - Kısa bir alt açıklama</p>
                    </div>
                    <div className="detail-actions">
                        <button className="geik-button-1" onClick={handleJoinClick}>Katıl</button>
                        <button className="geik-button-1">Hediye et</button>
                        <button className="geik-action-btn"><FaRegHeart/></button>
                        <button className="geik-action-btn"><IoShareSocialOutline/></button>
                    </div>
                </div>
            </div>

            <div className="detail-content container">
                <div className="tab-buttons">
                    <button className={`geik-button-2 ${activeTab === "details" ? "active-2" : ""}`} onClick={() => setActiveTab("details")}>Detaylar</button>
                    <button className={`geik-button-2 ${activeTab === "staff" ? "active-2" : ""}`} onClick={() => setActiveTab("staff")}>Kadro</button>
                    <button className={`geik-button-2 ${activeTab === "rules" ? "active-2" : ""}`} onClick={() => setActiveTab("rules")}>Kurallar</button>
                </div>
                <div className="row">
                    <div className="col-lg-6 col-12">
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
                            {activeTab === "rules" && (
                                <p>
                                    Etkinlik alanına girişlerde kimlik ibrazı zorunludur. 13 yaş altı katılımcılar velileri ile birlikte etkinliğe katılabilir.
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="col-lg-6 col-12 information-col">
                        <div className="information-grid">
                            <div className="information-card"><h5>Etkinlik Türü</h5><p>{eventInformation.eventType}</p></div>
                            <div className="information-card"><h5>Konum</h5><p>{eventInformation.location}</p></div>
                        </div>
                        <div className="information-grid">
                            <div className="information-card"><h5>Yaş Sınırı</h5><p>{eventInformation.ageLimit}</p></div>
                            <div className="information-card"><h5>Tarih</h5><p>{eventInformation.date}<br/><span>{eventInformation.time}</span></p></div>
                        </div>
                        <div className="information-grid">
                            <div className="information-card"><h5>Kontenjan</h5><p>{eventInformation.quota}</p></div>
                            <div className="information-card"><h5>Sanatçı</h5><p>{eventInformation.artist}</p></div>
                        </div>
                    </div>
                </div>
            </div>

            <EventSlider sectionTitle="Jolly Joker Ankara" events={latestReleases}/>
            <EventSlider sectionTitle="Benzer Etkinlikler" events={latestReleases}/>
            <CategorySlider/>

            {showPopup && (
                <div className='popup-overlay'>
                    <div className='popup'>
                        <button className='popup-close' onClick={closePopup}><IoClose/></button>
                        {popupStep === 1 && (
                            <div className="popup-step">
                                <div className="popup-content-step-1">
                                    <div className="event-layout-wrapper">
                                        <div className="event-layout"></div>
                                    </div>
                                    <div className="popup-info">
                                        <div className="popup-text">
                                            <h5>Etkinlik Adı Konseri</h5>
                                            <p>26 Şubat Çarşamba <span>21.00</span></p>
                                            <p>Jolly Joker Ankara</p>
                                        </div>
                                        <div className="popup-buttons">
                                            <button className="popup-btn-1" onClick={handleInviteFriend}>Arkadaşını Davet Et</button>
                                            <button className="popup-btn-2" onClick={handleRegularTicketPurchase}>Bilet Al</button>
                                        </div>
                                    </div>
                                </div>
                                <p className="popup-note">*Bu etkinlik için biletler gösterilen kısımdan verilir.</p>
                            </div>
                        )}

                        {popupStep === 11 && (
                            <div className="popup-step">
                                <div className="popup-content-step-1">
                                    <div className="event-layout-wrapper">
                                        <div className="event-layout"></div>
                                    </div>
                                    <div className="popup-info">
                                        <div className="popup-text">
                                            <h5>Etkinlik Adı Konseri</h5>
                                            <p>26 Şubat Çarşamba <span>21.00</span></p>
                                            <p>Jolly Joker Ankara</p>
                                        </div>
                        
                                        {!isFriendConfirmed ? (
                                            <div className="popup-invite">
                                                <input
                                                    type="text"
                                                    value={friendName}
                                                    onChange={(e) => setFriendName(e.target.value)}
                                                    placeholder="Arkadaşının Adını Yaz"
                                                    className="invite-input"
                                                />
                                                <button
                                                    className="invite-confirm-btn"
                                                    onClick={confirmFriendName}
                                                    disabled={!friendName.trim()}
                                                    style={{
                                                        backgroundColor: friendName.trim() ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.21)"
                                                    }}
                                                >
                                                    <FaCheck style={{ color: friendName.trim() ? "rgba(0, 0, 0, 1)" : "rgba(255, 255, 255, 0.5)" }} />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="popup-invite-confirmed">
                                                <p>{friendName} <FaCheck style={{ color: "#fff" }} /></p>
                                                <button className="popup-btn-2" onClick={() => setPopupStep(2)}>Bilet Al</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <p className="popup-note">*Bu etkinlik için biletler gösterilen kısımdan verilir.</p>
                            </div>
                        )}

                        
                        {popupStep === 2 && (
                            <div className="popup-step">
                                <div className="popup-content-step-2">
                                    <div className="popup-text">
                                        <h5>Etkinlik Adı Konseri</h5>
                                        <p dangerouslySetInnerHTML={{ __html: getStepTwoText().replace(/\n/g, '<br/>') }}></p>
                                    </div>
                                    <div className="popup-buttons">
                                        <button className="popup-btn-3" onClick={handlePreviousStep}>Geri Dön</button>
                                        <button className="popup-btn-2" onClick={handleNextStep}>Devam Et</button>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {popupStep === 3 && (
                            <div className="popup-step">
                                <div className="popup-content-step-3">
                                    <h5>Etkinlik Adı Konseri’ne <br/>bilet aldınız!</h5>
                                    <p>26 Şubat Çarşamba <span>21.00</span> \ Jolly Joker Ankara</p>
                                    <div className="popup-qr">
                                        <img src="/assets/images/qrkod.png" alt="eventqr" />
                                        {isInvitingFriend && (
                                            <img src="/assets/images/qrkod.png" alt="eventqr-friend" />
                                        )}
                                    </div>
                                    <div className="popup-buttons">
                                        <button className="popup-btn-3" onClick={closePopup}>Kapat</button>
                                        <button className="popup-btn-2" onClick={() => navigate("/profil", {state: { openTab : "upcoming-events" } })}>Biletlerim</button>
                                    </div>
                                    <p className="popup-note">*QR koduna biletlerim kısmından ulaşabilirsiniz.</p>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            )}

            {showLoginPopup && (
                <div className='popup-overlay'>
                    <div className='popup'>
                        <button className='popup-close' onClick={() => setShowLoginPopup(false)}><IoClose /></button>
                        <div className='popup-singup_options'>
                            <div className="container">
                                <div className="row justify-content-center mobile">
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
