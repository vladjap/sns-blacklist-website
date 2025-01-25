import { useEffect } from "react";

const useBodyBackground = (color = "#fff") => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const originalBackground = document.body.style.background;
    document.body.style.background = color;

    return () => {
      document.body.style.background = originalBackground;
    };
  }, [color]);
};

export default useBodyBackground;
