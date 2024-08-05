import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TabRoutes from './src/routes/tab.routes';
import StackRoutes from './src/routes/stack.route';

export default function App() {
  return (
    <StackRoutes />
  );
}