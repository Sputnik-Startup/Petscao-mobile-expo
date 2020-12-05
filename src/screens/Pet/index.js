import React, { useCallback, useContext, useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  Container,
  ViewButtonAdd,
  ButtonNewPet,
  TextButton,
  ModalButton,
  ModalContainer,
  ModalTitle,
  ModalView,
} from "./styles";

import { Alert } from "react-native";
import { api } from "../../services/api";

import PetItem from "../../components/PetItem";
import { ScrollView } from "react-native-gesture-handler";
import { Modal, View, Text } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { UserContext } from "../../contexts/UserContext";
import Loader from "../../components/Loader";

export default ({ route }) => {
  const pet = route.params?.pet;
  const [pets, setPets] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(UserContext);

  const handleNewPetIsPassed = useCallback(() => {
    if (pet) {
      if (route.params?.isEditing) {
        setPets((state) =>
          state.map((petParam) => {
            if (petParam.id === pet.id) {
              return pet;
            }

            return petParam;
          })
        );
      } else {
        setPets((state) => [pet, ...state]);
      }
    }
  }, [pet]);

  useFocusEffect(handleNewPetIsPassed, [pet]);

  const openModal = (id) => {
    setSelectedPet(id);
    setModal(true);
  };

  const closeModal = () => {
    setSelectedPet(null);
    setModal(false);
  };

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem("PC_TOKEN");
      try {
        const response = await api({
          method: "get",
          url: "/customer/pet",
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        setPets(response.data);
        setLoading(false);
      } catch (error) {
        Alert.alert(error.response.data.error || error.message);
      }
    })();
  }, []);

  const navigation = useNavigation();

  const handleClick = () => {
    navigation.navigate("NewPet");
  };

  const handleDeletePet = async () => {
    api({
      method: "delete",
      url: `/customer/pet/${selectedPet}`,
      headers: {
        authorization: `Bearer ${user.token}`,
      },
    });

    setPets((state) => state.filter((pet) => pet.id !== selectedPet));
    closeModal();
  };

  return (
    <Container>
      <ViewButtonAdd>
        <ButtonNewPet>
          <Icon name="plus" size={13} color="#fb6340" />
          <TextButton onPress={() => handleClick()}>Adicionar Pet</TextButton>
        </ButtonNewPet>
      </ViewButtonAdd>
      {loading && <Loader />}
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 15,
          alignItems: "flex-start",
          justifyContent: "flex-start",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {pets.map((pet) => (
          <PetItem pet={pet} key={pet.id} onPress={openModal} />
        ))}
      </ScrollView>
      <Modal animationType="fade" visible={modal} transparent={true}>
        <ModalContainer>
          <ModalView
            style={{
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <ModalTitle>Tem certeza?</ModalTitle>
            <View style={{ flexDirection: "row" }}>
              <ModalButton
                style={{ marginRight: 10, backgroundColor: "#7dc97f" }}
                onPress={handleDeletePet}
              >
                <Text style={{ color: "#fff" }}>Sim</Text>
              </ModalButton>
              <ModalButton
                onPress={closeModal}
                style={{ backgroundColor: "#ed5442" }}
              >
                <Text style={{ color: "#fff" }}>Não</Text>
              </ModalButton>
            </View>
          </ModalView>
        </ModalContainer>
      </Modal>
    </Container>
  );
};
