import React from 'react';
import { Modal, View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Button, TextInput} from 'react-native-paper';

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
      <Modal animationType="slide" transparent={true} visible={visible}>
        <View style={styles.centerContainer}>
          <View style={styles.modalContainer}>
            <Text style={styles.tituloModal}>Crear Publicación</Text>
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
                          <Button mode={value === 'Comida' ? 'contained' : 'outlined'}
                            onPress={() => onChange('Comida')} style={styles.boton}
                          >Comida</Button>

                          <Button mode={value === 'Accesorios' ? 'contained' : 'outlined'}
                            onPress={() => onChange('Accesorios')} style={styles.boton}
                          >Accesorios</Button>

                          <Button mode={value === 'Viaje' ? 'contained' : 'outlined'}
                            onPress={() => onChange('Viaje')} style={[styles.boton, {width: wp("26%")}]}
                          >Viaje</Button>
                        </View>

                        <View style={styles.buttonContainer}>
                          <Button mode={value === 'Intercambio' ? 'contained' : 'outlined'}
                            onPress={() => onChange('Intercambio')} style={styles.boton}
                          >Intercambio</Button>

                          <Button mode={value === 'Producto' ? 'contained' : 'outlined'}
                            onPress={() => onChange('Producto')} style={styles.boton}
                          >Producto</Button>

                          <Button mode={value === 'Otro' ? 'contained' : 'outlined'}
                            onPress={() => onChange('Otro')} style={[styles.boton, {width: wp("26%")}]}
                          >Otro</Button>
                        </View>

                        <Text>Opción seleccionada: {value}</Text>
                        {errors.category && <Text style={{ color: 'red' }}>{errors.category.message}</Text>}
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
                        />
                        {errors.titulo && <Text style={{ color: 'red' }}>{errors.titulo.message}</Text>}
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
                        />
                        {errors.detalles && <Text style={{ color: 'red' }}>{errors.detalles.message}</Text>}
                      </>
                    )}
                />
                <View style={[styles.buttonContainer, {marginTop: 15}]}>
                    <ScheduleButton control={control} errors={errors} name="horario"/>
                    <LocationButton control={control} errors={errors} name="lugar" 
                        setValue={setValue} trigger={trigger}/>
                    
                    <DaysButton control={control} errors={errors} name="dias" 
                        setValue={setValue} trigger={trigger}/>
                </View>
                <View style={[styles.buttonContainer, {marginTop: 15}]}>
                    <ContactButton control={control} errors={errors} name="contacto" 
                        setValue={setValue} trigger={trigger}/>
                    <View style={{ marginHorizontal: -15}}></View>
                    <ImageButton control={control} errors={errors} name="image" 
                        setValue={setValue} trigger={trigger}/>
                </View>

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
    centerContainer: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        marginBottom: 55,
    },
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        height: hp("60%"),
        width: wp("97%"),
        padding: 10,
        elevation: 5,
    },
    tituloModal: {
        marginBottom: 8,
        textAlign: "left",
        fontWeight: 'bold',
        color: "black",
        fontSize: 30,
    },
    textModal: {
        textAlign: "center",
        fontSize: 14,
        color: "grey",
    },
    buttonContainer:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between", // Distribuye automáticamente el espacio entre los botones
        marginVertical: 5
    },
    boton:{
        width: wp("32%"),
    },
    button: {
        padding: 10,
        elevation: 2,
        marginLeft: 20,
        marginRight: 10,
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
})

  export default CreatePostModal;