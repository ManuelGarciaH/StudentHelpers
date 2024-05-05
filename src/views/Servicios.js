import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { TraceRouteBotton } from '/seePublicationModals/TraceRouteBotton.js';
import Icon from 'react-native-vector-icons/FontAwesome';



const serviciosData = [
  { 
    nombre: 'Biblioteca', 
    descripcion: 'Biblioteca del Centro Universitario de Ciencias Exactas e Ingenierías (CUCEI)',
    telefono: 'Telefono: (33) 13785900 ext. 27489',
    coreo: 'ubiblio@cucei.udg.mx',
    horario: '8:00 a 19:45 horas, de lunes a viernes y los sábados de 8:00 a 13:45 horas',
    imagen: require('../../Img/biblioteca.png') 
  },
  { 
    nombre: 'Rectoria', 
    descripcion: 'Descripción de la rectoría', 
    imagen: require('../../Img/rectoria.png') 
  },
  { 
    nombre: 'Complejo Deportivo Universitario (CDU)', 
    descripcion: 'Descripción del CDU', 
    imagen: require('../../Img/cdu.png') 
  },
  { 
    nombre: 'Enfermeria', 
    descripcion: 'Descripción de la enfermería', 
    imagen: require('../../Img/enfermeria.png') 
  },
  { 
    nombre: 'Coordinacion INCO (Ingenieria en Computacion)', 
    descripcion: 'Descripción de la coordinación INCO', 
    imagen: require('../../Img/inco.png') 
  },
  { 
    nombre: 'Servicio 3', 
    descripcion: 'Descripción del servicio 3', 
    imagen: require('../../Img/Logo.png')
  },
];

const Servicios = () => {
  return (
    <View style={styles.scrollContainer}>
      <ScrollView >
        <View style={styles.content}>
          <Text style={styles.titulo}>Servicios Generales</Text>
          {serviciosData.map((servicio, index) => (
            <View key={index} style={styles.cuadro}>
              <View style={styles.contenido}>
                <Text style={styles.nombre}>{servicio.nombre}</Text>
                <Text>{servicio.descripcion}</Text>
                <Text>{servicio.telefono}</Text>
                <Text>{servicio.coreo}</Text>
                <Text>{servicio.horario}</Text>
              </View>
              {/* <TouchableOpacity >
                <View style={[globalStyles.dataButton,  styles.buttonGetModule, styles.buttonClose]}>

                </View>
              </TouchableOpacity> */}
              <Image source={servicio.imagen} style={styles.imagen} />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#A7DBCB',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'grey',
  },
  cuadro: {
    flexDirection: 'row', 
    alignItems: 'center',
    backgroundColor: 'grey',
    padding: 20,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.8,
    shadowRadius: 0,
    elevation: 10,
  },
  contenido: {
    flex: 1, 
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
