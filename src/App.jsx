import React, { useState, useEffect } from 'react';
import Grid from './components/Grid/Grid';
import Questions from './components/Questions/Questions';
import Timer from './components/Timer/Timer';
import ScoreTracker from './components/ScoreTracker/ScoreTracker';
import { questions } from './data/questions';
import { generateGrid } from './utils/gridGenerator';
import './App.css';

const App = () => {
  const [grid, setGrid] = useState([]);
  const [score, setScore] = useState(0);
  const [solvedWords, setSolvedWords] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    setGrid(generateGrid(questions));
  }, []);

  const handleWordSelected = (word, selectedCells) => {
    const matchingQuestion = questions.find(q => 
      q.answer === word && !solvedWords.includes(q.id)
    );

    if (matchingQuestion) {
      setScore(prevScore => prevScore + 100);
      setSolvedWords(prev => [...prev, matchingQuestion.id]);
      return true;
    }
    return false;
  };

  const startGame = () => {
    setGameStarted(true);
    setGrid(generateGrid(questions));
    setScore(0);
    setSolvedWords([]);
  };

  return (
    <div className="app">
      <h1 className="title">Plant Crossword Puzzle</h1>
      
      {!gameStarted ? (
        <button className="start-button" onClick={startGame}>
          Start Game
        </button>
      ) : (
        <div className="game-container">
          <div className="left-questions">
            <Questions 
              questions={questions.slice(0, 5)} // Now showing first 5 questions
              solvedWords={solvedWords}
            />
          </div>
          
          <div className="game-center">
            <Timer />
            <Grid 
              grid={grid}
              onWordSelected={handleWordSelected}
            />
            <ScoreTracker score={score} />
          </div>
          
          <div className="right-questions">
            <Questions 
              questions={questions.slice(5, 10)} // Now showing next 5 questions
              solvedWords={solvedWords}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;