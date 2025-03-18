import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/scss/pages/_home.scss";
import Slider from "../components/Slider";
import EventSlider from "../components/EventSlider";
import EventSliderVertical from "../components/EventSliderVertical";
import SubscriptionBanner from "../components/SubscriptionBanner";
import { latestReleases, concerts, activity, theaters, favorites, eventWatch } from "../data/eventData";
import axios from "axios";

export default function Home() {

    const [user, setUser] = useState(null);                 
    const [isVisible, setIsVisible] = useState(false); // Abonelik banner'ının görünürlük durumu
    const [isSticky, setIsSticky] = useState(false); // Scroll durumuna göre banner yapışkan hale gelir
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false); // Kullanıcı giriş yapmış mı kontrolü
    const [userId, setUserId] = useState(localStorage.getItem("userId"));

    useEffect(() => {
        if (!userId) {
            setIsUserLoggedIn(false);
            setIsVisible(true);
            return;
        }
    
        const fetchUserData = async () => {
            try {
                const { data } = await axios.get(`https://67c98ac5102d684575c2808b.mockapi.io/users/users/${userId}`);
                setUser(data);
                setIsUserLoggedIn(true);
                setIsVisible(!data.isSubscriber);
            } catch (error) {
                console.error("Kullanıcı bilgisi alınamadı:", error);
                setIsUserLoggedIn(false);
                setIsVisible(true);
            }
        };
    
        fetchUserData();
    }, [userId]);

    useEffect(() => {
        const handleScroll = () => setIsSticky(window.scrollY > 100);
    
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);    

    const eventSections = [
        { title: "En Son Çıkanlar", events: latestReleases, type: "horizontal" },
        { title: "Etkinlik İzleme Sayfası", events: eventWatch, type: "horizontal" },
        { title: "Konserler", events: concerts, type: "horizontal" },
        { title: "Etkinlikler", events: activity, type: "vertical" },
        { title: "Tiyatrolar", events: theaters, type: "vertical" },
        { title: "Karışık Favoriler", events: favorites, type: "horizontal" }
    ];

    return (
        <div className="home-page mobile-gap">
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

            <SubscriptionBanner isVisible={isVisible} isSticky={isSticky} isUserLoggedIn={isUserLoggedIn} setIsVisible={setIsVisible} />

            <>
                {eventSections.map((section, index) =>
                    section.type === "horizontal" ? (
                        <EventSlider key={index} sectionTitle={section.title} events={section.events} />
                    ) : (
                        <EventSliderVertical key={index} sectionTitle={section.title} events={section.events} />
                    )
                )}
            </>
        </div>
    );
}
