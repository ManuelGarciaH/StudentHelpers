import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native'
import React, { useState } from 'react'
import { globalStyles } from '../../../globalStyles'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const GenerateCode = () => {
  const [modalGenerateCode, setModalGenerateCode] = useState(false)

  const handleOpenModal = () =>{
    setModalGenerateCode(true)
  }

  const handleCloseModal = () => {
    setModalGenerateCode(false);
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
    },
})

export default GenerateCode