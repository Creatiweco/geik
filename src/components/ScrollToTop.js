import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);  // Sayfanın en üstüne kaydırır
    }, [pathname]);

    return null;
}
