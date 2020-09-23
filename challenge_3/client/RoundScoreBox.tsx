import * as React from 'react';
import { FC } from 'react';
import { ScoreBox, ScoreTop, ScoreBottom } from './styles';
import { ScoreDef } from './Game';

interface Props {
  round: ScoreDef;
  isLastRound: boolean;
}

const RoundScoreBox:FC<Props> = ({ round, isLastRound }) => (
  <ScoreBox isLastRound={isLastRound}>
    <ScoreTop isLastRound={isLastRound}>
      <div>{round.frst || ''}</div>
      <div>{round.scnd || ''}</div>
      {
        isLastRound ?
          <div>{round.thrd || ''}</div> :
          ''
      }
    </ScoreTop>
    <ScoreBottom></ScoreBottom>
  </ScoreBox>
);

export default RoundScoreBox;
