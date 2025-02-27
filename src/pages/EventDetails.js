import React, { useState } from 'react'
import { FaRegHeart } from "react-icons/fa";
import { IoShareSocialOutline, IoClose } from "react-icons/io5";
import "../assets/scss/pages/_eventDetails.scss";
import EventSlider from "../components/EventSlider";
import CategorySlider from '../components/CategorySlider';
import { useNavigate } from 'react-router-dom';


export default function EventDetails() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('details');
    const [showPopup, setShowPopup] = useState(false);
    const [popupStep, setPopupStep] = useState(1);
    
    const handleNextStep = () => {
        setPopupStep(prev => prev + 1);
    };
    
    const handlePreviousStep = () => {
        setPopupStep(prev => prev - 1);
    };
    
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
    }

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
    
    return(
        <div id="detail-page" className="detail-container">
            <div className="detail-banner">
                <div className='background-blur'></div>
                <div className="detail-image-wrapper">
                    <img src="/assets/images/detailimg.png" alt="detailimg" className="detail-image"/>
                </div>

                <div className="detail-info container">
                    <div className="detail-text">
                        <h1 className="detail-title">Etkinlik Adı</h1>
                        <p className="detail-location">Konum bilgisi - Kısa bir alt açıklama</p>
                    </div>
                    <div className="detail-actions">
                        <button className="geik-button-1" onClick={() => setShowPopup(true)}>Katıl</button>
                        <button className="geik-button-1">Hediye et</button>
                        <button className="geik-action-btn"><FaRegHeart/></button>
                        <button className="geik-action-btn"><IoShareSocialOutline/></button>
                    </div>
                </div>
            </div>

            <div className="detail-content container">
                <div className="tab-buttons">
                    <button className={`geik-button-1 ${activeTab === "details" ? "active" : ""}`} onClick={() => setActiveTab("details")}>Detaylar</button>
                    <button className={`geik-button-1 ${activeTab === "staff" ? "active" : ""}`} onClick={() => setActiveTab("staff")}>Kadro</button>
                    <button className={`geik-button-1 ${activeTab === "rules" ? "active" : ""}`} onClick={() => setActiveTab("rules")}>Kurallar</button>
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
                            {activeTab === "rules" && (
                                <p>
                                    Etkinlik alanına girişlerde kimlik ibrazı zorunludur. 13 yaş altı katılımcılar velileri ile birlikte etkinliğe katılabilir.
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="col-6 information-col">
                        <div className="information-grid">
                            <div className="information-card">
                                <h4>Etkinlik Türü</h4>
                                <p>{eventInformation.eventType}</p>
                            </div>
                            <div className="information-card">
                                <h4>Konum</h4>
                                <p>{eventInformation.location}</p>
                            </div>
                        </div>
                        <div className="information-grid">
                            <div className="information-card">
                                <h4>Yaş Sınırı</h4>
                                <p>{eventInformation.ageLimit}</p>
                            </div>
                            <div className="information-card">
                                <h4>Tarih</h4>
                                <p>{eventInformation.date}<br /><span>{eventInformation.time}</span></p>
                            </div>
                        </div>
                        <div className="information-grid">
                            <div className="information-card">
                                <h4>Kontenjan</h4>
                                <p>{eventInformation.quota}</p>
                            </div>
                            <div className="information-card">
                                <h4>Sanatçı</h4>
                                <p>{eventInformation.artist}</p>
                            </div>
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
                                            <h2>Etkinlik Adı Konseri</h2>
                                            <p>26 Şubat Çarşamba <span>21.00</span></p>
                                            <p>Jolly Joker Ankara</p>
                                        </div>
                                        <div className="popup-buttons">
                                            <button className="popup-btn-1">Arkadaşını Davet Et</button>
                                            <button className="popup-btn-2" onClick={handleNextStep}>Bilet Al</button>
                                        </div>
                                    </div>
                                </div>
                                <p className="popup-note">*Bu etkinlik için biletler gösterilen kısımdan verilir.</p>
                            </div>
                        )}
                        
                        {popupStep === 2 && (
                            <div className="popup-step">
                                <div className="popup-content-step-2">
                                    <div className="popup-text">
                                        <h2>Etkinlik Adı Konseri</h2>
                                        <p><span>26 Şubat Çarşamba 21.00</span> tarihli <br/> <span>Jolly Joker Ankara</span> etkinliği için <span>Arka ayakta</span> bölümüne bilet satın <br/> almak üzeresiniz. Devam etmek istiyor musunuz?</p>
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
                                    <h2>Etkinlik Adı Konseri’ne <br/>bilet aldınız!</h2>
                                    <p>26 Şubat Çarşamba <span>21.00</span> \ Jolly Joker Ankara</p>
                                    <div className="popup-qr">
                                        <img src="/assets/images/qrkod.png" alt="eventqr" />
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
        </div>
    );
}