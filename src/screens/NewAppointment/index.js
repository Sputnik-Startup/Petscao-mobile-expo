import React, { useCallback, useContext, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import {
  Container,
  HeaderPost,
  HeaderTitle,
  GoBackIcon,
  FormAppointment,
  ButtonText,
  Button,
  BorderPicker,
  ButtonSolid,
  ButtonSolidText,
} from "./styles";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Image, Platform } from "react-native";
import { format } from "date-fns";
import { ptBR } from "date-fns/esm/locale";
import { api } from "../../services/api";
import { useFocusEffect } from "@react-navigation/native";
import { UserContext } from "../../contexts/UserContext";

export default ({ navigation, route }) => {
  const pet = route.params?.pet;
  const [date, setDate] = useState(new Date());
  const [fDate, setFDate] = useState(null);
  const [show, setShow] = useState(false);
  const [hour, setHour] = useState("");
  const [hours, setHours] = useState([]);
  const [selectedPet, setSelectedPet] = useState(pet);

  const { user } = useContext(UserContext);

  const handleNewPetIsPassed = useCallback(() => {
    if (pet) {
      setSelectedPet(pet);
    }
  }, [pet]);

  useFocusEffect(handleNewPetIsPassed, [route.params]);

  const onChange = async (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    try {
      setHour("");
      setHours([]);
      setFDate(format(currentDate, "dd/MM/yyyy", { locale: ptBR }));

      const dateUS = format(currentDate, "yyyy-MM-dd", { locale: ptBR });
      const response = await api({
        method: "get",
        url: `/appointment/available?date=${dateUS}`,
      });
      setHours(response.data);
    } catch (error) {}
  };

  const handleCreate = async () => {
    if (!selectedPet) {
      alert("Por favor, selecione um pet");
      return;
    }
    if (!fDate) {
      alert("Por favor, selecione o dia do agendamento");
      return;
    }
    if (!hour) {
      alert("Por favor, selecione a hora");
      return;
    }

    try {
      const response = await api({
        method: "post",
        url: "/customer/appointment",
        data: {
          pet_id: selectedPet.id,
          date: `${format(date, "yyyy-MM-dd", { locale: ptBR })} ${hour}`,
        },
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      });

      navigation.navigate("Appointment", { appointment: response.data });
    } catch (error) {
      alert(error.response?.data.error || error.message);
    }
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
        <HeaderTitle>Novo agendamento</HeaderTitle>
      </HeaderPost>
      <FormAppointment>
        <Button onPress={() => navigation.navigate("SelectPet")}>
          <Icon name="paw" color="#fb7c5e" regular size={20} />
          <ButtonText style={{ color: selectedPet ? "#333" : "#808080" }}>
            {selectedPet ? selectedPet.name : "Selecionar pet"}
          </ButtonText>
        </Button>
        <Button onPress={() => setShow(true)}>
          <Icon name="calendar-alt" color="#fb7c5e" regular size={20} />
          <ButtonText style={{ color: fDate ? "#333" : "#808080" }}>
            {fDate ? fDate : "Selecione um dia"}{" "}
          </ButtonText>
        </Button>
        {show && (
          <DateTimePicker
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
        <BorderPicker
          pointerEvents={hours[0] ? "auto" : "none"}
          hasHours={!!hours[0]}
        >
          <Picker
            style={{ flex: 1 }}
            selectedValue={hour}
            mode="dropdown"
            onValueChange={(item) => setHour(item)}
            itemStyle={{ fontSize: 14 }}
          >
            <Picker.Item
              label={
                hours[0] ? "Selecione o hora" : "Primeiro selecione um dia"
              }
              value=""
              color="#9f9fa0"
            />
            {hours.map(
              (h) =>
                h.available && (
                  <Picker.Item
                    label={h.time}
                    value={h.time}
                    key={h.value}
                    color="#333"
                  />
                )
            )}
          </Picker>
        </BorderPicker>
        <ButtonSolid onPress={handleCreate}>
          <ButtonSolidText>Agendar</ButtonSolidText>
        </ButtonSolid>
      </FormAppointment>
    </Container>
  );
};
