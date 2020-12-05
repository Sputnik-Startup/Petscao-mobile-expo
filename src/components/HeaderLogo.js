import React from "react";
import styled from "styled-components/native";

const HeaderView = styled.View`
  width: 100%;
  height: 50px;
  background-color: #fb6340;
  align-items: center;
  justify-content: center;
`;

const HeaderImg = styled.Image`
  width: 40%;
  height: 23px;
`;

import logo from "../assets/logo.png";

export default function TopBar() {
  return (
    <HeaderView>
      <HeaderImg source={logo} />
    </HeaderView>
  );
}
