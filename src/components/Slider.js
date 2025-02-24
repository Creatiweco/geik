import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/scss/components/_slider.scss";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";

export default function Slider() {
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

    return (
        <div className="home-slider">
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
                  spaceBetween={250}
                  className="custom-swiper"
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
                            <Link to={slide.button2.link} className="slider-second-btn"><FaPlus/></Link>
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
