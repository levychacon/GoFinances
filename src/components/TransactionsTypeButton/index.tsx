import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { Container, Button, Icon, Title } from "./styles";

const icons = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
};

interface TransactionTypeButtonProps extends RectButtonProps {
  isActive: boolean;
  name: string;
  type: "up" | "down";
}

export function TransactionsTypeButton({
  type,
  name,
  isActive,
  ...rest
}: TransactionTypeButtonProps) {
  return (
    <Container isActive={isActive} type={type}>
      <Button {...rest}>
        <Icon type={type} name={icons[type]} />
        <Title>{name}</Title>
      </Button>
    </Container>
  );
}
