import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import "../assets/scss/components/_footer.scss";

// Footer bileşeni - sayfanın alt kısmında sabit olarak görünen alan
export default function Footer() {
    return(
        <footer>
            <div className="container">
                {/* Mobil cihazlar için gösterilen logo */}
                <div className="footer-mobile-logo">
                    <img src="/assets/images/geik_logo_blue.svg" alt="footer-logo"/>
                </div>

                {/* Ana footer bölümü - sol ve sağ sütunlar */}
                <div className="main-footer">
                    {/* Sol sütun - kurumsal ve yardım bağlantıları */}
                    <div className="footer-left">
                        <div className="links-col">
                            <h4>Kurumsal</h4>
                            <ul>
                                <li><Link to="/">Kişisel Verilerin Korunması</Link></li>
                                <li><Link to="/">Sözleşme ve Politikalar</Link></li>
                                <li><Link to="/">Entegre Yönetim Sistemi Politikası</Link></li>
                                <li><Link to="/">Çerez Aydınlatma Metni</Link></li>
                                <li><Link to="/">Online Ödeme Koşulları</Link></li>
                            </ul>
                        </div>

                        <div className="links-col">
                            <h4>Yardım</h4>
                            <ul>
                                <li><Link to="/">SSS</Link></li>
                                <li><Link to="/">İptal, İade ve Değişim</Link></li>
                                <li><Link to="/">Nasıl Bilet Alınır</Link></li>
                                <li><Link to="/">Hakkımızda</Link></li>
                                <li><Link to="/">İletişim</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Sağ sütun - ana menü linkleri */}
                    <div className="footer-right">
                        <ul>
                            <li><Link to="/">Anasayfa</Link></li>
                            <li><Link to="/takvim">Takvim</Link></li>
                            <li><Link to="/">Canlı</Link></li>
                            <li><Link to="/">Kategori</Link></li>
                            <li><Link to="/">Favorilerim</Link></li>
                            <li><Link to="/profil">Profil</Link></li>
                            <li><Link to="/">Ayarlar</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Telif hakkı ve sosyal medya bağlantıları */}
                <div className="copyright">
                    <img src="/assets/images/geik_logo_blue.svg" alt="footer-logo"/>
                    <p>Copyright © 2025 www.geik.com</p>
                    <div className="footer-icon">
                        <a href="https://www.linkedin.com/"><FaLinkedinIn/></a>
                        <a href="https://x.com/"><FaXTwitter/></a>
                        <a href="https://instagram.com"><AiFillInstagram/></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
