import React, { useEffect, useState } from 'react';
import './ScoreTracker.css';

const ScoreTracker = ({ score }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    if (score > displayScore) {
      setIsAnimating(true);
      const interval = setInterval(() => {
        setDisplayScore(prev => {
          if (prev >= score) {
            clearInterval(interval);
            setIsAnimating(false);
            return score;
          }
          return prev + 1;
        });
      }, 20);

      return () => clearInterval(interval);
    }
  }, [score]);

  return (
    <div className="score-tracker">
      <div className={`score ${isAnimating ? 'scoring' : ''}`}>
        <span className="score-label">SCORE</span>
        <span className="score-value">{displayScore}</span>
      </div>
      <div className="score-stars">
        {Array.from({ length: Math.floor(score / 200) }).map((_, i) => (
          <div key={i} className="star">★</div>
        ))}
      </div>
    </div>
  );
};

export default ScoreTracker;