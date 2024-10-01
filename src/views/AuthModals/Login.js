import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert} from 'react-native'
import React, { useState } from 'react';
import {globalStyles} from '../../../globalStyles';
import validErrorCodes from '../../helpers/errorCodes';
import { ALERT_TYPE, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
// firebase
import { FIREBASE_AUTH } from '../../../Firebase';
import { signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import PasswordInput from '../../components/PasswordInput';


const Login = ({ navigation }) => {
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const ForgotPassword = () => navigation.navigate('ForgotPassword');

    const clickIniciarSesion = async () => {
        
        signInWithEmailAndPassword(FIREBASE_AUTH, correo, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                setUser(user)
                if (user.emailVerified) {
                    const userData = {
                        uid: user.uid,
                        email: user.email,
                        photoURL: user.photoURL,
                        displayName: user.displayName,
                        // Agrega aquí cualquier otro dato que necesites y sea serializable
                      };
                    navigation.navigate('TabNavigator',  {userData: userData });
                    // navigation.navigate('Inside', {
                    //     screen: 'TabNavigator',
                    //     params: {userData: userData },
                    // });
                      

                      
                }else{
                    Toast.show({
                        type: ALERT_TYPE.DANGER,
                        title: 'Log-in fallido',
                        textBody: 'Tu correo institucional no ha sido verficado, por favor revisa tus correos.',
                        autoClose: 3000,
                      })
                      setTimeout (() => {navigation.navigate('Login');}, 4000);
                }
            })
            .catch((error) => {
                Toast.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Log-in fallido',
                    textBody: validErrorCodes(error.code),
                    autoClose: 3000,
                  })
            });
        }
    
    const resendVerification = async () =>  {
        if(user){
            await sendEmailVerification(user)
            Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Email enviado',
                textBody: 'Un correo de verificación ha sido enviado a tu cuenta.',
                autoClose: 3000,
            })
            setTimeout (() => {navigation.navigate('Login');}, 4000);
        }
    }
        return (
            <SafeAreaView>
                <AlertNotificationRoot/>
                <View style={[globalStyles.form, ]}>
                    <Text style={globalStyles.txtBasic}>Correo Institucional</Text>
                    <View style={globalStyles.input}>
                        <TextInput 
                            style={globalStyles.txtInput}
                            onChangeText={(correo) => setCorreo(correo)}
                            autoCapitalize='none'
                            inputMode='email'
                        ></TextInput>
                    </View>
        
                    <Text style={globalStyles.txtBasic}>Contraseña</Text>
                    <View style={globalStyles.input}>
                        <PasswordInput
                            onChangeText={(password) => setPassword(password)}
                        />
                    </View>

                    <View style={[globalStyles.centrar, styles.padding]}>
                        <TouchableOpacity onPress={ForgotPassword} >
                            <Text style={styles.link}>¿Olvidaste tu constraseña?</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        user && !user.emailVerified &&
                        <TouchableOpacity onPress={resendVerification} style={{alignSelf: "center"}}>
                            <Text style={{color: '#33BD78', fontWeight: 'bold', fontSize: 15}}>Reenviar correo de verificación</Text>
                        </TouchableOpacity>
                    }

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
    padding:{
        paddingTop: 5,
    },
    link:{
        color: '#575757',
        fontWeight: 'bold',
    },
    disable:{
        color: '#070707',
        fontWeight: 'bold',
    }
});

export default Login;