import styled, { createGlobalStyle } from 'styled-components';

/**
 * CHALLENGE 1
 */
export const GlobalStyle = createGlobalStyle`
  /* CSS Reset */
  body, html {
    font-family: Arial, Helvetica, sans-serif;
  }
  body {
    width: 100%;
  }
  * {
    margin: 0;
    padding: 0;
  }
  #root {
    width: 80%;
    margin: 0 auto;
  }

  /* React-Paginate styles */
  .paginate-ctn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    list-style-type: none;
    width: 100%;
    height: 30px;
    box-sizing: border-box;
    outline: none;
    margin-top: 10px;
    font-size: 13px;
  }
  .break {
    padding: 0 5px;
  }
  .page {
    width: fit-content;
    height: fit-content;
    padding: 5px 7px;
    margin: 0 3px;
    height: 100%;
    color: black;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
    border: 1px solid transparent;
    outline: none;
    :hover {
      border: 1px solid #51bae8;
      border-radius: 15px;
    }
  }
  .active {
    border: 1px solid #51bae8;
    border-radius: 15px;
    color: #51bae8;
  }
  .page-change-btn {
    line-height: 50px;
    padding: 10px 20px;
    color: white;
    background: #51bae8;
    cursor: pointer;
    border-radius: 15px;
    outline: none;
    :hover {
      opacity: 0.8;
    }
  }
  .previous {
    margin: 0 5px;
  }
`;

export const Title = styled.h1`
  margin: 0 auto;
  margin-bottom: 10px;
  text-align: center;
  padding: 50px 0 20px 0;
`;

export const HelpMsg = styled.div`
  margin: 0 auto;
  text-align: center;
  font-size: 12px;
  padding-top: 10px;
`;

export const StatusMsg = styled.div<{error:boolean}>`
  margin: 0 auto;
  text-align: center;
  font-size: 10px;
  color: ${props => props.error ? 'red' : 'green'};
  padding-top: 15px;
  padding-bottom: 10px;
  box-sizing: border-box;
  height: 20px;
`;

export const EventsCtn = styled.div`
  box-sizing: border-box;
  padding: 20px 30px;
  background: rgba(50, 0, 50, 0.05);
  border-radius: 30px;
  margin: 30px 0;
`;

export const Event = styled.section`
  padding: 10px 0;
`;

export const EventHeaderCtn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 10px;
  align-items: center;
`;

export const EventYear = styled.p`
  font-weight: bold;
`;

export const EventDesc = styled.div`
  margin-left: 10px;
  width: 100%;
  font-family: inherit;
  font-size: inherit;
  outline: none;
  padding: 5px;
  border-radius: 5px;
  :focus {
    background: white;
  }
`;

export const SearchCtn = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  & input {
    padding: 5px;
    margin: 0 10px;
  }
  & button {
    padding: 5px;
  }
`;
