import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../assets/scss/components/_navbar.scss";
import { CiSearch, CiBasketball } from "react-icons/ci";
import { PiHeartStraight } from "react-icons/pi";
import { IoClose } from "react-icons/io5";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import { FaPalette, FaRegStar, FaTheaterMasks } from "react-icons/fa";
import { FaEarListen } from "react-icons/fa6";
import { GiMicrophone } from "react-icons/gi";
import EventSlider from "./EventSlider";
import EventSliderVertical from "./EventSliderVertical";



export default function Navbar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [isDetailPage, setIsDetailPage] = useState(false)
    const location = useLocation();
    const searchRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem("user");
        setIsAuthenticated(!!user);
    }, []);

    const handleUserClick = () => {
        if (isAuthenticated) {
            navigate("/profil");
        } else {
            navigate("/giris-secenekleri");
        }
    };

    useEffect(() => {
      setShowSearch(false)
    }, [location.pathname]);

    const handleSearchClick = () => {
        setShowSearch(true);
    };

    const closeSearch = () => {
        setShowSearch(false);
    };

    useEffect(() => {
      const checkDetailPage = () => {
        const detailElement = document.getElementById("detail-page")
        setIsDetailPage(!!detailElement)
      };

      checkDetailPage();
    }, [location.pathname]);

    const filters = [
        { name: "Tümü", icon: HiOutlineBars3BottomLeft },
        { name: "Spor", icon: CiBasketball },
        { name: "Konser", icon: GiMicrophone },
        { name: "Etkinlik", icon: FaPalette },
        { name: "Stand Up", icon: FaEarListen },
        { name: "Eğlence", icon: FaRegStar },
        { name: "Tiyatro", icon: FaTheaterMasks }
    ];
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
    const concerts = [
      { 
        id: 1, 
        image: "/assets/images/concert1.png", 
        day: "3",
        month: "Nisan", 
        name: "Güneş", 
        venue: "",
          link: "/detay"
      },
      { 
        id: 2, 
        image: "/assets/images/concert2.png", 
        day: "5",
        month: "Mayıs", 
        name: "Perdenin Ardındakiler", 
        venue: "",
          link: "/detay"
      },
      { 
        id: 3, 
        image: "/assets/images/concert3.png", 
        day: "8",
        month: "Mayıs", 
        name: "Sena Şener", 
        venue: "",
          link: "/detay"
      },
      { 
        id: 4, 
        image: "/assets/images/concert4.png", 
        day: "14",
        month: "Mayıs", 
        name: "Melek Mosso", 
        venue: "",
          link: "/detay"
      },
      { 
        id: 5, 
        image: "/assets/images/concert5.png", 
        day: "7",
        month: "Haziran", 
        name: "Karsu", 
        venue: "",
          link: "/detay"
      }
    ];
    const activity = [
      { 
        id: 1, 
        image: "/assets/images/activity1.png", 
        day: "",
        month: "", 
        name: "", 
        venue: "",
          link: "/detay"
      },
      { 
        id: 2, 
        image: "/assets/images/activity2.png", 
        day: "",
        month: "", 
        name: "", 
        venue: "",
          link: "/detay"
      },
      { 
        id: 3, 
        image: "/assets/images/activity3.png", 
        day: "",
        month: "", 
        name: "", 
        venue: "",
          link: "/detay"
      },
      { 
        id: 4, 
        image: "/assets/images/activity4.png", 
        day: "",
        month: "", 
        name: "", 
        venue: "",
          link: "/detay"
      },
      { 
        id: 5, 
        image: "/assets/images/activity5.png", 
        day: "",
        month: "", 
        name: "", 
        venue: "",
          link: "/detay"
      }
    ];

    return(
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
                    <PiHeartStraight className="navbar-icon" onClick={() => navigate("/favorites")}/>
                    <img
                        src={isAuthenticated? "/assets/images/auth_user.jpg" : "/assets/images/default_user.svg" }
                        alt="Kullanıcı"
                        className="user-avatar"
                        onClick={handleUserClick}
                    />
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
                                <img
                                    src={isAuthenticated? "/assets/images/auth_user.jpg" : "/assets/images/default_user.svg" }
                                    alt="Kullanıcı"
                                    className="user-avatar"
                                    onClick={handleUserClick}
                                />
                            </div>
                        </div>
                        <div className="filter-buttons">
                            {filters.map((filter, index) => (
                                <button key={index} className="filter-btn">
                                    {filter.name}
                                    <filter.icon/>
                                </button>
                            ))}
                        </div>
                    </div>
                    <EventSlider sectionTitle="En Son Çıkanlar" events={latestReleases}/>
                    <EventSlider sectionTitle="Konserler" events={concerts}/>
                    <EventSliderVertical sectionTitle="Etkinlikler" events={activity}/>
                </div>
            )}
        </nav>
    );
}