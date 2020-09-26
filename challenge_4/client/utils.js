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
 * @param {Number[][]} minefield: matrix representation of a minefield
 * @param {Number} numMines
 */
const addMines = (minefield, numMines) => {
  let minePositions = [];

  while (numMines) {
    let randRow, randCol;
    do {
      randRow = getRandomInRange(0, minefield.length - 1);
      randCol = getRandomInRange(0, minefield[0].length - 1);
    } while (minefield[randRow][randCol] === -1);

    minefield[randRow][randCol] = -1;
    minePositions.push([randRow, randCol]);
    numMines--;
  }

  return minePositions;
}

/**
 * Populate neighboring squares of mines to indicate num mines in proximity
 * @param {Number[][]} minefield: matrix representation of a minefield
 * @param {Number[][]} minePositions: i,j indices of mines placed in minefield matrix
 */
const addMineIndicators = (minefield, minePositions) => {
  let rowLen = minefield.length;
  let colLen = minefield[0].length;

  // Increment adjacent squares by 1 to indicate mine proximity count
  minePositions.forEach(([ row, col ]) => {
    if (row - 1 >= 0) {
      col - 1 >= 0 && minefield[row-1][col-1] !== -1 && minefield[row-1][col-1]++;
      minefield[row-1][col] !== -1 && minefield[row-1][col]++;
      col + 1 < colLen && minefield[row-1][col+1] !== -1 && minefield[row-1][col+1]++;
    }

    col - 1 >= 0 && minefield[row][col-1] !== -1 && minefield[row][col-1]++;
    col + 1 < colLen && minefield[row][col+1] !== -1 && minefield[row][col+1]++;

    if (row + 1 < rowLen) {
      col - 1 >= 0 && minefield[row+1][col-1] !== -1 && minefield[row+1][col-1]++;
      minefield[row+1][col] !== -1 && minefield[row+1][col]++;
      col + 1 < colLen && minefield[row+1][col+1] !== -1 && minefield[row+1][col+1]++;
    }
  });
}

/**
 * Decorate each minefield unit with status, one of flagged, visited, hidden
 * @param {Number[][]} minefield: matrix representation of a minefield
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

/**
 * Expand squares that are blank until visited border is made up of numbers
 * @param {Number} row: row index
 * @param {Number} col: col index
 * @param {Object[][]} minefield
 */
export const expandSquares = (row, col, minefield) => {
  let sq = minefield[row][col];
  if (sq.value === 0) {
    for (let i = Math.max(row - 1, 0); i <= Math.min(row + 1, minefield[0].length - 1); i++) {
      for (let j = Math.max(col - 1, 0); j <= Math.min(col + 1, minefield.length - 1); j++) {
        let adjSquare = minefield[i][j];

        if (adjSquare.status === 'hidden' && adjSquare.value !== -1) {
          adjSquare.status = 'visited';
          expandSquares(i, j, minefield);
        }
      }
    }
  }

}

// Default minesweeper board dimensions and mine counts
export const defaultFields = {
  easy: { rows: 9, cols: 9, mines: 10 },
  medium: { rows: 16, cols: 16, mines: 40 },
  hard: { rows: 16, cols: 30, mines: 99 }
};

