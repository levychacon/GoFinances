import React from "react";
import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryType,
  Date,
} from "./styles";

interface Category {
  icon: string;
  name: string;
}

export interface TransactionsCardProps {
  
    type: "positive" | "negative";
    title: string;
    category: Category;
    date: string;
    amount: string;

}

 interface Props{
   data: TransactionsCardProps
 }

export function TransactionsCard({ data }:Props) {
  return (
    <Container>
      <Title>{data.title}</Title>

      <Amount type={data.type}>
        {data.type === 'negative' && '- '}
        {data.amount}
        </Amount>

      <Footer>
        <Category>
          <Icon name={data.category.icon} />
          <CategoryType>{data.category.name}</CategoryType>
        </Category>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
}
