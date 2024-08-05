import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type ScreenParams = {
  Initial?: {};
  Login?: {}
}

export type NavigationProps = NativeStackNavigationProp<ScreenParams>; 