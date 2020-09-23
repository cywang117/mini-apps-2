import React, { useState, useEffect } from 'react';
import { generateMinefield } from '../utils';
import Minefield from './Minefield';

/**
 * Defaults
 */
const defaultFields = {
  easy: { rows: 10, cols: 10, mines: 10 },
  medium: { rows: 16, cols: 16, mines: 40 },
  hard: { rows: 16, cols: 30, mines: 99 }
};

const App = () => {
  const [diff, setDiff] = useState('easy');
  const [minefield, setMinefield] = useState([[]]);

  // On initial mount & whenever difficulty changes, (re)generate minefield according to difficulty selected
  useEffect(() => {
    let minefield = generateMinefield(defaultFields[diff].rows, defaultFields[diff].cols, defaultFields[diff].mines);
    setMinefield(minefield);
  }, [diff]);

  return (
    <div>
      <button onClick={() => setDiff('easy')}>Easy</button>
      <button onClick={() => setDiff('medium')}>Medium</button>
      <button onClick={() => setDiff('hard')}>Hard</button>
      <Minefield minefield={minefield} />
    </div>
  );
}

export default App;
