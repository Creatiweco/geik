import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../assets/scss/components/_navbar.scss";
import { CiSearch } from "react-icons/ci";
import { PiHeartStraight } from "react-icons/pi";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import { IoClose, IoEnterOutline, IoExitOutline } from "react-icons/io5";
import filters from "../data/filterData"; 
import { latestReleases, concerts, activity } from "../data/eventData";
import EventSlider from "./EventSlider";
import EventSliderVertical from "./EventSliderVertical";
import axios from "axios";

export default function Navbar() {
    const [user, setUser] = useState(null);
    const [showSearch, setShowSearch] = useState(false);
    const [isDetailPage, setIsDetailPage] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState("tumu"); 

    const location = useLocation();
    const searchRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId) {
            try {
                const response = axios.get(`https://67c98ac5102d684575c2808b.mockapi.io/users/users/${storedUserId}`);
                setUser(response.data);
            } catch (error) {
                setUser(null);
            }
        } else {
            setUser(null);
        }
    }, []);

    useEffect(() => setShowSearch(false), [location.pathname]);

    const handleUserClick = () => {
        if (user) {
            navigate("/profil");
        } else {
            navigate("/giris-secenekleri");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/");
    };

    const handleSearchClick = () => setShowSearch(true);
    const closeSearch = () => setShowSearch(false);

    useEffect(() => {
        const detailElement = document.getElementById("detail-page");
        setIsDetailPage(!!detailElement);
    }, [location.pathname]);

    const handleFilterSelect = (filterName) => {
        setSelectedFilter(filterName);
    };

    const filterEvents = (events) => {
        if (selectedFilter === "tumu") return events;
        return events.filter(event => event.category === selectedFilter);
    };

    return (
        <nav className={`navbar ${isDetailPage ? "detail-navbar" : ""}`}>
            <div className="container">
                <div className="navbar-logo">
                    <Link to="/">
                        <img src="/assets/images/geik_logo_blue.svg" alt="Logo" />
                    </Link>
                </div>
                <ul className="navbar-links">
                    <li><Link to="/">Ana Sayfa</Link></li>
                    <li><Link to="/takvim">Takvim</Link></li>
                    <li><Link to="/">Canlı TV</Link></li>
                </ul>

                <div className="navbar-right">
                    <div className="search-container" ref={searchRef}>
                        <CiSearch className="navbar-icon" onClick={handleSearchClick} />
                    </div>

                    {user ? (
                        <>
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
                            <div className="user-menu-container">
                                <img
                                    src={user.avatar || "/assets/images/default_user.svg"}
                                    alt={user.name}
                                    className="user-avatar"
                                    onClick={handleUserClick}
                                />
                                <div className="user-menu">
                                    <button className="logout-btn" onClick={handleLogout}>Çıkış Yap <IoExitOutline/></button>
                                </div>
                            </div>

                        </>
                    ) : (
                        <>
                            <button className="geik-button-1" onClick={() => navigate("/giris-secenekleri")}>Giriş Yap</button>
                            <button className="geik-button-1 button-white" onClick={() => navigate("/kayit-ol")}>Kayıt Ol</button>
                            <div className="user-menu-container">
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

            {showSearch && (
                <div className="search-overlay">
                    <div className="container">
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
