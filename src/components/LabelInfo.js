import { Text, StyleSheet, View, TouchableOpacity,Modal } from 'react-native'
import React, { useState, useRef } from 'react';
import {globalStyles} from '../../globalStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function LabelInfo(props) {
  const [visibility, setVisibility] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);
  const modalRef = useRef(null);


  const handleButtonPress = () => {
    // Medir la posición del botón antes de mostrar el modal
    buttonRef.current.measure((b_fx, b_fy, b_width, b_height, b_px, b_py) => {
      buttonRef.current.measure((m_fx, m_fy, m_width, m_height, m_px, m_py) => {
        setModalPosition({ x: 10, y: b_py + b_height });
        setVisibility(true);
      });
  });
    setTimeout(() => {setVisibility(false)}, 3000);
  };


  return (
    <View style={styles.container}>
        <Text style={globalStyles.txtBasic}>{props.value}</Text>
        <TouchableOpacity ref={buttonRef} style={styles.infoButton} onPress={handleButtonPress}>
            <Icon name={"help"} size={15} color="black" /> 
        </TouchableOpacity>
        <View style={styles.modalContainer}>
          <Modal animationType='fade' visible={visibility} transparent={true} style={styles.modal} ref={modalRef}>
              <View style={[styles.content, { top: modalPosition.y, left: modalPosition.x }]}>
                <Text style={styles.messageText}>{props.message}</Text>
              </View>
          </Modal>
        </View>
    </View>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  content: {
    zIndex: 100,
    elevation: 10,
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  infoText: {
      flexDirection: 'row', 
      alignItems: 'center', 
    },
  infoButton: {
    padding: 5,
    paddingTop: 15,
    alignItems: 'center',
    justifyContent: "center",
  },
  modal: {
    flex: 1,
    zIndex: 100,
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 20,
  },
  messageText: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlignVertical: 'center',
  }
})