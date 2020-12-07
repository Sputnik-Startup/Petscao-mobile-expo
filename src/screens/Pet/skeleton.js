import React, { useEffect, useRef } from 'react';
import styled from 'styled-components/native';
import { Animated } from 'react-native';
import { Dimensions } from 'react-native';

const ContainerItem = styled.View`
  width: ${(Dimensions.get('window').width - 30) / 2}px;
  height: ${(Dimensions.get('window').width - 30) / 2}px;
  padding: 10px;
  border-radius: 10px;
  background-color: #e3e3e3;
  margin: 10px;
  margin-top: 0px;
  margin-right: 0px;
`;

export default function PetItem() {
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
        paddingVertical: 15,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        opacity: fade,
      }}
    >
      <ContainerItem />
      <ContainerItem />
      <ContainerItem />
      <ContainerItem />
      <ContainerItem />
      <ContainerItem />
    </Animated.View>
  );
}
