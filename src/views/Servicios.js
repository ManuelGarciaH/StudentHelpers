import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import React from 'react';
import { globalStyles } from '../../globalStyles';

// Array de ejemplo con información de servicios
const serviciosData = [
  { 
    nombre: 'Biblioteca', 
    descripcion: 'Descripción de la biblioteca', 
    imagen: require('../../Img/biblioteca.png') // Ruta de la imagen para el servicio 1
  },
  { 
    nombre: 'Rectoria', 
    descripcion: 'Descripción de la rectoría', 
    imagen: require('../../Img/rectoria.png') // Ruta de la imagen para el servicio 2
  },
  { 
    nombre: 'Complejo Deportivo Universitario (CDU)', 
    descripcion: 'Descripción del CDU', 
    imagen: require('../../Img/cdu.png') // Ruta de la imagen para el servicio 3
  },
  { 
    nombre: 'Enfermeria', 
    descripcion: 'Descripción de la enfermería', 
    imagen: require('../../Img/enfermeria.png') // Ruta de la imagen para el servicio 3
  },
  { 
    nombre: 'Coordinacion INCO (Ingenieria en Computacion)', 
    descripcion: 'Descripción de la coordinación INCO', 
    imagen: require('../../Img/inco.png') // Ruta de la imagen para el servicio 3
  },
  { 
    nombre: 'Servicio 3', 
    descripcion: 'Descripción del servicio 3', 
    imagen: require('../../Img/Logo.png') // Ruta de la imagen para el servicio 3
  },
];

const Servicios = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={globalStyles.form}>
        <Text style={styles.titulo}>Servicios Generales</Text>
        {/* Mapeamos el array de serviciosData para crear un cuadro por cada servicio */}
        {serviciosData.map((servicio, index) => (
          <View key={index} style={styles.cuadro}>
            <View style={styles.contenido}>
              <Text style={styles.nombre}>{servicio.nombre}</Text>
              <Text>{servicio.descripcion}</Text>
            </View>
            <Image source={servicio.imagen} style={styles.imagen} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

// Estilos
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cuadro: {
    flexDirection: 'row', // Para alinear la imagen a la derecha
    alignItems: 'center', // Para alinear la imagen verticalmente con el texto
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  contenido: {
    flex: 1, // Para que el contenido ocupe todo el espacio disponible
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  imagen: {
    width: 80,
    height: 80,
    marginLeft: 20,
    borderRadius: 5,
  },
});

export default Servicios;
