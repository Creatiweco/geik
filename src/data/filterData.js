// src/data/filterData.js
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import { CiBasketball } from "react-icons/ci";
import { LuMicVocal } from "react-icons/lu";
import { FaPalette, FaRegStar, FaTheaterMasks } from "react-icons/fa";
import { FaEarListen } from "react-icons/fa6";

const filters = [
    { label: "Tümü", categoryName: "tumu", icon: HiOutlineBars3BottomLeft },
    { label: "Spor", categoryName: "spor", icon: CiBasketball },
    { label: "Etkinlik", categoryName: "etkinlik", icon: FaPalette },
    { label: "Stand Up", categoryName: "stand-up", icon: FaEarListen },
    { label: "Eğlence", categoryName: "eglence", icon: FaRegStar },
    { label: "Tiyatro", categoryName: "tiyatro", icon: FaTheaterMasks },
    { label: "Konser", categoryName: "konser", icon: LuMicVocal },
];

export default filters;
