import { useCallback } from "react";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import localStorage from "../../database";
import { NavigationProps } from "../../routes/stack.params";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen(){
  const navigation = useNavigation<NavigationProps>();
  
  const handleLogout = useCallback(() => {
    localStorage.removeItem("userIsAuth");

    navigation.navigate("Login");
  }, [navigation]);
  
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Text>Profile</Text>
      <TouchableOpacity
        onPress={handleLogout}
        style={{
          marginTop: 20,
          padding: 10,
          borderColor: "black",
          borderWidth: 1,
          borderRadius: 10
        }}
      >
        <Text>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}