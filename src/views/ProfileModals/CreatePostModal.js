import React, {useState} from 'react';
import { Modal, View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Button, TextInput} from 'react-native-paper';
import { globalStyles } from '../../../globalStyles';
import { FIREBASE_DB } from '../../../Firebase';
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import Icon from 'react-native-vector-icons/FontAwesome';

import ScheduleButton from './ScheduleButton';
import LocationButton from './LocationButton';
import DaysButton from './DaysButton'
import ContactButton from './ContactButton';
import ImageButton from './ImageButton';
import TravelRouteButton from './TravelRouteButton';
import ModalLoading from '../../components/ModalLoading';

const CreatePostModal = ({ visible, onClose, userName, id}) => {
    const { handleSubmit, control, reset, setValue, getValues, formState: { errors }, trigger } = useForm();
    const [placeholderAmount, setPlaceholderAmount] = useState("Cantidad");
    const [imageUploaded, setImageUploaded] = useState(false);
    const storage = getStorage();
    const [loading, setLoading] = useState(false)

    // Calcula las horas de inicio y fin límites
    const minTime = new Date();
    minTime.setHours(7, 0, 0); // 7:00 am
    const maxTime = new Date();
    maxTime.setHours(21, 0, 0); // 9:00 pm

    const subirImagenesABaseDeDatos = async (imageUris, title) => {
      try {
        const newImagePaths = [];
        // Iterar sobre cada URI de imagen y subirla a la base de datos
        await Promise.all(
          imageUris.map(async (uri, index) => {
            // Obtener la referencia de almacenamiento para la imagen
            const storageRef = ref(storage, `publicaciones/${userName}/${title}/image_${index}.png`);
    
            // Convertir la imagen a bytes
            const response = await fetch(uri);
            const blob = await response.blob();
    
            // Subir la imagen a Firebase Storage
            await uploadBytes(storageRef, blob);

            // Obtener la URL de descarga de la imagen y agregarla al array
            const downloadURL = await getDownloadURL(storageRef);
            newImagePaths.push(downloadURL);
          })
        );
        console.log("Imágenes subidas exitosamente.");
        return newImagePaths;
      } catch (error) {
        console.error("Error al subir las imágenes:", error);
      }
    };

    const onSubmit = async (data) => {
        setLoading(true)
        if (Object.keys(errors).length === 0) {
            const newImagePaths = await subirImagenesABaseDeDatos(data.image, data.titulo);
            const newData = { ...data, image: newImagePaths, nombreUsuario: userName, id_usuario: id};

            await addDoc(collection(FIREBASE_DB, 'publicaciones'), newData);
            reset();
            onClose();
        } else {
            console.log(errors);
        }
        setLoading(false)
    };

    const onCancel = () => {
      reset(); // Limpiar los datos del formulario
      setPlaceholderAmount("Cantidad");
      onClose();
    };

    // Función para manejar el cambio de categoría
    const handleCategoryChange = (selectedCategory) => {

      setValue("category", selectedCategory); 
      trigger("category");

      if(selectedCategory != "Viaje"){
        setPlaceholderAmount("Cantidad");
      }else{
        setPlaceholderAmount("Cantidad de pasajeros");
      }
    };
  
    return (
      <Modal animationType="fade" transparent={true} visible={visible}
        onRequestClose={() => {
          onClose()
        }}>
        <View style={[globalStyles.centerContainer, {justifyContent: "flex-end"}]}>
          <View style={styles.modalContainer}>
            <Text style={styles.tituloModal}>Crear Publicación</Text>
            <View style={styles.delimitador}></View>
            <ScrollView showsVerticalScrollIndicator={false}>
            {loading && <ModalLoading visible={true}/>}
            <Text style={styles.textModal}>Elige una categoria</Text>
                <Controller
                    name="category"
                    control={control}
                    rules={{ required: "Selecciona una categoria" }}
                    defaultValue=""
                    render={({ field: { value, onChange } }) => (
                      <>
                        <View style={styles.buttonContainer}>
                          <TouchableOpacity onPress={() => handleCategoryChange("Comida")}>
                            <View style={[styles.notSelectedButton, value === 'Comida' && styles.selectedButton]}>
                              <Text style={styles.txtButton}>Comida</Text>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity  onPress={() => handleCategoryChange("Accesorios")}>
                            <View style={[styles.notSelectedButton, value === 'Accesorios' && styles.selectedButton]}>
                              <Text style={styles.txtButton}>Accesorios</Text>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity  onPress={() => handleCategoryChange("Viaje")}>
                            <View style={[styles.notSelectedButton, value === 'Viaje' && styles.selectedButton]}>
                              <Text style={styles.txtButton}>Viaje</Text>
                            </View>
                          </TouchableOpacity>
                        </View>

                        <View style={[styles.buttonContainer, {marginBottom: 5}]}>
                          <TouchableOpacity  onPress={() => handleCategoryChange("Intercambio")}>
                            <View style={[styles.notSelectedButton, value === 'Intercambio' && styles.selectedButton]}>
                              <Text style={styles.txtButton}>Intercambio</Text>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity  onPress={() => handleCategoryChange("Asesorías")}>
                            <View style={[styles.notSelectedButton, value === 'Asesorías' && styles.selectedButton]}>
                              <Text style={styles.txtButton}>Asesorías</Text>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity  onPress={() => handleCategoryChange("Otro")}>
                            <View style={[styles.notSelectedButton, value === 'Otro' && styles.selectedButton]}>
                              <Text style={styles.txtButton}>Otro</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                        {!errors.category && <Text style={styles.textModal}>Opción seleccionada: {value}</Text>}
                        {errors.category && <Text style={globalStyles.errorMessage}>{errors.category.message}</Text>}
                        <View style={[styles.delimitador, {height: 1}]}></View>
                      </>
                    )}
                />
                <Controller
                    name="titulo"
                    control={control}
                    rules={{ 
                      required: "Campo requerido",
                      maxLength:{
                        value: 37,
                        message: "El titulo no puede pasar de 37 caracteres"
                      },
                      minLength:{
                        value: 5,
                        message: "El titulo debe contener al menos 5 caracteres"
                      }
                    }}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                      <>
                        <TextInput
                          value={value}
                          onChangeText={(text) => onChange(text)}
                          placeholder="Titulo"
                          style={{marginTop: 10}}
                        />
                        {errors.titulo && <Text style={globalStyles.errorMessage}>{errors.titulo.message}</Text>}
                        {!errors.titulo && <Text style={globalStyles.showInfoSelected}></Text>}
                        
                      </>
                    )}
                />
                <Controller
                    name="detalles"
                    control={control}
                    rules={{ 
                      required: "Campo requerido",
                      maxLength:{
                        value: 250,
                        message: "Los detalles no pueden pasar de 250 caracteres"
                      },
                      minLength:{
                        value: 5,
                        message: "Los detalles debe contener al menos 5 caracteres"
                      }
                    }}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                      <>
                        <TextInput multiline={true} numberOfLines={3}
                          value={value}
                          onChangeText={(text) => onChange(text)}
                          placeholder="Detalles"
                          style={{marginTop: 10}}
                        />
                        {errors.detalles && <Text style={globalStyles.errorMessage}>{errors.detalles.message}</Text>}
                        {!errors.detalles && <Text style={globalStyles.showInfoSelected}></Text>}
                      </>
                    )}
                />
                {getValues("category") != "Intercambio" ? (
                  <View style={[styles.minMaxCostContainer, {marginTop: 5}]}>
                    <Controller
                        name="costo"
                        control={control}
                        rules={{ required: "Campo requerido", 
                        validate: value => {
                          return /^\d+$/.test(value) || "Ingresa un costo numerico";
                        } }}
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                          <>
                            
                            <View style={styles.costsInputContainer}>
                              
                              <TextInput
                                value={value}
                                onChangeText={(text) => onChange(text)}
                                keyboardType="numeric"
                                placeholder="Costo mínimo"
                              />
                              {errors.costo && <Text style={[globalStyles.errorMessage, {textAlign: "center"}]}>{errors.costo.message}</Text>}
                              {!errors.costo && <Text style={globalStyles.showInfoSelected}></Text>}
                            </View>
                          </>
                        )}
                    />
                    <Controller
                        name="costoMaximo"
                        control={control}
                        rules={{ 
                          required: "Campo requerido", 
                          validate: {
                            isGreaterThanCosto: value => {
                              const costoValue = Number(getValues('costo'));
                              const costoMaximoValue = Number(value);
                              if (costoMaximoValue >= costoValue) {
                                return true;
                              }
                              return "El costo máximo no puede ser menor que el mínimo";
                            },
                            validateCostoMaximo: value => /^\d+$/.test(value) || "Ingresa un costo numérico"
                          }
                        }}
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                          <>
                            <View style={styles.costsInputContainer}>
                              <TextInput keyboardType="numeric"
                                value={value}
                                onChangeText={(text) => onChange(text)}
                                placeholder="Costo maximo"
                              />
                              {errors.costoMaximo && <Text style={[globalStyles.errorMessage, {textAlign: "center"}]}>{errors.costoMaximo.message}</Text>}
                              {!errors.costoMaximo && <Text style={globalStyles.showInfoSelected}></Text>}
                            </View>
                          </>
                        )}
                    />
                  </View>
                ) : (
                  <Controller
                    name="aCambio"
                    control={control}
                    rules={{ 
                      required: "Campo requerido",
                      maxLength:{
                        value: 37,
                        message: "El texto no pueden pasar de 120 caracteres"
                      },
                      minLength:{
                        value: 5,
                        message: "El texto debe contener al menos 5 caracteres"
                      }
                    }}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                      <>
                        <TextInput multiline={true} numberOfLines={3}
                          value={value}
                          onChangeText={(text) => onChange(text)}
                          placeholder="A cambio de"
                          style={{marginTop: 10}}
                        />
                        {errors.aCambio && <Text style={globalStyles.errorMessage}>{errors.aCambio.message}</Text>}
                        {!errors.aCambio && <Text style={globalStyles.showInfoSelected}></Text>}
                      </>
                    )}
                  />
                )}

                <Controller
                    name="cantidad"
                    control={control}
                    rules={{ required: "Campo requerido", 
                      validate: value => {
                        return /^\d+$/.test(value) || "Ingresa una cantidad numerica";
                      } }}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                      <>
                        <TextInput keyboardType="numeric"
                          value={value}
                          onChangeText={(text) => onChange(text)}
                          placeholder={placeholderAmount}
                          style={{marginTop: 10}}
                        />
                        {errors.cantidad && <Text style={globalStyles.errorMessage}>{errors.cantidad.message}</Text>}
                        {!errors.cantidad && <Text style={globalStyles.showInfoSelected}></Text>}
                      </>
                    )}
                />

                <View style={[styles.delimitador, {height: 1}]}></View>
                <View style={[styles.buttonContainer, {marginTop: 7}]}>
                    <ScheduleButton control={control} errors={errors} name="horario" start={true} getValues={getValues}/>
                    <ScheduleButton control={control} errors={errors} name="horarioFin" start={false} getValues={getValues}/>
                </View>

                <View style={[styles.buttonContainer, {marginTop: 7}]}>
                    {getValues("category") == "Viaje" ? (
                      <TravelRouteButton control={control} errors={errors} name="coordenadas" setValue={setValue} 
                      trigger={trigger} getValues={getValues} imageUploaded={imageUploaded}/>
                    ) : (
                      <LocationButton control={control} errors={errors} name="lugar" 
                        setValue={setValue} trigger={trigger}/>
                    )}
                    <DaysButton control={control} errors={errors} name="dias" setValue={setValue} 
                        trigger={trigger} isUpdate={false}  getValues={getValues}/>
                </View>

                <View style={[styles.buttonContainer, ]}>
                    <ImageButton control={control} errors={errors} name="image" setValue={setValue} 
                    trigger={trigger} getValues={getValues} setImageUploaded={setImageUploaded}/>
                    <ContactButton control={control} errors={errors} name="contacto" 
                        setValue={setValue} trigger={trigger}/>
                </View>
                
                <View style={[styles.delimitador, {height: 1, marginBottom: 5}]}></View>
                <View style={[styles.buttonContainer, {justifyContent: "center"}]}>
                    <TouchableOpacity
                        style={[styles.button, styles.buttonClose, { marginHorizontal: 0}]}
                        onPress={onCancel}>
                        <Text style={styles.textStyle}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.buttonClose]}
                        // onPress={() => setModalCreatePost(false)}>
                        onPress={handleSubmit(onSubmit)}>
                        <Text style={styles.textStyle}>Crear Publicación</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };
  
