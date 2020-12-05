import React from "react";
import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const HeaderPost = styled.View`
  width: 100%;
  height: 50px;
  background-color: #fb6340;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
`;

export const HeaderTitle = styled.Text`
  color: #fff;
  font-weight: 700;
  font-size: 16px;
`;
export const GoBackIcon = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
`;
