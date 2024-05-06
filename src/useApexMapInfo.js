// useApexMapInfo.js
import { useEffect, useState } from 'react';

const useApexMapInfo = (api_key) => {
  const [mapInfo, setMapInfo] = useState(null);
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const fetchMapInfo = async () => {
      const response = await fetch(api_key);
      const data = await response.json();
      setMapInfo(data);
    };

    fetchMapInfo();
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, [api_key]);

  return [mapInfo, currentTime];
};

export default useApexMapInfo;
