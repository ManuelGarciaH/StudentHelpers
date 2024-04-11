import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PUBLICACIONES from '../views/Publicaciones.js';
import VIAJES from '../views/Viajes.js';
import PERFIL from '../views/Perfil.js';
import MENU from '../views/Menu.js';
import SERVICIOS from '../views/Servicios.js';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {  StyleSheet } from 'react-native';
import BuscadorHeader from '../components/BuscadorHeader.js';
import PerfilHeader from '../components/PerfilHeader.js';
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
        }}
        
      />
      <Tab.Screen name="Viajes" component={VIAJES}
        options={{
            tabBarIcon:({ color, size }) => ( // Define el icono dentro de una función
                <Icon name="map" color={color} size={size} />
            ),
            headerTitle: () => null, // Esto ocultará el título del encabezado
            headerStyle: styles.headerStyle, // Aplica el estilo de fondo del encabezado
            headerTintColor: styles.headerTintColor, // Aplica el color del texto del encabezado
            headerTitleStyle: styles.headerTitleStyle, // Aplica el estilo del título del encabezado
            header: () => (
              <Header navigation={navigation}/>
            ),
            
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
            headerRight: () => (
              <PerfilHeader/>
            ),
        }}/>
      <Tab.Screen name="Servicios" component={SERVICIOS} 
        options={{
            headerShown:false,
            tabBarIcon:({ color, size }) => ( // Define el icono dentro de una función
                <Icon name="library-books" color={color} size={size} />
            ),
        }}/>
      <Tab.Screen name="Menu" component={MENU} 
        options={{
            headerShown:false,
            tabBarIcon:({ color, size }) => ( // Define el icono dentro de una función
                <Icon name="menu" color={color} size={size} />
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