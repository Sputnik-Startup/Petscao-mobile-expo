import AsyncStorage from '@react-native-community/async-storage';
import React, { createContext, useReducer } from 'react';
import { userReducer } from '../reducers/UserReducer';
import { api } from '../services/api';

export const UserContext = createContext({
  user: { token: '' },
  handleLogout: () => {},
  handleSignin: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, { user: {}, token: null });

  const handleSignin = async (email, password, navigation) => {
    if (email && password) {
      try {
        const response = await api({
          method: 'POST',
          url: '/customer/session',
          data: { email, password },
        });

        await AsyncStorage.setItem('PC_TOKEN', response.data.token);
        dispatch({ type: '@user/SET_ALL', payload: response.data });
        navigation.replace('MainTab');
      } catch (error) {
        alert(error.response?.data.error || error.message);
      }
    } else {
      alert('Por favor, preencha todos os campos!');
    }
  };

  const handleLogout = async (navigation) => {
    navigation.replace('SignIn');
    await AsyncStorage.removeItem('PC_TOKEN');
    dispatch({ type: '@user/REMOVE_ALL' });
  };

  return (
    <UserContext.Provider
      value={{ user, dispatch, handleSignin, handleLogout }}
    >
      {children}
    </UserContext.Provider>
  );
};
