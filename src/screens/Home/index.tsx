import React, { useState } from "react";
import { SafeAreaView, Modal, StyleSheet, TouchableOpacity } from "react-native";
import { Layout, Text, Button, Card, ProgressBar } from "@ui-kitten/components";
import { customTheme } from "../../../custom-theme";
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

// Definindo as constantes
const TOTAL_META = 60; 

const HomeScreen: React.FC = () => {
  const [visitasRealizadas, setVisitasRealizadas] = useState<number>(20); 
  const [focosEncontrados, setFocosEncontrados] = useState<number>(5); 
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const calcularPorcentagem = (): number => {
    return (visitasRealizadas / TOTAL_META) * 100;
  };

  const handleSearch = (): void => {
    setModalVisible(true);
  };

  const closeModal = (): void => {
    setModalVisible(false);
  };

  const renderCloseIcon = (): JSX.Element => (
    <TouchableOpacity onPress={closeModal} style={styles.closeIcon}>
      <AntDesign name="close" size={30} color={customTheme["color-danger-500"]} />
    </TouchableOpacity>
  );

  const renderProgressCard = (): JSX.Element => (
    <Card style={styles.card}>
      <Text category="h6" style={styles.cardTitle}>Visitas Realizadas</Text>
      <Text category="s1" style={styles.cardSubtitle}>
        {visitasRealizadas} de {TOTAL_META}
      </Text>
      <ProgressBar style={styles.progressBar} progress={calcularPorcentagem() / 100} />
      <Text category="s1" style={styles.progressText}>
        {calcularPorcentagem().toFixed(0)}%
      </Text>
    </Card>
  );

  const renderFocosCard = (): JSX.Element => (
    <Card style={styles.card}>
      <Text category="h6" style={styles.cardTitle}>Focos Encontrados</Text>
      <Text category="s1" style={styles.cardSubtitle}>{focosEncontrados} focos</Text>
    </Card>
  );

  const handleLocationSelect = (item: string): void => {
    console.log(`Selecionado: ${item}`);
    closeModal();
  };

  const renderLocationButtons = (): JSX.Element[] => {
    const locationTypes = [
      { label: "Casa", icon: "home" }, // Ícone de casa
      { label: "Apartamento", icon: "home-city" }, // Ícone de apartamento
      { label: "Terreno Baldio", icon: "map-outline" }, // Ícone de terreno
      { label: "Comércio", icon: "store" }, // Ícone de loja
      { label: "Outros", icon: "dots-horizontal" }, // Ícone de outros
    ] as const ;
    
    type LocationType = typeof locationTypes[number]; 
    
    const icon: LocationType["icon"] = "home"; 
    

    const colors = [
      customTheme["color-success-500"],  // Casa
      customTheme["color-primary-500"],   // Apartamento
      customTheme["color-warning-400"],   // Terreno Baldio
      customTheme["color-danger-500"],    // Comércio
      customTheme["color-info-500"],      // Outros
    ] ;

    return locationTypes.map((item, index) => (
      <Button
        key={index}
        style={[styles.modalButton, { backgroundColor: colors[index] }]}
        onPress={() => handleLocationSelect(item.label)}
        appearance="filled"
        accessoryLeft={() => (
          <MaterialCommunityIcons name={item.icon} size={24} color="#fff" />
        )}
      >
        {item.label}
      </Button>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Layout style={styles.layout}>
        <Text category="h1" style={styles.title}>Resumo Mensal</Text>
        {renderProgressCard()}
        {renderFocosCard()}
        <Layout style={styles.flexGrow} />
        <Button style={styles.button} status="success" onPress={handleSearch}>
          Buscar Residência
        </Button>
      </Layout>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <Layout style={styles.modalContainer}>
          <Card style={styles.modalCard}>
            {renderCloseIcon()}
            <Text category="h5" style={styles.modalTitle}>Escolha o tipo de local:</Text>
            {renderLocationButtons()}
          </Card>
        </Layout>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  layout: {
    flex: 1,
    width: '100%',
    justifyContent: "flex-start",
  },
  title: {
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "#333333",
  },
  card: {
    marginBottom: 20,
    padding: 15,
    width: '100%',
    borderRadius: 10,
    backgroundColor: "#F9F9F9",
    elevation: 2,
  },
  cardTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardSubtitle: {
    color: "#666666",
    marginBottom: 10,
  },
  progressBar: {
    marginVertical: 10,
  },
  progressText: {
    textAlign: "center",
    fontWeight: "bold",
  },
  button: {
    marginVertical: 10,
    borderRadius: 10,
    position: 'absolute', 
    bottom: 20, 
    left: 20,
    right: 20, 
  },
  flexGrow: {
    flexGrow: 1,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    elevation: 5,
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  modalButton: {
    marginBottom: 10,
    borderRadius: 10,
  },
  closeIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
});

export default HomeScreen;
