import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/scss/components/_eventSlider.scss";
import { FaPlus } from "react-icons/fa";

export default function EventSlider({ sectionTitle, events }) {
    return (
        <section className="event-section">
            <div className="container">
                <h2 className="section-title">{sectionTitle}</h2>
                <Swiper
                    slidesPerView={4} 
                    spaceBetween={26} 
                    loop={false}
                    className="event-swiper"
                >
                    {events.map((event) => (
                        <SwiperSlide key={event.id}>
                            <div className="event-card">
                                <div className="event-image">
                                    <img src={event.image} alt={event.name} />
                                    <div className="event-date">{event.day} <span>{event.month}</span></div>
                                    <button className="event-plus"><FaPlus /></button>
                                    <h3 className="event-name">{event.name}</h3>
                                </div>
                                <div className="event-info">
                                    {event.venue && (
                                        <>
                                            <p className="event-venue">{event.venue}</p>
                                            <p className="event-date-bottom">{event.day} <span>{event.month}</span></p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
