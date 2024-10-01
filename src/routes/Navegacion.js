import React, { Component, useState } from 'react';
import {  StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from "../../Firebase.js";
import Icon from 'react-native-vector-icons/FontAwesome';

import INICIO from '../views/AuthModals/Inicio.js';
import SINGUP from '../views/AuthModals/SingUp.js';
import PASSWORD from '../views/AuthModals/ForgotPassword.jsx';
import LOGIN from '../views/AuthModals/Login.js';
import VERPUBLICACION from '../views/VerPublicacion.js';
import PROFILE from '../views/Perfil.js';
import PROFILE_SELLER from '../views/PerfilSeller.js';
import EDIT_PROFILE from '../views/EditProfile.js';
import CHANGE_PASSWORD from '../views/ChangePassword.js';
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
      <Stack.Screen name="ProfileSeller" component={PROFILE_SELLER} 
        options={{
          headerTitle: () => null, // Esto ocultará el título del encabezado
          headerStyle: styles.headerStyle, // Aplica el estilo de fondo del encabezado
          headerTintColor: styles.headerTintColor, // Aplica el color del texto del encabezado
          headerTitleStyle: styles.headerTitleStyle, // Aplica el estilo del título del encabezado
          header: () => (
            <Header navigation={navigation} back={true}/>
          ),
        }} />
        
      <Stack.Screen name="EditProfile" component={EDIT_PROFILE} 
        options={{
          headerTitle: () => null, // Esto ocultará el título del encabezado
          headerStyle: styles.headerStyle, // Aplica el estilo de fondo del encabezado
          headerTintColor: styles.headerTintColor, // Aplica el color del texto del encabezado
          headerTitleStyle: styles.headerTitleStyle, // Aplica el estilo del título del encabezado
          header: () => (
            <Header navigation={navigation} back={true}/>
          ),
        }} />
      <Stack.Screen name="ChangePassword" component={CHANGE_PASSWORD} 
        options={{
          headerTitle: () => null, // Esto ocultará el título del encabezado
          headerStyle: styles.headerStyle, // Aplica el estilo de fondo del encabezado
          headerTintColor: styles.headerTintColor, // Aplica el color del texto del encabezado
          headerTitleStyle: styles.headerTitleStyle, // Aplica el estilo del título del encabezado
          header: () => (
            <Header navigation={navigation} back={true}/>
          ),
        }} />
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
        <Stack.Screen name='ForgotPassword' component={PASSWORD} 
        options={{
          headerStyle: styles.headerStyle, // Aplica el estilo de fondo del encabezado
          headerTintColor: styles.headerTintColor, // Aplica el color del texto del encabezado
          headerTitleStyle: styles.headerTitleStyle, // Aplica el estilo del título del encabezado
          header: () => <Header navigation={navigation} back={true} />,
        }}/>
    </Stack.Navigator>
  )
}

//Las acciones de los objetos
const Navegacion = () =>{
  const [user, setUser] = useState(null);
  const [email, setVerified] = useState(null);
  useState(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
      if (user && user.emailVerified) {
        setVerified(true);
      } else {
        setVerified(false);
      }
    })
  })

  console.log(email)
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Inicio'>
          {user && email ? (
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