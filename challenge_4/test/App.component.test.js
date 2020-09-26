import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { minefield7x7, expected } from './fixtures/minefield';
import '@testing-library/jest-dom/extend-expect';
import 'babel-polyfill';
import App from '../client/components/App';

describe('<App /> integration tests', () => {
  let buttonTestIds = ['easy', 'med', 'hard'];
  let faceAlts = ['face-smile-clicked', 'face-smile', 'face-surprise', 'face-loss', 'face-win'];
  let squareAlts = ['visited', 'hidden', 'flag', 'mine-display', 'mine-wrong', 'mine-exploded'];

  test('renders all starting game elements without error', async () => {
    render(<App />);

    let title = await screen.findByText('Minesweeper Classic');
    expect(title).toBeInTheDocument();

    for (let d of buttonTestIds) {
      let diffButton = await screen.findByTestId(`button-${d}`);
      expect(diffButton).toBeInTheDocument();
    }

    // Default easy game: start with 10 flags left
    let flagContainer = await screen.findByTestId('flag-count');
    expect(flagContainer.children[0].alt).toBe('number-0');
    expect(flagContainer.children[1].alt).toBe('number-1');
    expect(flagContainer.children[2].alt).toBe('number-0');

    let defaultFace = await screen.findByAltText('face-smile');
    expect(defaultFace).toBeInTheDocument();

    // Timer display starts at 0 seconds
    let timerContainer = await screen.findByTestId('timer');
    expect(timerContainer.children[0].alt).toBe('number-0');
    expect(timerContainer.children[1].alt).toBe('number-0');
    expect(timerContainer.children[2].alt).toBe('number-0');

    let blankUnclicked = await screen.findAllByAltText('hidden');
    expect(blankUnclicked).toHaveLength(81);
  });

  test('renders minefield with correct dimensions for each difficulty', async () => {
    // Should render easy difficulty by default
    render(<App />);
    let minefieldSquares = await screen.findAllByTestId(/square/);
    expect(minefieldSquares).toHaveLength(81);

    let easyButton = await screen.findByTestId('button-easy');
    let medButton = await screen.findByTestId('button-med');
    let hardButton = await screen.findByTestId('button-hard');

    await fireEvent.click(medButton);
    minefieldSquares = await screen.findAllByTestId(/square/);
    expect(minefieldSquares).toHaveLength(16 * 16);

    await fireEvent.click(hardButton);
    minefieldSquares = await screen.findAllByTestId(/square/);
    expect(minefieldSquares).toHaveLength(16 * 30);

    await fireEvent.click(easyButton);
    minefieldSquares = await screen.findAllByTestId(/square/);
    expect(minefieldSquares).toHaveLength(81);
  });

  test('displays flag on flagged status', async () => {
    const { rerender } = render(<App testingMinefield={minefield7x7} />);

    // NOTE: using fireEvent.contextMenu or fireEvent.click(node, { button: 2 })
    // does NOT fire a right click as expected, so the workaround to test this is below.
    // Can't manage to test handleRightClick in App.js, so it'll remain untested.
    let squares = await screen.findAllByTestId(/square/);
    squares.forEach(sq => {
      expect(sq.children[0].alt).toBe('hidden');
    });

    minefield7x7[0][0] = { value: -1, status: 'flagged' };
    rerender(<App testingMinefield={minefield7x7} />);
    squares = await screen.findAllByTestId(/square/);
    expect(squares[0].children[0].alt).toBe('flag');
    minefield7x7[0][0] = { value: -1, status: 'hidden' };
  });

  // App tests unfinished. Click events DO NOT work (trust me, I've used them extensively
  // during FEC. They're not working here for some obscure reason. TODO later.)
});
