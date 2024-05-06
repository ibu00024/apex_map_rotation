// MapDetail.js
import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const getJapaneseTime = (utcSeconds) => {
  const date = new Date(utcSeconds * 1000);
  return date.toLocaleString();
};

const MapDetail = ({ mapData, currentTime, showTimer }) => {
  const getSessionDuration = (start, end) => end - start;
  const getRemainingTime = (endTime) => {
    const timeLeft = endTime * 1000 - currentTime;
    return Math.max(timeLeft / 1000, 0);
  };

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
        window.location.reload(); // Reload the page when the timer reaches 0
      return <div className="timer">Time is up.</div>;
    }
    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;

    return (
      <div className="timer">
        <div className="value">{`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</div>
      </div>
    );
  };

  return (
    <div className="map-section">
      <div className="map-details">
        <h4 className="info"><strong>{mapData.map}</strong></h4>
        <p className="info">{getJapaneseTime(mapData.start)} ~ {getJapaneseTime(mapData.end)}</p>
        {showTimer && (
        <div className="timer">
        <CountdownCircleTimer
          isPlaying
          isSmoothColorTransition
          size={140}
          duration={getSessionDuration(mapData.start, mapData.end)}
          initialRemainingTime={getRemainingTime(mapData.end)}
          colors={['#32d74b', '#ffd60a', '#ff9f0a', '#ff453a']}
          colorsTime={[1000, 500, 200, 0]}
          trailColor="#151932"
          onComplete={() => [false, 1000]}
        >
          {renderTime}
        </CountdownCircleTimer>
        </div>
      )}
      </div>
    </div>
  );
};

export default MapDetail;
