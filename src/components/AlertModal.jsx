import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';

export default function AlertModal({visible, onClose, message}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>{message}</Text>
      </View>
      <TouchableOpacity style={styles.buttonClose} onPress={() => onClose()}>
        <Icon name={'cancel'} size={20} color="black" />
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    position: 'absolute',
    top: 10,
    right: 10,
    borderRadius: 50,
    elevation: 5,
    backgroundColor: '#CD2929',
    padding: 5, // Espacio alrededor del icono
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
