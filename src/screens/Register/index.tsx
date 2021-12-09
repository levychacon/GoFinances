import React, { useState } from "react";
import { Modal } from "react-native";
import { Button } from "../../components/Button";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import { Input } from "../../components/Forms/input";
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

export function Register() {

  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)

  const [category, setCategory] = useState({
    key: "category",
    name:"Categoria",
  })

  function handleTransactionTypeButton(type: 'up' | 'down'){
    setTransactionType(type)
  }

  function handleOpenSelectCategoryModal(){
    setCategoryModalOpen(true)
    console.log('>>>> está funcionando')
  }

  function handleCloseSelectCategoryModal(){
    setCategoryModalOpen(false)
    console.log('>>>> está funcionando')
  }
  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />
          <TransactionTypes>
            <TransactionsTypeButton
              type="up"
              title="income"
              onPress={() => handleTransactionTypeButton("up")}
              isActive={transactionType === 'up'}
            />
            <TransactionsTypeButton
              type="down"
              title="outcome"
              onPress={() => handleTransactionTypeButton("down")}
              isActive={transactionType === 'down'}
            />
          </TransactionTypes>
          
          <CategorySelectButton title={category.name} onPress={handleOpenSelectCategoryModal}/>
        </Fields>
        <Button title="Enviar" />
      </Form>

      <Modal visible={categoryModalOpen}>
        <CategorySelect 
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>
    </Container>
  );
}
