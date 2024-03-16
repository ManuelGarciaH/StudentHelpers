import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Modal} from 'react-native'
import {globalStyles} from '../../globalStyles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import PerfilHeader from '../components/PerfilHeader';
import { Alert } from 'react-native';
import { Button, TextInput  } from 'react-native-paper';

const Perfil = () => {
  const [modalCrearPublicacion, setModalCrearPublicacion] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedDetails, setSelectedDetails] = useState('');

  const handleOptionSelect = (option) => {
    console.log(option);
    setSelectedOption(option);
  };
  const handleTitleInput = (texto) => {
    console.log(texto);
    setSelectedTitle(texto);
  };
  const handleDetailsInput = (texto) => {
    console.log(texto);
    setSelectedDetails(texto);
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
                    mode={selectedOption === 'Comida' ? 'contained' : 'outlined'}
                    onPress={() => handleOptionSelect('Comida')}
                    style={styles.boton}
                  >
                    Comida
                  </Button>

                  <Button
                    mode={selectedOption === 'Accesorios' ? 'contained' : 'outlined'}
                    onPress={() => handleOptionSelect('Accesorios')}
                    style={styles.boton}
                  >
                    Accesorios
                  </Button>

                  <Button
                    mode={selectedOption === 'Viaje' ? 'contained' : 'outlined'}
                    onPress={() => handleOptionSelect('Viaje')}
                    style={[styles.boton, {width: wp("26%")}]}
                  >
                    Viaje
                  </Button>
                  
                  
                </View>

                <View style={styles.contendorBotones}>
                  <Button
                    mode={selectedOption === 'Intercambio' ? 'contained' : 'outlined'}
                    onPress={() => handleOptionSelect('Intercambio')}
                    style={styles.boton}
                  >
                    Intercambio
                  </Button>
                  <Button
                    mode={selectedOption === 'Producto' ? 'contained' : 'outlined'}
                    onPress={() => handleOptionSelect('Producto')}
                    style={styles.boton}
                  >
                    Producto
                  </Button>
                  <Button
                    mode={selectedOption === 'Otro' ? 'contained' : 'outlined'}
                    onPress={() => handleOptionSelect('Otro')}
                    style={[styles.boton, {width: wp("26%")}]}
                  >
                    Otro
                  </Button>
                </View>

                <Text>Opción seleccionada: {selectedOption}</Text>

                <Text>Titulo</Text>
                <TextInput onChangeText={handleTitleInput} value={selectedTitle}></TextInput>

                <Text>Detalles</Text>
                <TextInput multiline={true} numberOfLines={3} onChangeText={handleDetailsInput} value={selectedDetails}></TextInput>

                <View style={styles.contendorBotones}>
                  <Icon.Button name="clock-o" style={styles.botonDatos} borderRadius={13}>Horario</Icon.Button>
                  <Icon.Button name="map-marker" style={styles.botonDatos} borderRadius={13}>Lugar</Icon.Button>
                  <Icon.Button name="calendar" style={styles.botonDatos} borderRadius={13}>Días</Icon.Button>
                </View>
                <View style={[styles.contendorBotones, {justifyContent: "center"}]}>
                  <Icon.Button name="mobile-phone" style={styles.botonDatos} borderRadius={13}>Contacto</Icon.Button>
                  <View style={{ marginHorizontal: 10}}></View>
                  <Icon.Button name="image" style={styles.botonDatos} borderRadius={13}>Imagen</Icon.Button>
                </View>

                <View style={[styles.contendorBotones, {justifyContent: "center"}]}>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonClose, { marginHorizontal: 0}]}
                    onPress={() => setModalCrearPublicacion(false)}>
                    <Text style={styles.textStyle}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalCrearPublicacion(false)}>
                    <Text style={styles.textStyle}>Crear Publicación</Text>
                  </TouchableOpacity>
                </View>
                
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
    height: hp("68%"),
    width: wp("97%"),
    padding: 10,
    elevation: 5,
  },
  button: {
    padding: 10,
    elevation: 2,
    marginLeft: 20,
    marginRight: 10,
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
    marginVertical: 5
  },
  boton:{
    width: wp("32%"),
  },
  botonDatos:{
    width: wp("27%"),
    backgroundColor: "green",
    textAlign: "center",
  },
});

export default Perfil;