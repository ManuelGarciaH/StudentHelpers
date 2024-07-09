import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {Controller} from 'react-hook-form';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, {useState} from 'react'
import { globalStyles } from '../../../globalStyles'
import { Button, TextInput} from 'react-native-paper';

const ContactButton = ({ control, errors, name, setValue, trigger }) => {
  const [modalContact, setModalContact] = useState(false);
  const [selectedContact, setSelectedContact] = useState('');

  const guardarContacto = () =>{
    setModalContact(false); 
    setValue("contacto", selectedContact); 
    trigger("contacto")
  }

  return (
    <View style={[globalStyles.centrar, {flex: 1}]}>
        <TouchableOpacity onPress={() => setModalContact(true)}>
          <View style={globalStyles.dataButton}>
              <Icon name="mobile-phone" style={globalStyles.dataIcon}/>
              <Text style={globalStyles.dataTxtButton}>Contacto</Text>
          </View>
        </TouchableOpacity>
        <Controller
            name={name}
            control={control}
            rules={{ 
              required: "Campo requerido",
              maxLength:{
                value: 10,
                message: "El telefono debe de tener 10 digitos"
              },
              minLength:{
                value: 10,
                message: "El telefono debe de tener 10 digitos"
              },
              validate: value => {
                return /^\d+$/.test(value) || "Solo se permiten digitos";
              },
            }}
            defaultValue=""
            render={({ field: { value } }) => (
                <>
                    {!errors[name] && <Text style={globalStyles.showInfoSelected}>{value}</Text>}
                    {errors[name] && <Text style={globalStyles.errorMessage}>{errors[name].message}</Text>}
                </>
            )}
         />
        
        <Modal animationType="fade" transparent={true} visible={modalContact}
            onRequestClose={() => {
              setModalContact(!modalContact);
            }}>
              <View style={globalStyles.centerContainer}>
                <View style={[styles.modalContainerContact, {justifyContent: "center"}]}>
                  <Text style={[globalStyles.txtInput, {textAlign: "center", fontWeight: "bold"}]}>Ingrese su numero con el que desea que lo contacten:</Text>
                  <TextInput keyboardType="numeric" style={[globalStyles.txtInput, styles.inputContact]} 
                  value={selectedContact} onChangeText={text => setSelectedContact(text)}></TextInput>

                  <View style={[styles.buttonContainer, {justifyContent: "flex-end"}]}>
                    <TouchableOpacity
                      style={[styles.button, styles.buttonClose, { marginHorizontal: 0}]}
                      onPress={() => setModalContact(false)}>
                      <Text style={styles.textStyle}>Cancelar</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      style={[styles.button, styles.buttonClose]}
                      onPress={guardarContacto}>
                      <Text style={styles.textStyle}>Guardar contacto</Text>
                    </TouchableOpacity>
                  </View>
                  
                </View>
              </View>
          </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  botonDatos:{
    width: wp("27%"),
    backgroundColor: "green",
    textAlign: "center",
  },
  modalContainerContact: {
    backgroundColor: '#B5D8C3',
    borderRadius: 20,
    height: hp("25%"),
    width: wp("80%"),
    padding: 10,
    elevation: 5,
    alignItems: "center",
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
  button: {
    padding: 10,
    elevation: 2,
    marginLeft: 20,
    marginRight: 10,
  },
  buttonClose: {
    backgroundColor: '#0ABEDC',
  },
  inputContact:{
    width: wp("60%"),
    marginVertical: 8,
    textAlign: "center",
    fontSize: 32,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

export default ContactButton