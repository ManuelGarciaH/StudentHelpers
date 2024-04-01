import React from 'react';
import { Modal, View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Button, TextInput} from 'react-native-paper';
import { globalStyles } from '../../../globalStyles';

import ScheduleButton from './ScheduleButton';
import LocationButton from './LocationButton';
import DaysButton from './DaysButton'
import ContactButton from './ContactButton';
import ImageButton from './ImageButton';

const CreatePostModal = ({ visible, onClose}) => {
    const { handleSubmit, control, setValue, formState: { errors }, trigger } = useForm();
  
    const onSubmit = (data) => {
        if (Object.keys(errors).length === 0) {
            console.log(data);
            onClose();
        } else {
            console.log(errors);
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
            <Text style={styles.textModal}>Elige una categoria</Text>
                <Controller
                    name="category"
                    control={control}
                    rules={{ required: "Selecciona una categoria" }}
                    defaultValue=""
                    render={({ field: { value, onChange } }) => (
                      <>
                        <View style={styles.buttonContainer}>
                          <TouchableOpacity onPress={() => onChange('Comida')}>
                            <View style={[styles.notSelectedButton, value === 'Comida' && styles.selectedButton]}>
                              <Text style={styles.txtButton}>Comida</Text>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => onChange('Accesorios')}>
                            <View style={[styles.notSelectedButton, value === 'Accesorios' && styles.selectedButton]}>
                              <Text style={styles.txtButton}>Accesorios</Text>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => onChange('Viaje')}>
                            <View style={[styles.notSelectedButton, value === 'Viaje' && styles.selectedButton]}>
                              <Text style={styles.txtButton}>Viaje</Text>
                            </View>
                          </TouchableOpacity>
                        </View>

                        <View style={[styles.buttonContainer, {marginBottom: 5}]}>
                          <TouchableOpacity onPress={() => onChange('Intercambio')}>
                            <View style={[styles.notSelectedButton, value === 'Intercambio' && styles.selectedButton]}>
                              <Text style={styles.txtButton}>Intercambio</Text>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => onChange('Producto')}>
                            <View style={[styles.notSelectedButton, value === 'Producto' && styles.selectedButton]}>
                              <Text style={styles.txtButton}>Producto</Text>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => onChange('Otro')}>
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
                <View style={[styles.delimitador, {height: 1}]}></View>
                <View style={[styles.buttonContainer, {marginTop: 7}]}>
                    <ScheduleButton control={control} errors={errors} name="horario"/>
                    <LocationButton control={control} errors={errors} name="lugar" 
                        setValue={setValue} trigger={trigger}/>
                </View>

                <View style={[styles.buttonContainer, {marginTop: 7}]}>
                    <DaysButton control={control} errors={errors} name="dias" 
                        setValue={setValue} trigger={trigger}/>
                    <ContactButton control={control} errors={errors} name="contacto" 
                        setValue={setValue} trigger={trigger}/>

                </View>

                <View style={[styles.buttonContainer, ]}>
                    <ImageButton control={control} errors={errors} name="image" 
                        setValue={setValue} trigger={trigger}/>
                </View>
                
                <View style={[styles.delimitador, {height: 1, marginBottom: 5}]}></View>
                <View style={[styles.buttonContainer, {justifyContent: "center"}]}>
                    <TouchableOpacity
                        style={[styles.button, styles.buttonClose, { marginHorizontal: 0}]}
                        onPress={onClose}>
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
  }
})

  export default CreatePostModal;