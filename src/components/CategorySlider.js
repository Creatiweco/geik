import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/scss/components/_categorySlider.scss";
import { Link } from "react-router-dom";
import categories from "../data/categoryData"; // Kategorileri dışarıdan alıyoruz.

export default function CategorySlider() {
    return (
        <section className="category-section">
            <div className="container">
                <h4 className="section-title">Diğer Kategorileri Keşfet</h4>
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
                    className="category-swiper"
                >
                    {categories.map((category) => (
                        <SwiperSlide key={category.id}>
                            <Link to={category.link}>
                                <div className="category-card">
                                    <div className="category-image">
                                        <img src={category.image} alt={category.name} />
                                        <h5 className="category-name">
                                            {category.name} <category.icon />
                                        </h5>
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
