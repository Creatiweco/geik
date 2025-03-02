import { LuMicVocal } from "react-icons/lu";
import { FaTheaterMasks, FaPalette, FaRegStar } from "react-icons/fa";

export const latestReleases = [
    { id: 1, image: "/assets/images/event5.png", day: "12", month: "Şubat", name: "Dolu kadehi ters tut", venue: "Hangout Performance Hall", link: "/detay", category: "konser" },
    { id: 2, image: "/assets/images/event4.png", day: "17", month: "Şubat", name: "Emircan İğrek", venue: "Bostancı Gösteri Merkezi", link: "/detay", category: "konser" },
    { id: 3, image: "/assets/images/event3.png", day: "8", month: "Mart", name: "Can Ozan Stand-Up Show", venue: "Hayal Kahvesi", link: "/detay", category: "stand-up" },
    { id: 4, image: "/assets/images/event2.png", day: "24", month: "Mart", name: "Tiyatro Gecesi: Hamlet", venue: "Hangout Performance Hall", link: "/detay", category: "tiyatro" },
    { id: 5, image: "/assets/images/event1.png", day: "30", month: "Mart", name: "Spor Festivali 2025", venue: "Hangout Performance Hall", link: "/detay", category: "spor" }
];

export const eventWatch = [
    { id: 1, image: "/assets/images/concert1.png", day: "3", month: "Nisan", name: "Güneş", venue: "", link: "/etkinlik-izle", category: "konser" },
    { id: 2, image: "/assets/images/concert2.png", day: "5", month: "Mayıs", name: "Perdenin Ardındakiler", venue: "", link: "/etkinlik-izle", category: "konser" },
    { id: 3, image: "/assets/images/concert3.png", day: "8", month: "Mayıs", name: "Sena Şener", venue: "", link: "/etkinlik-izle", category: "konser" },
    { id: 4, image: "/assets/images/concert4.png", day: "14", month: "Mayıs", name: "Melek Mosso", venue: "", link: "/etkinlik-izle", category: "konser" },
    { id: 5, image: "/assets/images/concert5.png", day: "7", month: "Haziran", name: "Karsu", venue: "", link: "/etkinlik-izle", category: "konser" }
];

export const concerts = [
    { id: 1, image: "/assets/images/concert1.png", day: "3", month: "Nisan", name: "Güneş", venue: "", link: "/detay", category: "konser" },
    { id: 2, image: "/assets/images/concert2.png", day: "5", month: "Mayıs", name: "Perdenin Ardındakiler", venue: "", link: "/detay", category: "konser" },
    { id: 3, image: "/assets/images/concert3.png", day: "8", month: "Mayıs", name: "Sena Şener", venue: "", link: "/detay", category: "konser" },
    { id: 4, image: "/assets/images/concert4.png", day: "14", month: "Mayıs", name: "Melek Mosso", venue: "", link: "/detay", category: "konser" },
    { id: 5, image: "/assets/images/concert5.png", day: "7", month: "Haziran", name: "Karsu", venue: "", link: "/detay", category: "konser" }
];

export const activity = [
    { id: 1, image: "/assets/images/activity1.png", day: "", month: "", name: "Resim Atölyesi", venue: "", link: "/detay", category: "etkinlik" },
    { id: 2, image: "/assets/images/activity2.png", day: "", month: "", name: "Spor Turnuvası", venue: "", link: "/detay", category: "spor" },
    { id: 3, image: "/assets/images/activity3.png", day: "", month: "", name: "Stand-Up Gecesi", venue: "", link: "/detay", category: "stand-up" },
    { id: 4, image: "/assets/images/activity4.png", day: "", month: "", name: "Tiyatro Gösterisi: Macbeth", venue: "", link: "/detay", category: "tiyatro" },
    { id: 5, image: "/assets/images/activity5.png", day: "", month: "", name: "Eğlence Parkı Etkinliği", venue: "", link: "/detay", category: "eglence" }
];

