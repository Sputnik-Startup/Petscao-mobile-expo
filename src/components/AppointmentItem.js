import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { View } from 'react-native';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const ContainerItem = styled.View`
  width: 100%;
  height: 100px;
  flex-direction: row;
  margin-bottom: 15px;
  border-radius: 8px;
  position: relative;
`;

const TimeView = styled.View`
  width: 30%;
  align-items: center;
  justify-content: center;
  background-color: #ab4c39;
  color: #fb6340;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
`;

const ImagePet = styled.Image`
  width: 100%;
  height: 100%;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
`;

const InfoView = styled.View`
  width: 70%;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  background-color: #fff;
  padding-left: 10px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
`;

const InfoData = styled.Text`
  font-size: 12px;
  color: #808080;
`;

const NamePetText = styled.Text`
  font-weight: 700;
  font-size: 18px;
  color: #333;
  margin-bottom: 5px;
`;

const ButtonsPet = styled.View`
  position: absolute;
  right: 10px;
  top: 30px;
  align-items: center;
`;

const EditButton = styled.TouchableOpacity`
  margin: 10px;
`;

const DeleteButton = styled.TouchableOpacity`
  margin: 10px;
`;

export default ({ appointment, onPress }) => {
  return (
    <ContainerItem
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
      }}
    >
      <TimeView>
        <ImagePet
          source={{ uri: appointment.pet?.avatar.devMobileUrl }}
        ></ImagePet>
      </TimeView>
      <InfoView>
        <NamePetText>{appointment.pet.name}</NamePetText>
        <InfoData>
          {format(parseISO(appointment.date), "dd/MM/yyyy à's' HH:mm'h'", {
            locale: ptBR,
          })}
        </InfoData>
        <InfoData>
          {appointment.descount ? 'COM DESCONTO' : 'SEM DESCONTO'}
        </InfoData>
        {appointment.cancelable && (
          <ButtonsPet>
            <DeleteButton onPress={onPress}>
              <Icon name="trash" size={14} color="#fb6340" />
            </DeleteButton>
          </ButtonsPet>
        )}
      </InfoView>
    </ContainerItem>
  );
};
