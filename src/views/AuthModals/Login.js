import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert} from 'react-native'
import React, { useState } from 'react';
import Header from '../../components/Header';
import {globalStyles} from '../../../globalStyles';
// firebase
import { FIREBASE_AUTH } from '../../../Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import PasswordInput from '../../components/PasswordInput';


const Login = ({ navigation }) => {
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const clickIniciarSesion = async () => {
        signInWithEmailAndPassword(FIREBASE_AUTH, correo, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                navigation.navigate('TabNavigator');
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
        
                    <View style={[globalStyles.form, ]}>
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
                            <PasswordInput
                                onChangeText={(password) => setPassword(password)}
                                placeholder='Password'
                            />
                        </View>

                        {   // Codigo de carga para esperar respuesta del servidor
                            loading ? (<ActivityIndicator size={'large'} color={'#33BD78'}/>) :
                            (
                                <TouchableOpacity onPress={clickIniciarSesion} style={{alignSelf: "center"}}>
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