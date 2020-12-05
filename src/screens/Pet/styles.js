import React from "react";
import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #f4f4f4;
`;

export const ViewButtonAdd = styled.View`
  width: 100%;
  background-color: #fb6340;
  align-items: flex-end;
`;

export const ButtonNewPet = styled.TouchableOpacity`
  width: 130px;
  height: 30px;
  border-radius: 5px;
  background-color: #fff;
  margin: 10px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const TextButton = styled.Text`
  color: #fb6340;
  font-size: 13px;
  font-weight: bold;
  text-align: center;
  margin-left: 5px;
`;

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 22px;
`;

export const ModalView = styled.View`
  margin: 20px;
  background-color: white;
  border-radius: 20px;
  padding: 35px;
  align-items: center;
`;

export const ModalTitle = styled.Text`
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 15px;
`;

export const ModalButton = styled.TouchableOpacity`
  width: 30%;
  padding: 10px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;
