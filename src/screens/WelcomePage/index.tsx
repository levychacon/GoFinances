import React from "react";
import { FooterButton } from "./components/FooterButton";
import { HeaderComponent } from "./components/Header";

import {
  WelcomeContainer,
  Greeting,
  Description,
  ComponentContainer,
} from "./styles";

export function WelcomePage() {
  return (
    <>
      <ComponentContainer>
        <HeaderComponent />
        <WelcomeContainer>
          <Greeting>Olá!</Greeting>
          <Description>
            Para começar a usar, vamos precisar pedir algumas informações sobre
            você.
          </Description>
        </WelcomeContainer>
      </ComponentContainer>
      <FooterButton 
      />
    </>
  );
}
