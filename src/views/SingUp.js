import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert} from 'react-native'
import React, { Component } from 'react'
import Header from '../components/Header';
import {globalStyles} from '../../globalStyles';
// firebase
import { FIREBASE_AUTH } from '../../Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_DB } from '../../Firebase';
import { addDoc, collection } from "firebase/firestore";

export default class SingUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            nombre: '',
            correo: '',
            password: '',
            loading: false,
            auth: FIREBASE_AUTH,
            db: FIREBASE_DB
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
            let db = this.state.db;             //Firebase base de datos
            //console.log(nombre, correo, password)

            try {
                await createUserWithEmailAndPassword(auth, correo, password);
                const respuesta = await addDoc(collection(db, 'usuarios'),{
                    Nombre: nombre,
                    Email: correo,
                    Carrera: "INCO" 
                });
                console.log(respuesta.id);
                Alert.alert('Usuario creado.');
                this.props.navigation.navigate('Inicio');
            } catch (error) {
                Alert.alert(error.message);
                console.log(error.message)
            } finally{
                loading = false;
            }
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