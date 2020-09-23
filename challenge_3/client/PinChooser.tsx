import * as React from 'react';
import { FC } from 'react';
import { ChooserWrapper } from './styles';
import { HandlePinChange } from './Game';

interface Props {
  numPins: number;
  handlePinChange: HandlePinChange
}

const PinChooser:FC<Props> = ({ numPins, handlePinChange }) => {
  return (
    <ChooserWrapper>
      <h1>Pins to knock down: {numPins}</h1>
      <div>
        <div onClick={() => handlePinChange(1)}>1</div>
        <div onClick={() => handlePinChange(2)}>2</div>
        <div onClick={() => handlePinChange(3)}>3</div>
      </div>
      <div>
        <div onClick={() => handlePinChange(4)}>4</div>
        <div onClick={() => handlePinChange(5)}>5</div>
        <div onClick={() => handlePinChange(6)}>6</div>
      </div>
      <div>
        <div onClick={() => handlePinChange(7)}>7</div>
        <div onClick={() => handlePinChange(8)}>8</div>
        <div onClick={() => handlePinChange(9)}>9</div>
      </div>
      <div>
        <div onClick={() => handlePinChange(10)}>10</div>
        <div onClick={() => handlePinChange('random')}>Random</div>
      </div>
    </ChooserWrapper>
  );
}

export default PinChooser;
