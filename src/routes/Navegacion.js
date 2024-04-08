import React, { Component, useState } from 'react';
import { View, Text, NativeEventEmitter } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from "../../Firebase.js";

import INICIO from '../views/Inicio.js';
import SINGUP from '../views/SingUp.js';
import LOGIN from '../views/Login.js';
import VERPUBLICACION from '../views/VerPublicacion.js';
import PROFILE from '../views/Perfil.js';
import PUBLICACIONES from '../views/Publicaciones.js';
import TAB_NAVIGATOR from '../routes/TabNavigator.js';
//La importacion de lo que usemos

const Stack = createNativeStackNavigator();
const Insidestack = createNativeStackNavigator();

function InsideView() {
  return (
    <Insidestack.Navigator>
      <Stack.Screen name="TabNavigator" component={TAB_NAVIGATOR} options={{headerShown:false}}></Stack.Screen>
      <Stack.Screen name="VerPublicacion" component={VERPUBLICACION} options={{headerShown:false}}></Stack.Screen>
      <Stack.Screen name="Publicaciones" component={PUBLICACIONES} options={{headerShown:false}}></Stack.Screen>
      <Stack.Screen name="Profile" component={PROFILE} options={{headerShown:false}}></Stack.Screen>
    </Insidestack.Navigator>
  )
}

function outsideView() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Inicio" component={INICIO} options={{headerShown:false}} />
      <Stack.Screen name="SingUp" component={SINGUP} options={{headerShown:false}} />
      <Stack.Screen name="Login" component={LOGIN} options={{headerShown:false}} />
    </Stack.Navigator>
  )
}

//Las acciones de los objetos
const Navegacion = () =>{
  const [user, setUser] = useState(null);
  useState(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user: ', user);
      setUser(user);
    })
  })

  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Inicio'>
          {user ? (
            <Stack.Screen name="Inside" component={InsideView} options={{headerShown:false}}/>
          ) : (
            <Stack.Screen name="Inicio" component={outsideView} options={{headerShown:false}} />
          )}
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navegacion;