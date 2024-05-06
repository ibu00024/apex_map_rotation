import React, { useEffect, useState } from 'react';
import useApexMapInfo from './useApexMapInfo';
import MapDetail from './MapDetail';
import './App.css';


function App() {
  const apiKey = process.env.REACT_APP_APEX_API_KEY;
  const apiUrl = `https://api.mozambiquehe.re/maprotation?auth=${apiKey}&version=2`;
  const [mapInfo, currentTime] = useApexMapInfo(apiUrl);
  const [showNextRanked, setShowNextRanked] = useState(false);
  const [showNextPublic, setShowNextPublic] = useState(false);
  const toggleNextRanked = () => setShowNextRanked(!showNextRanked);
  const toggleNextPublic = () => setShowNextPublic(!showNextPublic);
  const [backgroundImages, setBackgroundImages] = useState([]);

  useEffect(() => {
    if (mapInfo) {
      const mapImagePaths = [mapInfo.ranked.current.asset, mapInfo.battle_royale.current.asset].filter(Boolean);

      const images = mapImagePaths.map((path) => {
        const image = new Image();
        image.src = path;
        return image;
      });

      Promise.all(images.map((image) => new Promise((resolve) => {
        image.onload = resolve;
      }))).then(() => {
        setBackgroundImages(mapImagePaths);
      });
    }
  }, [mapInfo]);

  return (
    <div>
        <h1>Apex Legends Map Rotation</h1>
      {mapInfo ? (
        <div>
        <h2>Ranked Matches</h2>
        <div className="app" style={{ backgroundImage: `url(${backgroundImages[0]})` }}>
          <MapDetail mapData={mapInfo.ranked.current} currentTime={currentTime} showTimer={true} />
        </div>
        <h3 onClick={toggleNextRanked}>Next Ranked Matches {showNextRanked ? '' : '▼'}</h3>
        {showNextRanked && <MapDetail title="Next Ranked Map" mapData={mapInfo.ranked.next} currentTime={currentTime} showTimer={false} />}
        
        <h2>Public Matches</h2>
        <div className="app" style={{ backgroundImage: `url(${backgroundImages[1]})` }}>
        <MapDetail mapData={mapInfo.battle_royale.current} currentTime={currentTime} showTimer={true} />
        </div>
        <h3 onClick={toggleNextPublic}>Next Public Matches {showNextPublic ? '' : '▼'}</h3>
        {showNextPublic && <MapDetail title="Next Public Map" mapData={mapInfo.battle_royale.next} currentTime={currentTime} showTimer={false} />}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
