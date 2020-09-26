import React, { useState, useEffect } from 'react';
import { generateMinefield, defaultFields, expandSquares, getImgURIForFace } from '../utils';
import { GlobalStyle, Header, Title, GameContainer } from '../styles';
import GameStatus from './GameStatus';
import Minefield from './Minefield';

let timeout;

const App = ({ testingMinefield }) => {
  const [diff, setDiff] = useState('easy');
  const [minefield, setMinefield] = useState([[]]);
  const [gameOver, setGameOver] = useState(false);
  const [exploded, setExploded] = useState(false);
  const [numFlagged, setNumFlagged] = useState(0);
  const [flagPos, setFlagPos] = useState([]);
  const [timer, setTimer] = useState({ started: false, seconds: 0 });
  const [faceSrc, setFaceSrc] = useState('');

  // On initial mount & whenever difficulty changes, reset
  useEffect(() => {
    resetGame();
    timeout && clearTimeout(timeout);
  }, [diff]);

  // On game state change, update face display & timer
  useEffect(() => {
    if (gameOver || exploded) {
      timeout && clearTimeout(timeout);
      setTimer(prevTimer => ({ ...prevTimer, started: false }));
    }
    setFaceSrc(getImgURIForFace(gameOver, exploded));
  }, [gameOver, exploded]);

  // On timer change, set timeout for next timer
  useEffect(() => {
    if (timer.started) {
      timeout = setTimeout(() => {
        if (timer.started) {
          setTimer(prevTimer => ({ ...prevTimer, seconds: prevTimer.seconds + 1 }));
        }
      }, 1000);
    } else {
      timeout && clearTimeout(timeout);
    }
  }, [timer]);

  /**
   * Reset game to defaults & regenerate minefield, depending on difficulty chosen
   */
  const resetGame = () => {
    let minefield = generateMinefield(defaultFields[diff].rows, defaultFields[diff].cols, defaultFields[diff].mines);
    setMinefield(testingMinefield || minefield);
    setGameOver(false);
    setExploded(false);
    setNumFlagged(0);
    timeout && clearTimeout(timeout);
    setTimer({ started: false, seconds: 0 });
    setFlagPos([]);
    setFaceSrc(getImgURIForFace(gameOver, exploded, ''));
  }

  /**
   * On clicking the face, while mouse button is held down, change image source for face display
   */
  const handleFaceDown = () => {
    setFaceSrc(getImgURIForFace(gameOver, exploded, 'reset'));
  }

  /**
   * On mouseup when clicking face, reset game
   */
  const handleFaceUp = () => {
    resetGame();
  }

  /**
   * Handle right click on board
   * @param {MouseEvent} e
   */
  const handleRightClick = (e) => {
    e.preventDefault();

    if (e.button !== 2 || numFlagged === defaultFields[diff].mines) return;
    if (!gameOver && !exploded && timer.started === false) {
      setTimer(prevTimer => ({ ...prevTimer, started: true }));
    }

    let [row, col] = e.target.id.split('_');

    if (!gameOver && !exploded && minefield[row][col].status !== 'visited') {
      let minefieldCopy = minefield.map(row => row.map(sq => sq));
      let sq = minefieldCopy[row][col];

      let flagPosCopy = flagPos.map(pairs => pairs.map(num => num));

      // Toggle flagged
      if (sq.status === 'flagged') {
        sq.status = 'hidden';
        setNumFlagged(prevFlagged => prevFlagged - 1);
        let idxOfFlag = flagPosCopy.findIndex(pair => pair[0] === row && pair[1] === col);
        idxOfFlag !== -1 && flagPosCopy.splice(idxOfFlag, 1);
      } else if (sq.status === 'hidden') {
        sq.status = 'flagged';
        setNumFlagged(prevFlagged => prevFlagged + 1);
        flagPosCopy.push([row, col]);
      }

      if (flagPosCopy.length === defaultFields[diff].mines) {
        let numSolved = flagPosCopy.reduce((acc, [row, col]) => {
          return acc + (minefield[row][col].value === -1 ? 1 : 0);
        }, 0);

        if (numSolved === defaultFields[diff].mines) {
          setGameOver(true);
        }
      }
      setFlagPos(flagPosCopy);
      setMinefield(testingMinefield || minefieldCopy);
    }
  }

  /**
   * Handle left click down on board - displays blank square regardless of square, updates face
   * @param {MouseEvent} e
   */
  const handleLeftClickDown = (e) => {
    if (e.button !== 0) return;

    if (!gameOver && !exploded && timer.started === false) {
      setTimer(prevTimer => ({ ...prevTimer, started: true }));
    }

    let [row, col] = e.target.id.split('_');

    if (!gameOver && !exploded && minefield[row][col].status === 'hidden') {
      let minefieldCopy = minefield.map(row => row.map(sq => sq));

      minefieldCopy[row][col].status = 'blank';

      setMinefield(testingMinefield || minefieldCopy);
      setFaceSrc(getImgURIForFace(gameOver, exploded, 'mine'));
    }
  }

  /**
   * Handle left click up on board - reveals square clicked, updates state
   * @param {MouseEvent} e
   */
  const handleLeftClickUp = (e) => {
    if (e.button !== 0) return;

    if (!gameOver && !exploded && timer.started === false) {
      setTimer(prevTimer => ({ ...prevTimer, started: true }));
    }

    let [row, col] = e.target.id.split('_');

    if (!gameOver && !exploded && minefield[row][col].status === 'blank') {
      let minefieldCopy = minefield.map(row => row.map(sq => sq));
      let [row, col] = e.target.id.split('_');
      let sq = minefieldCopy[row][col];

      sq.status = 'visited';
      // Left clicking on mine
      if (sq.value === -1) {
        setGameOver(true);
        setExploded(true);
      } else if (sq.value === 0) {
        // Recursively expand visited until bordered by numbers
        expandSquares(row, col, minefieldCopy);
      }

      setFaceSrc(getImgURIForFace(gameOver, exploded, ''));
      setMinefield(testingMinefield || minefieldCopy);
    }
  }

  return (
    <React.Fragment>
      <GlobalStyle />
      <Header>
        <Title>Minesweeper Classic</Title>
        <div>
          <button
            data-testid="button-easy"
            onClick={() => setDiff('easy')}
          >
            Easy
          </button>
          <button
            data-testid="button-med"
            onClick={() => setDiff('medium')}
          >
            Medium
          </button>
          <button
            data-testid="button-hard"
            onClick={() => setDiff('hard')}
          >
            Hard
          </button>
        </div>
      </Header>
      <GameContainer diff={diff}>
        <GameStatus
          diff={diff}
          numFlagged={numFlagged}
          faceSrc={faceSrc}
          handleFaceDown={handleFaceDown}
          handleFaceUp={handleFaceUp}
          timer={timer}
        />
        <Minefield
          minefield={minefield}
          diff={diff}
          handleRightClick={handleRightClick}
          handleLeftClickDown={handleLeftClickDown}
          handleLeftClickUp={handleLeftClickUp}
          isGameOver={gameOver}
        />
      </GameContainer>
    </React.Fragment>
  );
}

export default App;
