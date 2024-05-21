import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { globalStyles } from '../../../globalStyles';

const DeleteConfirmModal = ({visible, onClose, userName}) => {
  const onCancel = () => {
    onClose();
  };
  return (
    <Modal animationType="fade" transparent={true} visible={visible}
     onRequestClose={() => {
      onClose()
    }}>
        <View style={globalStyles.centerContainer}>
            <View style={styles.modalContainer}>
                <Text style={styles.textAsk}>¿Estás seguro de que quieres borrar la publicación?</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, styles.buttonClose, { marginHorizontal: 0}]}
                        onPress={onCancel}>
                        <Text style={styles.textStyle}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.buttonClose]}
                        // onPress={() => setModalCreatePost(false)}>
                        onPress={onCancel}>
                        <Text style={styles.textStyle}>Crear Publicación</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: '#E5422C',
        borderRadius: 20,
        height: hp("18%"),
        width: wp("88%"),
        padding: 10,
        elevation: 5,
        justifyContent: 'space-between',
    },
    textAsk:{
        color:"black",
        fontWeight: "bold",
        fontSize: 28,
        textAlign: "center",
    },
    buttonContainer:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 5,
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
        fontSize: 18,
    },
})

export default DeleteConfirmModal