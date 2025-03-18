import React from "react";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";

export default function SubscriptionBanner({ isVisible, isSticky, isUserLoggedIn, setIsVisible }) {
    const navigate = useNavigate();

    if (!isVisible) return null; // Eğer görünmüyorsa hiç render etme

    return (
        <div className={`container subscriber-banner ${isSticky ? "subscriber-banner-sticky" : ""}`}>
            <div className="subscriber-text">
                <p>
                    Etkinliklere katılmak ve avantajlardan yararlanmak için
                    <button
                        onClick={() =>
                            navigate(isUserLoggedIn ? "/profil" : "/giris-secenekleri", { state: { openTab: "payment" } })
                        }
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
                    onClick={() =>
                        navigate(isUserLoggedIn ? "/profil" : "/giris-secenekleri", { state: { openTab: "payment" } })
                    }
                >
                    {isUserLoggedIn ? "Abone Ol" : "Kayıt Ol"}
                </button>
                <button className="subscriber-close" onClick={() => setIsVisible(false)}>
                    <IoClose />
                </button>
            </div>
        </div>
    );
}
