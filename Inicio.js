import { StyleSheet, Text, Image, ImageBackground, View, Touchable, TouchableOpacity, Button } from 'react-native'
import React, { Component } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BlurView } from '@react-native-community/blur';

export default class Inicio extends Component {
  render() {
    const cambiarVentanaLogin= () =>{
      this.props.navigation.navigate('Login')
    }
    const cambiarVentanaSingUp= () =>{
      this.props.navigation.navigate('SingUp')
    }
    return (
      <View> 
        <ImageBackground style={styles.imgBackGround} source={require("./Img/background.jpeg")}>
          {/* <Text>Student Helpers</Text> */}
          <View style={styles.centrar}> 
            <Image 
              style={styles.imgLogo}
              source={require("./Img/Logo.png")}
            />
              <View style={styles.contenedorLogin}>
                <TouchableOpacity onPress={cambiarVentanaLogin}>
                  <View style={[styles.boton, styles.botonIniciarSesion]}>
                    <Text style={styles.txtBoton}>Iniciar Sesion</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={cambiarVentanaSingUp}>
                  <View style={[styles.boton, styles.botonRegistrarme]}>
                    <Text style={styles.txtBoton}>Registrarme</Text>
                  </View>
                </TouchableOpacity>
              </View>
            
          </View>
        </ImageBackground>
       
      </View>
    )
  }
}
const styles = StyleSheet.create({
  centrar:{
    flex: 1,
    alignItems: 'center', // Esto centra horizontalmente el contenido
  },
  imgBackGround:{
    width: wp('100%'),
    height: hp('100%'),
    // flex: 1,
    // alignItems: 'center', // Esto centra horizontalmente el contenido
    // justifyContent: 'flex-start', // Esto alinea el contenido en la parte superior
  },
  imgLogo:{
    width: wp('70%'),
    height: hp('30%'),
    marginTop: 70
    // width: 400,
    // height: 400,
  },
  contenedorLogin:{
    justifyContent: 'center', // Centra verticalmente
    alignItems: 'center', // Centra horizontalmente
    backgroundColor: 'rgba(0, 0, 0, 0)',
    width: wp('90%'),
    height: hp('25%'),
    marginTop: 100,
    borderRadius: 25,
  },
  boton:{
    backgroundColor: '#33BD78',
    width: wp('70%'),
    height: hp('8%'),
    borderRadius: 15,
  },
  botonIniciarSesion:{
    
    marginBottom: 30,
  },
  botonRegistrarme:{
    
  },
  txtBoton:{
    fontSize: 25,
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#000000',
    fontWeight: 'bold',
  },
  overlay: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('90%'),
    height: hp('25%'),
    marginTop: 100,
    borderRadius: 25,
  },
});