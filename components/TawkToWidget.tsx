'use client'
import { useEffect } from "react";

declare global {
  interface Window {
    Tawk_API?: Record<string, unknown>;
  }
}

const TawkToWidget = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.Tawk_API) return; // prevent multiple injections
      const s1 = document.createElement("script");
      s1.async = true;
      s1.src = "https://embed.tawk.to/685a65a3c09503190f31e1ea/1iughq5a8"; 
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");
      document.body.appendChild(s1);
    }
  }, []);
  return null;
};

export default TawkToWidget;




