import React, { useCallback, useContext, useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  Container,
  GoBackIcon,
  HeaderPost,
  HeaderTitle,
  ModalButton,
  ModalContainer,
  ModalTitle,
  ModalView,
} from "./styles";

import { Alert } from "react-native";
import { api } from "../../services/api";

import PetItem from "../../components/PetItem";
import { ScrollView } from "react-native-gesture-handler";
import { UserContext } from "../../contexts/UserContext";
import Loader from "../../components/Loader";

export default ({ navigation }) => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      try {
        const response = await api({
          method: "get",
          url: "/customer/pet",
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        });

        setPets(response.data);
        setLoading(false);
      } catch (error) {
        Alert.alert(error.response.data.error || error.message);
      }
    })();
  }, []);

  const handleSelect = (pet) => {
    navigation.navigate("NewAppointment", { pet });
  };

  return (
    <Container>
      <HeaderPost>
        <GoBackIcon
          onPress={() => navigation.goBack()}
          style={{ marginRight: 10 }}
        >
          <Icon name="chevron-left" size={22} color="#fff" />
        </GoBackIcon>
        <HeaderTitle>Selecione um pet</HeaderTitle>
      </HeaderPost>
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
          <PetItem pet={pet} key={pet.id} nonControls onSelect={handleSelect} />
        ))}
      </ScrollView>
    </Container>
  );
};
