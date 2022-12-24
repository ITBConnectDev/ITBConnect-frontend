import { useEffect, useState } from "react";

type WindowSize = {
  width: number;
  height: number;
};

export const useWindowSize = (): WindowSize => {
  if (typeof window !== "undefined") {
    const [windowSize, setWindowSize] = useState<WindowSize>({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    useEffect(() => {}, [windowSize]);

    useEffect(() => {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
  } else {
    const [windowSize, setWindowSize] = useState<WindowSize>({
      width: 1222,
      height: 1222,
    });
    return windowSize;
  }
};
