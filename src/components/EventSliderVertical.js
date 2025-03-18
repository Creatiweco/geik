import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaPlus } from "react-icons/fa";
import "swiper/css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/scss/components/_eventSlider.scss";

// Dikey yapıda etkinlikleri gösteren slider bileşeni
export default function EventSliderVertical({ sectionTitle, events }) {
    return (
        <section className="event-section">
            <div className="container">
                {/* Bölüm başlığı */}
                <h4 className="section-title">{sectionTitle}</h4>

                {/* Swiper bileşeni - kaydırılabilir etkinlik kartları */}
                <Swiper
                    slidesPerView={4} // Varsayılan görünür etkinlik sayısı
                    spaceBetween={26} // Kartlar arası mesafe
                    loop={false} // Sonsuz döngü kapalı
                    breakpoints={{ // Farklı ekran boyutları için duyarlı yapı
                        0: {
                            slidesPerView: 1.3,
                            spaceBetween: 12,
                        },
                        576: {
                            slidesPerView: 1.5,
                            spaceBetween: 12,
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 26,
                        },
                        992: {
                            slidesPerView: 4,
                            spaceBetween: 26,
                        },
                        1200: {
                            slidesPerView: 4,
                            spaceBetween: 26,
                        },
                    }}
                    className="event-swiper"
                >
                    {/* Gelen etkinlikler map ile dönülüp her biri SwiperSlide içinde gösterilir */}
                    {events.map((event) => (
                        <SwiperSlide key={event.id}>
                            <Link to={event.link}>
                                <div className="event-card">
                                    {/* Etkinliğin görseli ve favorilere ekleme butonu */}
                                    <div className="event-image-vertical">
                                        <img src={event.image} alt={event.name} />
                                        <button className="event-plus"><FaPlus /></button>
                                    </div>

                                    {/* Etkinlik detayları - ad, mekan, tarih */}
                                    <div className="event-info">
                                        {event.venue && (
                                            <>
                                                <h5 className="event-name-bottom">{event.name}</h5>
                                                <p className="event-venue">{event.venue}</p>
                                                <p className="event-date-bottom">
                                                    <span>{event.month}</span> {event.day}
                                                </p>
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
