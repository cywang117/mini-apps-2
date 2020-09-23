import styled, { createGlobalStyle } from 'styled-components';

export const theme = {
  colors: {
    primary: '#e8e9ed',
    secondary: '#2667ff',
    splash: '#73877b',
    background: '#333333'
  },
};

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }
  body, html {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
    height: 100vh;
  }
  body {
    background: #333333;
    overflow-y: hidden;
  }
  h1, .title {
    font-family: "Short Stack", cursive;
  }
  #root {
    height: 100vh;
  }
`;

export const Header = styled.header`
  background-color: ${props => props.theme.colors.secondary};
  padding: 10px 0 10px 50px;
  box-sizing: border-box;
  color: ${props => props.theme.colors.primary};
  & div {
    font-size: 20px;
  }
  display: flex;
  flex-direction: row;
  align-items: center;
  position: absolute;
  top: 0;
  width: 100%;
`;

export const Footer = styled.footer`
  position: absolute;
  bottom: 5px;
  left: 5px;
  color: ${props => props.theme.colors.primary};
  & a {
    color: ${props => props.theme.colors.splash};
  }
`;

// Home.tsx styles
export const HomeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 0 10%;
  margin-top: 52px;
`;

export const HomeHero = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Title = styled.h1`
  color: ${props => props.theme.colors.primary};
  font-size: 30px;
  padding: 10px 0 20px 0;
`;

export const Subtitle = styled.p`
  color: ${props => props.theme.colors.primary};
  padding-bottom: 20px;
`;

export const HomeButton = styled.button`
  padding: 10px;
  cursor: pointer;
`;

// Game.tsx styles
export const GameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
  & #buttons {
    display: flex;
    flex-direction: column;
    & button {
      margin: 5px 55px;
    }
    & button:first-child {
      margin-top: 25px;
    }
  }
`;

export const Button = styled.button`
  background: ${props => props.theme.colors.splash};
  color: ${props => props.theme.colors.primary};
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 5px;
  outline: none;
  border: none;
  cursor: pointer;
  width: fit-content;
  :hover {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.background};
  }
`;

// BowlingAlley.tsx styles
export const Alley = styled.div`
  background-color: #D7B383;
  width: 200px;
  height: 85%;
  border-left: 20px solid black;
  border-right: 20px solid black;
  margin-right: 100px;
  margin-top: 50px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

// Scoreboard.tsx styles
export const ScoreWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 50px;
`;

export const BoardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 50px 0 50px;
  padding-top: 20px;
  padding-right: 20px;
`;

export const ScoreTitle = styled.h1`
  color: ${props => props.theme.colors.primary};
  font-size: 20px;
  width: 100%;
  text-align: left;
  padding-left: 100px;
`;

export const ScoreBox = styled.div<{isLastRound:boolean}>`
  width: ${props => props.isLastRound ? '75px' : '50px'};
  height: 50px;
  border: 1px solid ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.primary};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ScoreTop = styled.div<{isLastRound:boolean}>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  & div {
    box-sizing: border-box;
    width: 25px;
    height: 25px;
    line-height: 25px;
    text-align: center;
  }
  ${props => props.isLastRound ?
    `
    & div:nth-child(2) {
      border-left: 1px solid ${props.theme.colors.primary};
      border-bottom: 1px solid ${props.theme.colors.primary};
    }
    ` :
    ''
  }
  & div:last-child {
    border-left: 1px solid ${props => props.theme.colors.primary};
    border-bottom: 1px solid ${props => props.theme.colors.primary};
  }
`;

export const ScoreBottom = styled.div`
  height: 25px;
  line-height: 25px;
  text-align: center;
`;

// PinChooser.tsx styles
export const ChooserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 50px;
  margin-top: 50px;
  & h1 {
    color: ${props => props.theme.colors.primary};
    font-size: 20px;
    padding-bottom: 10px;
  }
  & > div {
    display: flex;
    flex-direction: row;
    color: ${props => props.theme.colors.splash};
    justify-content: center;
    align-content: center;
    width: 150px;
  }
  & > div > div {
    width: 50px;
    height: 30px;
    line-height: 20px;
    font-weight: bold;
    font-size: 16px;
    padding: 5px 0;
    box-sizing: border-box;
    text-align: center;
    margin: 5px;
    background: rgba(200, 200, 200, 0.1);
    border-radius: 5px;
    cursor: pointer;
    :hover {
      background: ${props => props.theme.colors.primary};
    }
  }
  & > div:last-child > div:last-child {
    width: fit-content;
    padding-left: 10px;
    padding-right: 10px;
  }
`;
