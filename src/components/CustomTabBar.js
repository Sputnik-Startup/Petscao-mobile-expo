import React, { useContext } from "react";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { NotificationContext } from "../contexts/NotificationContext";

const TopBar = styled.View`
  width: 100%;
  height: 20px;
  background-color: #000;
`;
const TabArea = styled.View`
  height: 60px;
  background-color: #fafafa;
  flex-direction: row;
  align-items: center;
`;
const TabItem = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const TabText = styled.Text`
  font-size: 12px;
  color: #787878;
  align-items: center;
  padding-top: 5px;
`;

const NewNotification = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: red;
  position: absolute;
  top: 0px;
  right: 38%;
  z-index: 9999;
`;

export default ({ state, navigation }) => {
  const goTo = (screenName) => {
    navigation.navigate(screenName);
  };
  const { newNotification } = useContext(NotificationContext);
  return (
    <TabArea>
      <TabItem onPress={() => goTo("Home")}>
        <Icon
          name="home"
          size={22}
          color="#7764e4"
          style={{ opacity: state.index === 0 ? 1 : 0.5 }}
        />
        <TabText>Início</TabText>
      </TabItem>
      <TabItem onPress={() => goTo("Pet")}>
        <Icon
          name="paw"
          size={22}
          color="#fb7152"
          style={{ opacity: state.index === 1 ? 1 : 0.5 }}
        />
        <TabText>Pet</TabText>
      </TabItem>
      <TabItem onPress={() => goTo("Appointment")}>
        <Icon
          name="calendar"
          size={22}
          color="#9e301a"
          style={{ opacity: state.index === 2 ? 1 : 0.5 }}
        />
        <TabText>Agenda</TabText>
      </TabItem>
      <TabItem onPress={() => goTo("Notifications")}>
        {newNotification && <NewNotification />}
        <Icon
          name="bell"
          size={22}
          color="#dec63c"
          style={{ opacity: state.index === 3 ? 1 : 0.5 }}
        />
        <TabText>Notificações</TabText>
      </TabItem>
      <TabItem onPress={() => goTo("Profile")}>
        <Icon
          name="user"
          size={22}
          color="#2dce98"
          style={{ opacity: state.index === 4 ? 1 : 0.5 }}
        />
        <TabText>Perfil</TabText>
      </TabItem>
    </TabArea>
  );
};
