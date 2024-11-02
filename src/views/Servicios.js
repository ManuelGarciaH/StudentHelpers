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
    descripcion: 'Dr. Marco Antonio Pérez Cisneros', 
    telefono: 'Telefono:  33 1378 5900, Ext: 27402, 27405 y 27429 m',
    coreo: 'rector@cucei.udg.mx',
    horario: '9:a.m.-5:p.m.',
    imagen: require('../../Img/rectoria.png') 
  },
  { 
    nombre: 'Complejo Deportivo Universitario (CDU)', 
    descripcion: 'Descripción del CDU', 
    telefono: 'Telefono: (33)13785900 ext. 27424.',
    coreo: 'cdext.deportes@red.cucei.udg.mx',
    horario: '8:00 a 19:45 horas, de lunes a viernes y los sábados de 8:00 a 13:45 horas',
    imagen: require('../../Img/cdu.png') 
  },
  { 
    nombre: 'Enfermeria', 
    descripcion: 'El Centro Universitario de Ciencias Exactas e Ingenierías ofrece a su comunidad servicios de salud integral dentro de sus instalaciones, ubicadas en el módulo “L”, dentro del sub-almacén. Servicios de medicina general, psicología y nutrición con un horario de atención de ', 
    telefono: 'Telefono: (33) 1378 5900 ext. 27603',
    coreo: 'Área médica: psocucei@cucei.udg.mx\n Área nutricional: Nutripso-cucei@cucei.udg.mx \nÁrea psicológica: Psicopso-cucei@cucei.udg.mx',
    horario: '8:00 a 20:00 horas.',
    imagen: require('../../Img/enfermeria.png') 
  },
  { 
    nombre: 'Coordinacion INCO (Ingenieria en Computacion)', 
    descripcion: 'Descripción de la coordinación INCO', 
    telefono: 'Telefono: (33) 13785900 ext. 27489',
    coreo: 'ubiblio@cucei.udg.mx',
    horario: '8:00 a 19:45 horas, de lunes a viernes y los sábados de 8:00 a 13:45 horas',
    imagen: require('../../Img/inco.png') 
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
              <TouchableOpacity style={styles.itemConteiner} >
                <View style={styles.contenido}>
                  <Text style={styles.nombre}>{servicio.nombre}</Text>
                  <Text>{servicio.descripcion}</Text>
                  <Text>{servicio.telefono}</Text>
                  <Text>{servicio.coreo}</Text>
                  <Text>{servicio.horario}</Text>
                </View>
                <Image source={servicio.imagen} style={styles.imagen} />
              </TouchableOpacity>
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
    backgroundColor: '#F2F2F2',
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
  itemConteiner:{
    flexDirection: "row",
    alignItems: "center",
    width: 300,
  },
  imagen: {
    width: 80,
    height: 80,
    marginLeft: 20,
    borderRadius: 5,
  },
});

export default Servicios;
