import { View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Controller, useForm } from 'react-hook-form';
import React, {useEffect, useState} from 'react'
import { TextInput} from 'react-native-paper';

import { globalStyles } from '../../globalStyles'
import ScheduleButton from './ProfileModals/ScheduleButton';
import TravelRouteButton from './ProfileModals/TravelRouteButton';
import LocationButton from './ProfileModals/LocationButton';
import DaysButton from './ProfileModals/DaysButton';
import ImageButton from './ProfileModals/ImageButton';
import ContactButton from './ProfileModals/ContactButton';
import ModalLoading from '../components/ModalLoading';

const UpdatePosts = ({navigation, route}) => {
  const { handleSubmit, control, reset, setValue, getValues, formState: { errors }, trigger } = useForm();
  const [placeholderAmount, setPlaceholderAmount] = useState("Cantidad");
  const [imageUploaded, setImageUploaded] = useState(false);
  const { datos } = route.params;

  useEffect(()=> {
    uploadPreviousInformation()
  }, [])

  const onSubmit = async (data) => {
    if (Object.keys(errors).length === 0) {
        // const newImagePaths = await subirImagenesABaseDeDatos(data.image, data.titulo);
        // const newData = { ...data, image: newImagePaths, nombreUsuario: userName};

        // await addDoc(collection(FIREBASE_DB, 'publicaciones'), newData);
        reset();
        // onClose();
    } else {
        console.log(errors);
    }
};

  const uploadPreviousInformation = () =>{
    //Category
    setValue("category", datos.category)
    trigger("category")
    //Title
    setValue("titulo", datos.title)
    trigger("titulo")
    //Details
    setValue("detalles", datos.details)
    trigger("detalles")
    //minCost
    setValue("costo", datos.cost)
    trigger("costo")
    //maxCost
    setValue("costoMaximo", datos.maxCost)
    trigger("costoMaximo")
    //quantity
    setValue("cantidad", datos.cantidad)
    trigger("cantidad")
    //startSchedule
    setValue("horario", datos.schedule)
    trigger("horario")
    //finalSchedule
    setValue("horarioFin", datos.scheduleEnd)
    trigger("horarioFin")
    //coordinates
    setValue("coordenadas", datos.coordinates)
    trigger("coordenadas")
    //location
    setValue("lugar", datos.location)
    trigger("lugar")
    //days
    setValue("dias", datos.days)
    trigger("dias")
    //Image
    setValue("image", datos.images)
    trigger("image")
    //Contact
    setValue("contacto", datos.contact)
    trigger("contacto")
  }

  // Calcula las horas de inicio y fin límites
  const minTime = new Date();
  minTime.setHours(7, 0, 0); // 7:00 am
  const maxTime = new Date();
  maxTime.setHours(21, 0, 0); // 9:00 pm

  const onCancel = () => {
    reset(); // Limpiar los datos del formulario
    setPlaceholderAmount("Cantidad");
    navigation.goBack()
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
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const timeout = setTimeout(() => {
        waiting()
    }, 1000);
    return () => clearTimeout(timeout);
  });

  const waiting = () => {
    setLoading(false)
  }
  return (
    <View style={[globalStyles.mainContainer, {padding: 0}]}>
      <View style={styles.formContainer}>
      <Text style={styles.tituloModal}>Actualizar Publicación</Text>
      <View style={styles.delimitador}></View>
        {loading ? (
            // <ActivityIndicator size="large" color="#0000ff" />
              <ModalLoading visible={true}/>
            ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
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
                rules={{ required: "Campo requerido"}}
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
                rules={{ required: "Campo requerido" }}
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
                <   DaysButton control={control} errors={errors} name="dias" 
                    setValue={setValue} trigger={trigger}/>
            </View>
            <View style={styles.buttonContainer}>
                <ImageButton control={control} errors={errors} name="image" setValue={setValue} 
                trigger={trigger} getValues={getValues} setImageUploaded={setImageUploaded}/>
                <ContactButton control={control} errors={errors} name="contacto" 
                    setValue={setValue} trigger={trigger}/>
            </View>
            <View style={[styles.delimitador, {height: 1, marginBottom: 5}]}></View>
            <View style={[styles.buttonContainer, {justifyContent: "center", marginBottom: 15}]}>
                <TouchableOpacity 
                    style={[styles.button, styles.buttonClose, { marginHorizontal: 0}]}
                    onPress={onCancel}>
                    <Text style={styles.textStyle}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.buttonClose]}
                    onPress={handleSubmit(onSubmit)}>
                    <Text style={styles.textStyle}>Actualizar Publicación</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        width: wp("97%"),
        padding: 5,
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

export default UpdatePosts