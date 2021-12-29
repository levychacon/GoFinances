import React, { useCallback, useEffect, useState } from "react";
import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionsCard,
  TransactionsCardProps,
} from "../../components/HighlightCard/TransactionsCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  LogoutButton,
  ActiveIndicatorWrapper,
} from "./styles";
import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import theme from "../../global/styles/theme";

export interface DataListProps extends TransactionsCardProps {
  id: string;
}

interface HighlightProps {
  total: string;
  lastTransaction: string;
}

interface HighlightData {
  entries: HighlightProps;
  expensives: HighlightProps;
  totalAmount: HighlightProps;
}

export function Dashboard() {
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highligthData, setHighligthData] = useState<HighlightData>(
    {} as HighlightData
  );
  const [isLoading, setIsLoading] = useState(true);

  function getLastTransactionDate(
    collection: DataListProps[],
    type: "up" | "down"
  ) {
    const lastTransaction = new Date( Math.max.apply(
      Math,
      collection
        .filter((transaction: DataListProps) => transaction.type === type)
        .map((transaction: DataListProps) =>
          new Date(transaction.date).getTime()
        )
    ));

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString("pt-BR", {month: "long"})} `
  }

  async function loadTransactions() {
    const dataKey = "@gofinances:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];
    async function removeAll() {
      await AsyncStorage.removeItem(dataKey);
    }
    let entriesTotal = 0;
    let expensivesTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        if (item.type === "up") {
          entriesTotal += Number(item.amount);
        } else {
          expensivesTotal += Number(item.amount);
        }
        const amount = Number(item.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const date = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(item.date));
        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date,
        };
      }
    );
    const totalEquity = entriesTotal - expensivesTotal;
    setTransactions(transactionsFormatted);

    const lastTransactionsEntries = getLastTransactionDate( transactions, "up")
    const lastTransactionsExpensives = getLastTransactionDate( transactions, "down")
    const totalInterval = `01 a ${ lastTransactionsExpensives}`
   
    setHighligthData({
      entries: {
        total: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction:`Última saída ${lastTransactionsEntries}` 
      },
      expensives: {
        total: expensivesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: `Última saída ${lastTransactionsExpensives}` 
      },
      totalAmount: {
        total: totalEquity.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: totalInterval
      },
    });
    setIsLoading(false);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );
  return (
    <Container>
      {isLoading ? (
        <ActiveIndicatorWrapper>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </ActiveIndicatorWrapper>
      ) : (
        <>
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
              <LogoutButton onPress={() => {}}>
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>

          <HighlightCards>
            <HighlightCard
              title={"Entrada"}
              amount={highligthData.entries.total}
              lastTransaction={highligthData.entries.lastTransaction}
              type="up"
            />
            <HighlightCard
              title={"Saída"}
              amount={highligthData.expensives.total}
              lastTransaction={highligthData.entries.lastTransaction}
              type="down"
            />
            <HighlightCard
              title={"Total"}
              amount={highligthData.totalAmount.total}
              lastTransaction={highligthData.entries.lastTransaction}
              type="total"
            />
          </HighlightCards>
          <Transactions>
            <Title>Transações</Title>
            <TransactionsList
              data={transactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <TransactionsCard data={item} />}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
}

