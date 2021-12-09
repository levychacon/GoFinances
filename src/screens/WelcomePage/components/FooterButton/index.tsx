import React from 'react'
import {ContinueButton, ButtonText} from './styles'

export function FooterButton() {
  return (
    <ContinueButton onPress={() =>
      navigation.navigate('Profile', { name: 'Jane' })
    }>
      <ButtonText>VAMOS LÁ</ButtonText>
    </ContinueButton>
  );
}
