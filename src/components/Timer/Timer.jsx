import React, { useState, useEffect } from 'react';
import './Timer.css';

const Timer = () => {
  const [time, setTime] = useState(600); // 8.20 minutes
  const [isWarning, setIsWarning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 120) setIsWarning(true);
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`timer ${isWarning ? 'warning' : ''}`}>
      <div className="timer-display">
        <div className="timer-value">{formatTime(time)}</div>
        <div className="timer-bar">
          <div 
            className="timer-progress"
            style={{ width: `${(time / 600) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Timer;