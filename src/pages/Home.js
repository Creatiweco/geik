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
    const [user, setUser] = useState(null);                 // Kullanıcı bilgileri
    const [isVisible, setIsVisible] = useState(false);      // Abonelik banner'ının görünürlük durumu
    const [isSticky, setIsSticky] = useState(false);        // Scroll durumuna göre banner yapışkan hale gelir
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);  // Kullanıcı giriş yapmış mı kontrolü

    const navigate = useNavigate();

    // Kullanıcı bilgilerini ve abonelik durumunu çek
    const fetchUserData = async () => {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId) {
            try {
                const response = await axios.get(`https://67c98ac5102d684575c2808b.mockapi.io/users/users/${storedUserId}`);
                const userData = response.data;
                setUser(userData);
                setIsUserLoggedIn(true);
                setIsVisible(!userData.isSubscriber);  // Abone değilse banner göster
            } catch (error) {
                console.error("Kullanıcı bilgisi alınamadı:", error);
                setUser(null);
                setIsUserLoggedIn(false);
                setIsVisible(true);  // Kullanıcı alınamazsa banner göster
            }
        } else {
            setUser(null);
            setIsUserLoggedIn(false);
            setIsVisible(true);  // Kullanıcı giriş yapmamışsa banner göster
        }
    };

    useEffect(() => {
        fetchUserData();  // Sayfa ilk yüklendiğinde kullanıcı verisini çek

        // Sayfa scroll olduğunda banner'ın sticky olup olmadığını kontrol et
        const handleScroll = () => {
            setIsSticky(window.scrollY > 100);  // 100px'den fazla scroll edilirse sticky olur
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // LocalStorage'da değişiklik olursa (örneğin başka sekmeden giriş/çıkış yapıldığında) kullanıcı verisini güncelle
    useEffect(() => {
        const handleStorageChange = () => {
            fetchUserData();
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    return (
        <div className="home-page mobile-gap">
            {/* Ana slider bileşeni */}
            <Slider />

            {/* Banner alanı - Hoş geldiniz mesajı */}
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

            {/* Abonelik banner'ı - Kullanıcı abone değilse veya giriş yapmamışsa gösterilir */}
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

            {/* Farklı kategoriler için etkinlik slider'ları */}
            <EventSlider sectionTitle="En Son Çıkanlar" events={latestReleases} />
            <EventSlider sectionTitle="Etkinlik İzleme Sayfası" events={eventWatch} />
            <EventSlider sectionTitle="Konserler" events={concerts} />
            <EventSliderVertical sectionTitle="Etkinlikler" events={activity} />
            <EventSliderVertical sectionTitle="Tiyatrolar" events={theaters} />
            <EventSlider sectionTitle="Karışık Favoriler" events={favorites} />
        </div>
    );
}
