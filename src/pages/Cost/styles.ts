import styled, { keyframes } from 'styled-components';

import backgroundImg from '../../assets/background.png';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 700px;
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${appearFromLeft} 1s;

  img {
    width: 500px;
    height: 220px;
    object-fit: cover;
    object-position: center;
  }

  form {
    width: 340px;
    text-align: center;

    h2 {
      margin-bottom: 24px;
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${backgroundImg}) no-repeat center;
  background-size: cover;

  h1 {
    font-size: 8vw;
    color: green;
    font-weight: bolder;
  }

  h2 {
    font-size: 4vw;
    color: red;
  }

  h3 {
    margin-top: 220px;
    font-size: 2vw;
    font-weight: bolder;
  }

  h4 {
    font-size: 2vw;
  }
`;
