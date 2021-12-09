import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";

export const Header = styled.View`
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  height: 64px;
`;

export const HeaderContent = styled.View`
  width: 50%;
  flex-direction: row;

  justify-content: space-between;
  margin-left: 28px;
`;
export const Title = styled.Text``;

export const Icon = styled(Feather)`
  justify-content: center;
  font-size: 20px;
`;
