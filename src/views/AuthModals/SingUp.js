import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert, Platform} from 'react-native'
import React, { useState } from 'react';
import {globalStyles} from '../../../globalStyles';
// firebase
import { FIREBASE_AUTH } from '../../../Firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Controller, useForm } from 'react-hook-form';
import PasswordInput from '../../components/PasswordInput';

const SingUp = ({ navigation }) => {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { handleSubmit, control, getValues, setValue, formState: { errors }, trigger } = useForm();

    const createUser = async () => {
        createUserWithEmailAndPassword(FIREBASE_AUTH, correo, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
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
        <KeyboardAvoidingView 
            behavior='padding'
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
            style={{flex: 1}}
        >

            <View style={globalStyles.form}>
                <Text style={globalStyles.txtBasic}>Nombre</Text>
                <Controller
                    name = 'nombre'
                    control={control}
                    rules={{ 
                        required: "Campo requerido",
                        pattern: {
                            value: /[A-Z][a-z]+\s(?:[A-Z][a-z]+\s)*[A-Z][a-z]+$/,
                            message: "Nombre completo o primer nombre y apellido empezando por mayusculas"
                        }
                    }}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                        <>
                            <TextInput 
                                value={value}
                                onChangeText={(text) => {
                                    onChange(text)
                                    setNombre(text)
                                }}
                                style={globalStyles.input}
                                placeholder='Nombre'
                            />
                            {errors.nombre && <Text style={{ color: 'red' }}>{errors.nombre.message}</Text>}
                        </>
                    )}
                />

                <Text style={globalStyles.txtBasic}>Correo Institucional</Text>
                <Controller
                    name = 'email'
                    control={control}
                    rules={{ 
                        required: "Campo requerido",
                        pattern: {
                            value: /^[a-z]+\.[a-z]+\d{4}@alumnos\.udg\.mx$/,
                            message: "El correo debe ser un correo instucional de la udg"
                        }
                    }}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                        <>
                            <TextInput 
                                value={value}
                                onChangeText={(text) => {
                                    onChange(text)
                                    setCorreo(text)
                                }}
                                placeholder='correo.ejemplo1234@alumnos.udg.mx'
                                inputMode='email'
                                style={globalStyles.input}
                            />
                            {errors.email && <Text style={{ color: 'red' }}>{errors.email.message}</Text>}
                        </>
                    )}
                />

                <Text style={globalStyles.txtBasic}>Contraseña</Text>
                <Controller
                    name = 'password'
                    control={control}
                    rules={{ 
                        required: "Campo requerido",
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                            message: "Requiere una mayuscula, una minuscula y un numero"
                        },
                        minLength: {
                            value: 8,
                            message: "La contraseña debe ser de al menos 8 caracteres"
                        }
                    }}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                        <>
                            <PasswordInput
                                value={value}
                                onChangeText={(text) => {
                                    onChange(text)
                                    setPassword(text)
                                }}
                                placeholder='Ejemplo1'
                            />
                            {errors.password && <Text style={{ color: 'red' }}>{errors.password.message}</Text>}
                        </>
                    )}
                />

                <Text style={globalStyles.txtBasic}>Confirmar Contraseña</Text>
                <Controller
                    name = 'validPassword'
                    control={control}
                    rules={{ 
                        required: "Campo requerido",
                        pattern: {
                            value: new RegExp(password),
                            message: "Las contraseñas no coinciden"
                        }
                    }}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                        <>
                            <PasswordInput
                                value={value}
                                onChangeText={(text) => onChange(text)}
                            />
                            {errors.validPassword && <Text style={{ color: 'red' }}>{errors.validPassword.message}</Text>}
                        </>
                    )}
                />

                {   // Codigo de carga para esperar respuesta del servidor
                    loading ? (<ActivityIndicator size={'large'} color={'#33BD78'}/>) :
                    (
                        <TouchableOpacity onPress={handleSubmit(createUser)} style={globalStyles.centrar} >
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

  export default SingUp;