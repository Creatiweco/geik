import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/scss/components/_slider.scss";
import { getAverageColor } from "../utils/color";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";

export default function Slider() {
    const [bgColor, setBgColor] = useState('rgba(8, 32, 104, 0.5)'); // Default renk

    const slides = [
        { 
          id: 1, 
          image: "/assets/images/slider1.jpg", 
          title: "KONSER", 
          description: "Konser biletleri ve etkinlikleri burada! Hemen tıklayıp konser takvimini gör",
          button1: { text: "Şimdi İzle", link: "#" },
          button2: { link: "#" }
        },
        { 
          id: 2, 
          image: "/assets/images/slider2.jpg", 
          title: "KONSER", 
          description: "Bu bir örnek açıklama metnidir.",
          button1: { text: "Şimdi İzle", link: "#" },
          button2: { link: "#" }
        },
        { 
          id: 3, 
          image: "/assets/images/slider1.jpg", 
          title: "KONSER", 
          description: "Konser biletleri ve etkinlikleri burada! Hemen tıklayıp konser takvimini gör",
          button1: { text: "Şimdi İzle", link: "#" },
          button2: { link: "#" }
        },
        { 
          id: 4, 
          image: "/assets/images/slider2.jpg", 
          title: "KONSER", 
          description: "Bu bir örnek açıklama metnidir.",
          button1: { text: "Şimdi İzle", link: "#" },
          button2: { link: "#" }
        },
        { 
          id: 5, 
          image: "/assets/images/slider1.jpg", 
          title: "KONSER", 
          description: "Konser biletleri ve etkinlikleri burada! Hemen tıklayıp konser takvimini gör",
          button1: { text: "Şimdi İzle", link: "#" },
          button2: { link: "#" }
        },
    ];

    const handleSlideChange = (swiper) => {
        const activeSlide = swiper.slides[swiper.activeIndex];
        const img = activeSlide.querySelector('img');
    
        if (img.complete) {
            updateBackgroundColor(img);
        } else {
            img.onload = () => updateBackgroundColor(img);
        }
    };
  
    const updateBackgroundColor = (img) => {
        const color = getAverageColor(img);
        setBgColor(color);
    };
    
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
          <div className="slider-gradient" style={{ background: `radial-gradient(circle, ${bgColor} 100%, ${bgColor} 100%)` }}></div>
          <div className="overflow-hidden">
            <div className="container">
              <div className="row justify-content-center">
                <Swiper
                  modules={[EffectCoverflow, Navigation]}
                  effect="coverflow"
                  slidesPerView={1}
                  centeredSlides={true}
                  loop={true}
                  navigation
                  coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 150,
                    modifier: 1.5,
                    slideShadows: false,
                  }}
                  spaceBetween={190}
                  className="custom-swiper"
                  onSlideChange={handleSlideChange}
                >
                  {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                      <div className="slide-content">
                        <img src={slide.image} alt={`Slide ${slide.id}`} />
                        <div className="text-overlay">
                          <h2>{slide.title}</h2>
                          <p>{slide.description}</p>
                          <div className="buttons">
                            <Link to={slide.button1.link} className="slider-primary-btn">{slide.button1.text}</Link>
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
        </div>
    );
}
