import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { PiHeartStraight } from "react-icons/pi";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import { IoClose, IoEnterOutline } from "react-icons/io5";
import { latestReleases, concerts, activity } from "../data/eventData";
import filters from "../data/filterData";
import "../assets/scss/components/_navbar.scss";
import EventSlider from "./EventSlider";
import EventSliderVertical from "./EventSliderVertical";

export default function Navbar() {
    // Kullanıcı, arama durumu ve sayfa türü (detay sayfası mı?) state'leri
    const [user, setUser] = useState(null);
    const [showSearch, setShowSearch] = useState(false);
    const [isDetailPage, setIsDetailPage] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState("tumu");
    const [menuOpen, setMenuOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    // React Router'dan gerekli hook'lar
    const location = useLocation();
    const navigate = useNavigate();
    const searchRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Kullanıcı bilgisini localStorage'dan alıp API'den çekme fonksiyonu
    const fetchUser = async () => {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId) {
            try {
                const response = await axios.get(`https://67c98ac5102d684575c2808b.mockapi.io/users/users/${storedUserId}`);
                setUser(response.data);
            } catch (error) {
                console.error("Kullanıcı bilgileri alınırken hata oluştu:", error);
                setUser(null);
            }
        } else {
            setUser(null);
        }
    };

    // Sayfa yüklendiğinde ve localStorage değiştiğinde kullanıcı bilgisini al
    useEffect(() => {
        fetchUser();

        const handleStorageChange = (e) => {
            if (e.key === "userId") {
                fetchUser();
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    // Sayfa değiştiğinde arama panelini kapat
    useEffect(() => setShowSearch(false), [location.pathname]);

    // Kullanıcı avatarına tıklama - profil veya giriş ekranına yönlendirir
    const handleUserClick = () => {
        if (user) {
            navigate("/profil");
        } else {
            navigate("/giris-secenekleri");
        }
    };

    // Çıkış yap fonksiyonu - localStorage temizlenir, anasayfaya yönlendirilir
    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("userId");
        setUser(null);
        navigate("/");
    };

    // Arama panelini açma/kapatma fonksiyonları
    const handleSearchClick = () => setShowSearch(true);
    const closeSearch = () => setShowSearch(false);

    // Sayfa detay sayfası mı kontrolü (örneğin etkinlik detay sayfası gibi)
    useEffect(() => {
        const detailElement = document.getElementById("detail-page");
        setIsDetailPage(!!detailElement);
    }, [location.pathname]);

    // Filtre butonuna tıklama - seçili filtreyi değiştirir
    // const handleFilterSelect = (filterName) => {
    //     setSelectedFilter(filterName);
    // };

    // Etkinlikleri seçilen filtreye göre süzme fonksiyonu
    const filterEvents = (events) => {
        if (selectedFilter === "tumu") return events;
        return events.filter(event => event.category === selectedFilter);
    };

    const setViewportHeight = () => {
        document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
    };
    
    window.addEventListener("resize", setViewportHeight);
    setViewportHeight();

    return (
        <nav className={`navbar ${isDetailPage ? "detail-navbar" : ""}`}>
            <div className="container">
                {/* Logo */}
                <div className="navbar-logo">
                    <Link to="/">
                        <img src="/assets/images/geik_logo_blue.svg" alt="Logo" />
                    </Link>
                </div>

                {/* Menü linkleri */}
                <ul className="navbar-links">
                    <li><Link to="/">Ana Sayfa</Link></li>
                    <li><Link to="/takvim">Takvim</Link></li>
                    <li><Link to="/">Canlı TV</Link></li>
                </ul>

                {/* Sağ üst bölüm - arama, favoriler, kullanıcı alanı */}
                <div className="navbar-right">
                    {/* Arama ikonu */}
                    <div className="search-container" ref={searchRef}>
                        <CiSearch className="navbar-icon" onClick={handleSearchClick} />
                    </div>

                    {/* Kullanıcı giriş yaptıysa gösterilecek alan */}
                    {user ? (
                        <>
                            {/* Favoriler ikonu */}
                            <PiHeartStraight
                                className="navbar-icon d-lg-flex d-none"
                                onClick={() => {
                                    if (user.isSubscriber) {
                                        navigate("/profil", { state: { openTab: "favorites" } });
                                    } else {
                                        alert("Favorilere erişmek için abone olmanız gerekmektedir.");
                                    }
                                }}
                            />
                            {/* Kullanıcı avatarı ve menü */}
                            <div className="user-menu-container d-lg-flex d-none">
                                <img
                                    src={user.avatar || "/assets/images/default_user.svg"}
                                    alt={user.name}
                                    className="user-avatar"
                                    onClick={handleUserClick}
                                />
                                <div className="user-menu">
                                    <button className="link-btn" onClick={() => navigate("/profil", { state: { openTab: "favorites" } })}>
                                        Profil
                                    </button>
                                    <button className="link-btn" onClick={() => navigate("/profil", { state: { openTab: "settings" } })}>
                                        Hesap Ayarları
                                    </button>
                                    <button className="link-btn" onClick={() => navigate("/profil", { state: { openTab: "upcoming-events" } })}>
                                        Yaklaşan Etkinliklerim
                                    </button>
                                    <button className="logout-btn" onClick={handleLogout}>
                                        Çıkış Yap
                                    </button>
                                </div>
                            </div>
                            <HiOutlineBars3BottomLeft
                                className="navbar-mobile-menu d-lg-none d-flex"
                                onClick={() => setMenuOpen(true)}
                            />
                        </>
                    ) : (
                        // Kullanıcı giriş yapmadıysa gösterilecek butonlar
                        <>
                            <button className="geik-button-1" onClick={() => navigate("/giris-secenekleri")}>
                                Giriş Yap
                            </button>
                            <button className="geik-button-1 button-white" onClick={() => navigate("/kayit-ol")}>
                                Kayıt Ol
                            </button>
                            {/* Mobil menü */}
                            <HiOutlineBars3BottomLeft
                                className="navbar-mobile-menu d-lg-none d-flex"
                                onClick={() => setMenuOpen(true)}
                            />
                        </>
                    )}
                </div>
            </div>

            {/* Arama paneli (açılır kapanır) */}
            {showSearch && (
                <div className="search-overlay">
                    <div className="container">
                        {/* Arama üst menü (logo ve giriş) */}
                        <div className="search-nav">
                            <div className="navbar-logo">
                                <Link to="/">
                                    <img src="/assets/images/geik_logo_blue.svg" alt="Logo" />
                                </Link>
                            </div>
                            <div className="search-box">
                                <input type="text" placeholder="Ara..." onFocus={() => setIsTyping(true)} onBlur={() => setTimeout(() => setIsTyping(false), 200)}/>
                                <IoClose className="close-icon" onClick={() => { closeSearch(); setIsTyping(false); }}/>
                            </div>
                            <div className="navbar-right">
                                {user ? (
                                    <img
                                        src={user?.avatar || "/assets/images/default_user.svg"}
                                        alt={user?.name || "Kullanıcı"}
                                        className="user-avatar"
                                        onClick={handleUserClick}
                                    />
                                ) : (
                                    <IoEnterOutline
                                        className="login-icon"
                                        onClick={() => navigate("/giris-secenekleri")}
                                    />
                                )}
                            </div>
                        </div>

                        {/* Filtre butonları */}
                        {(isTyping || !isMobile) && (
                            <div className="filter-buttons">
                                {filters.map((filter, index) => (
                                    <button key={index}
                                        className={`filter-btn ${selectedFilter === filter.categoryName ? "active" : ""}`}
                                        onClick={() => setSelectedFilter(filter.categoryName)}
                                    >
                                        {filter.label}
                                        <filter.icon />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {(isMobile ? !isTyping : true) && (
                        <>
                        {/* Filtrelenmiş etkinlik slider'ları */}
                        {filterEvents(latestReleases).length > 0 && (
                            <EventSlider sectionTitle="En Son Çıkanlar" events={filterEvents(latestReleases)} />
                        )}
                        {filterEvents(concerts).length > 0 && (
                            <EventSlider sectionTitle="Konserler" events={filterEvents(concerts)} />
                        )}
                        {filterEvents(activity).length > 0 && (
                            <EventSliderVertical sectionTitle="Etkinlikler" events={filterEvents(activity)} />
                        )}
                        </>
                    )}
                </div>
            )}

            {/* Mobil Menü */}
            {menuOpen && (
                <div className="mobile-menu-overlay">
                    <div className="mobile-menu-container">
                        <div className="mobile-menu-top w-100">
                            {/* Üst Kısım - Logo ve Kapatma Butonu */}
                            <div className="mobile-menu-header">
                                <Link to="/">
                                    <img src="/assets/images/geik_logo_blue.svg" alt="Logo" className="mobile-logo" />
                                </Link>
                                <IoClose className="close-icon" onClick={() => setMenuOpen(false)} />
                            </div>
    
                            {/* Menü Linkleri */}
                            <ul className="mobile-menu-links">
                                <li><Link to="/" onClick={() => setMenuOpen(false)}>Ana Sayfa</Link></li>
                                <li><Link to="/takvim" onClick={() => setMenuOpen(false)}>Takvim</Link></li>
                                <li><Link to="/canli-tv" onClick={() => setMenuOpen(false)}>Canlı TV</Link></li>
                                {user && <li><Link to="/profil" state={{ openTab: "favorites" }} onClick={() => setMenuOpen(false)}>Favorilerim</Link></li>}
                                {user && <li><Link to="/profil" onClick={() => setMenuOpen(false)}>Profilim</Link></li>}
                            </ul>
                        </div>

                        {/* Alt Kısım - Giriş/Çıkış Butonları */}
                        <div className="mobile-menu-footer">
                            {user ? (
                                <button className="geik-button-1 logout-btn" onClick={() => { handleLogout(); setMenuOpen(false); }}>
                                    Çıkış Yap
                                </button>
                            ) : (
                                <>
                                    <button className="geik-button-1" onClick={() => { navigate("/kayit-ol"); setMenuOpen(false); }}>
                                        Kayıt Ol
                                    </button>
                                    <button className="geik-button-1 button-white" onClick={() => { navigate("/giris-secenekleri"); setMenuOpen(false); }}>
                                        Giriş Yap
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
