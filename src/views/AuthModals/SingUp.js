import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {globalStyles} from '../../../globalStyles';
import validErrorCodes from '../../helpers/errorCodes';
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';
// firebase
import {FIREBASE_AUTH, FIREBASE_DB} from '../../../Firebase';
// firebase authentication
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
// firebase storege and store
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import {collection, addDoc } from 'firebase/firestore';

import {Controller, useForm} from 'react-hook-form';
import PasswordInput from '../../components/PasswordInput';
import LabelInfo from '../../components/LabelInfo';
import ImagePicker from 'react-native-image-crop-picker';

const SingUp = ({navigation}) => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const storage = getStorage();
  const [imageUri, setImageUri] = useState(null);
  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: {errors},
    trigger,
  } = useForm();

  const createUser = async data => {
    console.log(data);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        correo,
        password,
      );
      const user = userCredential.user;

      const photoURL = await uploadImageToFirebase(user.uid);
      console.log(photoURL);
      await updateProfile(user, {
        displayName: nombre,
        photoURL: photoURL,
      });
      await updateData(data, user.uid, photoURL)

      // Actualización de perfil exitosa
      console.log('Usuario agregado:', user);
    } catch (error) {
      console.error('Error al crear usuario o actualizar el perfil:', error);
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error al crear usuario o el perfil',
        textBody: validErrorCodes(error.code),
        autoClose: 3000,
      });
    }
  };

  updateData = async (data, userId, photoURL) => {
    console.log(data);
    const newData = {
      description: data.descripcion || null,
      id_usuario: userId,
      url_foto: photoURL || null,
      nombre: data.nombre,
      carrer: data.carrera || null,
    };
    const docRef = await addDoc(collection(FIREBASE_DB, 'usuarios'), newData);
    console.log('Documento añadido exitosamente:', docRef);
  };

  const uploadImageToFirebase = async id => {
    if (!imageUri || imageUri == null) return null;
    const storageRef = ref(storage, `profilePictures/${id}/ProfilePicture_0`);

    const response = await fetch(imageUri);
    const blob = await response.blob();
    // Subir la imagen a Firebase Storage
    await uploadBytes(storageRef, blob);
    try {
      const downloadURL = await getDownloadURL(storageRef);
      setValue('image', downloadURL);
      trigger('image');
      return downloadURL;
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'La imagen no se pudo subir. Inténtalo de nuevo.');
      return null;
    }
  };

  // Función para abrir el selector de imágenes y recortar
  const openImagePicker = () => {
    ImagePicker.openPicker({
      width: 120,
      height: 120,
      cropping: true, // Habilita el recorte
    })
      .then(image => {
        setImageUri(image.path); // Guarda la URI de la imagen recortada en el estado
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={400}
      style={{height: '100%', backgroundColor: '#A7DBCB'}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 420,
          backgroundColor: '#A7DBCB',
        }}>
        <AlertNotificationRoot />
        <View style={globalStyles.form}>
          <Text style={styles.title}>Usuario</Text>

          <Text style={globalStyles.txtBasic}>Nombre</Text>
          <Controller
            name="nombre"
            control={control}
            rules={{
              required: 'Campo requerido',
              pattern: {
                value: /([A-Z][a-z])*/,
                message:
                  'El nombre no puede llevar numeros o caracteres especiales',
              },
            }}
            defaultValue=""
            render={({field: {onChange, value}}) => (
              <>
                <TextInput
                  value={value}
                  onChangeText={text => {
                    onChange(text);
                    setNombre(text);
                  }}
                  style={globalStyles.input}
                  placeholder="Nombre"
                />
                {errors.nombre && (
                  <Text style={styles.error}>{errors.nombre.message}</Text>
                )}
              </>
            )}
          />

          <Text style={globalStyles.txtBasic}>Correo Institucional</Text>
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Campo requerido',
              pattern: {
                value: /^[a-z]+\.[a-z]+\d{4}?@(alumnos|academicos)\.udg\.mx$/,
                message: 'El correo debe ser un correo de alumnos o academicos',
              },
            }}
            defaultValue=""
            render={({field: {onChange, value}}) => (
              <>
                <TextInput
                  value={value}
                  onChangeText={text => {
                    onChange(text);
                    setCorreo(text);
                  }}
                  placeholder="correo.ejemplo1234@alumnos.udg.mx"
                  inputMode="email"
                  style={globalStyles.input}
                />
                {errors.email && (
                  <Text style={styles.error}>{errors.email.message}</Text>
                )}
              </>
            )}
          />

          <Text style={globalStyles.txtBasic}>Contraseña</Text>
          <Controller
            name="password"
            control={control}
            rules={{
              required: 'Campo requerido',
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                message: 'Requiere una mayuscula, una minuscula y un numero',
              },
              minLength: {
                value: 8,
                message: 'La contraseña debe ser de al menos 8 caracteres',
              },
            }}
            defaultValue=""
            render={({field: {onChange, value}}) => (
              <>
                <PasswordInput
                  value={value}
                  onChangeText={text => {
                    onChange(text);
                    setPassword(text);
                  }}
                  placeholder="Ejemplo1"
                />
                {errors.password && (
                  <Text style={styles.error}>{errors.password.message}</Text>
                )}
              </>
            )}
          />

          <Text style={globalStyles.txtBasic}>Confirmar Contraseña</Text>
          <Controller
            name="validPassword"
            control={control}
            rules={{
              required: 'Campo requerido',
              pattern: {
                value: new RegExp(password),
                message: 'Las contraseñas no coinciden',
              },
            }}
            defaultValue=""
            render={({field: {onChange, value}}) => (
              <>
                <PasswordInput
                  value={value}
                  onChangeText={text => onChange(text)}
                />
                {errors.validPassword && (
                  <Text style={styles.error}>
                    {errors.validPassword.message}
                  </Text>
                )}
              </>
            )}
          />

          <View style={styles.padding}>
            <Text style={styles.title}>Perfil</Text>
          </View>

          <LabelInfo
            value={'Carrera'}
            message={
              'No es obligartorio agregar tu carrera pero le daras más\n' +
              'confianza a los compradores y vendedores de interactuar contigo.'
            }
          />
          <Controller
            name="carrera"
            control={control}
            rules={{
              maxLength: {
                value: 50,
                message: 'La carrera no pueden pasar de 50 caracteres',
              },
              minLength: {
                value: 4,
                message: 'La carrera debe contener al menos 5 caracteres',
              },
            }}
            defaultValue=""
            render={({field: {onChange, value}}) => (
              <>
                <TextInput
                  value={value}
                  onChangeText={text => onChange(text)}
                  style={globalStyles.input}
                />
                {errors.carrera && (
                  <Text style={styles.error}>{errors.carrera.message}</Text>
                )}
                {!errors.carrera && <Text style={styles.error}></Text>}
              </>
            )}
          />

          <LabelInfo
            value={'Descripción'}
            message={
              'No es obligartorio agregar tu descripción pero le daras más\n' +
              'confianza a los compradores y vendedores de interactuar contigo.'
            }
          />
          <Controller
            name="descripcion"
            control={control}
            rules={{
              maxLength: {
                value: 310,
                message: 'La descripción no pueden pasar de 310 caracteres',
              },
              minLength: {
                value: 5,
                message: 'La descripción debe contener al menos 5 caracteres',
              },
            }}
            defaultValue=""
            render={({field: {onChange, value}}) => (
              <>
                <TextInput
                  value={value}
                  multiline={true}
                  numberOfLines={6}
                  onChangeText={text => onChange(text)}
                  style={globalStyles.input}
                />
                {errors.carrera && (
                  <Text style={styles.error}>{errors.carrera.message}</Text>
                )}
                {!errors.carrera && <Text style={styles.error}></Text>}
              </>
            )}
          />
          <LabelInfo
            value={'Foto de perfil'}
            message={
              'No es obligartorio agregar tu foto pero le daras más\n' +
              'confianza a los compradores y vendedores de interactuar contigo.'
            }
          />
          <View style={globalStyles.centrar}>
            <TouchableOpacity style={{width: 260}} onPress={openImagePicker}>
              {imageUri != null ? (
                <>
                  <Image source={{uri: imageUri}} style={styles.imagePreview} />
                </>
              ) : (
                <>
                  <Image
                    source={require('../../../Img/Sin-foto-Perfil.png')}
                    style={styles.imagePreview}
                  />
                </>
              )}
            </TouchableOpacity>
          </View>
          <View style={{marginVertical: 3}}></View>

          {
            // Codigo de carga para esperar respuesta del servidor
            loading ? (
              <ActivityIndicator size={'large'} color={'#33BD78'} />
            ) : (
              <TouchableOpacity
                onPress={handleSubmit(createUser)}
                style={globalStyles.centrar}>
                <View style={globalStyles.boton}>
                  <Text style={globalStyles.txtBoton}>Crear cuenta</Text>
                </View>
              </TouchableOpacity>
            )
          }
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  title: {
    //Titulo de la ventana
    fontSize: 20,
    padding: 3,
    textAlign: 'center',
    color: '#575757',
    fontWeight: 'bold',
  },
  padding: {
    padding: 15,
  },
  error: {
    color: 'red',
  },
  scrollView: {
    flex: 1,
  },
  imagePreview: {
    width: 240,
    height: 240,
    marginTop: 10,
    alignSelf: 'center',
  },
  infoText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoButton: {
    padding: 5,
    paddingTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SingUp;
