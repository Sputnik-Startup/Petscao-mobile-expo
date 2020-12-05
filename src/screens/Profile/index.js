import React, { useContext, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  Container,
  ScrollView,
  ProfileImageArea,
  ProfileImage,
  TextName,
  ProfileImageBorder,
  TextInputContainer,
  ButtonUpdateView,
  ButtonText,
  LogoutText,
  LogoutButton,
} from './styles';

import InputTextProfile from '../../components/InputTextProfile';
import { UserContext } from '../../contexts/UserContext';
import { addHours, format, parseISO } from 'date-fns';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { api } from '../../services/api';

export default ({ navigation }) => {
  const { user, dispatch, handleLogout } = useContext(UserContext);

  const [selectedImg, setSelectedImg] = useState(null);
  const [name, setName] = useState(user.name);
  const [cpf, setCpf] = useState(user.cpf);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [birthDate, setBirthDate] = useState(user.birth_date);
  const [phone, setPhone] = useState(user.phone);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState(user.address);
  const [cep, setCep] = useState(user.cep);
  const [neighborhood, setNeighborhood] = useState(user.neighborhood);
  const [city, setCity] = useState(user.city);
  const [state, setState] = useState(user.state);

  const imagePicker = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permissão necessária para acessar galeria!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync();

    if (result.cancelled === true) {
      return;
    }

    let localUri = result.uri;
    let filename = localUri.split('/').pop();

    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    setSelectedImg({ uri: result.uri, name: filename, type });
  };

  const handleEdit = async () => {
    if (
      name &&
      cpf &&
      birthDate &&
      phone &&
      address &&
      cep &&
      neighborhood &&
      city &&
      state
    ) {
      if (oldPassword && (!newPassword || !confirmPassword)) {
        alert('Informe a nova e senha.');
        return;
      }

      try {
        let response = await api({
          method: 'put',
          url: '/customer',
          data: {
            name,
            cpf,
            birth_date: birthDate,
            phone,
            address,
            cep,
            neighborhood,
            city,
            state,
            oldPassword,
            newPassword,
            confirmPassword,
            age,
            gender,
          },
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        });

        if (selectedImg) {
          const data = new FormData();
          data.append('avatar', selectedImg);
          response = await api({
            method: 'patch',
            url: '/avatar?context=customer',
            data: data,
            headers: {
              authorization: `Bearer ${user.token}`,
            },
          });
        }

        dispatch({ type: '@user/SET_USER', payload: { user: response.data } });
      } catch (error) {
        alert(error.response?.data.error);
      }
    } else {
      alert('Preencha todos os campos.');
    }
  };

  return (
    <Container>
      <ScrollView>
        <ProfileImageArea>
          <LogoutButton onPress={() => handleLogout(navigation)}>
            <Icon name="sign-out-alt" color="#fff" size={14} regular />
            <LogoutText>sair</LogoutText>
          </LogoutButton>
          <TouchableOpacity onPress={imagePicker}>
            <ProfileImageBorder>
              <ProfileImage
                source={{ uri: selectedImg?.uri || user?.avatar?.devMobileUrl }}
              />
            </ProfileImageBorder>
          </TouchableOpacity>
          <TextName>{user?.name}</TextName>
        </ProfileImageArea>
        <TextInputContainer>
          <InputTextProfile
            defaultValue={user?.name}
            onChangeText={(text) => setName(text)}
          />
          <InputTextProfile
            defaultValue={user?.cpf}
            onChangeText={(text) => setCpf(text)}
          />
          <InputTextProfile
            defaultValue={
              user.birth_date
                ? format(addHours(parseISO(user.birth_date), 3), 'dd/MM/yyyy')
                : ''
            }
            onChangeText={(text) => setBirthDate(text)}
          />
          <InputTextProfile
            defaultValue={user?.phone}
            onChangeText={(text) => setPhone(text)}
          />
          <InputTextProfile
            defaultValue={String(user?.age)}
            onChangeText={(text) => setAge(text)}
          />
          <InputTextProfile
            defaultValue={user?.gender}
            onChangeText={(text) => setGender(text)}
          />
          <InputTextProfile
            placeholder="Senha antiga"
            password={true}
            onChangeText={(text) => setOldPassword(text)}
          />
          <InputTextProfile
            placeholder="Nova senha"
            password={true}
            onChangeText={(text) => setNewPassword(text)}
          />
          <InputTextProfile
            placeholder="Confirmar senha"
            password={true}
            onChangeText={(text) => setConfirmPassword(text)}
          />
          <InputTextProfile
            defaultValue={user?.address}
            onChangeText={(text) => setAddress(text)}
          />
          <InputTextProfile
            defaultValue={user?.cep}
            onChangeText={(text) => setCep(text)}
          />
          <InputTextProfile
            defaultValue={user?.neighborhood}
            onChangeText={(text) => setNeighborhood(text)}
          />
          <InputTextProfile
            defaultValue={user?.city}
            onChangeText={(text) => setCity(text)}
          />
          <InputTextProfile
            defaultValue={user?.state}
            onChangeText={(text) => setState(text)}
          />
        </TextInputContainer>
        <ButtonUpdateView onPress={handleEdit}>
          <Icon name="sync" size={15} color="#fff" />
          <ButtonText>Atualizar</ButtonText>
        </ButtonUpdateView>
      </ScrollView>
    </Container>
  );
};
