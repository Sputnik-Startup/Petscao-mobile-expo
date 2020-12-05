import React from "react";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

const ContainerItem = styled.View`
  width: ${(Dimensions.get("window").width - 30) / 2}px;
  height: ${(Dimensions.get("window").width - 30) / 2}px;
  padding: 10px;
  border-radius: 10px;
  background-color: #fff;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 10px;
  margin-top: 0px;
  margin-right: 0px;
`;
const PetProfile = styled.View`
  height: 50%;
  width: 50%;
  margin-bottom: 15px;
`;

const ImagePet = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background-color: #ddd;
  border-radius: ${(Dimensions.get("window").width - 30) / 2 / 2}px;
`;

const PetInfoArea = styled.View`
  margin-left: 15px;
  height: 100%;
  width: 55%;
`;

const PetName = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: #333;
`;

const PetInfo = styled.Text`
  font-size: 11px;
  color: #9e9e9e;
  flex-direction: row;
  color: #fb6340;
`;

const ButtonsPet = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  height: 100%;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
`;

const EditButton = styled.TouchableOpacity`
  margin: 10px;
`;

const DeleteButton = styled.TouchableOpacity`
  margin: 10px;
`;

export default function PetItem({
  pet,
  onPress,
  nonControls,
  onSelect = null,
}) {
  const navigation = useNavigation();

  const handleEdit = () => {
    navigation.navigate("NewPet", { pet });
  };

  return (
    <TouchableOpacity
      onPress={onSelect ? () => onSelect(pet) : null}
      onLongPress={!nonControls ? handleEdit : null}
    >
      <ContainerItem
        style={{
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowColor: "#000",
          shadowOpacity: 0.23,
          shadowRadius: 2.62,
          elevation: 4,
        }}
      >
        <PetProfile>
          <ImagePet
            source={{ uri: pet.avatar?.devMobileUrl }}
            style={{ resizeMode: "cover" }}
          />
        </PetProfile>

        <PetName>{pet.name}</PetName>
        {!nonControls && (
          <ButtonsPet>
            <EditButton onPress={handleEdit}>
              <Icon name="pen" size={14} color="#fb6340" />
            </EditButton>
            <DeleteButton onPress={() => onPress(pet.id)}>
              <Icon name="trash" size={14} color="#fb6340" />
            </DeleteButton>
          </ButtonsPet>
        )}
      </ContainerItem>
    </TouchableOpacity>
  );
}
