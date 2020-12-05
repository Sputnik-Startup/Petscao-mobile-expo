import React from "react";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/FontAwesome5";

const InputTextView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
  height: 60px;
  border-bottom-width: 1px;
  border-color: #d0cece;
  border-style: solid;
`;

const InputInfo = styled.TextInput`
  font-size: 14px;
  color: #333;
`;

const ButtonUpdate = styled.TouchableOpacity``;

export default ({ defaultValue, placeholder, password, onChangeText }) => {
  return (
    <InputTextView>
      <InputInfo
        defaultValue={defaultValue}
        placeholder={placeholder}
        placeholderTextColor="#d0cece"
        secureTextEntry={password}
        onChangeText={onChangeText}
      />
      <ButtonUpdate></ButtonUpdate>
    </InputTextView>
  );
};
