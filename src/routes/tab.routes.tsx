import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Home";
import ProfileScreen from "../screens/Profile";

const Tab = createBottomTabNavigator();

export default function TabRoutes(){
  return (
      <Tab.Navigator screenOptions={{ headerShown: false }} >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => <AntDesign name="home" size={size} color={color} />
          }} 
        />
        <Tab.Screen 
          name="Perfil" 
          component={ProfileScreen} 
          options={{
            tabBarIcon: ({ color, size }) => <AntDesign name="user" size={size} color={color} />
          }}
        />
      </Tab.Navigator>
  );
}