import { useState, useEffect } from "react";

function useScreenSize() {
  // State for width & height
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    function handleResize() {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add listener on mount
    window.addEventListener("resize", handleResize);

    // Run once so state matches current size
    handleResize();

    // Clean up listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenSize;
}

export default useScreenSize;
