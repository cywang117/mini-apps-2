import styled, { createGlobalStyle } from 'styled-components';
import { defaultFields } from './utils';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }
  html, body {
    font-family: Arial, Helvetica, sans-serif;
    height: 100%;
  }
  #root {
    height: 100%;
  }
`;

export const Header = styled.header`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  & div {
    margin: 0 auto;
  }
`;

export const Title = styled.h1`
  font-size: 20px;
  text-align: center;
  margin: 0 auto;
  padding: 30px 0 20px 0;
`;

const boardHeightPerDiff = {
  easy: '206px',
  medium: '318px',
  hard: '318px'
};

const boardWidthPerDiff = {
  easy: '164px',
  medium: '276px',
  hard: '500px'
};

const timerWidthPerDiff = {
  easy: '148px',
  medium: '260px',
  hard: '484px'
};

export const GameContainer = styled.div`
  margin: 0 auto;
  height: ${props => boardHeightPerDiff[props.diff]};
  width: ${props => boardWidthPerDiff[props.diff]};
  pointer-events: none;
  border-top: 2px solid white;
  border-left: 2px solid white;
  border-bottom: 2px solid #7b7b7b;
  border-right: 2px solid #7b7b7b;
  box-sizing: border-box;
  margin-top: 10px;
  background-color: #bdbdbd;
  display: flex;
  flex-direction: column;
`;

export const StatusContainer = styled.div`
  height: 36px;
  width: ${props => timerWidthPerDiff[props.diff]};
  box-sizing: border-box;
  margin: 6px auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-top: 2px solid #7b7b7b;
  border-left: 2px solid #7b7b7b;
  border-bottom: 2px solid white;
  border-right: 2px solid white;
  user-select: none;
  & div:nth-child(2) {
    display: flex;
    align-items: center;
    pointer-events: all;
  }
`;

export const Flags = styled.div`
  margin-left: 6px;
  display: flex;
`;

export const Timer = styled.div`
  margin-right: 6px;
  display: flex;
`;

export const Board = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  border-top: 2px solid #7b7b7b;
  border-left: 2px solid #7b7b7b;
  border-bottom: 2px solid white;
  border-right: 2px solid white;
  box-sizing: border-box;
`;

export const Row = styled.div`
  margin: 0;
  height: 16px;
  width: ${props => defaultFields[props.diff].cols * 16}px;
  pointer-events: none;
  user-select: none;
`;

export const Square = styled.div`
  margin: 0;
  display: inline-block;
  width: 16px;
  height: 16px;
  pointer-events: all;
  & img {
    width: 16px;
    height: 16px;
    pointer-events: none;
  }
`;