// Image sources for different game states - data-uris for faster loading
export const imgURIs = {
  board: {
    hidden: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAA/ElEQVR4Xu3bQQ6DMBBDUXL/M5GrpduSqrGymzaPfVHqGdsfJNoYY1wHXb33x79tBLABLPDXGTB7/rgMIMCU+jZgtwZnxX4NGdL5IwekG1QXJJ2fAIkEk4I2oLgCaYAswALhYSitUHEHXOn8LMACLLB+H5A8JAOKK5AGKASFoBAUgsuXoilEimcgEkwD1AJaQAtoAS2wqrKUomqwuAJpgGpQDapBNagG1eBCgVQjxVvQ43AaIA7AATgAB+AAHIADviuQehQIFVcgDRAIASEgBISA0HuQp09Miof+9vE+WoAA4RubbYmL/8AG3Pf9CMFETsUHun28RgAbcLYFXsB1B3f25OQQAAAAAElFTkSuQmCC',
    visited: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAp0lEQVR4Xu3ZyRHAIAwDQGjNbbn48ORICdqUoAFrTWZ3fyP4mwJwAlyBawZUVdRE+M0AATgBroAZkJSAIfhKUAtoAS2QNAOHIWgIPuuwFtACWkALJCWgBtWgGrxfhTmAAzggqQVtgxzAARzAAf4On71HgiRIgiSYlAAJkiAJkiAJkuCRAAqjMAonQdCjKAqjMAqjMAqjMArvBOwCdgG7gF0gKYH4XWABpLHKqYzDCiQAAAAASUVORK5CYII=',
    flagged: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABR0lEQVR4Xu2bURKDIAxE69XqueFq9Jt0xp1MDG3w9VsEHrtLqnKMMcbrQb/e+zTbAwAoAAtsnQHW84/LAACY1EcB3m3QEqtWMqjxyzpA3eDfgajxA0BVgoogCnASeJ/nZYvemvOO15erBVxuAQCggM0toCSuDF4+AwAgPI4CBIFyFohK3vIAQLVCCAUEQ6+8BewEoooolwEAMARQQDATyltAVXpKIQCoVgeoFfeGJArYXQFWEacJzQaAzR+KogBDAAuQAfNTYkKQXWCzXcCGnLdyjFri5+8GARD8e4wCgqGYboGoxL2ZYK9XCgGA+SrMAgx/IIECgiGHBYIEyACxSxCChOB8ROb2XSBo4fTm6RZIn0GwAwBkZ0BwgdKbuxWgjpikj3hxB1+lMADEGZvFC5TeHQporU3nBlVopC/J4g4OAKCAZ1vgA9GLf3e8hSOmAAAAAElFTkSuQmCC',
    mineGray: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABUklEQVR4Xu2aXRKDIAyEy9X0WJyNs+lrTWfcySTFtHx9RU1d9gcJrfd+vBb+NQCAAUjg4gHbti3lCB8eAAAwAAlM9YB93y/1xhhT6z/uAQAAA5AAHvCOACZICvxYDKoYs+PRkLcSUfVVvfA6QP0BADA5r2ZEjcMAY5KKgQrQsARsgWzKqxeIxiYA2E3R6IYIDEg2vfISUDN+HPdth9aaekfXuNcTwh4AAILyMAAJ4AG3JoYJkgLFY1DFnCukC1xs1wlyHQAAk5e23yYJDDD7CVICakaqSaTct4ACMHscAJx9BSQQ3RHCA4rFJB6AB/h6i2ETpC9gEJhtil7N2wmDAdEYXF4CqjmZLQm6w9W6wzBAHHT8ewlEP2cVg6LPV/enx6AqqFIjmuve+gCQvQ7wzgAS4LQ4p8U5Lb70aXGvaWZf/3gMZr+Q93kA8PQ6wDtj2defU7+uuLo2//8AAAAASUVORK5CYII=',
    mineRed: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABaElEQVR4Xu2awRKEIAxD5bu96ne7Z8uMmUwLuOPbK90CaRKL2PZ9v7YP/xoAwAAkcPOA4zw/5QidBwAADEACUz2ghdlmNyXLPQAAYMAdASQw1YG2DQ+Ih6HZjRAm+O8mqCoYx7MSjyap5lfzpT1ALQAAVAnMcRgQAFMMVPimJRAnqKa82kC2cQKA6j4ABijOFo8vl4Cq+HU9L7E1lcFDzAUk7QFq+QAAA5DAo4jxAExQ2ShPAQuB8sdgbX2svQwJ7k6TqhUGgCF1WJcUBsT3CUoCqlZvk0i5CQKAQAAGKIpMHkcCJuDD3weY60mHwwATQhiQ7QO4FxA3NSYj7XBX813BYED4WDr7gcTsxmg5A9TlZDUg3A6/7XYYBoSKKIraNm/mdz0h3QhlN6QYlM2v/g8A1X2AQlx1ji6F3fmGN0LugpCAMDkXUDceD8ADis8CNgW/LgEXsOr45R5QvSE3HwCsNkG3YtXxP3/iVZgshTWjAAAAAElFTkSuQmCC',
    mineWrong: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABoUlEQVR4Xu2aUZKDMAxDm6vBsTgbvVr3G3WmGo2ddoHXX1ISZEm2k4xt216PG/8GAMAAJHDwgGVZbuUIbx4AADAACXzVA9Z1Pcy37/tX5/+5BwAADPjnElgkQirQZ1Gz3RJI12s9IH1h6mAA0OwBacBggLbDrhROEVaKpxLR8VonpOvR91kG6B/SCQHAZJGUETBA0m7KyLIEUkmMNMRmvNvATOuS2AMAQBBwFIQBV5eApjmn0cfrOGKMzxxx79N/p/sJZQ8AAMnzLmIw4OoSUM9zjFANp+Ndr+A8uN0DAEAQSCOajocBgkB7GuxuZ12E35oVJ+LwuQJkPQAAmvt5GBBStruZiiXg1ptKZDYD2k0QAAwCMCA0ydtJwH0wvUCxdKYUnl0KV7PA5SUwe5vcAZieA7QfjADA5HMCGGBM6OcS4GTIVILd3Vy3JOyGiEuDMOBuDHART02pek2uup5YAtUJVVIAULwnWA0IDHD3BKsIuyxSlUBaiqtHWQYAALfFj/f5lXJp2uvOAtMl4DR89ufWA87+gW79AODSoEPw7M//ACPX+rgVdb2HAAAAAElFTkSuQmCC',
    1: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABEUlEQVR4Xu2bWw7CMAwE6dXSY+Vs5WrwHVdqZK0xSjz8QlVYdsbp6+i9f16FXwcB0AAQGBzQWitlhJsDCIAGgAAOqJQAErQrQaZA8hQ4z2fpXtf7p0T+HQECoAHFEJhV3gK/nQMIYMI8DTAJLI+At/LbNYAAnMzTgNUdoFZ++QYQgMg8DVjdAbODdy8iyy+EbCAE4HQEDdjtlBgIgIDv0hsOwAGbXRdAgkgQCc4OF4b3mQJMAaaACxnvh8Mvj3vHnPcLR58xIoDoW2RogHOhAwJiAuo6AQfgAPPAhHqfYHkJikinbx7ugPRfIO6QAKIlKP4h6ZvTABoQPAbTOyzuEARAAATGR2fVpbCIZPrm5R3wBaH8QrjN6P7qAAAAAElFTkSuQmCC',
    2: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABNElEQVR4Xu2bQRKCMBAE5WvhWbwNv6Zn1kOqawNZK+2VVbLD9CSUyXYcx+e18GdTAB0gApcMaK0tlQg/GaAAOkAEzICVFDAE40rQWQDOAvt7n0rM2c7U/dMIKIAOWAyB2ZbvAU8zAWeAAkxmXgd0FCiHAB1Q7I8iR+93ewbQASlAUEAHwNCljsMI9FJ49PVyDhjdYO/3FEAE2LvG32UAtXhEhjYcvz89BBUAMq4DggLlEchafPQTfzwDFCDJuA4YzPxwBKpbvLfUTq8DFKA44zqgowBGIGv57MKl90TpdQWgf4/rgGToLY8AZZTWU4EfzwDaEK1XALhjRAc8PQtQS9N6ERABtmvMDKAZQJmsXo8dUL0hOj4FEIFwaszN0nCzNGWuWr0ZYAaYAdeTo4agIbjWucEv5u1OuPwFVAEAAAAASUVORK5CYII=',
    3: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABH0lEQVR4Xu2bQQ7CMAwE26+lz8rbytfgjDmgkWVk5Om5idLN7tiplHPv/TwGP6cC6AAj8MaAtdYoInwwQAF0gBGQAZMUEIKxE7QKfKkC67paJeRx36n14AgogA4wAqnMVQ+mTPh7BkRBFQBWBR3QvRGiZbc8AtUQi/MrAOw7dEA1BI3AjxWQATKAnT3aQZBamCaMfnCcH3eCdIEKADNMBdYBsO4bgaCADKg+DQrB6RCkVPc4HBSgEaJlsRyCOiCpgA6AEDUCsDOUAdWNUBIBRzsG0AVlBaDjyxmgAJDKdAez7+uA6irQLQJ0x9M/RBSgGQN0AMx8OgJZSncb374VrhZMAbqfBXRAsQJGwAiEi5PeF/DWmLfGirnba/rxVeAFbUhCuMhP+hwAAAAASUVORK5CYII=',
    4: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABNklEQVR4Xu2bSQ6DMBAE4WvwLN5GvpaccaSMStMHK65cvQS3u8uLYL+u670t/NsVQAcYgQcDjuNYighfDFAAHWAEZMBKCgjBcSfoKtBcBc7zhRJ030/odtujP9+2LR6B7gC67RUAKqAD0hDsWrjbHhpABhgBIzDcCNGNUDqz6f4qJrQjkH7gdH8KUCigA7oQTFs23Z8RMAK/FZABlAE0o1UG0+Xj/ULVP3aAAsAbn2oG0uU6YLhiqwQ2AkIQngaF4OoQrKDSLacOo9Qfnw9DsDvAqr0CwIjpALjuG4FBARlAN0IVxLrlQlAI9t4voA6UATIAHoaoxWh9ISgEhSBKjWeBfzsLoOkPVJ5uHxAYE+pCAWbbCKHpC1TWATpgsq1wwNWoCyNgBIzA89NZ+qYoCtyElZdnwAf+FnK4izDF1wAAAABJRU5ErkJggg==',
    5: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABJUlEQVR4Xu2bQQ6DMAwEy9fCs3gb/Ro9kx6iARsFeXp2o7DaHTsNXbZtOz6FP4sC6AAjcGJAa60UEf4YoAA6wAjIgEoKCMF+ErQLDLrAd12nTkjbd7Q/HAEF0AFGAGXs6WIZIATtAih16W2QZhLtPqBYAegoTAchHQCpHOBqtIQRMALdvcDoOCwD4GGoPAQRkS4U3xU4HYIXngl9RQFutlkdkN0GkZ8DimkkXu+AXjMFgEzQAZQBATFFS2RPntgBaPcBxQqQPHrrABkAj8MBsUZLyAAZwO4inQSdBL0aQ5DFcwClMtpNQHE5BtAH7jV+vQMUAFJfB3QK4AgEcGqqJRRg9tNgtl10gA6Y/PcAI5CsgAyQATLg/NfZ0TtCyZF8fPnyDPgBeGVCuJ9VtKkAAAAASUVORK5CYII=',
    6: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABKklEQVR4Xu2b0RGDMAxDYTU6VmYrq7XfmA9O5yhuz48BQk6Rnp0Q9jHGZ2v87AiAA4jAhQHHcbQiwo0BCIADiAAM6KQAEIydIFVArAKv8yxNzFucb5xsOgIIgAOaRaDa8jHDyxmAAMWZxwFBgZ+PQHaC7iZD7gNUBiBAslPDAWYFiIC6G4QBYh8ABLtD0MywLeswOwQRwKwADkgy5u8jkN0dIoC7ETIj4Da8ygQc4HaAuiJxSd2tt90BCJAsUzjAvPkiAkAw3BN8+jzuziRVICjgFtzOADrBxQqofQcOcFeBxQaQj8hkB2QpPVsQ1fLcEQoK4ACVAURgdoiLx0tHoHj+6dcjQJYB6SUoHgAH4ADxPKDYsdNfTwSIABG4/jr7dCY4PYTFA7ZnwBd/FVq4wx1gdgAAAABJRU5ErkJggg==',
    7: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABCklEQVR4Xu2bQRKEIAwE9WvwLN7G2/Qse0hNFSTZSnuVQh1mOtFd7jHGcxU+bgTAAUTgw4DWWiki/DAAAXAAEYABlRQAgmsnSBUwqkDvPXVC5pzS/ckRQAAcQASkjHkPhgFAkCogpU4ug9LsGwarZfc4AzY8kzQFAoh9Bw44XQUk/24YTASIgNZ6w4B/Z8DpzK9YStcIIcBh6OGARQEikO2rMAyAAWcbn3QQ9LY8AmSrAjjAGXpEgAh8FQjvBGFANQZEr3g4BBEg2PI4ILoMEgEi4Pu6a/045d4IlY+AtSLe590d4P2A1vUQINtXYWvFdp/HAThg2TfI3+XZNMWmqd2gTT0fVaB6FXgB9GZCuN7BbesAAAAASUVORK5CYII=',
    8: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABP0lEQVR4Xu2bSxLDIAxDm6vlWtyNq7Vr6MKjkQ2Z8Lqlw0eRHoa0V2vt+zn4cyEADiACAwPu+z6KCH8MQAAcQARgwEkKAMG5EmQXEHeB3vvWxLgPzI4AAuCAwyKw2/IRcFQmyAxAgM2ZxwGBAo+LgDqheX1q5NTxyhmgTggBJgVwgAhd1XFEQD0NVlsSBsCAUYFqx8kMcC0aVXJquwq9uX8EUCGIA0xIqRaPvk8ExDtMGDApAASB4PQLkQgq1YWJu8tE87cZgADFx1McYNYZRECsC+RtEAbAAO1doJrJ10EwOsxkt6uClzMge4FRfwjwtF0gemLZ7eUOcCG1e8H2WQABzFIVByQroGY+PQLJ61nenVwHLJ9h8YAI4N4JFj+g8u5xAA4Qb4XLPbl4ACJABIjA+NdZt7RcHGF7uOMZ8AOzvnK4w1dAugAAAABJRU5ErkJggg=='
  },
  faces: {
    loss: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAA40lEQVRIS+2WUQ7DIAiG9Wp6LF+9ll7N5e/Gwqiu4iTZQ02amjblK/CD+JRSc8YrhOA8QDlnM1St1eEyBREEXnyA8GLn4vb+ExRjPDlcShkGQe0RAVpHn94/OT2gCgRIDyDdAFDCpkGzEIJK2BSIQ2AAXtGdG5bPOUwNOurgBeuFjIdWBZIh03hEP4V8XXqkzc1IGDfoHRkqTh6qURFP5QiGRoLYqjoJGklb1hNXHPaXYiADWvUtdQYt7Kdex2HYm3Zvnnzz82j1eO+KgQ8Sq4a/fXfMDJi7dg8mp3orpTRrCKAPBTo/UBJroloAAAAASUVORK5CYII=',
    win: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAABAklEQVRIS82WUQ6EIAxE4WpyLD/UxGvB1dyMbpNuLdqykmjiD4Q+O51W4jiOW+j8DMMQIkDrunZDlVIC3q4ggiCLHxA2nnx4vHeCUkqnhHPOVRHcGRFgU/wZ48HRgC4QIBpApgGghJlBVghBJcwE8kI0mBtEdbiyPsnLs7oF8Ww0CILW1vfm/NbLDMIBLejVGu3BGCYQvozkWJYQ5vkQjjuQssLeNB373O4mkMXStZq5pWude2YQANLeVC+tUaWc1Li30mkgrj+HSYld9qZA3qZtmgxe2F+zjsOktfnIeWR683p0/x+12lx1Hb9ItAa+OrffGXDvevpicuq3nPPWGwLoB6QiO1CJmS4VAAAAAElFTkSuQmCC',
    default: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAA4UlEQVRIS+3WUQrDIAwGYL2aHstXr6VXc/zbMrI02ugq7KFCobTFj6Qx6lNKzW0eIQTnAeWct1G1VodrK0QIoviC8OLKwef7TyjGeAi4lNJNwnREBDSlPr1/ORo4BQHRABkGQImZIStCqMRM0CyiYUsQ/Quext4zSuEppEVjhZ6L8/2/lqCZhXxDn2whFaO1JN+bUwdBFkQP6yGY47QYNIiqSRaFjJQvWhPUw0bVt9QZaEJrh/ip13EM91u7N0/V9v1opivwb9Vi4AeJ1YmHhYLjFs5dVx9MDhtjKaXtRoA+AOKnM1AIR77aAAAAAElFTkSuQmCC',
    defaultClicked: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAxklEQVRIS+3VYQ6FIAgA4LyaHsuz4dV8o0ZzPESw0a/85XL5BSKlWms/gkfO+UhvQBjHDaEaNVprH7SX3K3UlVL+NABQv8AFEdCFy5DS5cxAM4SIBPAwEJQwE2RFCJWwJeRFZpgborMY0zh7NqZQhaRorNDZcobzckOeW/RBd7YwFdpd4uvm1KHAC2KGaQju4y5vqiZeFDxSfmmXkBTVqvK2OgNtau0Qj3rdiOE8tHuP6Qr/H63ORls3FcMTgN49IQDoOIkeP+Xi60G/0bVMAAAAAElFTkSuQmCC',
    surprised: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAA90lEQVRIS9WWUQ6EIAxE4Wp6LD7UxGvB1diMbrPdWpCqJLsk/KD0ZdoB6kMI2XUewzA4D9C6rt1QKSWH2RVEEKj4AuHDk4PH+03QOI4HwTHGYhLMigiQFX96v3M0oAkEiAaQMgCUsGZQK4SgEtYE4pBlcW6e9zlNHy3aOoeZQVQHIHgatXUTSKbMomg7nO96nSqy1qZkjP8AlerFVd1OHdUKhkAw6UJp89PUYYNWJwSXrpOH2eS6EqhFkRlUU0UpqqnBP02po2CtVr9113GYvBV44R+5vbltu79HV593tUa8kbgauLZv6xnQdz3dmBzuvxhj7g0B9AXO+0lQk1xoHgAAAABJRU5ErkJggg=='
  },
  timer: {
    0: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAXCAYAAADQpsWBAAAAfElEQVQ4T+2USw7AIAhEx3N33XO3mSZDgELUdeuGRHiAfBwALmyeIWiFpDHPAxEwuokqPaVB5qGAvMMXJDBzPvVPQOpDVXUVIxRCwAHgBJAlHamfoacdoHtlECaCl8uRfL7d7JZv8qH/iWh2v92n7c3ViMz+l/BHzIyz/gaE+ksBUsv9lAAAAABJRU5ErkJggg==',
    1: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAXCAYAAADQpsWBAAAAZklEQVQ4T2NkYGD4z0AiYETWVM3AwNDKwMCAi4aZDdYEUwQSxKcB5CSQBrhN+DSCDIP5Aa4J3XR0LyJ7GqdNRGka4jbhDT2S4wmfBuQ4BKmjXorAln5HUwRa1qZOfqJ9iiCxMGIAAAeHXQFirhwXAAAAAElFTkSuQmCC',
    2: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAXCAYAAADQpsWBAAAAhElEQVQ4T9WUwQ7AIAhD63fvvO/eUrMSNOjEm148jGeBMgqAB8lTBK2QDOap0AXg/pHU67xNaQZa0Ac0SgL7En3qoVLUkxCSwqFKrFN1WSO2fUpPBAFvYNR2fldGNdbnO5pdb0cDaRh7sPdxCeIjpyqN2u7bbX/ulk9+tmY7ptkRyWWEF/0BSgFiADn3AAAAAElFTkSuQmCC',
    3: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAXCAYAAADQpsWBAAAAbUlEQVQ4T2NkYGD4z0AiYIRpIkYnSDEIgDVVMzAwtBKwEmY6iIbbhE8jXBFUA4pNMI3oXkR2OlabsIUJVk0wG4aoTSB/wvwFDwiy44n+KQJX2sXppyEaT7RJe9jiC29+whfBWHMuySmCxMKIAQBVEEoBi9FgegAAAABJRU5ErkJggg==',
    4: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAXCAYAAADQpsWBAAAAiElEQVQ4T+WUwQrAIAxD43fvvO/eiBBpXVvoTZgXB/qsSTMHgAfNMSx0AbgBZLPOnhBL8YOjArRvQQQykGvSwD0OsqCVaUX/ApJ7Ua9D91yXA0rryz3bhypRusk8QCmoQhhWEphV+mja87aDYSJsUCvnFDOnKbviYZUiY1L3Wn+uHGu9Ec3HCC9N+lMBBBE/zAAAAABJRU5ErkJggg==',
    5: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAXCAYAAADQpsWBAAAAfklEQVQ4T9WUwQ6AIAxDy3d79rs1M+lStRp6hAsHeGu3EgaAA+EahGbIulzrggpo+kO1zjcAu0JdwUAK3JR4lxaUpYJVYhXnkMBqSm4I7M/2FOdU1eIXQek/kE5qb1fq2eXEgg09E39C6mBayUILKbmxa/Cv6cU5xS8i/IxwAv0BSgFmB1alAAAAAElFTkSuQmCC',
    6: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAXCAYAAADQpsWBAAAAeUlEQVQ4T+WUzQqAMAyDs+f27HMrEVJS6GQVPIg7bv2a/oQNAAeaZwhaIRnMc0EEgp6o8n0DsDsUGQrIgaSkWJXgrBRKJWWpKhTwNaVqCOqv7Km9J2Z7zRFyTtjobkdeCYEEzUAv/RfQbMF+nwax4oi0p0eOaH5GOAHzYUcB5JLXYwAAAABJRU5ErkJggg==',
    7: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAXCAYAAADQpsWBAAAAdklEQVQ4T9WUwQ6AMAhDu+/27HdraiyBBXE7GDMuO4y3UiBrAA5MRhM0QjKZcUEbgP1FUq/zNKUKtKQbCEoCe4u+9FQp60kKSWFRJfqUL2uE99L783cEQ/f42hPQNyjMqQJV4vCcSk+Lzum73csW+MeNmPyMcAJSYVcB7q48cAAAAABJRU5ErkJggg==',
    8: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAXCAYAAADQpsWBAAAAZElEQVQ4T2NkYGD4z0AiYIRpIkYnSDEIgDWBNMB147AVJg+i4ZrgJmDRhGwghiaYRnR9yE4fEZpg8YAt1GGBgRIQJMcTyGT6pwhcaRern2CKsQXGiEwR2OILZ36iT4ogsTBiAAALdkQBtfUBTAAAAABJRU5ErkJggg==',
    9: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAXCAYAAADQpsWBAAAAdUlEQVQ4T+WUwQ6AIAxDy3d79rs1JemC0gXnzciFA7wV1kIDcKA4mqAnJDdzdIhA0Imq1jkHFBUMNBacIIF3bjz6LyD54LquZlwaUfaJlcuJ2ADsC3BKBJUEZtmd7iQgA20iVkoW+pCS88u+p9c+lRNR/IxwAhUWRwHEYJJ1AAAAAElFTkSuQmCC',
  }
};

