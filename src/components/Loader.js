import React from 'react';
import { Image } from 'react-native';
import styled from 'styled-components/native';

import loader from '../assets/verified.png';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: #f4f4f4;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100000;
`;

const Loader = () => {
  return (
    <Container>
      <Image
        source={loader}
        style={{ width: 50, height: 50, resizeMode: 'contain' }}
      />
    </Container>
  );
};

export default Loader;
