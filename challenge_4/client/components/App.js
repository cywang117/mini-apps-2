import React, { useState, useEffect } from 'react';

/**
 * Defaults
 */
const defaultFields = {
  easy: { rows: 10, cols: 10, mines: 10 },
  medium: { rows: 16, cols: 16, mines: 40 },
  hard: { rows: 16, cols: 30, mines: 99 }
};
const mineValue = -1;

const App = () => {
  const [diff, setDiff] = useState('easy');
  const [minefield, setMinefield] = useState([[]]);
  const [numMines, setNumMines] = useState(defaultFields[diff].mines);

  // Initialization methods
  const addMines = () => {
    console.log(numMines);
  }

  const addMineIndicators = () => {

  }

  const regenerateMinefield = ()

  // On initial mount & whenever difficulty changes, regenerate minefield with values
  useEffect(() => {
    console.log('changing minefield');
    regenerateMinefield(defaultFields[diff]);
    setMinefield(new Array(defaultFields[diff].rows).fill(new Array(defaultFields[diff].cols).fill(0)));
    setNumMines(defaultFields[diff].mines);
    addMines(defaultFields[diff].mines);
    addMineIndicators();
  }, [diff]);

  useEffect(() => {}, [minefield]);

  return (
    <div>
      <button onClick={() => setDiff('easy')}>Easy</button>
      <button onClick={() => setDiff('medium')}>Medium</button>
      <button onClick={() => setDiff('hard')}>Hard</button>
    </div>
  );
}

export default App;
