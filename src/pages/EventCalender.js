import React, { useState } from "react";
import { LuMicVocal } from "react-icons/lu";
import { GrLocationPin } from "react-icons/gr";
import { Link } from "react-router-dom";
import "../assets/scss/pages/_eventCalender.scss";
import { CiBasketball } from "react-icons/ci";
import { FaPalette, FaRegStar, FaTheaterMasks } from "react-icons/fa";
import { FaEarListen } from "react-icons/fa6";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";

export default function EventCalender() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState("Tümü");

    const filters = [
        { label: "Tümü", icon: <HiOutlineBars3BottomLeft/> }, 
        { label: "Spor", icon: <CiBasketball /> },
        { label: "Etkinlik", icon: <FaPalette /> },
        { label: "Stand Up", icon: <FaEarListen /> },
        { label: "Eğlence", icon: <FaRegStar /> },
        { label: "Tiyatro", icon: <FaTheaterMasks /> },
        { label: "Konser", icon: <LuMicVocal /> }
    ];

    const handleFilterSelect = (filter) => {
        setSelectedFilter(filter);
        setIsOpen(false); 
    };

    const events = [
        {
            date: "1 Şubat",
            items: [
                { title: "Can Ozan", time: "22.00", location: "Hayal Kahvesi",link:"/detay", icon: <LuMicVocal />, category: "Konser" },
                { title: "Disco Topu", time: "19.00", location: "Akasya AVM",link:"/detay", icon: <FaTheaterMasks />, category: "Tiyatro" },
                { title: "Frida Kahlo’nun Günlükleri sergisi", time: "19.00", location: "Akasya AVM",link:"/detay", icon: <FaTheaterMasks />, category: "Tiyatro" },
            ]
        },
        {
            date: "2 Şubat",
            items: [
                { title: "Can Ozan", time: "22.00", location: "Hayal Kahvesi",link:"/detay", icon: <LuMicVocal />, category: "Konser" },
                { title: "Can Ozan", time: "22.00", location: "Hayal Kahvesi",link:"/detay", icon: <LuMicVocal />, category: "Konser" },
            ]
        },
        {
            date: "3 Şubat",
            items: [
                { title: "Can Ozan", time: "22.00", location: "Hayal Kahvesi",link:"/detay", icon: <LuMicVocal />, category: "Konser" },
            ]
        },
        {
            date: "4 Şubat",
            items: [
                { title: "Can Ozan", time: "22.00", location: "Hayal Kahvesi",link:"/detay", icon: <LuMicVocal />, category: "Konser" },
            ]
        },
        {
            date: "5 Şubat",
            items: [
                { title: "Can Ozan", time: "22.00", location: "Hayal Kahvesi",link:"/detay", icon: <LuMicVocal />, category: "Konser" },
                { title: "Frida Kahlo’nun Günlükleri sergisi", time: "19.00", location: "Akasya AVM",link:"/detay", icon: <FaTheaterMasks />, category: "Tiyatro" },
                { title: "Disco Topu", time: "19.00", location: "Akasya AVM",link:"/detay", icon: <FaTheaterMasks />, category: "Tiyatro" },
            ]
        }
    ];

    return (
        <div className="event-calender">
            <div className="container">
                <div className="calender-heading">
                    <h2>TAKVİM</h2>
                    <div className="custom-select">
                        <div className="select-box" onClick={() => setIsOpen(!isOpen)}>
                            <span>{selectedFilter}</span>
                            {isOpen ? <FaChevronDown className="arrow-icon" /> : <FaChevronRight className="arrow-icon" />}
                        </div>
                        <ul className={`filter-menu ${isOpen ? "open" : ""}`}>
                            {filters.map((filter, index) => (
                                <li
                                    key={index}
                                    className={selectedFilter === filter.label ? "active" : ""}
                                    onClick={() => handleFilterSelect(filter.label)}
                                >
                                    {filter.label} {filter.icon}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="calender-body">
                    {events.map((event, index) => {
                        const filteredItems = event.items.filter(
                            item => selectedFilter === "Tümü" || item.category === selectedFilter
                        );
                        if (filteredItems.length === 0) return null;
                        return (
                            <div key={index} className="calender-row row">
                                <div className="col-2 calender-date">
                                    <h2>{event.date}</h2>
                                </div>
                                <div className="col-10 calender-grid">
                                    {filteredItems.map((item, i) => (
                                        <Link key={i} to={item.link} className="calender-item">
                                            <div className="left-col">
                                                {item.icon}
                                                <p>{item.time}</p>
                                            </div>
                                            <div className="right-col">
                                                <h2>{item.title}</h2>
                                                <div className="location">
                                                    <p>{item.location}</p>
                                                    <a href="https://maps.app.goo.gl/ds5nzextcXmeWMr1A"><GrLocationPin /></a>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
