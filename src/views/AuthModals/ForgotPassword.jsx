import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {globalStyles} from '../../../globalStyles';
// firebase
import {FIREBASE_AUTH} from '../../../Firebase';
import {sendPasswordResetEmail} from 'firebase/auth';
import {SafeAreaView} from 'react-native-safe-area-context';

const ForgotPassword = () => {
  const [correo, setCorreo] = useState('');

  const recoveryEmail = async () => {
    sendPasswordResetEmail(FIREBASE_AUTH, correo)
      .then(Response => {
        console.log(Response);
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
      });
  };

  return (
    <SafeAreaView>
      <View style={[globalStyles.form]}>
        <Text style={styles.title}>Restablecer tu contraseña</Text>
        <Text style={styles.txt}>
          Ingresa la dirección de corrreo electrónico que usas para
          StudentHelpers, y te enviaremos un enlace para restablecer la
          contraseña.
        </Text>

        <Text style={globalStyles.txtBasic}>Correo Institucional</Text>
        <View style={globalStyles.input}>
          <TextInput
            style={globalStyles.txtInput}
            onChangeText={correo => setCorreo(correo)}
            autoCapitalize="none"
            inputMode="email"></TextInput>
        </View>

        <TouchableOpacity
          style={{alignSelf: 'center'}} onPress={recoveryEmail}>
          <View style={globalStyles.boton}>
            <Text style={globalStyles.txtBoton}>Enviar</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  title: {
    //Titulo de la ventana
    fontSize: 20,
    padding: 5,
    textAlign: 'center',
    color: '#575757',
    fontWeight: 'bold',
  },
  txt: {
    color: '#575757',

    padding: 5,
  },
});
