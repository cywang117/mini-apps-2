import React from 'react';
import { Board, Row, Square } from '../styles';
import { getImgURIForSquare } from '../utils';

const Minefield = ({ minefield, diff, handleRightClick, handleLeftClickDown, handleLeftClickUp, isGameOver }) => {
  return (
    <Board>
      {
        minefield.map((row, idx) => (
          <Row key={idx} diff={diff}>
            {
              row.map((square, jdx) => (
                <Square
                  key={jdx}
                  id={`${idx}_${jdx}`}
                  data-testid={`square_${idx}_${jdx}`}
                  onMouseDown={handleLeftClickDown}
                  onMouseUp={handleLeftClickUp}
                  onContextMenu={handleRightClick}
                >
                  {/* Spread output of getImgURI (object containing src & alt) */}
                  <img {...getImgURIForSquare(square, isGameOver)} />
                </Square>
              ))
            }
          </Row>
        ))
      }
    </Board>
  );
}

export default Minefield;
