import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { getAverageColor } from "../utils/color"; // Görselden ortalama renk almak için kullanılan yardımcı fonksiyon
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/scss/components/_slider.scss";

export default function Slider() {
    // Arka plan rengini ve aktif slide index'ini tutan state'ler
    const [bgColor, setBgColor] = useState('rgba(8, 32, 104, 0.5)');
    const [activeIndex, setActiveIndex] = useState(0);

    // Slider içerik verileri (statik veriler)
    const slides = [
        { 
            id: 1, 
            image: "/assets/images/slider2.png", 
            title: "KONSER", 
            description: "Konser biletleri ve etkinlikleri burada! Hemen tıklayıp konser takvimini gör",
            button1: { text: "Şimdi İzle", link: "#" },
            button2: { link: "#" }
        },
        { 
            id: 2, 
            image: "/assets/images/slider1.jpg", 
            title: "KONSER", 
            description: "Bu bir örnek açıklama metnidir.",
            button1: { text: "Şimdi İzle", link: "#" },
            button2: { link: "#" }
        },
        { 
            id: 3, 
            image: "/assets/images/slider3.jpg", 
            title: "KONSER", 
            description: "Konser biletleri ve etkinlikleri burada! Hemen tıklayıp konser takvimini gör",
            button1: { text: "Şimdi İzle", link: "#" },
            button2: { link: "#" }
        },
        { 
            id: 4, 
            image: "/assets/images/slider1.jpg", 
            title: "KONSER", 
            description: "Konser biletleri ve etkinlikleri burada! Hemen tıklayıp konser takvimini gör",
            button1: { text: "Şimdi İzle", link: "#" },
            button2: { link: "#" }
        },
        { 
            id: 5, 
            image: "/assets/images/slider2.png", 
            title: "KONSER", 
            description: "Bu bir örnek açıklama metnidir.",
            button1: { text: "Şimdi İzle", link: "#" },
            button2: { link: "#" }
        },
        { 
            id: 6, 
            image: "/assets/images/slider3.jpg", 
            title: "KONSER", 
            description: "Konser biletleri ve etkinlikleri burada! Hemen tıklayıp konser takvimini gör",
            button1: { text: "Şimdi İzle", link: "#" },
            button2: { link: "#" }
        },
    ];

    // Aktif slide değiştiğinde tetiklenir, görselin ortalama rengine göre arka plan rengini günceller
    const handleSlideChange = (swiper) => {
        const activeSlide = swiper.slides[swiper.activeIndex];
        const img = activeSlide.querySelector('img');

        if (img.complete) {
            updateBackgroundColor(img);
        } else {
            img.onload = () => updateBackgroundColor(img);
        }
    };

    // Görselden ortalama rengi hesaplayıp arka planı güncelleyen fonksiyon
    const updateBackgroundColor = (img) => {
        const color = getAverageColor(img);
        setBgColor(color);
    };

    // Sayfa yüklendiğinde ilk slide'ın arka plan rengi ayarlanır
    useEffect(() => {
        const firstImage = document.querySelector(".swiper-slide-active img");
        if (firstImage && firstImage.complete) {
            updateBackgroundColor(firstImage);
        } else if (firstImage) {
            firstImage.onload = () => updateBackgroundColor(firstImage);
        }
    }, []);

    return (
        <div className="home-slider">
            {/* Arka plan için dinamik renkli gradient alan */}
            <div 
                className="slider-gradient" 
                style={{ background: `radial-gradient(circle, ${bgColor} 100%, ${bgColor} 100%)` }}
            ></div>

            <div className="overflow-hidden">
                <div className="container">
                    <div className="row justify-content-center">
                        <Swiper
                            modules={[EffectCoverflow, Navigation, Pagination]}
                            effect="coverflow"
                            slidesPerView={1}
                            centeredSlides={true}
                            loop={true}
                            navigation={true}
                            breakpoints={{
                                0: {
                                    navigation: { enabled: false },
                                    coverflowEffect: {
                                        rotate: 0,
                                        stretch: 0,
                                        depth: 150,
                                        modifier: 1.5,
                                        slideShadows: false,
                                    },
                                },
                                576: {
                                    navigation: { enabled: false },
                                    coverflowEffect: {
                                        rotate: 0,
                                        stretch: 0,
                                        depth: 150,
                                        modifier: 1.5,
                                        slideShadows: false,
                                    },
                                },
                                768: {
                                    navigation: { enabled: false },
                                    coverflowEffect: {
                                        rotate: 0,
                                        stretch: 0,
                                        depth: 150,
                                        modifier: 1.5,
                                        slideShadows: false,
                                    },
                                },
                                992: {
                                    navigation: { enabled: true },
                                    coverflowEffect: {
                                        rotate: 0,
                                        stretch: 0,
                                        depth: 150,
                                        modifier: 1.5,
                                        slideShadows: false,
                                    },
                                },
                                1200: {
                                    navigation: { enabled: true },
                                    coverflowEffect: {
                                        rotate: 0,
                                        stretch: 0,
                                        depth: 150,
                                        modifier: 1.5,
                                        slideShadows: false,
                                    },
                                },
                            }}
                            spaceBetween={190}
                            className="custom-swiper"
                            onSlideChange={(swiper) => {
                                handleSlideChange(swiper);   // Slide değişiminde arka plan rengini güncelle
                                setActiveIndex(swiper.realIndex);  // Aktif index'i güncelle
                            }}
                        >
                            {/* Slider içindeki her bir slide'ı döngüyle oluştur */}
                            {slides.map((slide) => (
                                <SwiperSlide key={slide.id}>
                                    <div className="slide-content">
                                        <img src={slide.image} alt={`Slide ${slide.id}`} />
                                        <div className="text-overlay">
                                            <h2>{slide.title}</h2>
                                            <p>{slide.description}</p>
                                            <div className="buttons">
                                                <Link to={slide.button1.link} className="slider-primary-btn">
                                                    {slide.button1.text}
                                                </Link>
                                                <button className="slider-second-btn"><FaPlus/></button>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>

            {/* Alt kısımdaki özel slider sayfa göstergesi (pagination) */}
            <div className="custom-pagination container">
                {slides.map((_, index) => (
                    <span
                        key={index}
                        className={`pagination-dot ${index === activeIndex ? 'active' : ''}`}
                    ></span>
                ))}
            </div>
        </div>
    );
}
