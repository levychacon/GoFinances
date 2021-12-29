import React from "react";
import { Amount, Container, Title } from "./styles";

interface HistoryCardProps {
  color: string;
  title: string;
  amount: string;
}

export function HistoryCard({ title, amount, color }: HistoryCardProps) {
  return (
    <Container color={color}>
      <Title>{title}</Title>
      <Amount>{amount}</Amount>
    </Container>
  );
}
