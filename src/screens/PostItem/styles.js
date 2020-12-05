import React from "react";
import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;

export const Scroller = styled.ScrollView``;

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

export const CommentProfile = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 65px;
  margin-left: 5px;
`;

export const CommentArea = styled.View`
  width: 100%;
  height: 60px;
  align-items: center;
  flex-direction: row;
  border: 1px;
  border-color: #dbdbdb;
  border-style: solid;
`;

export const CommentInput = styled.TextInput`
  width: 60%;
  height: 40px;
  border-radius: 120px;
  border: 1px;
  border-color: #dbdbdb;
  border-style: solid;
  padding-left: 15px;
  padding-right: 10px;
  margin-left: 10px;
`;

export const ButtonArea = styled.TouchableOpacity`
  width: 20%;
  align-items: center;
  justify-content: center;
`;

export const TextButton = styled.Text`
  font-size: 16px;
  color: #fb6340;
  font-weight: bold;
  margin-left: 10px;
`;

export default function Comment({
  placeholder,
  value,
  onChangeText,
  password,
  keyboardType,
}) {
  return (
    <CommentArea>
      <CommentInput
        placeholder={placeholder}
        placeholderTextColor="#fa5523"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={password}
        keyboardType={keyboardType}
      />
    </CommentArea>
  );
}
