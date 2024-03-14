import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Modal} from 'react-native'
import {globalStyles} from '../../globalStyles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import PerfilHeader from '../components/PerfilHeader';
import { Alert } from 'react-native';
import { Button  } from 'react-native-paper';

const Perfil = () => {
  const [modalCrearPublicacion, setModalCrearPublicacion] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <View>
        <PerfilHeader/>
        <View style={[globalStyles.form, {padding: 5}]}>
          <Text style={styles.nombreTitulo}>Nombre de Usuario</Text>
          <View style={styles.contenedorDescripcion}>
            <Image
              source={require("../../Img/Sin-foto-Perfil.png")}
              style={styles.image}
            />
            <Text style={styles.textoDescripcion}>In et ullamco consectetur minim exercitation officia proident aliquip tempor voluptate ut anim sunt velit. Elit et eiusmod sunt proident. Do ad aute proident non aute consequat consectetur irure fugiat dolor.</Text>
          </View>
          <Text style={styles.nombreTitulo}>Publicaciones</Text>
          <View style={styles.contenedorDescripcion}>
            <View style={[globalStyles.centrar, styles.botonCrearPublicacion]}>
              <Icon.Button 
                name="plus"
                onPress={() => setModalCrearPublicacion(true)}
              >Crear Publicación</Icon.Button>
            </View>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalCrearPublicacion}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalCrearPublicacion(!modalCrearPublicacion);
            }}>
            <View style={styles.centrarContenedor}>
              <View style={styles.contenedorModal}>
                <Text style={styles.tituloModal}>Crear Publicación</Text>
                <Text style={styles.textoModal}>Elige una categoria</Text>
                <View style={styles.contendorBotones}>
                  <Button
                    mode={selectedOption === 'comida' ? 'contained' : 'outlined'}
                    onPress={() => handleOptionSelect('comida')}
                    style={styles.boton}
                  >
                    Comida
                  </Button>

                  <Button
                    mode={selectedOption === 'accesorios' ? 'contained' : 'outlined'}
                    onPress={() => handleOptionSelect('accesorios')}
                    style={styles.boton}
                  >
                    Accesorios
                  </Button>

                  <Button
                    mode={selectedOption === 'viaje' ? 'contained' : 'outlined'}
                    onPress={() => handleOptionSelect('viaje')}
                    style={[styles.boton, {width: wp("26%")}]}
                  >
                    Viaje
                  </Button>
                  
                  
                </View>

                <View style={styles.contendorBotones}>
                  <Button
                    mode={selectedOption === 'intercambio' ? 'contained' : 'outlined'}
                    onPress={() => handleOptionSelect('intercambio')}
                    style={styles.boton}
                  >
                    Intercambio
                  </Button>
                  <Button
                    mode={selectedOption === 'producto' ? 'contained' : 'outlined'}
                    onPress={() => handleOptionSelect('producto')}
                    style={styles.boton}
                  >
                    Producto
                  </Button>
                  <Button
                    mode={selectedOption === 'otro' ? 'contained' : 'outlined'}
                    onPress={() => handleOptionSelect('otro')}
                    style={[styles.boton, {width: wp("26%")}]}
                  >
                    Otro
                  </Button>
                </View>

                <Text>Opción seleccionada: {selectedOption}</Text>

                <Text>Titulo</Text>
                <TextInput></TextInput>

                <Text>Detalles</Text>
                <TextInput></TextInput>

                <View style={styles.contendorBotones}>
                  <Icon.Button name="clock-o" style={styles.botonDatos}>Horario</Icon.Button>
                  <Icon.Button name="map-marker" style={styles.botonDatos}>Lugar</Icon.Button>
                  <Icon.Button name="calendar" style={styles.botonDatos}>Días</Icon.Button>
                </View>
                <View style={styles.contendorBotones}>
                  <Icon.Button name="mobile-phone" style={styles.botonDatos}>Contacto</Icon.Button>
                  <Icon.Button name="image" style={styles.botonDatos}>Imagen</Icon.Button>
                </View>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalCrearPublicacion(false)}>
                  <Text style={styles.textStyle}>Hide Modal</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  contenedorDescripcion:{
    flexDirection: "row",
    alignItems: "center",
    width: wp("100%"),
    margin: 2,
    borderWidth: 1,
    borderColor: "grey",
  },
  nombreTitulo:{
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 4,
    color: "black",
  },
  textoDescripcion:{
   // marginRight: 150,
   width: wp("55%"),
   marginLeft: 5,
   marginRight: 4,
   textAlign: "justify",
  },
  image:{
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
    width: wp("40%"),
    height: hp("20%"),
  },
  contenedorCrearPubliacion:{
    flexDirection: "row",
    alignItems: "center",
    height: 45,
  },
  botonCrearPublicacion:{
    margin: 5,
  },
  centrarContenedor: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 55,
  },
  contenedorModal: {
    backgroundColor: 'white',
    borderRadius: 20,
    height: hp("60%"),
    width: wp("97%"),
    padding: 10,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tituloModal: {
    marginBottom: 5,
    textAlign: "left",
    fontWeight: 'bold',
    color: "black",
    fontSize: 30,
  },
  textoModal: {
    textAlign: "center",
    fontSize: 14,
    color: "grey",
  },
  contendorBotones:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Distribuye automáticamente el espacio entre los botones
  },
  boton:{
    width: wp("32%"),
    marginVertical: 5
  },
  botonDatos:{
    width: wp("25%"),
    marginVertical: 5,
    borderRadius: 40,
  },
});

export default Perfil;