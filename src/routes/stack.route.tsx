import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import localStorage from "../database";
import LoginScreen from "../screens/Login";
import { ScreenParams } from "./stack.params";
import TabRoutes from "./tab.routes";

const Stack = createNativeStackNavigator<ScreenParams>();

export default function StackRoutes(){
  const userIsAuth = localStorage.getItem("userIsAuth");

  const initialRoute = userIsAuth ? "Initial" : "Login";

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}  screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Initial" component={TabRoutes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}