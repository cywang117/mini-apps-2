import React from 'react';
import { getImgURIForNumber } from '../utils';

const NumberDisplay = ({ num }) => (
  <img {...getImgURIForNumber(num)} />
);

export default NumberDisplay;
