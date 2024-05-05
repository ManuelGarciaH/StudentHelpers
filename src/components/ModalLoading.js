import { View, Text, Modal, ActivityIndicator, StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React, { useState } from 'react'
import { globalStyles } from '../../globalStyles';

const ModalLoading = ({visible}) => {
  const [modalLoading, setModalLoading] = useState(false);

  return (
    <View>
      <Modal
      animationType='fade'  transparent={true} visible={visible}
      onRequestClose={() => {
          setModalLoading(false);
      }}>
        <View style={globalStyles.centerContainer}>
            <View style={[styles.modalContainerLoading, styles.alignRowContent]}>
                <ActivityIndicator style={styles.activityIndicator} color="#0000ff" />
                <Text style={styles.textProcessing}>Procesando...</Text>
            </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
    alignRowContent:{
        flexDirection: "row",
    },
    modalContainerLoading: {
        backgroundColor: '#B5D8C3',
        height: hp("10%"),
        width: wp("65%"),
        padding: 10,
        elevation: 5,
        alignItems: "center",
    },
    textProcessing:{
        marginLeft: "13%",
        fontSize: 18,
        fontWeight: "bold",
        color: "black",
    },
    activityIndicator:{
        transform: [{ scale: 2.3 }],
        marginLeft: "5%",
    }
})

export default ModalLoading