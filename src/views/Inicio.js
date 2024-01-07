import { StyleSheet, Text, Image, ImageBackground, View, TouchableOpacity, Button } from 'react-native'
import React, { Component } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {globalStyles} from '../../globalStyles';

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
        <ImageBackground style={styles.imgBackGround} source={require("../../Img/background.jpeg")}>
          {/* <Text>Student Helpers</Text> */}
          <View style={globalStyles.centrar}> 
            <Image 
              style={styles.imgLogo}
              source={require("../../Img/Logo.png")}
            />
              <View style={styles.contenedorLogin}>
                <TouchableOpacity onPress={cambiarVentanaLogin}>
                  <View style={[globalStyles.boton, styles.botonIniciarSesion]}>
                    <Text style={globalStyles.txtBoton}>Iniciar Sesion</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={cambiarVentanaSingUp}>
                  <View style={globalStyles.boton}>
                    <Text style={globalStyles.txtBoton}>Registrarme</Text>
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
  imgBackGround:{
    width: wp('100%'),
    height: hp('100%'),
  },
  imgLogo:{
    width: wp('70%'),
    height: hp('30%'),
    marginTop: 70
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
    
    marginBottom: 15,
  },
  txtBoton:{
    fontSize: 25,
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#000000',
    fontWeight: 'bold',
  },
});