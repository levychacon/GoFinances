import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";
import uuid from "react-native-uuid";
import { Button } from "../../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputForm } from "../../components/InputForm";
import { TransactionsTypeButton } from "../../components/TransactionsTypeButton";
import { CategorySelect } from "../CategorySelect";
import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from "./styles";
import { useNavigation } from "@react-navigation/native";

interface FormProps {
  name: string;
  amount: string;
}

type NavigationProps = {
  navigate: (screen: string) => void;
};

const schema = yup.object().shape({
  name: yup.string().required("O nome é obrigatório"),
  amount: yup
    .number()
    .typeError("Informe um valor numérico")
    .positive("O número não pode ser negativo")
    .required("A quantidade é obrigatória"),
});

export function Register() {
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const navigation = useNavigation<NavigationProps>();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  async function handleRegister(form: FormProps) {
    if (!transactionType) {
      return Alert.alert("Selecione o tipo de transação");
    }

    if (category.key === "category") {
      return Alert.alert("Selecione a categoria");
    }
    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category,
      date: new Date(),
    };
    try {
      const dataKey = "@gofinances:transactions";
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [...currentData, newTransaction];
      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));
    } catch (error) {
      Alert.alert("Não foi possível salvar o item");
    }

    reset();
    setCategory({
      key: "category",
      name: "Categoria",
    });

    navigation.navigate("Listagem");
   
  }

  function handleTransactionTypeButton(type: "up" | "down") {
    setTransactionType(type);
    
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>
        <Form>
          <Fields>
            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />
            <TransactionTypes>
              <TransactionsTypeButton
                type="up"
                name="income"
                onPress={() => handleTransactionTypeButton("up")}
                isActive={transactionType === "up"}
              />
              <TransactionsTypeButton
                type="down"
                name="outcome"
                onPress={() => handleTransactionTypeButton("down")}
                isActive={transactionType === "down"}
              />
            </TransactionTypes>

            <CategorySelectButton
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            />
          </Fields>
          <Button onPress={handleSubmit(handleRegister)} title="Enviar" />
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
