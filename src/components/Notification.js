import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { formatRelative, parseISO } from "date-fns";
import { ptBR } from "date-fns/esm/locale";

const Container = styled.View`
  height: 90px;
  width: 100%;
  align-items: center;
  flex-direction: row;
  padding-left: 20px;
  padding-right: 20px;
  border-bottom-width: 1px;
  border-style: solid;
  border-bottom-color: #ddd;
`;

const NotificationMidia = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin-right: 10px;
`;

const NotificationTitle = styled.Text`
  font-weight: 700;
  margin: 5px;
  font-size: 13px;
`;
const NotificationContent = styled.Text`
  flex-wrap: wrap;
  width: 90%;
  font-size: 13px;
`;
const NotificationDate = styled.Text`
  color: #808080;
`;

function Notification({ notification }) {
  return (
    <Container>
      <NotificationMidia source={{ uri: notification.midia }} />
      <View>
        <View style={{ flexDirection: "row" }}>
          <NotificationContent>
            <NotificationTitle>{notification.title} </NotificationTitle>
            {notification.content}
          </NotificationContent>
        </View>

        <NotificationDate>
          {formatRelative(parseISO(notification.createdAt), new Date(), {
            locale: ptBR,
          })}
        </NotificationDate>
      </View>
    </Container>
  );
}

export default Notification;
