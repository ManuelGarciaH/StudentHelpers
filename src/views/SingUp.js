import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert} from 'react-native'
import React, { Component } from 'react'
import Header from '../components/Header';
import {globalStyles} from '../../globalStyles';
// firebase
import { FIREBASE_AUTH } from '../../Firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

export default class SingUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            nombre: '',
            correo: '',
            password: '',
            loading: false,
            auth: FIREBASE_AUTH,
        };
    }
    render() {
        const createUser = async () => {
            let loading = this.state.loading;
            loading = true;
            let nombre = this.state.nombre;
            let correo = this.state.correo;
            let password = this.state.password;
            let auth = this.state.auth;         //Firebase autenticacion 
            createUserWithEmailAndPassword(auth, correo, password)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    console.log(nombre);
                    updateProfile(user, {
                        displayName: nombre,
                        photoURL: null
                    }).then(() => {
                        // Actualización de perfil exitosa
                        console.log("Nombre actualizado correctamente:", nombre);
                        console.log("Usuario actualizado:", user);
                    }).catch((error) => {
                        // Error al actualizar el perfil
                        console.error("Error al actualizar el nombre:", error);
                    });
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    Alert.alert(`${errorCode}: ${errorMessage}`)
                    // ..
                });
        };

        return (
            <KeyboardAvoidingView behavior='padding' style={globalStyles.container} >
                <Header navigation={this.props.navigation} 
                    title="SingUp" 
                    customStyles={styles.title} // Puedes personalizar los estilos aquí 
                
                
                />

                <View style={globalStyles.form}>
                    <Text style={globalStyles.txtBasic}>Nombre</Text>
                    <View style={globalStyles.input}>
                        <TextInput 
                            style={globalStyles.txtInput}
                            onChangeText={nombre =>
                                this.setState({nombre})}
                        ></TextInput>
                    </View>

                    <Text style={globalStyles.txtBasic}>Correo Institucional</Text>
                    <View style={globalStyles.input}>
                        <TextInput 
                            style={globalStyles.txtInput}
                            onChangeText={correo =>
                                this.setState({correo})}
                            placeholder='Email'
                            autoCapitalize='none'
                            inputMode='email'
                        ></TextInput>
                    </View>

                    <Text style={globalStyles.txtBasic}>Contraseña</Text>
                    <View style={globalStyles.input}>
                        <TextInput 
                            style={globalStyles.txtInput}
                            onChangeText={password =>
                                this.setState({password})}
                            placeholder='Password'
                            secureTextEntry={true}
                        ></TextInput>
                    </View>

                    <Text style={globalStyles.txtBasic}>Confirmar Contraseña</Text>
                    <View style={globalStyles.input}>
                        <TextInput style={globalStyles.txtInput}></TextInput>
                    </View>

                    {   // Codigo de carga para esperar respuesta del servidor
                        this.state.loading ? (<ActivityIndicator size={'large'} color={'#33BD78'}/>) :
                        (
                            <TouchableOpacity onPress={createUser}>
                                <View style={globalStyles.boton}>
                                    <Text style={globalStyles.txtBoton}>Crear cuenta</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }
                </View>
            </KeyboardAvoidingView>      
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