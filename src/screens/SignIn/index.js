import React, { useContext, useState } from 'react';

import {
  ImageBackground,
  Image,
  StyleSheet,
  Dimensions,
  AsyncStorage,
} from 'react-native';
import {
  Container,
  InputArea,
  CustomButton,
  CustomButtonText,
  SignMessageButton,
  SignMessageButtonText,
  SignMessageButtonTextBold,
  NoConnection,
  NoConnectionText,
} from './styles';

import bg from '../../assets/bg.png';

import logo from '../../assets/logo.png';

import SignInput from '../../components/SignInput';
import { api } from '../../services/api';
import { UserContext } from '../../contexts/UserContext';

export default ({ navigation, route }) => {
  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');

  const { handleSignin } = useContext(UserContext);

  const handleMessageButtonClick = () => {
    navigation.navigate('SignUp', {
      noConnection: !!route.params?.noConnection,
    });
  };

  return (
    <Container>
      {route.params?.noConnection && (
        <NoConnection>
          <NoConnectionText>
            Não conseguimos conectar com o servidor
          </NoConnectionText>
        </NoConnection>
      )}
      <ImageBackground source={bg} style={styles.bg}>
        <InputArea>
          <Image source={logo} style={styles.logo} />
          <SignInput
            placeholder="email"
            keyboardType="email-address"
            autoCompleteType="email"
            autoCapitalize="none"
            value={emailField}
            onChangeText={(t) => setEmailField(t)}
          />
          <SignInput
            placeholder="senha"
            value={passwordField}
            onChangeText={(t) => setPasswordField(t)}
            password={true}
          />

          <CustomButton
            onPress={() =>
              !route.params?.noConnection &&
              handleSignin(emailField, passwordField, navigation)
            }
            style={{ opacity: route.params?.noConnection ? 0.5 : 1 }}
            disabled={!!route.params?.noConnection}
          >
            <CustomButtonText>Entrar</CustomButtonText>
          </CustomButton>
        </InputArea>
        <SignMessageButton onPress={handleMessageButtonClick}>
          <SignMessageButtonText>Novato no Pet'scao?</SignMessageButtonText>
          <SignMessageButtonTextBold>
            Cadastre-se aqui
          </SignMessageButtonTextBold>
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
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    paddingHorizontal: 20,
    paddingVertical: 50,
    alignItems: 'center',
  },
});
