import RecoverPasswordService from "./service";
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Button, Card, Icon, IconProps, Input, Modal, Spinner, Text, ThemeType, useTheme } from "@ui-kitten/components";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { NavigationProps } from "../../routes/stack.params";


export default function RecoverPasswordScreen() {
  const navigation = useNavigation<NavigationProps>();
  const theme: ThemeType = useTheme();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Função para validar se o email está correto
  const isEmailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRecoverPassword = useCallback(async() => {
    if (!email) {
      setErrorMessage("O campo deve ser preenchido");
      return; // Não prossegue se o campo estiver vazio
    }

    if (!isEmailValid(email)) {
      setErrorMessage("Insira um e-mail válido");
      return; // Não prossegue se o e-mail não for válido
    }

    setLoading(true);
    
    try{
      await RecoverPasswordService.recoverPassword({ email });
    }catch(error){
      console.error(error);
      setErrorMessage("Erro ao enviar e-mail");
      return; // Não prossegue se houver erro no envio
    }

    setErrorMessage("");
    setTimeout(() => {
      setLoading(false);
      setModalVisible(true); // Exibe o modal após envio
    }, 2000);
  }, [email]);

  const handleCloseModal = () => {
    setModalVisible(false);
    navigation.navigate("Login"); 
  };

  const handleGoBack = () => {
    navigation.navigate("Login");
  };

  return (
    <LinearGradient colors={["#ffffff", "#A9C6FF"]} style={styles.container}>
      <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <Icon name="arrow-back" fill={theme["color-primary"]} style={styles.backIcon} />
      </TouchableOpacity>
      
      <Image
        source={require("../../../assets/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Recuperar Senha */}
      <Text category="h1" style={[styles.header, { color: theme["color-primary-600"] }]} >
        Recuperação Senha
      </Text>

      <Text category="h5" style={styles.subtitle}>
        Insira o e-mail
      </Text>

      <View style={styles.inputContainer}>
        {/* Input de E-mail */}
        <Input
          label="E-mail"
          placeholder="Digite seu e-mail"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          accessoryLeft={(props: IconProps) => <Icon {...props} name="email" />}
          style={[
            styles.input,
            errorMessage ? styles.errorInput : {},
          ]}
          status={errorMessage ? "danger" : "basic"} // Indica erro no input
        />
        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
      </View>

      {/* Botão de Enviar */}
      <Button
        onPress={handleRecoverPassword}
        style={styles.sendButton}
        status="success" 
      >
        <Text>Enviar link</Text>
      </Button>

      <Text category="h6" style={styles.instruction}>
        Você receberá um link no e-mail para redefinir sua senha.
      </Text>

      <View style={styles.svgContainer}>
        <Svg height="100" width="100">
          <Circle cx="50" cy="50" r="40" fill="rgba(255, 255, 255, 0.5)" />
        </Svg>
      </View>

      {/* Spinner de Carregamento */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <Spinner size="giant" status="primary" />
        </View>
      )}

      {/* Modal de confirmação */}
      <Modal
        visible={modalVisible}
        backdropStyle={styles.backdrop}
        onBackdropPress={handleCloseModal}
      >
        <Card disabled={true} style={styles.modalCard}>
          <Text category="h6" style={styles.modalText}>
            Solicitação recebida, se o e-mail estiver registrado, você receberá instruções de recuperação em breve.
          </Text>
          <Button onPress={handleCloseModal} style={styles.modalButton} status="success">
            Voltar
          </Button>
        </Card>
      </Modal>
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
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1, // Certifica-se que o botão está acima de outros componentes
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30, 
  },
  header: {
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
  errorInput: {
    borderColor: "red", 
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 5,
  },
  sendButton: {
    marginVertical: 20,
    width: '100%',
    borderRadius: 10,
  },
  instruction: {
    marginVertical: 10,
    textAlign: "center",
    color: "#1b609f",
  },
  svgContainer: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Fundo semitransparente
    zIndex: 2,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalCard: {
    borderRadius: 20,
    padding: 20,
  },
  modalText: {
    marginVertical: 10,
    textAlign: "center",
  },
  modalButton: {
    marginTop: 20,
  },
});
