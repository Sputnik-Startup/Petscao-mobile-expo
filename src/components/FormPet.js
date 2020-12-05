import React, { useContext, useState } from "react";
import styled from "styled-components/native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { api } from "../services/api";
import { UserContext } from "../contexts/UserContext";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";

const FormPet = styled.ScrollView`
  flex: 1;
  padding: 0 10px;
`;

const ProfileView = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const ProfilePet = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  margin-bottom: 10px;
  border-width: 2px;
  border-color: #fb7c5e;
`;

const ProfileButtonEdit = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  padding: ${(props) => (!props.selectedImg ? "20px" : "0px")};
  border-width: ${(props) => (!props.selectedImg ? "1px" : "0px")};
  border-style: dashed;
  border-color: #9f9fa0;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const ProfileButoonText = styled.Text`
  font-size: 16px;
  color: #928d8d;
  margin-bottom: 10px;
`;

const Input = styled.TextInput`
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

const PetSubmit = styled.TouchableOpacity`
  height: 50px;
  width: 100%;
  background-color: #fb7c5e;
  border-radius: 8px;
  margin-top: 10px;
  align-items: center;
  justify-content: center;
`;

const PetSubmitText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #fff;
`;

const BorderPicker = styled.View`
  border: 1px solid #fb7c5e;
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  margin: 10px 0;
`;

export default ({ pet }) => {
  const [sex, setSex] = useState(pet?.sex || "");
  const [selectedImg, setSelectedImg] = useState(
    pet ? { avatar: pet?.avatar } : null
  );
  const [name, setName] = useState(pet?.name || "");
  const [type, setType] = useState(pet?.type || "");
  const [breed, setBreed] = useState(pet?.name || "");

  const isEditing = !!pet?.id;

  const { user } = useContext(UserContext);
  const navigation = useNavigation();

  const imagePicker = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permissão necessária para acessar galeria!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync();

    if (result.cancelled === true) {
      return;
    }

    let localUri = result.uri;
    let filename = localUri.split("/").pop();

    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    setSelectedImg({ uri: result.uri, name: filename, type });
  };

  const handleSubmit = async () => {
    if (name && type && breed && sex) {
      if (isEditing) {
        try {
          let response = await api({
            method: "put",
            url: `/customer/pet/${pet.id}`,
            data: {
              name,
              breed,
              type,
              sex,
            },
            headers: {
              authorization: `Bearer ${user.token}`,
            },
          });

          if (selectedImg?.uri) {
            const data = new FormData();
            data.append("avatar", selectedImg);
            response = await api({
              method: "patch",
              url: `/avatar?context=pet&target_id=${pet.id}`,
              data,
              headers: {
                authorization: `Bearer ${user.token}`,
              },
            });
          }

          navigation.navigate("Pet", { pet: response.data, isEditing: true });
        } catch (error) {
          alert(error.response?.data.error || error.message);
        }
      } else {
        const data = new FormData();
        data.append("name", name);
        data.append("type", type);
        data.append("breed", breed);
        data.append("sex", sex);
        data.append("avatar", selectedImg);

        try {
          const response = await api({
            method: "post",
            url: "/customer/pet",
            data,
            headers: {
              authorization: `Bearer ${user.token}`,
            },
          });

          navigation.navigate("Pet", { pet: response.data, isEditing: false });
        } catch (error) {
          alert(error.response?.data.error || error.message);
        }
      }
    }
  };
  return (
    <FormPet contentContainerStyle={{ alignItems: "center", padding: 15 }}>
      <ProfileView>
        <ProfileButoonText>Escolha uma foto</ProfileButoonText>
        <ProfileButtonEdit onPress={imagePicker} selectedImg={!!selectedImg}>
          {selectedImg ? (
            <ProfilePet
              source={{
                uri: selectedImg.avatar?.devMobileUrl || selectedImg.uri,
              }}
            />
          ) : (
            <Icon name="images" size={30} color="#9f9fa0" solid />
          )}
        </ProfileButtonEdit>
      </ProfileView>

      <Input
        placeholder="Nome"
        placeholderTextColor="#9f9fa0"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Input
        placeholder="Tipo"
        placeholderTextColor="#9f9fa0"
        value={type}
        onChangeText={(text) => setType(text)}
      />
      <Input
        placeholder="Raça"
        placeholderTextColor="#9f9fa0"
        value={breed}
        onChangeText={(text) => setBreed(text)}
      />

      <BorderPicker>
        <Picker
          style={{ flex: 1 }}
          selectedValue={sex}
          mode="dropdown"
          onValueChange={(item) => setSex(item)}
          itemStyle={{ fontSize: 14 }}
        >
          <Picker.Item label="Selecione o Sexo" value="" color="#9f9fa0" />
          <Picker.Item label="Fêmea" value="female" />
          <Picker.Item label="Macho" value="male" />
        </Picker>
      </BorderPicker>
      <PetSubmit onPress={handleSubmit}>
        <PetSubmitText>{isEditing ? "Editar" : "Adicionar"}</PetSubmitText>
      </PetSubmit>
    </FormPet>
  );
};
