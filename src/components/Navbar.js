import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { PiHeartStraight } from "react-icons/pi";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import { IoClose, IoEnterOutline, IoExitOutline } from "react-icons/io5";
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

    // React Router'dan gerekli hook'lar
    const location = useLocation();
    const navigate = useNavigate();
    const searchRef = useRef(null);

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
    const handleFilterSelect = (filterName) => {
        setSelectedFilter(filterName);
    };

    // Etkinlikleri seçilen filtreye göre süzme fonksiyonu
    const filterEvents = (events) => {
        if (selectedFilter === "tumu") return events;
        return events.filter(event => event.category === selectedFilter);
    };

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
                                className="navbar-icon"
                                onClick={() => {
                                    if (user.isSubscriber) {
                                        navigate("/profil", { state: { openTab: "favorites" } });
                                    } else {
                                        alert("Favorilere erişmek için abone olmanız gerekmektedir.");
                                    }
                                }}
                            />
                            {/* Kullanıcı avatarı ve menü */}
                            <div className="user-menu-container">
                                <img
                                    src={user.avatar || "/assets/images/default_user.svg"}
                                    alt={user.name}
                                    className="user-avatar"
                                    onClick={handleUserClick}
                                />
                                <div className="user-menu">
                                    <button className="logout-btn" onClick={handleLogout}>
                                        Çıkış Yap <IoExitOutline />
                                    </button>
                                </div>
                            </div>
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
                            <div className="user-menu-container d-lg-none d-flex">
                                <HiOutlineBars3BottomLeft className="navbar-mobile-menu" />
                                <div className="user-menu">
                                    <ul>
                                        <li><Link to="/">Ana Sayfa</Link></li>
                                        <li><Link to="/takvim">Takvim</Link></li>
                                        <li><Link to="/">Canlı TV</Link></li>
                                    </ul>
                                </div>
                            </div>
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
                                <input type="text" placeholder="Ara..." autoFocus />
                                <IoClose className="close-icon" onClick={closeSearch} />
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
                        <div className="filter-buttons">
                            {filters.map((filter, index) => (
                                <button key={index}
                                    className={`filter-btn ${selectedFilter === filter.categoryName ? "active" : ""}`}
                                    onClick={() => handleFilterSelect(filter.categoryName)}
                                >
                                    {filter.label}
                                    <filter.icon />
                                </button>
                            ))}
                        </div>
                    </div>

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
                </div>
            )}
        </nav>
    );
}
