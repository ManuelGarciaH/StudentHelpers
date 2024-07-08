import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { globalStyles } from '../../globalStyles';
import { TextInput } from 'react-native-paper';
import { Controller, useForm } from 'react-hook-form';
import ImagePicker from 'react-native-image-crop-picker';
import { getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";
import { FIREBASE_DB } from '../../Firebase';
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";

const EditProfile = ({navigation, route}) => {
  const { handleSubmit, control, reset, setValue, getValues, formState: { errors }, trigger } = useForm();
  const userData = getAuth().currentUser
  const [imageUri, setImageUri] = useState(userData.photoURL || null);
  const storage = getStorage();
  const {description, id, carrer} = route.params
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    setValue("name", userData.displayName)
    trigger("name")
    if(description){
      setValue("description", description)
      trigger("description")
      setValue("carrera", carrer)
      trigger("carrera")
      setUpdate(true)
    }
  }, [])
  // Función para abrir el selector de imágenes y recortar
  const openImagePicker = () => {
    ImagePicker.openPicker({
      width: 120,
      height: 120,
      cropping: true // Habilita el recorte
    }).then(image => {
      setImageUri(image.path); // Guarda la URI de la imagen recortada en el estado
    }).catch(error => {
      console.log(error);
    });
  };

  const uploadImageToFirebase = async () => {
    if (!imageUri || imageUri=="null") return;
        const storageRef = ref(storage, `profilePictures/${userData.uid}/ProfilePicture_0`);

        const response = await fetch(imageUri);
        const blob = await response.blob();
        // Subir la imagen a Firebase Storage
        await uploadBytes(storageRef, blob);
    try {
      const downloadURL = await getDownloadURL(storageRef);
      setValue("image", downloadURL); 
      trigger("image");
      return downloadURL;
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'La imagen no se pudo subir. Inténtalo de nuevo.');
      return null;
    } finally {

    }
  };
  const updatePhotoURL = async (photoURL) => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
        photoURL: photoURL
    }).then(() => {
        // Profile updated!
        console.log("Actualizado")
        // ...
    }).catch((error) => {
        // An error occurred
        console.log("Error")
        // ...
    });
  };

  updateData = async(data) =>{
    if (Object.keys(errors).length === 0) {
      const newData = { description: data.description, id_usuario: userData.uid, url_foto: getValues("image"), nombre: data.name, carrer: data.carrera};
      if(update){
        const usuariosDocs = collection(FIREBASE_DB, 'usuarios');
        const docRef = doc(usuariosDocs, id);
        await updateDoc(docRef, {
          ...newData,
          description: newData.description  // Asegúrate de actualizar el título
        });
      }else{
        await addDoc(collection(FIREBASE_DB, 'usuarios'), newData);
      }
      reset();
  } else {
      console.log(errors);
  }
  }

  const onSubmit = async (data) => {
    const photoURL = await uploadImageToFirebase();
    await updatePhotoURL(photoURL);
    console.log('Imagen subida exitosamente:');
    await updateData(data)
    navigation.goBack();
  };
  return (
    <View style={globalStyles.mainContainer}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <Text style={styles.textActual}>Nombre</Text>
        <Controller
          name="name"
          control={control}
          rules={{ 
            required: "Campo requerido",
            pattern: {
                value: /([A-Z][a-z])*/,
                message: "El nombre no puede llevar numeros o caracteres especiales"
            }
          }}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
              <>
              <TextInput
                  value={value}
                  onChangeText={(text) => onChange(text)}
                  style={styles.inputName}
              />
              {errors.name && <Text style={globalStyles.errorMessage}>{errors.name.message}</Text>}
              {!errors.name && <Text style={globalStyles.showInfoSelected}></Text>}
              </>
          )}
        />
        <Text style={styles.textActual}>Descripción</Text>
        <Controller
          name="description"
          control={control}
          rules={{ 
              required: "Campo requerido",
              maxLength:{
              value: 310,
              message: "La descripción no pueden pasar de 310 caracteres"
              },
              minLength:{
              value: 5,
              message: "La descripción debe contener al menos 5 caracteres"
              }
          }}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
              <>
              <TextInput multiline={true} numberOfLines={6}
                  value={value}
                  onChangeText={(text) => onChange(text)}
                  style={styles.inputDecription}
              />
              {errors.description && <Text style={globalStyles.errorMessage}>{errors.description.message}</Text>}
              {!errors.description && <Text style={globalStyles.showInfoSelected}></Text>}
              </>
          )}
        />
        <Text style={styles.textActual}>Carrera</Text>
        <Controller
          name="carrera"
          control={control}
          rules={{ 
            required: "Campo requerido",
            maxLength:{
            value: 50,
            message: "La carrera no pueden pasar de 50 caracteres"
            },
            minLength:{
            value: 5,
            message: "La carrera debe contener al menos 5 caracteres"
            }
          }}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
              <>
              <TextInput
                  value={value}
                  onChangeText={(text) => onChange(text)}
                  style={styles.inputName}
              />
              {errors.carrera && <Text style={globalStyles.errorMessage}>{errors.carrera.message}</Text>}
              {!errors.carrera && <Text style={globalStyles.showInfoSelected}></Text>}
              </>
          )}
        />
        <Text style={styles.textActual}>Foto de perfil</Text>
        {(imageUri && imageUri!="null") ? (
          <>
            <Image source={{ uri: imageUri }} style={styles.imagePreview} />
          </>
        ): (
          <>
            <Image source={require("../../Img/Sin-foto-Perfil.png")} style={styles.imagePreview}/>
          </>
        )}
        <View style={{marginVertical:3}}></View>
        <Button color="#0ABEDC" title='Seleccionar Foto' onPress={openImagePicker}></Button>
        <View style={{marginVertical:5}}></View>

        <Button color="#0ABEDC" title='Actualizar Información' onPress={handleSubmit(onSubmit)}></Button>
        <View style={{marginVertical:4}}></View>
      </ScrollView>
    </View>
  )
}

styles = StyleSheet.create({
  inputDecription:{
      marginTop: 5,
      width: "100%",
  },
  inputName:{
      marginTop: 5,
      width: "100%",
  },
  imagePreview: {
    width: 240,
    height: 240,
    marginTop: 10,
    alignSelf: "center",
  },
  textActual:{
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    width:"95%",
  },
  dataActual:{
    fontSize: 14,
    fontWeight: "bold",
    width:"95%",
    marginBottom: "1%"
  },
  button: {
    padding: 10,
    elevation: 2,
    marginLeft: 20,
    marginRight: 10,
    backgroundColor: '#0ABEDC',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scrollView:{
    // borderWidth: 4,
    // marginTop: 5,
    flex: 1,
    padding: 6,
  },
})

export default EditProfile