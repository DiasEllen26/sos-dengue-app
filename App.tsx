import React from 'react';
import * as eva from '@eva-design/eva'; 
import { ApplicationProvider } from '@ui-kitten/components'; 
import Routes from './src/routes/stack.route';
import { customTheme } from './custom-theme'; 

export default function App() {
  return (
    <Routes />
  );
}
