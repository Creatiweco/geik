import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaPlus } from "react-icons/fa";
import "swiper/css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/scss/components/_eventSlider.scss";

// EventSlider bileşeni, bir başlık ve etkinlik listesi alır ve bunları slider (kaydırılabilir alan) olarak gösterir.
export default function EventSlider({ sectionTitle, events }) {
    return (
        <section className="event-section">
            <div className="container">
                {/* Bölüm başlığı */}
                <h4 className="section-title">{sectionTitle}</h4>

                {/* Swiper bileşeni - kaydırılabilir etkinlik kartlarını gösterir */}
                <Swiper
                    slidesPerView={4}  // Varsayılan olarak 4 etkinlik gösterilir
                    spaceBetween={26}  // Kartlar arası boşluk
                    loop={false}       // Sonsuz döngü yok
                    breakpoints={{     // Farklı ekran boyutları için ayarlar
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
                    {/* Gelen her etkinliği bir SwiperSlide içine yerleştiriyoruz */}
                    {events.map((event) => (
                        <SwiperSlide key={event.id}>
                            {/* Etkinlik detay sayfasına yönlendiren Link */}
                            <Link to={event.link}>
                                <div className="event-card">
                                    <div className="event-image">
                                        {/* Etkinliğe ait görsel */}
                                        <img src={event.image} alt={event.name} />

                                        {/* Üstte gösterilen tarih bilgisi */}
                                        <div className="event-date">
                                            {event.day} <span>{event.month}</span>
                                        </div>

                                        {/* Favorilere ekleme butonu (tasarım için konulmuş gibi duruyor) */}
                                        <button className="event-plus">
                                            <FaPlus />
                                        </button>

                                        {/* Etkinlik adı */}
                                        <h5 className="event-name">{event.name}</h5>
                                    </div>

                                    {/* Etkinlik mekân ve tekrar tarih bilgisi (varsa göster) */}
                                    <div className="event-info">
                                        {event.venue && (
                                            <>
                                                <p className="event-venue">{event.venue}</p>
                                                <p className="event-date-bottom">
                                                    {event.day} <span>{event.month}</span>
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
