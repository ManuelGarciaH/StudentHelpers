import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native'
import React, { useState } from 'react'
import { globalStyles } from '../../../globalStyles'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const GenerateCode = () => {
  const [modalGenerateCode, setModalGenerateCode] = useState(false)
  const [temporalCode, setTemporalCode] = useState('')

  const handleOpenModal = () =>{
    generateUniqueCode(12)
    setModalGenerateCode(true)
    const dateTime = new Date().toISOString();
    console.log(dateTime)
  }

  const handleCloseModal = () => {
    setModalGenerateCode(false);
  };

  const generateUniqueCode = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    setTemporalCode(result)
  };

  return (
    <View>
      <TouchableOpacity onPress={handleOpenModal}>
        <View style={[globalStyles.dataButton,  styles.buttonGetModule, styles.buttonClose]}>
            <Text style={globalStyles.dataTxtButton}>Generar codigo de calificacion</Text>
        </View>
      </TouchableOpacity>

      <Modal animationType="fade" 
        transparent={true} 
        visible={modalGenerateCode} 
        onRequestClose={handleCloseModal}
      >
        <View style={[globalStyles.centerContainer]}>
            <View style={styles.modalContainer}>
              <Text style={styles.textTitle}>Su codigo para calificar</Text>
              <Text>{temporalCode}</Text>
              <TouchableOpacity 
                style={[styles.button, styles.buttonClose]}
                onPress={handleCloseModal}>
                <Text style={styles.textStyle}>Aceptar</Text>
              </TouchableOpacity>
            </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
    buttonGetModule:{
        padding: 9,
        elevation: 1,
        alignSelf: "center",
        width: wp("95%"),
        marginTop: 5,
        marginBottom: 10,
    },
    buttonClose: {
        backgroundColor: '#0ABEDC',
    },
    modalContainer: {
        backgroundColor: '#B5D8C3',
        borderRadius: 20,
        height: hp("20%"),
        width: wp("92%"),
        padding: 10,
        elevation: 5,
        justifyContent: 'space-between',
        alignItems: "center",
    },
    button: {
      padding: 10,
      elevation: 2,
      marginLeft: 20,
      marginRight: 10,
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 17,
    },
    textTitle: {
      color: 'black',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 28,
    },
})

export default GenerateCode