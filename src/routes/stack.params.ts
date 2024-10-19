import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type ScreenParams = {
  Initial?: {};
  Login?: {};
  RecoverPassword?: {}
}

export type NavigationProps = NativeStackNavigationProp<ScreenParams>; 