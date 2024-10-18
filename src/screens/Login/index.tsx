import * as Device from "expo-device";
import * as Application from "expo-application";
import { Image, SafeAreaView, View, StyleSheet } from "react-native";
import { useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Button,
  Icon,
  IconProps,
  Input,
  Text,
  useTheme,
  ThemeType,
} from "@ui-kitten/components"; 
import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
import { NavigationProps } from "../../routes/stack.params";
import localStorage from "../../database";
import { cpfMask } from "../../utils/mask";
import { LinearGradient } from "expo-linear-gradient"; 
import Svg, { Path } from "react-native-svg";

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProps>();
  const theme: ThemeType = useTheme();

  const [loading, setLoading] = useState(false);

  const handleLogin = useCallback(() => {
    setLoading(true);
    const device = {
      osName: Device.osName,
      osVersion: Device.osVersion,
      modelName: Device.modelName,
      androidId: Application.getAndroidId(),
    };

    localStorage.setItem("userIsAuth", true);
    navigation.navigate("Initial");
    setCpf("");
    setPassword("");
    setLoading(false);
  }, [navigation]);

  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSecureEntry = useCallback(() => {
    setSecureTextEntry(!secureTextEntry);
  }, [secureTextEntry]);

  const renderIcon = (props: IconProps) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

  const renderCpfIcon = (props: IconProps) => <Icon {...props} name="person" />;

  return (
    <LinearGradient
      colors={["#ffffff", "#A9C6FF"]}
      style={styles.container}
    >
      <Image
        source={require("../../../assets/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Bem-vindo */}
      <Text category="h1" style={[styles.welcomeMessage, { color: theme["color-primary-500"] }]}>
        Bem-vindo!
      </Text>

      {/* Login */}
      <Text category="h5" style={styles.subtitle}>
        Faça seu login 
      </Text>

      <View style={styles.inputContainer}>
        {/* Cpf */}
        <Input
          label="CPF"
          placeholder="Digite seu CPF"
          keyboardType="numeric"
          value={cpf}
          onChangeText={(value) => setCpf(cpfMask(value))}
          accessoryLeft={renderCpfIcon}
          style={styles.input}
          status="primary"
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
          style={styles.input}
          status="primary"
        />
      </View>

      <Button onPress={handleLogin} style={styles.loginButton} disabled={loading} status="success">
        {loading ? <Text>Carregando...</Text> : <Text>Logar</Text>}
      </Button>

      <Text category="h6" style={styles.forgotPassword}>
        Esqueceu sua senha?
      </Text>

     
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30, 
  },
  welcomeMessage: {
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 28, 
    textAlign: "center",
  },
  subtitle: {
    marginBottom: 30, 
    fontSize: 20, 
    textAlign: "center",
  },
  inputContainer: {
    width: '100%', 
    marginBottom: 20,
  },
  input: {
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  loginButton: {
    marginVertical: 20,
    width: '100%', 
    borderRadius: 10,
  },
  forgotPassword: {
    marginVertical: 10,
    textDecorationLine: "underline",
    color: "#007AFF",
  },
  svgContainer: {
    position: "absolute",
    top: 0,
    width: "100%",
  },
});
