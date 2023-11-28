import { StyleSheet, Text, Image, ImageBackground, View, TextInput, TouchableOpacity} from 'react-native'
import React, { Component } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class SingUp extends Component {
  render() {
    const cambiarVentanaInicio= () =>{
        this.props.navigation.navigate('Inicio')
    }
    return (
      <View>
        <ImageBackground style={styles.imgBackGround} source={require("./Img/background.jpeg")}>

        <View style={styles.header}>
            <TouchableOpacity onPress={cambiarVentanaInicio}>
                <Image
                    style={styles.imgHeaderRetroceso}
                    //source={require("./Img/Flecha-negra.png")}
                    source={require("./Img/Flecha-verde.png")}
                />
            </TouchableOpacity>
            
            <Text style={styles.title}>SingUp</Text>
            <Image 
                style={styles.imgHeaderLogo}
                source={require("./Img/Logo.png")}
            />
        </View>
        </ImageBackground>

        <View style={styles.form}>
            <Text style={styles.txtBasic}>Nombre</Text>
            <View style={styles.input}>
                <TextInput style={styles.txtInput}></TextInput>
            </View>

            <Text style={styles.txtBasic}>Correo Institucional</Text>
            <View style={styles.input}>
                <TextInput style={styles.txtInput}></TextInput>
            </View>

            <Text style={styles.txtBasic}>Contraseña</Text>
            <View style={styles.input}>
                <TextInput style={styles.txtInput}></TextInput>
            </View>

            <Text style={styles.txtBasic}>Confirmar Contraseña</Text>
            <View style={styles.input}>
                <TextInput style={styles.txtInput}></TextInput>
            </View>

            <TouchableOpacity>
                <View style={styles.boton}>
                    <Text style={styles.txtBoton}>Crear cuenta</Text>
                </View>
            </TouchableOpacity>

        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
    header:{                    //Header contiene el logo, titulo de la ventana
        flexDirection: 'row', 
        alignItems: 'center',
        flex: 1,
    },
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
    centrar:{
      flex: 1,
      alignItems: 'center', // Esto centra horizontalmente el contenido
    },
    imgBackGround:{
      width: wp('100%'),
      height: hp('15%'),
      // flex: 1,
      // alignItems: 'center', // Esto centra horizontalmente el contenido
      // justifyContent: 'flex-start', // Esto alinea el contenido en la parte superior
    },
    imgHeaderLogo:{
      width: wp('23%'),
      height: hp('13%'),
      margin: 10
      // width: 400,
      // height: 400,
    },
    imgHeaderRetroceso:{
        width: wp('20%'),
        height: hp('10%'),
        margin: 10
        // width: 400,
        // height: 400,
    },
    form:{
      //justifyContent: 'center', // Centra verticalmente
      //alignItems: 'center', // Centra horizontalmente
      backgroundColor: '#A7DBCB',
      padding: 20,
      height: hp('100%'),
      alignItems: 'center',
    },
    txtBasic:{
        fontSize: 20,
        color: '#000000',
        fontWeight: '600',
    },
    input:{
        width: wp('90%'),
        borderWidth: 1,
        backgroundColor: '#AFC1BC',
        borderColor: 'black',
        borderRadius: 15,
        marginBottom: 15,
        marginTop: 2,
    },
    txtInput:{
        fontSize: 20,
        color: '#000000',
        fontWeight: '600',
    },
    boton:{
      backgroundColor: '#33BD78',
      width: wp('70%'),
      height: hp('8%'),
      borderRadius: 15,
      marginTop: 10,
    },
    txtBoton:{
      fontSize: 25,
      flex: 1,
      textAlign: 'center',
      textAlignVertical: 'center',
      color: '#000000',
      fontWeight: 'bold',
    }
  });