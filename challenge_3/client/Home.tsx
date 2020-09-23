import * as React from 'react';
import { FC } from 'react';
import { Header, HomeContainer, HomeHero, Title, Subtitle, HomeButton } from './styles';
import SausageIcon from './SausageIcon';
import BabyIcon from './BabyIcon';

interface Props {
  handlePageChange: (goto:string) => any;
}

const Home:FC<Props> = ({ handlePageChange }) => {
  return (
    <React.Fragment>
      <Header>
        <SausageIcon
          height={'32px'}
          width={'32px'}
        />
        <BabyIcon
          height={'32px'}
          width={'32px'}
        />
        <div className='title'>Weenie Hut Jr.</div>
      </Header>
      <HomeContainer>
        <figure>
          <img src="/weenieHutRobot.png" alt="Weenie Hut Jr. Robot"/>
        </figure>
        <HomeHero>
          <Title>Get ready for <br/> Weenie-style bowling&trade;!</Title>
          <Subtitle>
            Tired of being bad at bowling? Choose the number of pins
            <br/>
            you knock down with each bowl, just like a true Weenie&trade;.
            <br />
            You'll finally make your mother proud.
          </Subtitle>
          <div><HomeButton onClick={() => handlePageChange('bowling')}>Start bowling</HomeButton></div>

        </HomeHero>
      </HomeContainer>
    </React.Fragment>
  );
}

export default Home;
