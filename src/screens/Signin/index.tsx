import React, { useContext } from "react";
import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SigninTitle,
  Footer,
  FooterWrapper,
} from "./styles";
import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";
import LogoSvg from "../../assets/logo.svg";
import { RFValue } from "react-native-responsive-fontsize";

import { SignInSocialButton } from "../../components/SigninSocialButton";
import { useAuth } from "../../hooks/auth";

export const Signin = () => {
  const data = useAuth();
  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)}></LogoSvg>
          <Title>Controle suas{"\n"} mudanças de forma muito simples</Title>
        </TitleWrapper>
        <SigninTitle>Faça seu login com uma das contas abaixo</SigninTitle>
      </Header>
      <Footer>
        <FooterWrapper>
          <SignInSocialButton title="Entrar com Google" svg={GoogleSvg} />
          <SignInSocialButton title="Entrar com Apple" svg={AppleSvg} />
        </FooterWrapper>
      </Footer>
    </Container>
  );
};

export default Signin;
