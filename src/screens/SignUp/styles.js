import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  background-color: #fab600;
  flex: 1;
`;

export const InputArea = styled.View`
  padding: 20px;
  width: 100%;
`;

export const CustomButton = styled.TouchableOpacity`
  height: 50px;
  width: 100%;
  background-color: #fa5523;
  border: 1px solid #fff;
  border-radius: 2px;

  margin-top: 20px;
  justify-content: center;
  align-items: center;
`;
export const CustomButtonText = styled.Text`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
`;

export const SignMessageButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;

  margin-top: 5px;
  margin-bottom: 20px;
`;
export const SignMessageButtonText = styled.Text`
  font-size: 16px;
  color: #fff;
`;
export const SignMessageButtonTextBold = styled.Text`
  font-size: 16px;
  color: #fff;
  font-weight: bold;
  margin-left: 5px;
`;

export const NoConnection = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 30px;
  align-items: center;
  justify-content: center;
  background-color: #fa5523;
  z-index: 999;
`;

export const NoConnectionText = styled.Text`
  color: #fff;
  font-size: 12px;
`;
