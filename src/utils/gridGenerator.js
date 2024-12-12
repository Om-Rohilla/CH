// Check if a word can be placed at the given position and direction
const canPlaceWord = (grid, word, direction, startPos) => {
  const gridSize = grid.length;
  const { x, y } = startPos;
  const wordLength = word.length;

  // Check if starting position is valid
  if (x < 0 || y < 0 || x >= gridSize || y >= gridSize) {
    return false;
  }

  // Check if word fits within grid bounds
  switch (direction) {
    case 'horizontal':
      if (x + wordLength > gridSize) return false;
      for (let i = 0; i < wordLength; i++) {
        if (grid[y][x + i] !== '' && grid[y][x + i] !== word[i]) return false;
      }
      break;
    case 'vertical':
      if (y + wordLength > gridSize) return false;
      for (let i = 0; i < wordLength; i++) {
        if (grid[y + i][x] !== '' && grid[y + i][x] !== word[i]) return false;
      }
      break;
    case 'diagonal':
      if (x + wordLength > gridSize || y + wordLength > gridSize) return false;
      for (let i = 0; i < wordLength; i++) {
        if (grid[y + i][x + i] !== '' && grid[y + i][x + i] !== word[i]) return false;
      }
      break;
    default:
      return false;
  }
  return true;
};

const generateEmptyGrid = (size) => {
  return Array(size).fill().map(() => Array(size).fill(''));
};

const placeWord = (grid, word, direction, startPos) => {
  if (!canPlaceWord(grid, word, direction, startPos)) {
    return grid; // Return unchanged grid if word can't be placed
  }

  const newGrid = grid.map(row => [...row]);
  const { x, y } = startPos;

  for (let i = 0; i < word.length; i++) {
    switch (direction) {
      case 'horizontal':
        newGrid[y][x + i] = word[i];
        break;
      case 'vertical':
        newGrid[y + i][x] = word[i];
        break;
      case 'diagonal':
        newGrid[y + i][x + i] = word[i];
        break;
    }
  }
  return newGrid;
};

const fillEmptyCells = (grid) => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return grid.map(row =>
    row.map(cell =>
      cell === '' ? letters[Math.floor(Math.random() * letters.length)] : cell
    )
  );
};

export const generateGrid = (questions) => {
  let grid = generateEmptyGrid(10);
  
  // Sort questions by answer length (longer words first)
  const sortedQuestions = [...questions].sort((a, b) => b.answer.length - a.answer.length);

  // Try to place each word
  sortedQuestions.forEach(({ answer, direction, startPos }) => {
    grid = placeWord(grid, answer, direction, startPos);
  });

  return fillEmptyCells(grid);
};