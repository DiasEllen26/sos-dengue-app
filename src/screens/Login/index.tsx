import { useNavigation } from "@react-navigation/native";
import { Button, Icon, IconProps, Input, Text } from "@ui-kitten/components";
import { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import localStorage from "../../database";
import { NavigationProps } from "../../routes/stack.params";
import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
import { cpfMask } from "../../utils/mask";

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProps>();

  const handleLogin = useCallback(() => {
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
      <Text
        category="h1"
        style={{
          marginBottom: 20
        }} 
      >Login</Text>

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