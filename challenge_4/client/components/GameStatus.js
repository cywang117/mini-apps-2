import React from 'react';
import { StatusContainer, Flags, Timer } from '../styles';
import { defaultFields, getImgURIForFace } from '../utils';
import NumberDisplay from './NumberDisplay';
import FaceDisplay from './FaceDisplay';

const GameStatus = ({ diff, faceSrc, handleFaceDown, handleFaceUp, numFlagged, timer }) => {
  let startingMines = defaultFields[diff].mines;
  let minesLeftDisplay = (startingMines - numFlagged).toString().padStart(3, '0').split('');

  let timeToStringArr = (timer.seconds).toString().padStart(3, '0').split('');

  return (
    <StatusContainer diff={diff}>
      <Flags data-testid="flag-count">
        <NumberDisplay num={minesLeftDisplay[0]} />
        <NumberDisplay num={minesLeftDisplay[1]} />
        <NumberDisplay num={minesLeftDisplay[2]} />
      </Flags>
      <div
        onMouseDownCapture={handleFaceDown}
        onMouseUpCapture={handleFaceUp}
      >
        <FaceDisplay imgSrc={faceSrc} />
      </div>
      <Timer data-testid="timer">
        <NumberDisplay num={timeToStringArr[0]} />
        <NumberDisplay num={timeToStringArr[1]} />
        <NumberDisplay num={timeToStringArr[2]} />
      </Timer>
    </StatusContainer>
  );
}

export default GameStatus;
