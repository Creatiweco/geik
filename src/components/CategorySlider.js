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
                <h2 className="section-title">Diğer Kategorileri Keşfet</h2>
                <Swiper
                    slidesPerView={4} 
                    spaceBetween={26} 
                    loop={false}
                    className="category-swiper"
                >
                    {categories.map((category) => (
                        <SwiperSlide key={category.id}>
                            <Link to={category.link}>
                                <div className="category-card">
                                    <div className="category-image">
                                        <img src={category.image} alt={category.name} />
                                        <h3 className="category-name">
                                            {category.name} <category.icon />
                                        </h3>
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
