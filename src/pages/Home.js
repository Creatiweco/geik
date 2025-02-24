import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Slider from "../components/Slider"
import EventSlider from "../components/EventSlider";
import EventSliderVertical from "../components/EventSliderVertical";

export default function Home() {
  const latestReleases = [
    { 
      id: 1, 
      image: "/assets/images/event5.png", 
      day: "12",
      month: "Şubat", 
      name: "Dolu kadehi ters tut", 
      venue: "Hangout Performance Hall"
    },
    { 
      id: 2, 
      image: "/assets/images/event4.png", 
      day: "17",
      month: "Şubat", 
      name: "Emircan İğrek", 
      venue: "Bostancı Gösteri Merkezi"
    },
    { 
      id: 3, 
      image: "/assets/images/event3.png", 
      day: "8",
      month: "Mart", 
      name: "Can Ozan", 
      venue: "Hayal Kahvesi"
    },
    { 
      id: 4, 
      image: "/assets/images/event2.png", 
      day: "24",
      month: "Mart", 
      name: "Aleyna Tilki", 
      venue: "Hangout Performance Hall"
    },
    { 
      id: 5, 
      image: "/assets/images/event1.png", 
      day: "30",
      month: "Mart", 
      name: "Madrigal", 
      venue: "Hangout Performance Hall"
    }
];
const concerts = [
  { 
    id: 1, 
    image: "/assets/images/concert1.png", 
    day: "3",
    month: "Nisan", 
    name: "Güneş", 
    venue: ""
  },
  { 
    id: 2, 
    image: "/assets/images/concert2.png", 
    day: "5",
    month: "Mayıs", 
    name: "Perdenin Ardındakiler", 
    venue: ""
  },
  { 
    id: 3, 
    image: "/assets/images/concert3.png", 
    day: "8",
    month: "Mayıs", 
    name: "Sena Şener", 
    venue: ""
  },
  { 
    id: 4, 
    image: "/assets/images/concert4.png", 
    day: "14",
    month: "Mayıs", 
    name: "Melek Mosso", 
    venue: ""
  },
  { 
    id: 5, 
    image: "/assets/images/concert5.png", 
    day: "7",
    month: "Haziran", 
    name: "Karsu", 
    venue: ""
  }
];

const activity = [
  { 
    id: 1, 
    image: "/assets/images/activity1.png", 
    day: "",
    month: "", 
    name: "", 
    venue: ""
  },
  { 
    id: 2, 
    image: "/assets/images/activity2.png", 
    day: "",
    month: "", 
    name: "", 
    venue: ""
  },
  { 
    id: 3, 
    image: "/assets/images/activity3.png", 
    day: "",
    month: "", 
    name: "", 
    venue: ""
  },
  { 
    id: 4, 
    image: "/assets/images/activity4.png", 
    day: "",
    month: "", 
    name: "", 
    venue: ""
  },
  { 
    id: 5, 
    image: "/assets/images/activity5.png", 
    day: "",
    month: "", 
    name: "", 
    venue: ""
  }
];

const theaters = [
  { 
    id: 1, 
    image: "/assets/images/theater1.png", 
    day: "12-13-14",
    month: "Şubat", 
    name: "Araf", 
    venue: "Akasya AVM"
  },
  { 
    id: 2, 
    image: "/assets/images/theater2.png", 
    day: "12-13-14",
    month: "Şubat", 
    name: "Hiçbi’ Şey Olmamış Gibi", 
    venue: "Akasya AVM"
  },
  { 
    id: 3, 
    image: "/assets/images/theater3.png", 
    day: "12-13-14",
    month: "Şubat",  
    name: "Tomris", 
    venue: "Akasya AVM"
  },
  { 
    id: 4, 
    image: "/assets/images/theater4.png", 
    day: "12-13-14",
    month: "Şubat", 
    name: "Disco Topu", 
    venue: "Akasya AVM"
  },
  { 
    id: 5, 
    image: "/assets/images/theater5.png", 
    day: "12-13-14",
    month: "Şubat", 
    name: "Kürk Mantolu Madonna", 
    venue: "Akasya AVM"
  }
];

const favorites = [
  { 
    id: 1, 
    image: "/assets/images/concert1.png", 
    day: "",
    month: "", 
    name: "", 
    venue: ""
  },
  { 
    id: 2, 
    image: "/assets/images/theater2.png", 
    day: "",
    month: "", 
    name: "", 
    venue: ""
  },
  { 
    id: 3, 
    image: "/assets/images/concert3.png", 
    day: "",
    month: "", 
    name: "", 
    venue: ""
  },
  { 
    id: 4, 
    image: "/assets/images/activity4.png", 
    day: "",
    month: "", 
    name: "", 
    venue: ""
  },
  { 
    id: 5, 
    image: "/assets/images/activity1.png", 
    day: "",
    month: "", 
    name: "", 
    venue: ""
  }
];

  return (
    <>
    <Slider/>
    <EventSlider sectionTitle="En Son Çıkanlar" events={latestReleases}/>
    <EventSlider sectionTitle="Konserler" events={concerts}/>
    <EventSliderVertical sectionTitle="Etkinlikler" events={activity}/>
    <EventSliderVertical sectionTitle="Tiyatrolar" events={theaters}/>
    <EventSlider sectionTitle="Karışık Favoriler" events={favorites}/>
    </>
  );
}
