import { useCallback } from "react";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import localStorage from "../../database";
import { NavigationProps } from "../../routes/stack.params";
import { useNavigation } from "@react-navigation/native";
import { Button, } from "@ui-kitten/components";
import { AntDesign } from "@expo/vector-icons";

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
      <Button
        onPress={handleLogout}
        style={{
          marginTop: 10
        }}
        status="danger"
        appearance='outline'
      >
        Logout
      </Button>

    </SafeAreaView>
  );
}