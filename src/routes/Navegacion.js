import React, { Component, useState } from 'react';
import {  StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from "../../Firebase.js";
import Icon from 'react-native-vector-icons/FontAwesome';

import INICIO from '../views/AuthModals/Inicio.js';
import SINGUP from '../views/AuthModals/SingUp.js';
import LOGIN from '../views/AuthModals/Login.js';
import VERPUBLICACION from '../views/VerPublicacion.js';
import PROFILE from '../views/Perfil.js';
import PUBLICACIONES from '../views/Publicaciones.js';
import TAB_NAVIGATOR from '../routes/TabNavigator.js';
import UPDATE_POSTS from '../views/UpdatePosts.js'
import Header from '../components/Header.js';
//La importacion de lo que usemos

const Stack = createNativeStackNavigator();
const Insidestack = createNativeStackNavigator();


function InsideView({navigation}) {
  return (
    <Insidestack.Navigator>
      <Stack.Screen name="TabNavigator" component={TAB_NAVIGATOR}  options={{headerShown:false}} />
      <Stack.Screen name="VerPublicacion" component={VERPUBLICACION} 
        options={{
          headerTitle: () => null, // Esto ocultará el título del encabezado
          headerStyle: styles.headerStyle, // Aplica el estilo de fondo del encabezado
          headerTintColor: styles.headerTintColor, // Aplica el color del texto del encabezado
          headerTitleStyle: styles.headerTitleStyle, // Aplica el estilo del título del encabezado
          header: () => (
            <Header navigation={navigation} back={true}/>
          ),
        }} />
      <Stack.Screen name="Publicaciones" component={PUBLICACIONES}/>
      <Stack.Screen name="Profile" component={PROFILE} />
      <Stack.Screen name="UpdatePosts" component={UPDATE_POSTS}
        options={{
          headerTitle: () => null, // Esto ocultará el título del encabezado
          headerStyle: styles.headerStyle, // Aplica el estilo de fondo del encabezado
          headerTintColor: styles.headerTintColor, // Aplica el color del texto del encabezado
          headerTitleStyle: styles.headerTitleStyle, // Aplica el estilo del título del encabezado
          header: () => (
            <Header navigation={navigation} back={true}/>
          ),
        }} />
    </Insidestack.Navigator>
  )
}

function OutsideView({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Inicio" component={INICIO} options={{headerShown:false}} />
      <Stack.Screen name="SingUp" component={SINGUP} 
        options={{
          headerTitle: () => null, // Esto ocultará el título del encabezado
          headerStyle: styles.headerStyle, // Aplica el estilo de fondo del encabezado
          headerTintColor: styles.headerTintColor, // Aplica el color del texto del encabezado
          headerTitleStyle: styles.headerTitleStyle, // Aplica el estilo del título del encabezado
          header: () => <Header navigation={navigation} back={true} />,
        }} />
      <Stack.Screen name="Login" component={LOGIN} options={{
        headerTitle: () => null, // Esto ocultará el título del encabezado
        headerStyle: styles.headerStyle, // Aplica el estilo de fondo del encabezado
        headerTintColor: styles.headerTintColor, // Aplica el color del texto del encabezado
        headerTitleStyle: styles.headerTitleStyle, // Aplica el estilo del título del encabezado
        header: () => <Header navigation={navigation} back={true}/>,
        }}/>
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
            <Stack.Screen name="Inici" component={OutsideView} options={{headerShown:false}} />
          )}
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#8CCDA8',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
})

export default Navegacion;