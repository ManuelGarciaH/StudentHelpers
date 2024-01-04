import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native'
import React, { Component } from 'react'
import Header from './Header';
import {globalStyles} from './globalStyles';

export default class Login extends Component {
    render() {
        const clickIniciarSesion= () =>{
            this.props.navigation.navigate('Publicaciones');
          }
        return (
            <View>
                <Header navigation={this.props.navigation} 
                    title="Login" 
                    customStyles={styles.title} // Puedes personalizar los estilos aquí 
                    />
    
                <View style={globalStyles.form}>
                    <Text style={globalStyles.txtBasic}>Correo Institucional</Text>
                    <View style={globalStyles.input}>
                        <TextInput style={globalStyles.txtInput}></TextInput>
                    </View>
        
                    <Text style={globalStyles.txtBasic}>Contraseña</Text>
                    <View style={globalStyles.input}>
                        <TextInput style={globalStyles.txtInput}></TextInput>
                    </View>
        
                    <TouchableOpacity onPress={clickIniciarSesion}>
                        <View style={globalStyles.boton}>
                            <Text style={globalStyles.txtBoton}>Iniciar Sesión</Text>
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
        marginHorizontal: 45,
        marginLeft: 52,
        padding: 10,
        borderRadius: 10,
        fontSize: 30,
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});