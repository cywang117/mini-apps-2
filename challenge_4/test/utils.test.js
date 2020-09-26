import { defaultFields, generateMinefield, expandSquares, imgURIs, getImgURIForSquare, getImgURIForFace, getImgURIForNumber } from '../client/utils';
import { minefield7x7, expected } from './fixtures/minefield';
import 'babel-polyfill';

describe('Client utils', () => {
  describe('generateMinefield', () => {
    test('generates an accurate easy, medium, or hard minefield', () => {
      let diffs = Object.keys(defaultFields);

      diffs.forEach(diff => {
        let minefield = generateMinefield(defaultFields[diff].rows, defaultFields[diff].cols, defaultFields[diff].mines);

        expect(minefield).toHaveLength(defaultFields[diff].rows);

        let mineCount = 0;

        minefield.forEach(row => {
          expect(row).toHaveLength(defaultFields[diff].cols);
          row.forEach(square => {
            square.value === -1 && mineCount++;
            expect(square.status).toBe('hidden');
          });
        });

        expect(mineCount).toBe(defaultFields[diff].mines);
      });
    });
  });

  describe('expandSquares', () => {
    test('expands a minefield to have all 0 squares visited around click point, leaving a border of non-zero squares', () => {
      expandSquares(3, 3, minefield7x7);
      expect(minefield7x7).toStrictEqual(expected);
    });
  });

  describe('getImgURIForSquare', () => {
    test('returns blank clicked PNG when given a square status of blank or visited with value 0', () => {
      expect(getImgURIForSquare({ status: 'blank', value: 0 }, true)).toStrictEqual({ src: imgURIs.board.visited, alt: 'visited' });
      expect(getImgURIForSquare({ status: 'blank', value: 0 }, false)).toStrictEqual({ src: imgURIs.board.visited, alt: 'visited' });
      expect(getImgURIForSquare({ status: 'visited', value: 0 }, false)).toStrictEqual({ src: imgURIs.board.visited, alt: 'visited' });
    });

    test('returns flag PNG when given square status of flagged when game isn\'t over', () => {
      expect(getImgURIForSquare({ status: 'flagged', value: 1 }, false)).toStrictEqual({ src: imgURIs.board.flagged, alt: 'flag' });
      expect(getImgURIForSquare({ status: 'flagged', value: 1 }, true)).not.toStrictEqual({ src: imgURIs.board.flagged, alt: 'flag' });
    });

    test('returns crossed mine PNG with square status of flagged when game over', () => {
      expect(getImgURIForSquare({ status: 'flagged', value: 1 }, false)).not.toStrictEqual({ src: imgURIs.board.mineWrong, alt: 'mine-wrong' });
      expect(getImgURIForSquare({ status: 'flagged', value: 1 }, true)).toStrictEqual({ src: imgURIs.board.mineWrong, alt: 'mine-wrong' });
      expect(getImgURIForSquare({ status: 'flagged', value: -1 }, true)).not.toStrictEqual({ src: imgURIs.board.mineWrong, alt: 'mine-wrong' });
    });

    test('returns undetected mines on game over', () => {
      expect(getImgURIForSquare({ status: 'hidden', value: 1 }, false)).not.toStrictEqual({ src: imgURIs.board.mineGray, alt: 'mine-display' });
      expect(getImgURIForSquare({ status: 'hidden', value: -1 }, true)).toStrictEqual({ src: imgURIs.board.mineGray, alt: 'mine-display' });
      expect(getImgURIForSquare({ status: 'hidden', value: 1 }, true)).not.toStrictEqual({ src: imgURIs.board.mineGray, alt: 'mine-display' });
    });

    test('returns red mine PNG on visited square with mine', () => {
      expect(getImgURIForSquare({ status: 'visited', value: -1 }, false)).toStrictEqual({ src: imgURIs.board.mineRed, alt: 'mine-exploded' });
      expect(getImgURIForSquare({ status: 'visited', value: 1 }, false)).not.toStrictEqual({ src: imgURIs.board.mineRed, alt: 'mine-exploded' });
    });

    test('returns proximity number on visited square with non-0 and non-neg-one values', () => {
      for (let i = 1; i < 9; i++) {
        expect(getImgURIForSquare({ status: 'visited', value: i }, false)).toStrictEqual({ src: imgURIs.board[i], alt: `prox-${i}` });
      }
    });

    test('returns hidden PNG for default unclicked game square', () => {
      expect(getImgURIForSquare({ status: 'hidden', value: 1 }, false)).toStrictEqual({ src: imgURIs.board.hidden, alt: 'hidden' });
    });
  });

  describe('getImgURIForFace', () => {
    test('returns loss face on game over with explosion', () => {
      expect(getImgURIForFace(true, true, '')).toStrictEqual({ src: imgURIs.faces.loss, alt: 'face-loss' });
      expect(getImgURIForFace(false, true, '')).toStrictEqual({ src: imgURIs.faces.loss, alt: 'face-loss' });
    });

    test('returns win face on game over with no explosion', () => {
      expect(getImgURIForFace(true, false, '')).toStrictEqual({ src: imgURIs.faces.win, alt: 'face-win' });
    });

    test('returns surprised face on clicking a square', () => {
      expect(getImgURIForFace(true, true, 'mine')).toStrictEqual({ src: imgURIs.faces.surprised, alt: 'face-surprise' });
    });

    test('returns default clicked face on clicking face to reset game', () => {
      expect(getImgURIForFace(true, true, 'reset')).toStrictEqual({ src: imgURIs.faces.defaultClicked, alt: 'face-smile-clicked' });
    });

    test('returns default face for other cases', () => {
      expect(getImgURIForFace(false, false, '')).toStrictEqual({ src: imgURIs.faces.default, alt: 'face-smile' });
    });
  });

  describe('getImgURIForNumber', () => {
    test('returns correct number PNGs', () => {
      for (let i = 0; i <= 9; i++) {
        expect(getImgURIForNumber(i)).toStrictEqual({ src: imgURIs.timer[i], alt: `number-${i}` });
      }
    });
  });
});
