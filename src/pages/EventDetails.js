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
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function EventDetails() {
    const navigate = useNavigate();
    const location = useLocation();

    // Popup, login ve kullanıcı bilgileri için state tanımları
    const [activeTab, setActiveTab] = useState('details');
    const [showPopup, setShowPopup] = useState(false);
    const [showSubPopup, setshowSubPopup] = useState(false);
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [popupStep, setPopupStep] = useState(1);
    const [bgColor, setBgColor] = useState('rgba(8, 32, 104, 0.7)');
    const [user, setUser] = useState(null);
    const [isInvitingFriend, setIsInvitingFriend] = useState(false);
    const [friendName, setFriendName] = useState("");
    const [isFriendConfirmed, setIsFriendConfirmed] = useState(false);

    // Sayfa yüklendiğinde kullanıcı bilgilerini localStorage'dan al
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Sayfa yüklendiğinde görselden arka plan rengini al
    useEffect(() => {
        const img = document.querySelector('.detail-image');
        if (img && img.complete) {
            updateBackgroundColor(img);
        } else if (img) {
            img.onload = () => updateBackgroundColor(img);
        }
    }, []);

    // Arka plan rengini hesapla ve güncelle
    const updateBackgroundColor = (img) => {
        const color = getAverageColor(img);
        setBgColor(color);
    };

    // Katıl butonu tıklandığında kullanıcı ve abonelik durumuna göre işlem yap
    const handleJoinClick = () => {
        if (!user) {
            setShowLoginPopup(true);  // Giriş yapmamışsa login popup göster
        } else if (!user.isSubscriber) {
            setshowSubPopup(true)
        } else {
            setShowPopup(true);  // Aboneyse popup aç
        }
    };

    // Login sayfasına yönlendir, mevcut sayfanın returnUrl'ini ekle
    const handleGoToLogin = () => {
        const returnUrl = location.pathname + location.search;
        navigate(`/giris-yap?returnUrl=${encodeURIComponent(returnUrl)}`);
    };

    // Arkadaşını davet et seçildiğinde popup durumlarını ayarla
    const handleInviteFriend = () => {
        setIsInvitingFriend(true);
        setPopupStep(11); 
        setFriendName("");
        setIsFriendConfirmed(false);
    };

    // Normal bilet alma sürecini başlat
    const handleRegularTicketPurchase = () => {
        setIsInvitingFriend(false);
        setPopupStep(2);
    };

    // Arkadaş adı doğrulaması
    const confirmFriendName = () => {
        if (friendName.trim()) {
            setIsFriendConfirmed(true);
        }
    };

    // 2. adımdaki popup metni (arkadaşla mı, tek kişilik mi)
    const getStepTwoText = () => {
        const ticketCountText = isInvitingFriend ? "2 kişilik" : "bilet";
        return `
            <span>${eventInformation.date} ${eventInformation.time} tarihli
            ${eventInformation.location}</span> etkinliği için <span>Arka ayakta</span> bölümüne ${ticketCountText} bilet satın
            almak üzeresiniz. Devam etmek istiyor musunuz?
        `;
    };

    // Popup adım kontrol fonksiyonları
    const handleNextStep = () => setPopupStep(prev => prev + 1);
    const handlePreviousStep = () => setPopupStep(prev => prev - 1);
    const closePopup = () => {
        setShowPopup(false);
        setshowSubPopup(false)
        setPopupStep(1);
    };

    // Etkinlik bilgileri (sabit veri)
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
            {/* Mobil için üst kısım */}
            <div className='container detail-info-mobile'>
                <button className='prev-button' onClick={() => navigate("/")}><FaArrowLeftLong/></button>
                <div>
                    <button className="geik-action-btn"><FaRegHeart/></button>
                    <button className="geik-action-btn"><IoShareSocialOutline/></button>
                </div>
            </div>

            {/* Banner alanı */}
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

            {/* Sekmeli içerik alanı */}
            <div className="detail-content container">
                <div className="tab-buttons">
                    <button className={`geik-button-2 ${activeTab === "details" ? "active-2" : ""}`} onClick={() => setActiveTab("details")}>Detaylar</button>
                    <button className={`geik-button-2 ${activeTab === "staff" ? "active-2" : ""}`} onClick={() => setActiveTab("staff")}>Kadro</button>
                    <button className={`geik-button-2 ${activeTab === "rules" ? "active-2" : ""}`} onClick={() => setActiveTab("rules")}>Kurallar</button>
                </div>
                
                {/* Sekme içerikleri */}
                <div className="row">
                    <div className="col-lg-6 col-12 event-details-content">
                        {/* Detaylar sekmesi içeriği */}
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

                    {/* Sağdaki etkinlik bilgileri */}
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

            {/* Slider ve kategori bölümü */}
            <EventSlider sectionTitle="Benzer Etkinlikler" events={latestReleases}/>
            <EventSlider sectionTitle="Benzer Etkinlikler" events={latestReleases}/>
            <CategorySlider/>

            {showSubPopup && (
                <div className='popup-overlay'>
                    <div className='popup'>
                        <button className='popup-close' onClick={closePopup}><IoClose /></button>
                        <div className="popup-step">
                            <div className="popup-content-step-2">
                                <div className="popup-text">
                                    <h5>BU ETKİNLİĞE KATILMAK<br/>  İÇİN ABONE OL</h5>
                                    <p> <span>26 Şubat Çarşamba 21.00 tarihli<br/> Jolly Joker Ankara </span>etkinliğine katılmak için<span> profil &gt; Ödeme<br/>  yöntemi </span>sekmesine giderek lütfen ödeme yönteminizi ekleyiniz.</p>
                                </div>
                                <div className="popup-buttons">
                                    {/* Önceki adıma dönme butonu */}
                                    <button className="popup-btn-3" onClick={closePopup}>Kapat</button>
                                    {/* Devam etme butonu */}
                                    <button className="popup-btn-2" onClick={() => navigate("/profil", { state: { openTab: "payment" } })}>Ödemeye git</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Katılım Popup'u */}
            {showPopup && (
                <div className='popup-overlay'>
                    <div className='popup'>
                        {/* Popup'u kapatma butonu */}
                        <button className='popup-close' onClick={closePopup}><IoClose /></button>
            
                        {/* Adım 1 - Arkadaşını davet et veya bilet al seçeneği */}
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
                                            {/* Arkadaşını davet et butonu */}
                                            <button className="popup-btn-1" onClick={handleInviteFriend}>Arkadaşını Davet Et</button>
                                            {/* Normal bilet al butonu */}
                                            <button className="popup-btn-2" onClick={handleRegularTicketPurchase}>Bilet Al</button>
                                        </div>
                                    </div>
                                </div>
                                <p className="popup-note">*Bu etkinlik için biletler gösterilen kısımdan verilir.</p>
                            </div>
                        )}
            
                        {/* Adım 1.1 - Arkadaşını davet et popup içeriği */}
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
            
                                        {/* Arkadaş adı girme ve onaylama alanı */}
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
                                                {/* Arkadaş ismi onaylandıktan sonra bilet al butonu */}
                                                <button className="popup-btn-2" onClick={() => setPopupStep(2)}>Bilet Al</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <p className="popup-note">*Bu etkinlik için biletler gösterilen kısımdan verilir.</p>
                            </div>
                        )}
            
                        {/* Adım 2 - Bilet satın alma onayı */}
                        {popupStep === 2 && (
                            <div className="popup-step">
                                <div className="popup-content-step-2">
                                    <div className="popup-text">
                                        <h5>Etkinlik Adı Konseri</h5>
                                        <p dangerouslySetInnerHTML={{ __html: getStepTwoText().replace(/\n/g, '<br/>') }}></p>
                                    </div>
                                    <div className="popup-buttons">
                                        {/* Önceki adıma dönme butonu */}
                                        <button className="popup-btn-3" onClick={handlePreviousStep}>Geri Dön</button>
                                        {/* Devam etme butonu */}
                                        <button className="popup-btn-2" onClick={handleNextStep}>Devam Et</button>
                                    </div>
                                </div>
                            </div>
                        )}
            
                        {/* Adım 3 - Bilet satın alma tamamlandı */}
                        {popupStep === 3 && (
                            <div className="popup-step">
                                <div className="popup-content-step-3">
                                    <h5>Etkinlik Adı Konseri’ne <br />bilet aldınız!</h5>
                                    <p>26 Şubat Çarşamba <span>21.00</span> \ Jolly Joker Ankara</p>

                                    <div className="popup-qr">
                                        <Swiper
                                            slidesPerView={1}
                                            spaceBetween={10}
                                            pagination={{ clickable: true }}
                                            modules={[Pagination]}
                                            className="qr-swiper"
                                        >
                                            <SwiperSlide>
                                                <img src="/assets/images/qrkod.png" alt="eventqr" />
                                            </SwiperSlide>
                                            {isInvitingFriend && (
                                                <SwiperSlide>
                                                    <img src="/assets/images/qrkod.png" alt="eventqr-friend" />
                                                </SwiperSlide>
                                            )}
                                        </Swiper>
                                    </div>

                                    <div className="popup-buttons">
                                        {/* Kapatma ve Biletlerim sayfasına gitme butonları */}
                                        <button className="popup-btn-3" onClick={closePopup}>Kapat</button>
                                        <button className="popup-btn-2" onClick={() => navigate("/profil", { state: { openTab: "upcoming-events" } })}>Biletlerim</button>
                                    </div>
                                    <p className="popup-note">*QR koduna biletlerim kısmından ulaşabilirsiniz.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
            
            {/* Kullanıcı Giriş Yapmamışsa Görünen Popup */}
            {showLoginPopup && (
                <div className='popup-overlay'>
                    <div className='popup'>
                        <button className='popup-close' onClick={() => setShowLoginPopup(false)}><IoClose /></button>
                        <div className='popup-singup_options'>
                            <div className="container">
                                <div className="row justify-content-center mobile">
                                    <p className="popup-description">BU ETKİNLİĞE KATILMAK <br />İÇİN GİRİŞ YAP YA DA KAYDOL</p>
            
                                    {/* Kaydol ve Giriş Yap butonları */}
                                    <button className="popup-singup_btn_primary" onClick={() => navigate("/kayit-ol")}>Kaydol</button>
                                    <button className="popup-singup_btn_primary" onClick={handleGoToLogin}>Giriş Yap</button>
            
                                    {/* Alternatif sosyal medya giriş butonları */}
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
