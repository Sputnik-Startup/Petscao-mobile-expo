import React, { useEffect, useRef } from 'react';
import styled from 'styled-components/native';
import { Animated } from 'react-native';

const ContainerItem = styled.View`
  width: 100%;
  height: 100px;
  background-color: #e3e3e3;
  margin-bottom: 15px;
  border-radius: 8px;
`;

export default function Skeleton() {
  const fade = useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fade, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fade, {
          toValue: 0.7,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),

      {
        iterations: 10,
      }
    ).start();
  }, [fade]);
  return (
    <Animated.View
      style={{
        width: '100%',
        padding: 15,
        alignItems: 'center',
        opacity: fade,
      }}
    >
      <ContainerItem />
      <ContainerItem />
      <ContainerItem />
      <ContainerItem />
      <ContainerItem />
    </Animated.View>
  );
}
