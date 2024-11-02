/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

const ignoreWarnings = [
    '@firebase/firestore: Firestore (10.7.1): WebChannelConnection RPC \'Listen\' stream', // Parte del mensaje que quieres ocultar
  ];
  
  const originalConsoleWarn = console.warn;
  
  console.warn = (...args) => {
    if (ignoreWarnings.some(warning => args[0].includes(warning))) {
      return; // Ignora este warning
    }
    originalConsoleWarn(...args); // Si no es el warning que ignoramos, lo mostramos normalmente
  };

AppRegistry.registerComponent(appName, () => App);
