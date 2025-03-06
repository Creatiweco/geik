import React, { useState } from "react";
import { GrLocationPin } from "react-icons/gr";
import { Link } from "react-router-dom";
import "../assets/scss/pages/_eventCalender.scss";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import filters from "../data/filterData"; 
import { calenderEvents } from "../data/eventData";

export default function EventCalender() {
    const [isOpen, setIsOpen] = useState(false); // Kategori filtresinin açık/kapalı durumu
    const [selectedFilter, setSelectedFilter] = useState("tumu"); // Seçili kategori (varsayılan: "tümü")

    // Filtre seçildiğinde seçili kategoriyi günceller ve menüyü kapatır
    const handleFilterSelect = (filterCategoryName) => {
        setSelectedFilter(filterCategoryName);
        setIsOpen(false);
    };

    // Kategoriye göre ikon bulur (filterData içinden)
    const getIconByCategory = (category) => {
        const filter = filters.find(f => f.categoryName === category.toLowerCase());
        return filter ? filter.icon : null;
    };

    return (
        <div className="event-calender">
            <div className="container">
                
                {/* Sayfa başlığı ve kategori seçici */}
                <div className="calender-heading">
                    <h1>TAKVİM</h1>

                    {/* Kategori seçici kutusu */}
                    <div className="custom-select">
                        <div className="select-box" onClick={() => setIsOpen(!isOpen)}>
                            {/* Seçili kategorinin label'ını göster */}
                            <span>{filters.find(f => f.categoryName === selectedFilter)?.label || "Tümü"}</span>
                            {/* Ok ikonu (açık/kapalı duruma göre değişir) */}
                            {isOpen ? <FaChevronDown className="arrow-icon" /> : <FaChevronRight className="arrow-icon" />}
                        </div>

                        {/* Kategori listesi */}
                        <ul className={`filter-menu ${isOpen ? "open" : ""}`}>
                            {filters.map((filter, index) => (
                                <li
                                    key={index}
                                    className={selectedFilter === filter.categoryName ? "active" : ""}
                                    onClick={() => handleFilterSelect(filter.categoryName)}
                                >
                                    {filter.label} <filter.icon />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Takvim etkinliklerini listeleyen bölüm */}
                <div className="calender-body">
                    {calenderEvents.map((event, index) => {
                        // Seçili kategoriye uygun etkinlikleri filtrele
                        const filteredItems = event.items.filter(
                            item => selectedFilter === "tumu" || item.category.toLowerCase() === selectedFilter
                        );

                        // Eğer o tarihte seçili kategoriye uygun etkinlik yoksa, o tarihi gösterme
                        if (filteredItems.length === 0) return null;

                        return (
                            <div key={index} className="calender-row row">
                                {/* Etkinlik tarihi */}
                                <div className="col-lg-2 col-12 calender-date">
                                    <h3>{event.date}</h3>
                                </div>

                                {/* Etkinliklerin listesi */}
                                <div className="col-lg-10 col-12 calender-grid">
                                    {filteredItems.map((item, i) => {
                                        const IconComponent = getIconByCategory(item.category); // Etkinlik ikonunu al
                                        return (
                                            <Link key={i} to={item.link} className="calender-item">
                                                <div className="left-col">
                                                    {/* Kategorinin ikonunu göster */}
                                                    {IconComponent && <IconComponent />}
                                                    <p>{item.time}</p>
                                                </div>
                                                <div className="right-col">
                                                    <h5>{item.title}</h5>
                                                    <div className="location">
                                                        <p>{item.location}</p>
                                                        {/* Google Maps linki */}
                                                        <a href={item.map}>
                                                            <GrLocationPin />
                                                        </a>
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
