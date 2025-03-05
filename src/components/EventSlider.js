import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/scss/components/_eventSlider.scss";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function EventSlider({ sectionTitle, events }) {
    return (
        <section className="event-section">
            <div className="container">
                <h4 className="section-title">{sectionTitle}</h4>
                <Swiper
                    slidesPerView={4} 
                    spaceBetween={26} 
                    loop={false}
                    breakpoints={{
                        0: {
                            slidesPerView:1.3,
                            spaceBetween:12,
                        },
                        576: {
                          slidesPerView:1.5,
                          spaceBetween:12,
                        },
                        768: {
                            slidesPerView:4,
                            spaceBetween:26,
                        },
                        992: {
                          slidesPerView:4,
                          spaceBetween:26,
                        },
                        1200: {
                            slidesPerView:4,
                            spaceBetween:26,
                        },
                    }}
                    className="event-swiper"
                >
                    {events.map((event) => (
                        <SwiperSlide key={event.id}>
                            <Link to={event.link}>
                                <div className="event-card">
                                    <div className="event-image">
                                        <img src={event.image} alt={event.name} />
                                        <div className="event-date">{event.day} <span>{event.month}</span></div>
                                        <button className="event-plus"><FaPlus /></button>
                                        <h5 className="event-name">{event.name}</h5>
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
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
