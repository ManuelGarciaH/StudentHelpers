import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PUBLICACIONES from '../views/Publicaciones.js';
import LIST_PROFILE from '../views/ListProfiles.js';
import PERFIL from '../views/Perfil.js';
import SERVICIOS from '../views/Servicios.js';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import {  StyleSheet } from 'react-native';
import BuscadorHeader from '../components/BuscadorHeader.js';
import PerfilHeader from '../components/PerfilHeader.js';
import ServiceHeader from '../components/ServiceHeader.js';
import Header from '../components/Header.js';

const Tab = createBottomTabNavigator();

function TabNavigator({navigation}) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Publicaciones" component={PUBLICACIONES} 
        options={{
            tabBarIcon:({ color, size }) => ( // Define el icono dentro de una función
                <Icon name="newspaper" color={color} size={size} />
            ),
            headerTitle: () => null, // Esto ocultará el título del encabezado
            headerStyle: styles.headerStyle, // Aplica el estilo de fondo del encabezado
            headerTintColor: styles.headerTintColor, // Aplica el color del texto del encabezado
            headerTitleStyle: styles.headerTitleStyle, // Aplica el estilo del título del encabezado
            headerLeft: () => (
              <BuscadorHeader/>
            ),
            headerShown: false, // Oculta el encabezado de esta pantalla
        }}
        
      />
      <Tab.Screen name="Vendedores" component={LIST_PROFILE}
        options={{
            tabBarIcon:({ color, size }) => ( // Define el icono dentro de una función
                <IconFontisto name="persons" color={color} size={size} />
            ),
            headerTitle: () => null, // Esto ocultará el título del encabezado
            headerStyle: styles.headerStyle, // Aplica el estilo de fondo del encabezado
            headerTintColor: styles.headerTintColor, // Aplica el color del texto del encabezado
            headerTitleStyle: styles.headerTitleStyle, // Aplica el estilo del título del encabezado
            header: () => (
              <Header navigation={navigation}/>
            ),
            headerShown: false,
        }}
        
      />
      <Tab.Screen name="Perfil" component={PERFIL} 
        options={{
            tabBarIcon:({ color, size }) => ( // Define el icono dentro de una función
                <Icon name="account-box" color={color} size={size} />
            ),
            headerTitle: () => null, // Esto ocultará el título del encabezado
            headerStyle: styles.headerStyle, // Aplica el estilo de fondo del encabezado
            headerTintColor: styles.headerTintColor, // Aplica el color del texto del encabezado
            headerTitleStyle: styles.headerTitleStyle, // Aplica el estilo del título del encabezado
            // headerRight: () => (
            //   <PerfilHeader/>
            // ),
            headerShown: false,
        }}/>
      <Tab.Screen name="Servicios" component={SERVICIOS} 
        options={{
          tabBarIcon:({ color, size }) => ( // Define el icono dentro de una función
              <Icon name="shopping-bag" color={color} size={size} />
          ),
          headerTitle: () => null, // Esto ocultará el título del encabezado
          headerStyle: styles.headerStyle, // Aplica el estilo de fondo del encabezado
          headerTintColor: styles.headerTintColor, // Aplica el color del texto del encabezado
          headerTitleStyle: styles.headerTitleStyle, // Aplica el estilo del título del encabezado
          headerRight: () => (
            <ServiceHeader/>
          ),
        }}/>
    </Tab.Navigator>
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

export default TabNavigator;