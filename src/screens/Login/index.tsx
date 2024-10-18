import * as Device from 'expo-device';
import * as Application from 'expo-application';
import { Image, SafeAreaView } from "react-native";
import { useCallback, useState } from "react";

import { useNavigation } from "@react-navigation/native";
import { Button, Icon, IconProps, Input, Text } from "@ui-kitten/components";
import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
import { NavigationProps } from "../../routes/stack.params";
import localStorage from "../../database";
import { cpfMask } from "../../utils/mask";

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProps>();

  const handleLogin = useCallback(() => {
    const device = {
      osName: Device.osName,
      osVersion: Device.osVersion,
      modelName: Device.modelName,
      androidId: Application.getAndroidId()
    }
    
    localStorage.setItem("userIsAuth", true);

    navigation.navigate("Initial");

    setCpf("");
    setPassword("");
  }, [navigation]);

  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSecureEntry = useCallback(() => {
    setSecureTextEntry(!secureTextEntry);
  }, [secureTextEntry]);

  const renderIcon = (props: IconProps) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon
        {...props}
        name={secureTextEntry ? 'eye-off' : 'eye'}
      />
    </TouchableWithoutFeedback>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 20
      }}
    >

     {/* Logo */}
     <Image
        source={require("../../../assets/logo.png")} 
        style={{
          width: 150,
          height: 150, 
          marginBottom: 20
        }}
        resizeMode="contain" 
      />

      <Text
        category="h1"
        style={{
          marginBottom: 20
        }} 
      >Login</Text>

      {/* Cpf */}
      <Input
        label="CPF"
        placeholder="Digite seu CPF"
        keyboardType="numeric"
        value={cpf}
        onChangeText={value => setCpf(cpfMask(value))}
        style={{
          marginHorizontal: 28
        }}
      />

      {/* Senha */}
      <Input
        label="Senha"
        placeholder="Digite sua senha"
        keyboardType="ascii-capable"
        value={password}
        accessoryRight={renderIcon}
        secureTextEntry={secureTextEntry}
        onChangeText={setPassword}
        style={{
          marginHorizontal: 28
        }}
      />

      <Button onPress={handleLogin}>
        <Text>Logar</Text>
      </Button>

      <Text
        category="h6"
        style={{
          marginVertical: 10,
          color: "#007AFF",
          textDecorationLine: "underline"
        }}
      >
        Esqueceu sua senha?
      </Text>
      
    </SafeAreaView>
  );
}