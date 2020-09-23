import * as React from 'react';
import { FC, useState } from 'react';
import { GameWrapper, Button } from './styles';
import BowlingAlley from './BowlingAlley';
import Scoreboard from './Scoreboard';
import PinChooser from './PinChooser';

/**
 * Types
 */
type Rows = number[][];
export type ScoreDef = {
  frst: any;
  scnd: any;
  thrd?: any;
};

/**
 * Defaults
 */
const startingRows:Rows = [
  [ 1, 1, 1, 1 ],
  [ 1, 1, 1 ],
  [ 1, 1 ],
  [ 1 ]
];
const startingScore = {
  frst: null,
  scnd: null
};
const startingScores:ScoreDef[] = new Array(10).fill({...startingScore});
startingScores[9].thrd = null;
const startingTotals = new Array(10).fill(null);
const startingPins = 10;

/**
 * Interfaces
 */
interface Props {
  handlePageChange: (goto:string) => any;
}
// This interface is for overloading the same-named function (see below).
export interface HandlePinChange {
  (numOrStr:number): void;
  (numOrStr:string): void;
}

const Game:FC<Props> = ({ handlePageChange }) => {
  const [rows, setRows] = useState<Rows>(startingRows);
  const [roundScores, setRoundScores] = useState<ScoreDef[]>(startingScores);
  const [totalScores, setTotalScores] = useState<any[]>(startingTotals);
  const [numPins, setNumPins] = useState<number>(startingPins);
  // 10 rounds total per game, each round having 2 rolls. Recorded here as 0-indexed
  const [round, setRound] = useState<number>(0);
  const [roll, setRoll] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

  /**
   * Changes the number of pins to knock down per roll
   */
  const handlePinChange = ((numOrStr: number | string): void => {
    if (typeof numOrStr === 'number') {
      numOrStr > 0 && numOrStr <= 10 && setNumPins(numOrStr);
    } else {
      setNumPins(Math.ceil(Math.random() * 10));
    }
  }) as HandlePinChange;

  /**
   * Reset all game values to defaults
   */
  const resetGame = () => {
    setRows(startingRows);
    setRoundScores(startingScores);
    setNumPins(startingPins);
    setRound(0);
    setRoll(0);
    setGameOver(false);
  }

  /**
   * Update bowling pins based on roll
   */
  const removePins = (numPins:number) => {
    // Copy row, pin arrays to depth 2 to prevent mutating state array
    let rowsCopy = rows.map(row => row.map(pin => pin));
    let removedCount:number = 0;

    let pinString;

    while (numPins) {
      // Stop removing when all pins removed
      pinString = rowsCopy.map(row => row.join('')).join('');
      if (pinString === '0000000000') break;

      let randRow:number;
      let randPin:number;
      do {
        randRow = Math.floor(Math.random() * rowsCopy.length);
        randPin = Math.floor(Math.random() * rowsCopy[randRow].length);
      } while (rowsCopy[randRow][randPin] === 0);

      rowsCopy[randRow][randPin] = 0;
      removedCount++;
      numPins--;
    }

    setRows(rowsCopy);
    return [removedCount, pinString];
  }

  /**
   * Update score after removing pins based on roll
   */
  const updateScore = (removedCount:number, pinString:string) => {
    let scoresCopy = roundScores.map(round => ({ ...round }));
    // First roll of round
    if (roll === 0) {
      // Strike
      if (removedCount === 10) {
        // Get a third roll if strike in last round
        if (round === 9) {
          scoresCopy[round].frst = 'X';
          setRoll(1);
        } else {
          scoresCopy[round].frst = null;
          scoresCopy[round].scnd = 'X';
          setRound(round + 1);
          setRoll(0);
        }
        setRows(startingRows);
      } else {
        scoresCopy[round].frst = removedCount;
        setRoll(1);
      }
    } else if (roll === 1) {
      // Second roll of round
      if (pinString === '0000000000') {
        // Strike - only happens in last round
        if (removedCount === 10) {
          scoresCopy[round].scnd = 'X';
          setRoll(2);
        } else {
          // Spare
          scoresCopy[round].scnd = '/';
          // Get a third roll if spare in last round
          if (round === 9) {
            setRoll(2);
          } else {
            setRound(round + 1);
            setRoll(0);
          }
        }
        setRows(startingRows);
      } else {
        scoresCopy[round].scnd = removedCount;
        if (round === 9) {
          setGameOver(true);
        } else {
          setRound(round + 1);
          setRoll(0);
          setRows(startingRows);
        }
      }
    } else {
      // Third roll of LAST round ONLY
      scoresCopy[round].thrd = removedCount === 10 ? 'X' : removedCount;
      setGameOver(true);
    }

    setRoundScores(scoresCopy);
    // TODO: update total scores
  }

  React.useEffect(() => {console.log(roundScores);}, [roundScores]);

  /**
   * Removes numPin amount of pins from rows, then adds removed pins to score
   * according to 10-pin scoring conventions
   */
  const playRound = (numPins:number) => {
    if (gameOver) return;

    let results = removePins(numPins);
    updateScore((results as any)[0], (results as any)[1]);

  }

  return (
    <GameWrapper>
      <div>
        <Scoreboard rounds={roundScores} />
        <PinChooser numPins={numPins} handlePinChange={handlePinChange} />
        <div id="buttons">
          <Button onClick={() => playRound(numPins)}>Go!</Button>
          <Button onClick={resetGame}>Reset</Button>
          <Button onClick={() => handlePageChange('home')}>Back to homepage</Button>
        </div>
      </div>

      <BowlingAlley rows={rows} />
    </GameWrapper>
  );
}

export default Game;
