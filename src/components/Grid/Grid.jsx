import React, { useState } from 'react';
import './Grid.css';

const Grid = ({ grid, onWordSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedCells, setSelectedCells] = useState([]);
  const [highlightedCells, setHighlightedCells] = useState([]);

  const handleMouseDown = (x, y) => {
    setIsDragging(true);
    setSelectedCells([{ x, y }]);
  };

  const handleMouseEnter = (x, y) => {
    if (isDragging) {
      const start = selectedCells[0];
      if (isValidLine(start, { x, y })) {
        const newSelection = getLineCells(start, { x, y });
        setSelectedCells(newSelection);
      }
    }
  };

  const handleMouseUp = () => {
    if (selectedCells.length > 0) {
      const word = selectedCells
        .map(cell => grid[cell.y][cell.x])
        .join('');

      if (word.length > 1) {
        const isCorrect = onWordSelected(word, selectedCells);
        
        if (isCorrect) {
          setHighlightedCells(selectedCells);
          setTimeout(() => {
            setHighlightedCells([]);
          }, 2000);
        }
      }
    }
    setIsDragging(false);
    setSelectedCells([]);
  };

  const isValidLine = (start, end) => {
    const dx = Math.abs(end.x - start.x);
    const dy = Math.abs(end.y - start.y);
    return dx === 0 || dy === 0 || dx === dy;
  };

  const getLineCells = (start, end) => {
    const cells = [];
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const steps = Math.max(Math.abs(dx), Math.abs(dy));
    const xStep = dx === 0 ? 0 : dx / Math.abs(dx);
    const yStep = dy === 0 ? 0 : dy / Math.abs(dy);

    for (let i = 0; i <= steps; i++) {
      cells.push({
        x: start.x + (xStep * i),
        y: start.y + (yStep * i)
      });
    }
    return cells;
  };

  const getCellClass = (x, y) => {
    const isSelected = selectedCells.some(cell => cell.x === x && cell.y === y);
    const isHighlighted = highlightedCells.some(cell => cell.x === x && cell.y === y);
    
    return `grid-cell ${isSelected ? 'selected' : ''} ${isHighlighted ? 'highlighted' : ''}`;
  };

  return (
    <div 
      className="grid-container"
      onMouseLeave={() => {
        setIsDragging(false);
        setSelectedCells([]);
      }}
      onMouseUp={handleMouseUp}
    >
      <div className="grid">
        {grid.map((row, y) => (
          <div key={y} className="grid-row">
            {row.map((letter, x) => (
              <div
                key={`${x}-${y}`}
                className={getCellClass(x, y)}
                onMouseDown={() => handleMouseDown(x, y)}
                onMouseEnter={() => handleMouseEnter(x, y)}
                onMouseUp={handleMouseUp}
              >
                {letter}
                <div className="cell-highlight"></div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;