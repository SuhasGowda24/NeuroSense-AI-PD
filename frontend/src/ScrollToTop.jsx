import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);  // Scroll to top-left of the page
  }, [pathname]);  // Runs every time the route changes

  return null;  // This component doesn’t render anything
}
