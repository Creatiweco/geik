import React, { useState } from "react";
import { GrLocationPin } from "react-icons/gr";
import { Link } from "react-router-dom";
import "../assets/scss/pages/_eventCalender.scss";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import filters from "../data/filterData"; // Filtreler merkezi.
import { calenderEvents } from "../data/eventData"; // Takvim etkinlikleri buradan gelecek.

export default function EventCalender() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState("tumu"); // Default tümü seçili

    const handleFilterSelect = (filterCategoryName) => {
        setSelectedFilter(filterCategoryName);
        setIsOpen(false);
    };

    const getIconByCategory = (category) => {
        const filter = filters.find(f => f.categoryName === category.toLowerCase());
        return filter ? filter.icon : null;
    };

    return (
        <div className="event-calender">
            <div className="container">
                <div className="calender-heading">
                    <h2>TAKVİM</h2>
                    <div className="custom-select">
                        <div className="select-box" onClick={() => setIsOpen(!isOpen)}>
                            <span>{filters.find(f => f.categoryName === selectedFilter)?.label || "Tümü"}</span>
                            {isOpen ? <FaChevronDown className="arrow-icon" /> : <FaChevronRight className="arrow-icon" />}
                        </div>
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

                <div className="calender-body">
                    {calenderEvents.map((event, index) => {
                        // Her tarih için uygun etkinlikleri filtrele
                        const filteredItems = event.items.filter(
                            item => selectedFilter === "tumu" || item.category.toLowerCase() === selectedFilter
                        );

                        if (filteredItems.length === 0) return null;

                        return (
                            <div key={index} className="calender-row row">
                                <div className="col-2 calender-date">
                                    <h2>{event.date}</h2>
                                </div>
                                <div className="col-10 calender-grid">
                                    {filteredItems.map((item, i) => {
                                        const IconComponent = getIconByCategory(item.category);
                                        return (
                                            <Link key={i} to={item.link} className="calender-item">
                                                <div className="left-col">
                                                    {IconComponent && <IconComponent />}
                                                    <p>{item.time}</p>
                                                </div>
                                                <div className="right-col">
                                                    <h2>{item.title}</h2>
                                                    <div className="location">
                                                        <p>{item.location}</p>
                                                        <a href="https://maps.app.goo.gl/ds5nzextcXmeWMr1A">
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
