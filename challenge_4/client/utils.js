/**
 * Get random integer between min and max, inclusive
 * @param {Number} min
 * @param {Number} max
 * @returns {Number}
 */
const getRandomInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Insert numMines mines into empty minefield
 * @param {Number|String[][]} minefield: matrix representation of a minefield
 * @param {Number} numMines
 */
const addMines = (minefield, numMines) => {
  let minePositions = [];

  while (numMines) {
    let randRow, randCol;
    do {
      randRow = getRandomInRange(0, minefield.length - 1);
      randCol = getRandomInRange(0, minefield[0].length - 1);
    } while (minefield[randRow][randCol] === 'x');

    minefield[randRow][randCol] = 'x';
    minePositions.push([randRow, randCol]);
    numMines--;
  }

  return minePositions;
}

/**
 * Populate neighboring squares of mines to indicate num mines in proximity
 * @param {Number|String[][]} minefield: matrix representation of a minefield
 * @param {Number[][]} minePositions: i,j indices of mines placed in minefield matrix
 */
const addMineIndicators = (minefield, minePositions) => {
  let rowLen = minefield.length;
  let colLen = minefield[0].length;

  minePositions.forEach(([ row, col ]) => {
    if (row - 1 >= 0) {
      col - 1 >= 0 && minefield[row-1][col-1] !== 'x' && minefield[row-1][col-1]++;
      minefield[row-1][col] !== 'x' && minefield[row-1][col]++;
      col + 1 < colLen && minefield[row-1][col+1] !== 'x' && minefield[row-1][col+1]++;
    }

    col - 1 >= 0 && minefield[row][col-1] !== 'x' && minefield[row][col-1]++;
    col + 1 < colLen && minefield[row][col+1] !== 'x' && minefield[row][col+1]++;

    if (row + 1 < rowLen) {
      col - 1 >= 0 && minefield[row+1][col-1] !== 'x' && minefield[row+1][col-1]++;
      minefield[row+1][col] !== 'x' && minefield[row+1][col]++;
      col + 1 < colLen && minefield[row+1][col+1] !== 'x' && minefield[row+1][col+1]++;
    }
  });
}

/**
 * Decorate each minefield unit with status, one of flagged, visited, hidden
 * @param {Number|String[][]} minefield: matrix representation of a minefield
 */
const setSquareStatuses = (minefield) => {
  for (let i = 0; i < minefield.length; i++) {
    for (let j = 0; j < minefield[i].length; j++) {
      minefield[i][j] = { value: minefield[i][j], status: 'hidden' };
    }
  }
}

/**
 * Generate a minesweeper board
 * @param {Number} rows
 * @param {Number} cols
 * @param {Number} mines
 */
export const generateMinefield = (rows, cols, mines) => {
  let row = new Array(cols).fill(0);
  let minefield = new Array(rows).fill(row).map(row => [...row]);

  let minePositions = addMines(minefield, mines);
  addMineIndicators(minefield, minePositions);
  setSquareStatuses(minefield);
  return minefield;
}