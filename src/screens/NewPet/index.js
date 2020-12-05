import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";

import { Container, HeaderPost, HeaderTitle, GoBackIcon } from "./styles";

import FormPet from "../../components/FormPet";

export default function NewPet({ navigation, route }) {
  const pet = route.params?.pet;
  return (
    <Container>
      <HeaderPost>
        <GoBackIcon
          onPress={() =>
            navigation.navigate("Pet", { pet: null, isEditing: false })
          }
          style={{ marginRight: 10 }}
        >
          <Icon name="chevron-left" size={22} color="#fff" />
        </GoBackIcon>
        <HeaderTitle>Novo pet</HeaderTitle>
      </HeaderPost>
      <FormPet pet={pet} />
    </Container>
  );
}
