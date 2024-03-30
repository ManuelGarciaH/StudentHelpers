import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {Controller} from 'react-hook-form';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, {useState} from 'react'
import { globalStyles } from '../../../globalStyles'
import { TextInput} from 'react-native-paper';

const ContactButton = ({ control, errors, name, setValue, trigger }) => {
  const [modalContact, setModalContact] = useState(false);
  const [selectedContact, setSelectedContact] = useState('');

  return (
    <View style={globalStyles.centrar}>
        <Icon.Button name="mobile-phone" style={styles.botonDatos} borderRadius={13}
        onPress={() => setModalContact(true)}>Contacto</Icon.Button>
        <Controller
            name={name}
            control={control}
            rules={{ required: "Campo requerido" }}
            defaultValue=""
            render={({ field: { value } }) => (
                <>
                    <Text>{value}</Text>
                    {errors[name] && <Text style={{ color: 'red' }}>{errors[name].message}</Text>}
                </>
            )}
         />
        
        <Modal animationType="slide" transparent={true} visible={modalContact}
            onRequestClose={() => {
              setModalContact(!modalContact);
            }}>
              <View style={[styles.centerContainer, {backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: "center"}]}>
                <View style={[styles.modalContainerContact, {justifyContent: "center"}]}>
                  <Text style={[globalStyles.txtInput, {textAlign: "center"}]}>Ingrese su numero con el que desea que lo contacten:</Text>
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
                      onPress={() => {setModalContact(false); setValue("contacto", selectedContact); 
                      trigger("contacto")}}>
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
    centerContainer: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        marginBottom: 55,
    },
    modalContainerContact: {
        backgroundColor: 'white',
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
        backgroundColor: '#2196F3',
    },
    inputContact:{
        width: wp("60%"),
        marginVertical: 8,
        textAlign: "center",
        fontSize: 32,
    },
})

export default ContactButton