import * as React from 'react';
import { useState, FC } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyle, Footer } from './styles';
import Home from './Home';
import Game from './Game';


const App:FC = () => {
  const [isHomePage, setIsHomePage] = useState<boolean>(false);

  const handlePageChange = (goto:string) => {
    goto === 'bowling' && setIsHomePage(false);
    goto === 'home' && setIsHomePage(true);
  }

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
      <GlobalStyle />
      {
        isHomePage ?
          <Home handlePageChange={handlePageChange} /> :
          <Game handlePageChange={handlePageChange} />
      }
      <Footer>Icons made by <a href="https://www.flaticon.com/authors/those-icons" title="Those Icons">Those Icons</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></Footer>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
