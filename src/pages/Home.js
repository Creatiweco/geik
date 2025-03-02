import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/scss/pages/_home.scss";
import Slider from "../components/Slider";
import EventSlider from "../components/EventSlider";
import EventSliderVertical from "../components/EventSliderVertical";
import { latestReleases, concerts, activity, theaters, favorites, eventWatch } from "../data/eventData";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";

export default function Home() {
    const [user, setUser] = useState(null);
    const [isVisible, setIsVisible] = useState(false); // Abone banner göster/gizle
    const [isSticky, setIsSticky] = useState(false);   // Sticky class kontrolü

    const navigate = useNavigate();

    // Kullanıcıyı localStorage'dan al ve kontrol et
    const checkUserStatus = () => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);

            // Eğer kullanıcı varsa ve abone değilse banner göster
            if (!parsedUser.isSubscriber) {
                setIsVisible(true);
            } else {
                setIsVisible(false);  // Abone olanlara banner gösterme
            }
        } else {
            setUser(null);
            setIsVisible(false); // Kullanıcı çıkış yapınca banner kapansın
        }
    };

    useEffect(() => {
        checkUserStatus();  // İlk renderda kontrol et

        // Sayfa scroll eventini takip et
        const handleScroll = () => {
            setIsSticky(window.scrollY > 100);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Kullanıcı değişikliklerini (giriş-çıkış) dinle
    useEffect(() => {
        window.addEventListener("storage", checkUserStatus);  // Başka tab'dan da kontrol edebilir
        return () => window.removeEventListener("storage", checkUserStatus);
    }, []);

    return (
        <div className="home-page">
            <Slider />

            {isVisible && (
                <div className={`container subscriber-banner ${isSticky ? "subscriber-banner-sticky" : ""}`}>
                    <div className="subscriber-text">
                        <p>
                            Etkinliklere katılmak ve avantajlardan yararlanmak için
                            <button
                                onClick={() => { navigate("/profil", { state: { openTab: "payment" } }); }}
                                className="subscriber-link"
                            >
                                Abone Ol!
                            </button>
                            <span className="subscriber-tagline"> Buraya ek bir slogan gelebilir...</span>
                        </p>
                    </div>
                    <div className="subscriber-actions">
                        <button
                            className="geik-button-1"
                            onClick={() => { navigate("/profil", { state: { openTab: "payment" } }); }}
                        >
                            Abone Ol
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
