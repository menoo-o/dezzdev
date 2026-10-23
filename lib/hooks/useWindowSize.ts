import { useState, useEffect } from "react";

function useScreenSize() {
  const [screenSize, setScreenSize] = useState({
    width: 1024,   // same on server and client for the first render
    height: 768,
  });

  useEffect(() => {
    function handleResize() {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    handleResize(); // sync to the real size after hydration
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenSize;
}

export default useScreenSize;