import * as React from 'react';
import { useState, useEffect, FC } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyle, Title, Subtitle, PoweredBy } from './styles';
import { fetchClosePricesForDateRange } from './utils';
import CryptoChart, { APIRes } from './CryptoChart';

const App:FC = () => {
  const [cryptoData, setCryptoData] = useState<APIRes>({});

  useEffect(() => {
    fetchClosePricesForDateRange('2020-01-01', '2020-02-01')
      .then(data => {
        setCryptoData(data);
      })
      .catch(console.error);
  }, []);

  return (
    <React.Fragment>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Title>Crypto Charter</Title>
        <Subtitle>Bitcoin Price Index</Subtitle>
        <CryptoChart data={cryptoData} />
        <PoweredBy>
          Powered By{' '}
          <a href="https://www.coindesk.com/price/bitcoin" title="CoinDesk Price Page">
            CoinDesk
          </a>
        </PoweredBy>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
