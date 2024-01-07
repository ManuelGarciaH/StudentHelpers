import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native'
import React, { Component } from 'react'
import Header from '../components/Header';
import {globalStyles} from '../../globalStyles';

export default class SingUp extends Component {
    render() {
        return (
            <View>
                <Header navigation={this.props.navigation} 
                    title="SingUp" 
                    customStyles={styles.title} // Puedes personalizar los estilos aquí 
                    />

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