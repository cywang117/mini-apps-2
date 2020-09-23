import * as React from 'react';
import { FC } from 'react';
import { Alley, Row } from './styles';
import { Pin, Placeholder } from './Pin';

interface Props {
  rows: Array<Array<number>>;
}

const BowlingAlley:FC<Props> = ({ rows }) => (
  <Alley>
    {
      rows.map((row, idx) => (
        <Row key={idx}>
          {
            row.map((pin, jdx) => (
              pin === 1 ?
                <Pin row={idx} pin={jdx} key={jdx} /> :
                <Placeholder key={jdx} />
            ))
          }
        </Row>
      ))
    }
  </Alley>
);

export default BowlingAlley;
