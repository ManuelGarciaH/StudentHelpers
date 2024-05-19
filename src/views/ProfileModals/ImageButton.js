import { View, Text, Modal, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, {useState, useRef, useEffect} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {launchImageLibrary} from 'react-native-image-picker';
import { globalStyles } from '../../../globalStyles'
import Swiper from 'react-native-swiper';
import { Button} from 'react-native-paper';
import { Controller } from 'react-hook-form';

const ImageButton = ({ control, errors, name, setValue, trigger, getValues, setImageUploaded}) => {
    const [modalImage, setModalImage] = useState(false);

    const [imageUris, setImageUris] = useState([]);
    const swiperRef = useRef(null);
    const [swiperKey, setSwiperKey] = useState(0); // Clave única para el Swiper

    const openImageButton = () =>{
        const values = getValues("image");
        console.log(values)
        if (values!="") {
            // Si ya es un array, no es necesario concatenar
            setImageUris(values);
            console.log("a")
        }
        setModalImage(true);
    }

    const guardarImagenes = () => {
        setModalImage(false); 
        setValue("image", imageUris); 
        trigger("image");
        if(imageUris.length === 0) {
            setImageUploaded(false)
        }else{
            setImageUploaded(true)
        }
        
    }

    const openImagePicker = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
        };

        launchImageLibrary(options, (response) => {
            if (!response.didCancel && !response.error) {
                const newImageUri = response.uri || (response.assets && response.assets[0]?.uri);
                if (newImageUri) {
                    setImageUris([...imageUris, newImageUri]);
                    if (swiperRef.current) {
                        swiperRef.current.scrollBy(1, true); // Desplaza al último slide
                    }
                    // Cambiar la clave única del Swiper para forzar la recarga
                    setSwiperKey(prevKey => prevKey + 1);
                }
            }
        });
    };

    const removeImage = (index) => {
        const newImageUris = [...imageUris];
        newImageUris.splice(index, 1);
        setImageUris(newImageUris);
        // Cambiar la clave única del Swiper para forzar la recarga
        setSwiperKey(prevKey => prevKey + 1);
    };

  return (
    <View style={globalStyles.centrar}>
        <TouchableOpacity onPress={openImageButton}>
          <View style={globalStyles.dataButton}>
              <Icon name="image" style={globalStyles.dataIcon}/>
              <Text style={globalStyles.dataTxtButton}>Imagen</Text>
          </View>
        </TouchableOpacity>
        <Controller
            name={name}
            control={control}
            defaultValue={""}
            rules={{required: "Campo requerido"}}
            render={({field:{value}})=> (
            <>
                {(!errors[name] && value.length===0) && <Text style={globalStyles.showInfoSelected}></Text>}
                {(!errors[name] && value.length>0) && <Text style={globalStyles.showInfoSelected}>Imagines cargas: {value.length}</Text>}
                {errors[name] && <Text style={globalStyles.errorMessage}>{errors[name].message}</Text>}
            </>
        )}
        />
        {/* <Text style={globalStyles.showInfoSelected}>Nadota</Text> */}

        <Modal animationType="fade" transparent={true} visible={modalImage}
            onRequestClose={() => {
              setModalImage(!modalImage);
            }}>
            <View style={globalStyles.centerContainer}>
                <View style={styles.modalContainerImage}>
                    <Text style={styles.textModal}>Imagenes cargadas: {imageUris.length}</Text>
                    <View style={styles.imageContainer}>
                    <Swiper
                            key={swiperKey}
                            style={styles.wrapper}
                            containerStyle={styles.swiperContainer}
                            showsButtons={false}
                            ref={swiperRef}
                            loop={false}
                            loopClonesPerSide={1}
                        >
                            {imageUris.map((uri, index) => (
                                <View key={index} style={styles.slide}>
                                    <Image source={{ uri: uri }} style={styles.image} />
                                    <TouchableOpacity onPress={() => removeImage(index)} style={styles.closeIconContainer}>
                                        <Icon name="close" size={20} color="red" />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </Swiper>
                    </View>
                    
                    <TouchableOpacity onPress={openImagePicker}>
                        <View style={[styles.buttonSelectImage, {backgroundColor: "green"}]}>
                            <Text style={styles.textStyle}>Seleccionar imagen</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={()=> setModalImage(false)}>
                            <View style={styles.buttonSelectImage}>
                                <Text style={styles.textStyle}>Cancelar</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={guardarImagenes} >
                            <View style={styles.buttonSelectImage}>
                                <Text style={styles.textStyle}>Guardar imagenes</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            </View>
        </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
    modalContainerImage: {
        backgroundColor: '#B5D8C3',
        borderRadius: 20,
        height: hp("60%"),
        width: wp("90%"),
        padding: 10,
        elevation: 5,
        alignItems: "center",
        justifyContent: "space-between",
    },
    buttonSelectImage: {
        padding: 10,
        elevation: 2,
        marginLeft: 20,
        marginRight: 10,
        borderRadius: 20,
        backgroundColor: '#0ABEDC',
        alignSelf: 'flex-end',
    },
    imageContainer: {
        width: wp("70%"),
        height: hp("35%"),
        backgroundColor: 'lightblue', // Cambia el color de fondo del contenedor
        borderWidth: 2, // Añade un borde alrededor del contenedor
        borderColor: 'blue', // Color del borde
        borderRadius: 10, // Agrega esquinas redondeadas al contenedor
        padding: 10, // Añade espacio interno al contenedor
    },
    slide: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: wp('64%'), // Ancho de la imagen
        height: hp('32%'), // Altura de la imagen
        resizeMode: 'cover',
        marginBottom: 30,
    },
    textModal: {
        textAlign: "center",
        fontSize: 18,
        color: "black",
        fontWeight: "bold",
    },
    swiperContainer: {
        width: wp("64%"),
        height: hp("38%"),
    },
    closeIconContainer: {
        position: 'absolute',
        top: "2%",
        right: "3%",
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 20,
        padding: 5,
    },
    buttonContainer:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between", // Distribuye automáticamente el espacio entre los botones
        marginVertical: 5,
    },
    textStyle:{
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    }
})

export default ImageButton