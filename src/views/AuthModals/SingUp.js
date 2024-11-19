import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  Modal,
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
import {createUserWithEmailAndPassword, updateProfile, sendEmailVerification} from 'firebase/auth';
// firebase storege and store
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import {collection, addDoc } from 'firebase/firestore';

import {Controller, useForm} from 'react-hook-form';
import PasswordInput from '../../components/PasswordInput';
import LabelInfo from '../../components/LabelInfo';
import ImagePicker from 'react-native-image-crop-picker';

const SingUp = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
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


  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

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
      await sendEmailVerification(user);
      console.log('Usuario agregado:', user);
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Usuario creado con exito',
        textBody: 'Recibiras un correo para validar tu correo institucional.',
        autoClose: 3000,
      });
      setTimeout (() => {navigation.navigate('Login');}, 4000);
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
              <><TouchableOpacity
                  onPress={handleSubmit(createUser)}
                  style={globalStyles.centrar}>
                  <View style={globalStyles.boton}>
                    <Text style={globalStyles.txtBoton}>Crear cuenta</Text>
                  </View>
                </TouchableOpacity>
                  <Text style={styles.termsText}>
                    Al presionar el boton "Crear Cuenta" satisfactoriamente acepto los{' '}
                    <Text style={styles.linkText} onPress={toggleModal}>
                      Terminos y Condiciones de Uso de la aplicacion Student Helpers
                    </Text>
                  </Text></>
            )
          }
          <Modal
            visible={modalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={toggleModal}
            style={styles.modalContainer}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Políticas de Privacidad y Condiciones de Uso Student Helpers</Text>
                <ScrollView>
                  <Text style={globalStyles.txtBasic}>1. Recopilación de Datos Personales</Text>
                  <Text style={styles.modalText}>•	Ubicación: La aplicación recopilará la ubicación geográfica del dispositivo del usuario con el consentimiento explícito, para ofrecer funcionalidades personalizadas como servicios locales o recomendaciones basadas en el lugar donde se encuentren. Esta información será tratada conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP).</Text>
                  <Text style={styles.modalText}>•	Datos generales: Además de la información personal básica (nombre, correo electrónico, número de teléfono), la aplicación podrá solicitar datos escolares como nombre de la institución educativa, necesarios para la correcta operación de los servicios ofrecidos.</Text>
                  <Text style={styles.modalText}>•	Datos sensibles: En caso de que la aplicación recoja datos sensibles, como información sobre salud, será con el consentimiento expreso del usuario, y estos datos serán manejados con las más altas medidas de seguridad y confidencialidad.</Text>
                  <Text style={globalStyles.txtBasic}>2. Uso de la Información</Text>
                  <Text style={styles.modalText}>•	Ubicación: Se utilizará para optimizar la experiencia de usuario en la aplicación y ofrecer servicios que requieran la localización, como georreferenciación de rutas, mapas, servicios de emergencia, y recomendaciones personalizadas.</Text>
                  <Text style={styles.modalText}>•	Datos generales y escolares: Los datos personales y escolares se utilizarán para personalizar el contenido y garantizar la entrega correcta de los servicios solicitados. Estos datos también pueden ser utilizados para informes estadísticos o para mejorar la oferta educativa, siempre anonimizando los datos de los usuarios.</Text>
                  <Text style={globalStyles.txtBasic}>3. Uso de Imágenes</Text>
                  <Text style={styles.modalText}>•	Propiedad y Derechos de Autor: Los usuarios que suban imágenes garantizan que son los titulares de los derechos de autor o cuentan con las licencias correspondientes para utilizarlas. Al subir contenido, el usuario otorga una licencia no exclusiva, mundial y sin royalties a la aplicación para su uso, publicación, modificación y distribución dentro del ámbito de la plataforma.</Text>
                  <Text style={styles.modalText}>•	Derecho de Autor y Propiedad Intelectual: La aplicación se compromete a respetar los derechos de autor conforme a la Ley Federal del Derecho de Autor en México. Cualquier contenido que infrinja estos derechos será eliminado previa revisión, y el usuario será notificado de la decisión.</Text>
                  <Text style={styles.modalText}>•	Takedown Notice: En caso de reclamos de derechos de autor, la aplicación tiene un procedimiento para recibir solicitudes de eliminación de contenido bajo el principio de "notice and takedown". Si una tercera parte considera que su propiedad intelectual ha sido infringida, podrá reportar el contenido y este será revisado para su posible eliminación.</Text>
                  <Text style={globalStyles.txtBasic}>4. Transmisión y Almacenamiento de Datos</Text>
                  <Text style={styles.modalText}>•	Los datos recopilados por la aplicación serán almacenados en servidores ubicados en México o en otros países, siempre garantizando que las jurisdicciones receptoras cuenten con normativas equivalentes o superiores a la protección ofrecida por la LFPDPPP. La transmisión internacional de datos solo se realizará con consentimiento expreso del usuario, salvo excepciones legales.</Text>
                  <Text style={globalStyles.txtBasic}>5. Política de Cookies y Tecnologías de Rastreo</Text>
                  <Text style={styles.modalText}>•	La aplicación utiliza cookies y otras tecnologías de rastreo para mejorar la experiencia del usuario y ofrecer publicidad personalizada. El usuario podrá gestionar sus preferencias sobre el uso de cookies desde las opciones de configuración de la aplicación.</Text>
                  <Text style={styles.modalText}>•	Publicidad basada en la localización: La aplicación puede mostrar anuncios personalizados basados en la ubicación y otros datos, siempre y cuando el usuario haya dado su consentimiento previo y explícito para el uso de sus datos con fines publicitarios.</Text>
                  <Text style={globalStyles.txtBasic}>6. Medidas de Seguridad</Text>
                  <Text style={styles.modalText}>•	La aplicación implementa medidas de seguridad físicas, electrónicas y administrativas conforme a lo dispuesto por la LFPDPPP para proteger la integridad y confidencialidad de los datos personales de los usuarios. Se realizan auditorías periódicas para garantizar la seguridad de la información.</Text>
                  <Text style={styles.modalText}>•	Notificación de Violaciones de Seguridad: En caso de violación de seguridad que afecte la confidencialidad o integridad de los datos personales, la aplicación notificará a los usuarios y a las autoridades competentes en un plazo máximo de 72 horas desde que se detecte la incidencia.</Text>
                  <Text style={globalStyles.txtBasic}>7. Consentimiento para Menores de Edad</Text>
                  <Text style={styles.modalText}>•	Si el usuario es menor de 18 años, deberá contar con el consentimiento de sus padres o tutores para utilizar la aplicación y compartir sus datos personales, conforme a la Ley General de los Derechos de Niñas, Niños y Adolescentes. La aplicación podrá solicitar información para verificar la edad del usuario antes de permitir el registro.</Text>
                  <Text style={globalStyles.txtBasic}>8. Modificaciones a las Políticas</Text>
                  <Text style={styles.modalText}>•	Estas políticas pueden ser modificadas para adaptarse a cambios en la legislación mexicana o en la operación de la aplicación. Los usuarios serán informados de cualquier cambio importante mediante notificaciones en la aplicación y tendrán la oportunidad de revisar las nuevas políticas antes de continuar utilizando el servicio.</Text>
                  <Text style={globalStyles.txtBasic}>9. Jurisdicción y Ley Aplicable</Text>
                  <Text style={styles.modalText}>•	Cualquier controversia que surja en relación con estas políticas o el uso de la aplicación será resuelta conforme a las leyes de México. Los tribunales de la Ciudad de México serán competentes para resolver cualquier disputa relacionada con las políticas de privacidad y condiciones de uso.</Text>          
                </ScrollView>
                <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>Cerrar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>          
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
  termsText: {
    marginTop: 10,
    textAlign: 'justify',
    color: '#000',
  },
  linkText: {
    color: '#33BD78',
    textDecorationLine: 'underline',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '100%', 
    height: '85%', 
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000'
    
  },
  modalText: {
    fontSize: 16,
    textAlign: 'justify',
    color: '#000'
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#33BD78',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SingUp;
