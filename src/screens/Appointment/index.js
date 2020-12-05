import React, { useState, useEffect, useCallback } from "react";
import { Alert, Modal, View, Text } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import Icon from "react-native-vector-icons/FontAwesome5";
import {
  Container,
  ScrollView,
  ViewButtonAdd,
  ButtonNewAppoint,
  TextButton,
  ModalContainer,
  ModalView,
  ModalTitle,
  ModalButton,
} from "./styles";

import { api } from "../../services/api";

import AppointmentItem from "../../components/AppointmentItem";
import Loader from "../../components/Loader";
import { useFocusEffect } from "@react-navigation/native";

export default function Appointment({ navigation, route }) {
  const appointmentParam = route.params?.appointment;
  const [appointment, setAppointment] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleNewAppointmentIsPassed = useCallback(() => {
    if (appointmentParam) {
      setAppointment((state) => [appointmentParam, ...state]);
    }
  }, [appointmentParam]);

  useFocusEffect(handleNewAppointmentIsPassed, [appointmentParam]);

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem("PC_TOKEN");
      try {
        const response = await api({
          method: "get",
          url: "/customer/appointment",
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        setAppointment(response.data);
        setLoading(false);
      } catch (error) {
        Alert.alert(error.response.data.error || error.message);
      }
    })();
  }, []);

  const handleClick = (id) => {
    navigation.navigate("NewAppointment", {
      id,
    });
  };

  const openModal = (id) => {
    setSelectedAppointment(id);
    setModal(true);
  };

  const closeModal = () => {
    setSelectedAppointment(null);
    setModal(false);
  };

  const handleDeleteAppointment = async () => {
    const token = await AsyncStorage.getItem("PC_TOKEN");
    try {
      api({
        method: "delete",
        url: `/customer/appointment/${selectedAppointment}`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      // if (appointment.cancelable) {
      // }
        setAppointment((state) =>
          state.filter((app) => app.id !== selectedAppointment)
        );
      closeModal();
    } catch (error) {}
  };

  return (
    <Container>
      <ViewButtonAdd>
        <ButtonNewAppoint onPress={() => handleClick("vazio")}>
          <Icon name="plus" size={13} color="#fb6340" />
          <TextButton>Novo Agendamento</TextButton>
        </ButtonNewAppoint>
      </ViewButtonAdd>
      {loading && <Loader />}
      <ScrollView
        contentContainerStyle={{
          width: "100%",
          padding: 15,
          alignItems: "center",
        }}
      >
        {appointment.map((app, index) => (
          <AppointmentItem
            appointment={app}
            key={index}
            onPress={() => openModal(app.id)}
          />
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
                onPress={handleDeleteAppointment}
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
}
