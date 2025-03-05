import React, { useState } from "react";
import { GrLocationPin } from "react-icons/gr";
import { Link } from "react-router-dom";
import "../assets/scss/pages/_eventCalender.scss";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import filters from "../data/filterData"; 
import { calenderEvents } from "../data/eventData";

export default function EventCalender() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState("tumu"); 

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
                    <h1>TAKVİM</h1>
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
                        const filteredItems = event.items.filter(
                            item => selectedFilter === "tumu" || item.category.toLowerCase() === selectedFilter
                        );

                        if (filteredItems.length === 0) return null;

                        return (
                            <div key={index} className="calender-row row">
                                <div className="col-lg-2 col-12 calender-date">
                                    <h3>{event.date}</h3>
                                </div>
                                <div className="col-lg-10 col-12 calender-grid">
                                    {filteredItems.map((item, i) => {
                                        const IconComponent = getIconByCategory(item.category);
                                        return (
                                            <Link key={i} to={item.link} className="calender-item">
                                                <div className="left-col">
                                                    {IconComponent && <IconComponent />}
                                                    <p>{item.time}</p>
                                                </div>
                                                <div className="right-col">
                                                    <h5>{item.title}</h5>
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