/**
 * Get a data-uri PNG string for square depending on game & square status
 */
export const getImgURIForSquare = (square, isGameOver) => {
  // Return blank png is square status is blank (left mouse down)
  if (square.status === 'blank') {
    return { src: imgURIs.board.visited, alt: 'visited' };
  }

  // Indicate wrongfully flagged squares on game over
  if (square.value !== -1 && isGameOver && square.status === 'flagged') {
    return { src: imgURIs.board.mineWrong, alt: 'mine-wrong' };
  }

  // Display flag for flagged (right clicked) squares
  if (square.status === 'flagged') {
    return { src: imgURIs.board.flagged, alt: 'flag' };
  }

  // Reveal undetected mines on game over
  if (square.value === -1 && isGameOver && square.status === 'hidden') {
    return { src: imgURIs.board.mineGray, alt: 'mine-display' };
  }

  // Reveal exploded mine if square with mine is clicked (visited)
  if (square.value === -1 && square.status === 'visited') {
    return { src: imgURIs.board.mineRed, alt: 'mine-exploded' };
  }

  // Display proximity nums or blank square if square has been clicked
  if (square.status === 'visited') {
    return square.value === 0 ?
      { src: imgURIs.board.visited, alt: 'visited' } :
      { src: imgURIs.board[square.value], alt: `prox-${square.value}` };
  }

  // Display blank unclicked square if not clicked (default starting display)
  if (square.status === 'hidden') {
    return { src: imgURIs.board.hidden, alt: 'hidden' };
  }
}

/**
 * Get a data-uri PNG string for face display depending on game status
 */
export const getImgURIForFace = (isGameOver, isExploded, clickStatus) => {
  if (clickStatus === 'reset') {
    return { src: imgURIs.faces.defaultClicked, alt: 'face-smile-clicked' };
  }

  if (clickStatus === 'mine') {
    return { src: imgURIs.faces.surprised, alt: 'face-surprise' };
  }

  if (isExploded) {
    return { src: imgURIs.faces.loss, alt: 'face-loss' };
  }

  if (isGameOver) {
    return { src: imgURIs.faces.win, alt: 'face-win' };
  }

  return { src: imgURIs.faces.default, alt: 'face-smile' };
}

/**
 * Get a data-uri PNG string for number display
 */
export const getImgURIForNumber = (number) => {
  return { src: imgURIs.timer[number], alt: `number-${number}` };
}
