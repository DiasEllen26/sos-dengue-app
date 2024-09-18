import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EvaProvider from '../contexts/eva.context';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';


import localStorage from "../database";
import LoginScreen from "../screens/Login";
import { ScreenParams } from "./stack.params";
import TabRoutes from "./tab.routes";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

const Stack = createNativeStackNavigator<ScreenParams>();

export default function Routes(){
  const queryClient = new QueryClient();

  const userIsAuth = localStorage.getItem("userIsAuth");

  const initialRoute = userIsAuth ? "Initial" : "Login";

  return (
    <NavigationContainer>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider  {...eva} theme={eva.light}>
        <QueryClientProvider client={queryClient}>
          <Stack.Navigator 
            initialRouteName={initialRoute} 
            screenOptions={{ headerShown: false  }}
          >
            <Stack.Screen 
              name="Login" 
              component={LoginScreen} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen 
              name="Initial" 
              component={TabRoutes} 
            />
          </Stack.Navigator>
        </QueryClientProvider>
      </ApplicationProvider>
    </NavigationContainer>
  );
}