import AsyncStorage from "@react-native-community/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";
import io from "socket.io-client";
import { UserContext } from "./UserContext";

export const NotificationContext = createContext({});

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [newNotification, setNewNotification] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      if (user.token) {
        const response = await api({
          method: "get",
          url: "/notifications",
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        });
        if (response.data.find((noti) => noti.read === false)) {
          setNewNotification(true);
        }
        setNotifications(response.data);
      }
    })();
  }, [user]);

  useEffect(() => {
    if (user.token) {
      const socket = io("http://192.168.1.103:3333", {
        query: {
          token: user.token,
        },
      });

      socket.on("notification", async (data) => {
        if (Array.isArray(data.notification)) {
          let response;
          if (!user?.id) {
            try {
              const token = await AsyncStorage.getItem("PC_TOKEN");
              response = await api({
                method: "get",
                url: "/customer/me",
                headers: {
                  authorization: `Bearer ${token}`,
                },
              });
            } catch (error) {}
          }
          setNotifications((state) => [
            data.notification.filter(
              (noti) => noti.to === user?.id || response.data.id
            )[0],
            ...state,
          ]);
        } else {
          setNotifications((state) => [data.notification, ...state]);
        }

        setNewNotification(true);
      });
    }
  }, [user]);

  return (
    <NotificationContext.Provider
      value={{ notifications, setNewNotification, newNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
