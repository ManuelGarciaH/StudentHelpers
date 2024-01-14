import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert} from 'react-native'
import React, { Component } from 'react'
import Header from '../components/Header';
import {globalStyles} from '../../globalStyles';
import { FIREBASE_AUTH } from '../../Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            correo: '',
            password: '',
            loading: false,
            auth: FIREBASE_AUTH,
        };
    }
    render() {
        const clickIniciarSesion= async () => {
            let loading = this.state.loading;
            loading = true;
            let nombre = this.state.nombre;
            let correo = this.state.correo;
            let password = this.state.password;
            let auth = this.state.auth;
            console.log(nombre, correo, password)

            try {
                const respuesta = await signInWithEmailAndPassword(auth, correo, password);
                console.log(respuesta);
                this.props.navigation.navigate('Publicaciones');
            } catch (error) {
                Alert.alert(error.message);
            } finally{
                loading = false;
            }
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

                    {   // Codigo de carga para esperar respuesta del servidor
                        this.state.loading ? (<ActivityIndicator size={'large'} color={'#33BD78'}/>) :
                        (
                            <TouchableOpacity onPress={clickIniciarSesion}>
                                <View style={globalStyles.boton}>
                                    <Text style={globalStyles.txtBoton}>Iniciar Sesión</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }
        
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