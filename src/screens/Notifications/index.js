import AsyncStorage from "@react-native-community/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Notification from "../../components/Notification";
import { NotificationContext } from "../../contexts/NotificationContext";
import { UserContext } from "../../contexts/UserContext";
import { api } from "../../services/api";

import { Container, NoNotification } from "./styles";

const Notifications = () => {
  const { notifications, setNewNotification, newNotification } = useContext(
    NotificationContext
  );

  const { user } = useContext(UserContext);
  const readNotification = useCallback(() => {
    if (newNotification) {
      api({
        method: "put",
        url: "/notifications",
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      });

      setNewNotification(false);
    }
  }, []);
  useFocusEffect(readNotification);

  return (
    <Container>
      <ScrollView style={{ width: "100%" }}>
        {!notifications[0] && (
          <View
            style={{
              width: "100%",
              height: 90,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <NoNotification>Nenhuma notificação</NoNotification>
          </View>
        )}
        {notifications.map((noti, index) => (
          <Notification notification={noti} key={noti.id || index} />
        ))}
      </ScrollView>
    </Container>
  );
};

export default Notifications;
