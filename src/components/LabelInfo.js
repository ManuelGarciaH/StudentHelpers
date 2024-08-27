import { Text, StyleSheet, View, TouchableOpacity,Modal } from 'react-native'
import React, { useState, useRef } from 'react';
import {globalStyles} from '../../globalStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function LabelInfo(props) {
  const [visibility, setVisibility] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);

  const toggleModal = () => {
    (visibility) ? setVisibility(false) : setVisibility(true);
  };

  const handleButtonPress = () => {
    // Medir la posición del botón antes de mostrar el modal
    console.log('toggle')
    buttonRef.current.measure((fx, fy, width, height, px, py) => {
      setButtonPosition({ x: px, y: py + height });
      toggleModal();
    });
  };

  return (
    <View style={styles.container}>
        <Text style={globalStyles.txtBasic}>{props.value}</Text>
        <TouchableOpacity ref={buttonRef} style={styles.infoButton} onPress={handleButtonPress}>
            <Icon name={"help"} size={15} color="black" /> 
        </TouchableOpacity>
        <View style={styles.modalContainer}>
          <Modal animationType='fade' visible={visibility} transparent={true} style={styles.modal}>
              <View style={styles.content}>
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