import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native'
import React, { useState } from 'react'
import { globalStyles } from '../../../globalStyles'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FIREBASE_DB } from '../../../Firebase';
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";

const GenerateCode = ({idPost}) => {
  const [modalGenerateCode, setModalGenerateCode] = useState(false)
  const [temporalCode, setTemporalCode] = useState('')
  const [time, setTime] = useState('')

  const handleOpenModal = () =>{
    generateUniqueCode(6)
    const dateTime = new Date().toISOString();
    setTime(dateTime)
    setModalGenerateCode(true)
  }

  const handleCloseModal = () => {
    setModalGenerateCode(false);
  };

  const uploadCodeQualification = () => {
    const uploadData={
      codigo: temporalCode,
      fecha_subida: time,
      id_publicacion: idPost,
    }
    console.log(uploadData)
    addDoc(collection(FIREBASE_DB, 'codigoCalificacion'), uploadData);
    setModalGenerateCode(false);
  }

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
            <Text style={globalStyles.dataTxtButton}>Generar código de calificación</Text>
        </View>
      </TouchableOpacity>

      <Modal animationType="fade" 
        transparent={true} 
        visible={modalGenerateCode} 
        onRequestClose={handleCloseModal}
      >
        <View style={[globalStyles.centerContainer]}>
            <View style={styles.modalContainer}>
              <Text style={styles.textTitle}>Código para calificar (duración de 5 minutos)</Text>
              <Text style={styles.textCode}>{temporalCode}</Text>
              <TouchableOpacity 
                style={[styles.button, styles.buttonClose]}
                onPress={uploadCodeQualification}>
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
        width: wp("94%"),
        borderRadius: 0,
    },
    buttonClose: {
        backgroundColor: '#0ABEDC',
    },
    modalContainer: {
        backgroundColor: '#B5D8C3',
        borderRadius: 20,
        height: hp("22%"),
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
    textCode:{
      color: 'black',
      textAlign: 'center',
      fontSize: 24,
      backgroundColor: "white",
      borderWidth: 1,
      padding: 4,
      width: '80%',
    },
})

export default GenerateCode