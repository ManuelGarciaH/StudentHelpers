import React, { Component } from 'react';
import { View, Text, NativeEventEmitter } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import INICIO from './Inicio.js';
import SINGUP from './SingUp.js';
import LOGIN from './Login.js';
import PUBLICACIONES from './Publicaciones.js';
//La importacion de lo que usemos

export default class Inicio extends Component {
  constructor(props) {
    super(props);
    this.state = {
        //declaracion de varibles
    };
  }

  render() {
    const Stack = createNativeStackNavigator();
    //Las acciones de los objetos
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Inicio" component={INICIO} options={{headerShown:false}}></Stack.Screen>
                <Stack.Screen name="SingUp" component={SINGUP} options={{headerShown:false}}></Stack.Screen>
                <Stack.Screen name="Login" component={LOGIN} options={{headerShown:false}}></Stack.Screen>
                <Stack.Screen name="Publicaciones" component={PUBLICACIONES} options={{headerShown:false}}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
  }
}