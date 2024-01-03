import { StyleSheet, Text, Image, ImageBackground, View, TextInput, TouchableOpacity} from 'react-native'
import React, { Component } from 'react'
import {globalStyles} from './globalStyles';

export default class SingUp extends Component {
  render() {
    const cambiarVentanaInicio= () =>{
        this.props.navigation.navigate('Inicio')
    }
    return (
      <View>
        <ImageBackground style={globalStyles.imgBackGround} source={require("./Img/background.jpeg")}>

        <View style={globalStyles.header}>
            <TouchableOpacity onPress={cambiarVentanaInicio}>
                <Image
                    style={globalStyles.imgHeaderRetroceso}
                    //source={require("./Img/Flecha-negra.png")}
                    source={require("./Img/Flecha-verde.png")}
                />
            </TouchableOpacity>
            
            <Text style={styles.title}>SingUp</Text>
            <Image 
                style={globalStyles.imgHeaderLogo}
                source={require("./Img/Logo.png")}
            />
        </View>
        </ImageBackground>

        <View style={globalStyles.form}>
            <Text style={globalStyles.txtBasic}>Nombre</Text>
            <View style={globalStyles.input}>
                <TextInput style={globalStyles.txtInput}></TextInput>
            </View>

            <Text style={globalStyles.txtBasic}>Correo Institucional</Text>
            <View style={globalStyles.input}>
                <TextInput style={globalStyles.txtInput}></TextInput>
            </View>

            <Text style={globalStyles.txtBasic}>Contraseña</Text>
            <View style={globalStyles.input}>
                <TextInput style={globalStyles.txtInput}></TextInput>
            </View>

            <Text style={globalStyles.txtBasic}>Confirmar Contraseña</Text>
            <View style={globalStyles.input}>
                <TextInput style={globalStyles.txtInput}></TextInput>
            </View>

            <TouchableOpacity>
                <View style={globalStyles.boton}>
                    <Text style={globalStyles.txtBoton}>Crear cuenta</Text>
                </View>
            </TouchableOpacity>

        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
    title:{                     //Titulo de la ventana
        backgroundColor: '#000000',
        marginHorizontal: 33,
        marginLeft: 44,
        padding: 10,
        borderRadius: 10,
        fontSize: 30,
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
  });