const styles = StyleSheet.create({
  modalContainer: {
      backgroundColor: '#B5D8C3',
      borderRadius: 20,
      height: hp("60%"),
      width: wp("97%"),
      padding: 10,
      elevation: 5,
      marginBottom: 60,
  },
  tituloModal: {
      marginBottom: 8,
      textAlign: "left",
      fontWeight: 'bold',
      color: "black",
      fontSize: 30,
  },
  textModal: {
      fontSize: 16,
      color: "grey",
  },
  buttonContainer:{
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between", // Distribuye automáticamente el espacio entre los botones
      marginVertical: 5,
  },
  minMaxCostContainer:{
    flexDirection: "row",
    alignItems: "center",
    
    justifyContent: "space-between", // Distribuye automáticamente el espacio entre los botones
  },
  boton:{
      width: wp("32%"),
      // backgroundColor:"#B0EFDB"
  },
  button: {
      padding: 10,
      elevation: 2,
      marginLeft: 20,
      marginRight: 10,
  },
  buttonClose: {
      backgroundColor: '#0ABEDC',
  },
  textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
  },
  txtButton:{
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  notSelectedButton:{
    backgroundColor: "#6E9F85",
    padding: 7,
    borderRadius: 20,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    width: wp("30%"),
    borderColor: 'grey',
  },
  selectedButton:{
    backgroundColor: "#8CD1A9"
  },
  delimitador:{
    height: 2, 
    width: wp("100%"), 
    backgroundColor: "grey"
  },
  costsInputContainer:{
    flexDirection: "column",
    width: wp("45%")
  }
})

  export default CreatePostModal;