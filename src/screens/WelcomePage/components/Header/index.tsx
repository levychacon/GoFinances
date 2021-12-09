import React from "react";
import {Header, HeaderContent,Icon,Title} from './styles'

export function HeaderComponent() {
  return (
    <Header>
      <HeaderContent>
        <Icon name="arrow-left" />
        <Title>Cadastro</Title>
      </HeaderContent>
    </Header>
  );
}
