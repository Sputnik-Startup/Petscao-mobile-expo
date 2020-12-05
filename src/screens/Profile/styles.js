import React from "react";
import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #dbe5ec;
`;

export const ScrollView = styled.ScrollView``;

export const ProfileImageArea = styled.View`
  background-color: #fb7b5d;
  width: 100%;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const LogoutButton = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
  right: 15px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const LogoutText = styled.Text`
  color: #fff;
  font-size: 14px;
  margin-left: 3px;
  margin-bottom: 3px;
`;

export const ProfileImageBorder = styled.View`
  width: 105px;
  height: 105px;
  margin: 10px 10px 0px 10px;
  border-radius: 60px;
  border: 2px;
  border-color: #fff;
  border-style: solid;
`;

export const ProfileImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 60px;
`;

export const TextName = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin: 10px 0px 20px 0px;
  color: #fff;
`;

//TEXT INPUTS
export const TextInputContainer = styled.View`
  width: 100%;
  background-color: #fff;
`;

export const ButtonUpdateView = styled.TouchableOpacity`
  width: 100%;
  height: 60px;
  padding: 10px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background-color: #fb7b5d;
`;

export const ButtonText = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: #fff;
  margin-left: 10px;
`;
