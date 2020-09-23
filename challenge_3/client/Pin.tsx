import * as React from 'react';
import { FC } from 'react';
import styled from 'styled-components';

const PinImg = styled.img`
  width: 30px;
  height: 30px;
`;

const Box = styled.div`
  width: 30px;
  height: 30px;
`;

interface Props {
  row: number;
  pin: number;
}

export const Pin:FC<Props> = ({ row, pin }) => (
  <PinImg data-row={row} data-pin={pin} src="/BowlingPin.png" alt="Bowling Pin" />
);

export const Placeholder:FC = () => (
  <Box />
);
