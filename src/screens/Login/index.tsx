import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import localStorage from "../../database";
import { NavigationProps } from "../../routes/stack.params";

export default function LoginScreen(){
  const navigation = useNavigation<NavigationProps>();

  const handleLogin = useCallback(() => {
    localStorage.setItem("userIsAuth", true);
    
    navigation.navigate("Initial");    
  }, [navigation]);
  
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <TouchableOpacity
        onPress={handleLogin}
        style={{
          borderColor: "black",
          borderWidth: 1,
          padding: 14,
          borderRadius: 10
        }}
      >
        <Text>Logar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}