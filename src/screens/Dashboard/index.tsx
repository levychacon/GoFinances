import React from "react";
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionsCard, TransactionsCardProps } from "../../components/HighlightCard/TransactionsCard";

import {
  Container,
  HighlightCards,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreetings,
  UserName,
  Icon,
  Transactions,
  TransactionsList,
  Title,
} from "./styles";

export interface DataListProps extends TransactionsCardProps{
  id: string,
}

export function Dashboard() {
  const data: DataListProps[] = [
    {
      id:'1',
      type: 'positive',
      title: "Desenvolvimento de site",
      amount: "R$12.000,00",
      category: { name: "Vendas", icon: "dollar-sign" },
      date: "10/04/2020",
    },

    {
      id:'2',
      type: 'negative',
      title: "Hamburgueria Pizzy",
      amount: "R$ 59,00",
      category: { name: "Alimentação", icon: "coffee" },
      date: "10/04/2020",
    },

    {
      id:'3',
      type: 'negative',
      title: "Aluguel de apartamento",
      amount: "R$1200,00",
      category: { name: "Casa", icon: "dollar-sign" },
      date: "10/04/2020",
    },
  ];
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/26579692?v=4https://avatars.githubusercontent.com/u/26579692?v=4",
              }}
            />
            <User>
              <UserGreetings>Olá,</UserGreetings>
              <UserName>Levy</UserName>
            </User>
          </UserInfo>
          <Icon name="power" />
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          title={"Entrada"}
          amount={"R$ 17.400,00"}
          lastTransaction={"Última entrada dia 13 de abril"}
          type="up"
        />
        <HighlightCard
          title={"Saída"}
          amount={"R$ 1.259,00"}
          lastTransaction={"Última saída dia 03 de abril"}
          type="down"
        />
        <HighlightCard
          title={"Total"}
          amount={"R$ 16.141,00"}
          lastTransaction={"01 à 16 de abril"}
          type="total"
        />
      </HighlightCards>
      <Transactions>
        <Title>Transações</Title>
        <TransactionsList
          data={data}
          keyExtractor={item=>item.id}
          renderItem={({ item }) => <TransactionsCard data={item} />}
          
        />
      </Transactions>
    </Container>
  );
}
