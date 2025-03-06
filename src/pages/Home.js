import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/scss/pages/_home.scss";
import Slider from "../components/Slider";
import EventSlider from "../components/EventSlider";
import EventSliderVertical from "../components/EventSliderVertical";
import { latestReleases, concerts, activity, theaters, favorites, eventWatch } from "../data/eventData";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import axios from "axios";

export default function Home() {
    const [user, setUser] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    const navigate = useNavigate();

    const fetchUserData = async () => {
        const storedUserId = localStorage.getItem("userId");  
        if (storedUserId) {
            try {
                const response = await axios.get(`https://67c98ac5102d684575c2808b.mockapi.io/users/users/${storedUserId}`);
                const userData = response;
                setUser(userData);
                setIsUserLoggedIn(true);
                setIsVisible(!userData.isSubscriber); 
            } catch (error) {
                console.error("Kullanıcı bilgisi alınamadı:", error);
                setUser(null);
                setIsUserLoggedIn(false);
                setIsVisible(true);
            }
        } else {
            setUser(null);
            setIsUserLoggedIn(false);
            setIsVisible(true);
        }
    };
    

    useEffect(() => {
        fetchUserData();  

        const handleScroll = () => {
            setIsSticky(window.scrollY > 100);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleStorageChange = () => {
            fetchUserData();  
        };
    
        window.addEventListener("storage", handleStorageChange);
    
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);
    

    return (
        <div className="home-page mobile-gap">
            <Slider />

            <div className="container banner-container">
                <div className="row justify-content-center">
                    <div className="col-lg-9">
                        <h5 className="banner-title">
                            En Sevdiğin Etkinliklere 
                            <img src="/assets/images/geik_logo_blue.svg" alt="Logo" className="singup_logo" />
                            ile Anında Ulaş
                        </h5>
                        <p className="banner-description">
                            Konserler, festivaller, tiyatro ve daha fazlası için biletini saniyeler içinde al! 
                            Güvenli ödeme, anında onay ve bildirimlerle etkinlik deneyimini zahmetsiz hale getiriyoruz. 
                            Eğlenceye katılmak için şimdi keşfet!
                        </p>
                    </div>
                </div>
            </div>

            {isVisible && (
                <div className={`container subscriber-banner ${isSticky ? "subscriber-banner-sticky" : ""}`}>
                    <div className="subscriber-text">
                        <p>
                            Etkinliklere katılmak ve avantajlardan yararlanmak için
                            <button
                                onClick={() => {
                                    if (isUserLoggedIn) {
                                        navigate("/profil", { state: { openTab: "payment" } });
                                    } else {
                                        navigate("/giris-secenekleri");
                                    }
                                }}
                                className="subscriber-link"
                            >
                                {isUserLoggedIn ? "Abone Ol!" : "Kayıt Ol!"}
                            </button>
                            <span className="subscriber-tagline"> Buraya ek bir slogan gelebilir...</span>
                        </p>
                    </div>
                    <div className="subscriber-actions">
                        <button
                            className="geik-button-1"
                            onClick={() => {
                                if (isUserLoggedIn) {
                                    navigate("/profil", { state: { openTab: "payment" } });
                                } else {
                                    navigate("/giris-secenekleri");
                                }
                            }}
                        >
                            {isUserLoggedIn ? "Abone Ol" : "Kayıt Ol"}
                        </button>
                        <button className="subscriber-close" onClick={() => setIsVisible(false)}>
                            <IoClose />
                        </button>
                    </div>
                </div>
            )}

            <EventSlider sectionTitle="En Son Çıkanlar" events={latestReleases} />
            <EventSlider sectionTitle="Etkinlik İzleme Sayfası" events={eventWatch} />
            <EventSlider sectionTitle="Konserler" events={concerts} />
            <EventSliderVertical sectionTitle="Etkinlikler" events={activity} />
            <EventSliderVertical sectionTitle="Tiyatrolar" events={theaters} />
            <EventSlider sectionTitle="Karışık Favoriler" events={favorites} />
        </div>
    );
}
