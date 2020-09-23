import styled, { createGlobalStyle } from 'styled-components';

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

export const Title = styled.h1`
  font-size: 20px;
  text-align: center;
  margin: 0 auto;
`;

const heightPerDiff = {
  easy: 'TODOpx',
  medium: 'TODOpx',
  hard: 'TODOpx'
};

const widthPerDiff = {
  easy: 'TODOpx',
  medium: 'TODOpx',
  hard: 'TODOpx'
};

export const Board = styled.div`
  margin: 0 auto;
  height: ${props => props.diff}
`;