import styled from 'styled-components';

import BlueSquare from '../../assets/blue-square.jpg';
import GreenSquare from '../../assets/green-square.jpg';
import RedSquare from '../../assets/red-square.jpg';

export const StyledBlock = styled.div`
  border-radius: 15px;
  background-color: #1b1d21;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.4);
  width: 60%;
  margin: 30px;
  padding-bottom: 15px;

  div.index {
    cursor: pointer;
    background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${GreenSquare});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 55px;
    height: 100%;
    border-radius: 15px 0 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
  }

  
  &&.loading div.index {
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${BlueSquare});
  }

  &&.invalid div.index {
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${RedSquare});
  }

  hr {
    border: 1px solid #282b31;
  }
`;

export const BlockTitle = styled.div`
  display: flex;
  height: 50px;
`;

export const BlockHash = styled.div`
  padding: 15px;
  width: 100%;
  text-align: center;
`;

export const BlockHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: .8rem;

  div.title {
    font-size: .9rem;
    padding: 5px 0;
    font-weight: 600;
  }
`;


export const BlockBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: .8rem;

  div.title {
    font-size: .9rem;
    padding: 5px 0;
    font-weight: 600;
  }
`;

export const BlockTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  td, th {
    border: 2px solid #282b31;
    padding: 5px 10px 5px 20px;
  }

  tr#body-header th {
    text-align: left;
  }

  td:first-child, 
  th:first-child {
    border-left: none;
  }

  td:last-child,
  th:last-child {
    border-right: none;
  }
`;