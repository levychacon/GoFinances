import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";
import { Button } from "../../components/Button";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../../components/Forms/input";
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

interface FormProps {
  name: string;
  amount: string;
}

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

  const { control, handleSubmit, formState:{errors} } = useForm({
    resolver: yupResolver(schema),
  });

  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  function handleRegister(form: FormProps) {
    if (!transactionType) {
      return Alert.alert("Selecione o tipo de transação");
    }

    if (category.key === "category") {
      return Alert.alert("Selecione a categoria");
    }
    const data = {
      name: form.amount,
      amount: form.amount,
      transactionType,
      category: category.key,
    };
    console.log(data);
  }

  function handleTransactionTypeButton(type: "up" | "down") {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
    console.log(">>>> está funcionando");
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
    console.log(">>>> está funcionando");
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
                title="income"
                onPress={() => handleTransactionTypeButton("up")}
                isActive={transactionType === "up"}
              />
              <TransactionsTypeButton
                type="down"
                title="outcome"
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
