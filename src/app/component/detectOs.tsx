import { useEffect, useState } from "react";

const useDeviceDetect = () => {
  const [os, setOs]: any = useState(null);
  const [device, setDevice] = useState("");

  useEffect(() => {
    if (navigator?.userAgent) {
      const userAgent = navigator.userAgent;
      const Regex = /Android|iPhone|iOS|iPadOS|Windows|Linux|Phone/i;
      const osMatch = Regex.exec(userAgent);

      if (osMatch) {
        setOs(osMatch[0]);
        osMatch[0] === "Android" || osMatch[0] === "iPhone"
          ? setDevice("Mobile")
          : setDevice("Desktop");
      } else {
        setOs("Unknown");
        setDevice("Unknown");
      }
    } else {
      console.warn(
        "navigator.userAgent is not available. Mobile OS detection might not work."
      );
    }
  }, []);

  return { os, device };
};

export default useDeviceDetect;
