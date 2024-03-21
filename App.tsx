/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import INICIO from "./src/routes/Navegacion";
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App(): JSX.Element {
  return (
    <SafeAreaProvider> 
      <INICIO/>
    </SafeAreaProvider>
  );
}

export default App;
