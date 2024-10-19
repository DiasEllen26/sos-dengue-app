import { useCallback, useState } from "react";
import { Image, SafeAreaView, Text } from "react-native";
import * as ImagePicker from 'expo-image-picker';

import localStorage from "../../database";
import { NavigationProps } from "../../routes/stack.params";
import { useNavigation } from "@react-navigation/native";
import { Button, } from "@ui-kitten/components";

export default function ProfileScreen() {
  const navigation = useNavigation<NavigationProps>();
  const [image, setImage] = useState<string | null>(null);

  const handleLogout = useCallback(() => {
    localStorage.clearAll();

    navigation.navigate("Login");
  }, [navigation]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log({ assets: result.assets });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}
    >

      { image && <Image source={{ uri: image }} style={{ width: 200, height: 200, }} /> }
      
      <Button
        onPress={pickImage}
        style={{
          marginBottom: 50
        }}
      >
        Selecionar imagem
      </Button>

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