import React from "react";
import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  position: relative;
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

export const FormAppointment = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  padding-left: 15px;
  background-color: #fff;
  margin: 10px 0px;
  border-radius: 8px;

  flex-direction: row;

  align-items: center;
  border: 1px solid #fb7c5e;
  font-size: 16px;
`;

export const ButtonText = styled.Text`
  width: 85%;
  align-items: center;
  text-align: center;

  font-size: 16px;
`;

export const BorderPicker = styled.View`
  border: 1px solid #fb7c5e;
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  margin: 10px 0;
  opacity: ${(props) => (props.hasHours ? "1" : "0.5")};
`;

export const ButtonSolid = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  background-color: #fb7c5e;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
`;

export const ButtonSolidText = styled.Text`
  font-size: 16px;
  color: #fff;
  font-weight: 700;
`;
