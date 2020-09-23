import React from 'react';

const Minefield = ({ minefield }) => {
  return (
    <div className="board">
      {
        minefield.map((row, idx) => (
          <div className="row" key={idx}>
            {
              row.map((square, jdx) => (
                <div className={`square ${square.status}`} key={jdx}>{square.value}</div>
              ))
            }
          </div>
        ))
      }
    </div>
  );
}

export default Minefield;