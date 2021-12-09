import React from "react";
import { FooterButton } from "../components/FooterButton";
import { HeaderComponent } from "../components/Header";

import {
 CPFContainer,
 Title,
  ComponentContainer,
} from "./styles";

export function CPFPage() {
  return (
    <>
      <ComponentContainer>
        <HeaderComponent />
        <CPFContainer>
          <Title>Primeiro, nos informe o seu CPF:</Title>
          
        </CPFContainer>
      </ComponentContainer>
      <FooterButton 
      />
    </>
  );
}
