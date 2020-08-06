import styled, { createGlobalStyle } from 'styled-components';

export const theme = {
  colors: {
    primary: '#313638',
    secondary: '#f06543',
    splash: '#f09d51'
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
  }
  body {
    width: 100%;
    background: #e8e9eb;
  }
  #root {
    width: 80%;
    margin: 0 auto;
  }
`;

export const Title = styled.h1`
  margin: 0 auto;
  text-align: center;
  font-size: 30px;
  padding-top: 50px;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
`;

export const Subtitle = styled.p`
  font-size: 20px;
  margin: 0 auto;
  text-align: center;
  padding: 20px 0;
  color: ${props => props.theme.colors.splash};
`;

export const PoweredBy = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  & a {
    font-weight: bold;
    text-decoration: none;
    color: ${props => props.theme.colors.secondary};
    :hover {
      color: ${props => props.theme.colors.splash};
    }
  }
`;

export const ChartCtn = styled.div`
  margin: 0 auto;
`;
