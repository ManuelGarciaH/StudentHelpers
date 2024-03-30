import { View, Text, Modal, StyleSheet, Image } from 'react-native'
import React, {useState} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {launchImageLibrary} from 'react-native-image-picker';
import { globalStyles } from '../../../globalStyles'
import { Button} from 'react-native-paper';

const ImageButton = () => {
    const [modalImage, setModalImage] = useState(false);

    const [imageUri, setSelectedImage] = useState(null);

    const openImagePicker = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
        };

        launchImageLibrary(options, (response) => {
        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.error) {
            console.log('Image picker error: ', response.error);
        } else {
            let imageUri = response.uri || response.assets?.[0]?.uri;
            setSelectedImage(imageUri);
        }
        });
    };

  return (
    <View style={globalStyles.centrar}>
        <Icon.Button name="image" style={styles.botonDatos} borderRadius={13}
        onPress={() => setModalImage(true)}>Imagen</Icon.Button>
        <Text>Nadota</Text>

        <Modal animationType="slide" transparent={true} visible={modalImage}
            onRequestClose={() => {
              setModalImage(!modalImage);
            }}>
            <View style={styles.centerContainer}>
                <View style={styles.modalContainerImage}>
                    <Text>Imagen</Text>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:"red" }}>
                    {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />}
                    <Button title="Seleccionar imagen" onPress={openImagePicker} style={{backgroundColor:"blue" }}  />
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
    modalContainerImage: {
        backgroundColor: 'white',
        borderRadius: 20,
        height: hp("30%"),
        width: wp("97%"),
        padding: 10,
        elevation: 5,
        marginBottom: 80,
    },
})

export default ImageButton