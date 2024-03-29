import React, { Component } from 'react';
import { View, Text, NativeEventEmitter } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import INICIO from '../views/Inicio.js';
import SINGUP from '../views/SingUp.js';
import LOGIN from '../views/Login.js';
import VERPUBLICACION from '../views/VerPublicacion.js';
import PUBLICACIONES from '../views/Publicaciones.js';
import TAB_NAVIGATOR from '../routes/TabNavigator.js';
//La importacion de lo que usemos

const Stack = createNativeStackNavigator();
//Las acciones de los objetos
const Navegacion = () =>{
  return (
    <NavigationContainer>
        <Stack.Navigator>
            {/* <Stack.Screen name="Inicio" component={INICIO} options={{headerShown:false}}></Stack.Screen> */}
            <Stack.Screen name="TabNavigator" component={TAB_NAVIGATOR} options={{headerShown:false}}></Stack.Screen>
            <Stack.Screen name="SingUp" component={SINGUP} options={{headerShown:false}}></Stack.Screen>
            <Stack.Screen name="Login" component={LOGIN} options={{headerShown:false}}></Stack.Screen>
            <Stack.Screen name="VerPublicacion" component={VERPUBLICACION} options={{headerShown:false}}></Stack.Screen>
            {/* <Stack.Screen name="Publicaciones" component={PUBLICACIONES} options={{headerShown:false}}></Stack.Screen> */}
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navegacion;