export const theaters = [
    { id: 1, image: "/assets/images/theater1.png", day: "12-13-14", month: "Şubat", name: "Araf", venue: "Akasya AVM", link: "/detay", category: "tiyatro" },
    { id: 2, image: "/assets/images/theater2.png", day: "12-13-14", month: "Şubat", name: "Hiçbi’ Şey Olmamış Gibi", venue: "Akasya AVM", link: "/detay", category: "tiyatro" },
    { id: 3, image: "/assets/images/theater3.png", day: "12-13-14", month: "Şubat", name: "Tomris", venue: "Akasya AVM", link: "/detay", category: "tiyatro" },
    { id: 4, image: "/assets/images/theater4.png", day: "12-13-14", month: "Şubat", name: "Disco Topu", venue: "Akasya AVM", link: "/detay", category: "tiyatro" },
    { id: 5, image: "/assets/images/theater5.png", day: "12-13-14", month: "Şubat", name: "Kürk Mantolu Madonna", venue: "Akasya AVM", link: "/detay", category: "tiyatro" }
];

export const favorites = [
    { id: 1, image: "/assets/images/concert1.png", day: "", month: "", name: "Güneş", venue: "", link: "/detay", category: "konser" },
    { id: 2, image: "/assets/images/theater2.png", day: "", month: "", name: "Hiçbi’ Şey Olmamış Gibi", venue: "Akasya AVM", link: "/detay", category: "tiyatro" },
    { id: 3, image: "/assets/images/concert3.png", day: "", month: "", name: "Sena Şener", venue: "", link: "/detay", category: "konser" },
    { id: 4, image: "/assets/images/activity4.png", day: "", month: "", name: "Tiyatro Gösterisi: Macbeth", venue: "", link: "/detay", category: "tiyatro" },
    { id: 5, image: "/assets/images/activity1.png", day: "", month: "", name: "Resim Atölyesi", venue: "", link: "/detay", category: "etkinlik" }
];

export const tickets = [
    {
        eventId: 1,
        name: "Can Ozan Konseri",
        date: "1 Şubat Cuma",
        time: "22.00",
        venue: "Hayal Kahvesi",
        qrCodes: [
            { qrCode: "/assets/images/qrkod.png" }
        ],
        image: "/assets/images/event3.png",
        category: "konser"
    },
    {
        eventId: 2,
        name: "Dolu Kadehi Ters Tut",
        date: "12 Şubat Pazartesi",
        time: "20.00",
        venue: "Bostancı Gösteri Merkezi",
        qrCodes: [
            { qrCode: "/assets/images/qrkod.png" },
            { qrCode: "/assets/images/qrkod.png" }
        ],
        image: "/assets/images/event5.png",
        category: "konser"
    }
];


export const calenderEvents  = [
    {
        date: "1 Şubat",
        items: [
            { title: "Can Ozan", time: "22.00", location: "Hayal Kahvesi",link:"/detay", icon: <LuMicVocal />, category: "Konser" },
            { title: "Disco Topu", time: "19.00", location: "Akasya AVM",link:"/detay", icon: <FaTheaterMasks />, category: "Tiyatro" },
            { title: "Frida Kahlo’nun Günlükleri sergisi", time: "19.00", location: "Akasya AVM",link:"/detay", icon: <FaTheaterMasks />, category: "Tiyatro" },
        ]
    },
    {
        date: "2 Şubat",
        items: [
            { title: "Can Ozan", time: "22.00", location: "Hayal Kahvesi",link:"/detay", icon: <LuMicVocal />, category: "Konser" },
            { title: "Can Ozan", time: "22.00", location: "Hayal Kahvesi",link:"/detay", icon: <LuMicVocal />, category: "Konser" },
        ]
    },
    {
        date: "3 Şubat",
        items: [
            { title: "Can Ozan", time: "22.00", location: "Hayal Kahvesi",link:"/detay", icon: <LuMicVocal />, category: "Konser" },
        ]
    },
    {
        date: "4 Şubat",
        items: [
            { title: "Can Ozan", time: "22.00", location: "Hayal Kahvesi",link:"/detay", icon: <LuMicVocal />, category: "Konser" },
        ]
    },
    {
        date: "5 Şubat",
        items: [
            { title: "Can Ozan", time: "22.00", location: "Hayal Kahvesi",link:"/detay", icon: <LuMicVocal />, category: "Konser" },
            { title: "Frida Kahlo’nun Günlükleri sergisi", time: "19.00", location: "Akasya AVM",link:"/detay", icon: <FaTheaterMasks />, category: "Tiyatro" },
            { title: "Disco Topu", time: "19.00", location: "Akasya AVM",link:"/detay", icon: <FaTheaterMasks />, category: "Tiyatro" },
        ]
    }
];
