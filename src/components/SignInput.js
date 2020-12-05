import React from 'react';
import styled from 'styled-components/native';

const InputArea = styled.View`
  width: 100%;
  height: 50px;
  background-color: #fff;

  flex-direction: row;
  padding-left: 15px;
  align-items: center;
  border: 1px solid #fb7c5e;
`;

const Input = styled.TextInput`
  flex: 1;
  font-size: 16px;
`;

export default ({
  placeholder,
  value,
  onChangeText,
  password,
  keyboardType,
  autoCompleteType,
  autoCapitalize,
}) => {
  return (
    <InputArea>
      <Input
        placeholder={placeholder}
        placeholderTextColor="#fa5523"
        autoCompleteType={autoCompleteType}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={password}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />
    </InputArea>
  );
};
