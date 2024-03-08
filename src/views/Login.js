import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert} from 'react-native'
import React, { useState } from 'react';
import Header from '../components/Header';
import {globalStyles} from '../../globalStyles';
// firebase
import { FIREBASE_AUTH } from '../../Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';


const Login = ({ navigation }) => {
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const clickIniciarSesion = async () => {
        // let loading = this.state.loading;
        // loading = true;
        // let correo = this.state.correo;
        // let password = this.state.password;
        // let auth = this.state.auth;

        signInWithEmailAndPassword(auth, correo, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user.displayName);
                console.log(user);
                navigation.navigate('Publicaciones');
                // ...
            })
            .catch((error) => {
                const errorMessage = error.message;
                Alert.alert(`${errorMessage}`)
            });
        }
        return (
            <SafeAreaView>
                <View>
                    <Header navigation={navigation} 
                        title="Login" 
                        customStyles={styles.title} // Puedes personalizar los estilos aquí 
                        />
        
                    <View style={globalStyles.form}>
                        <Text style={globalStyles.txtBasic}>Correo Institucional</Text>
                        <View style={globalStyles.input}>
                            <TextInput 
                                style={globalStyles.txtInput}
                                onChangeText={(correo) => setCorreo(correo)}
                                placeholder='Email'
                                autoCapitalize='none'
                                inputMode='email'
                            ></TextInput>
                        </View>
            
                        <Text style={globalStyles.txtBasic}>Contraseña</Text>
                        <View style={globalStyles.input}>
                            <TextInput 
                                style={globalStyles.txtInput}
                                onChangeText={(password) => setPassword(password)}
                                placeholder='Password'
                                secureTextEntry={true}
                            ></TextInput>
                        </View>

                        {   // Codigo de carga para esperar respuesta del servidor
                            loading ? (<ActivityIndicator size={'large'} color={'#33BD78'}/>) :
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
            </SafeAreaView>
        )
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

export default Login;