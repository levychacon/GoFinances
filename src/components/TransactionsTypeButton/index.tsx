import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Container, Icon, Title } from './styles';

const icons ={
    up: 'arrow-up-circle',
    down: 'arrow-down-circle',
}

interface TransactionTypeButtonProps extends TouchableOpacityProps{
    isActive: boolean,
    title: string,
    type: 'up' | 'down'
}

export function TransactionsTypeButton({type, title, isActive, ...rest}: TransactionTypeButtonProps){
    return(
        <Container isActive={isActive}  type={type} {...rest} >
            <Icon type={type }name={icons[type]}/>
            <Title>{title}</Title>
        </Container>
    )
}