import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { ImageBackground, Image, StyleSheet, Dimensions } from "react-native";

import {
  Container,
  InputArea,
  CustomButton,
  CustomButtonText,
  SignMessageButton,
  SignMessageButtonText,
  SignMessageButtonTextBold,
} from "./styles";

import logo from "../../assets/logo.png";

import bg from "../../assets/bg.png";

import SignInput from "../../components/SignInput";

export default ({ navigation }) => {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleMessageButtonClick = () => {
    navigation.navigate("SignIn");
  };

  async function handleSubmit() {}

  return (
    <Container>
      <ImageBackground source={bg} style={styles.bg}>
        <InputArea>
          <Image source={logo} style={styles.logo} />
          <SignInput placeholder="nome" value={name} onChangeText={setName} />
          <SignInput
            placeholder="email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <SignInput
            placeholder="senha"
            value={password}
            onChangeText={(text) => setPassword(text)}
            password={true}
          />

          <CustomButton onPress={handleSubmit}>
            <CustomButtonText>Próximo</CustomButtonText>
          </CustomButton>
        </InputArea>
        <SignMessageButton onPress={handleMessageButtonClick}>
          <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
          <SignMessageButtonTextBold>Faça Login</SignMessageButtonTextBold>
        </SignMessageButton>
      </ImageBackground>
    </Container>
  );
};

const styles = StyleSheet.create({
  logo: {
    marginBottom: 50,
  },
  bg: {
    flex: 1,
    position: "absolute",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    paddingHorizontal: 20,
    paddingVertical: 50,
    alignItems: "center",
  },
});
