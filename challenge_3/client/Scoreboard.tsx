import * as React from 'react';
import { FC } from 'react';
import { ScoreWrapper, BoardWrapper, ScoreTitle } from './styles';
import RoundScoreBox from './RoundScoreBox';
import { ScoreDef } from './Game';

interface Props {
  rounds: ScoreDef[];
}

const Scoreboard:FC<Props> = ({ rounds }) => {
  return (
    <ScoreWrapper>
      <ScoreTitle>Score</ScoreTitle>
      <BoardWrapper>
        {
          rounds.map((round, idx) => (
            <RoundScoreBox
              round={round}
              key={idx}
              isLastRound={idx === 9}
            />
          ))
        }
      </BoardWrapper>
    </ScoreWrapper>
  );
}

export default Scoreboard;
