import { View, Text, StyleSheet, Image, FlatList  } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React, { useState } from 'react';
import { globalStyles } from '../../globalStyles'
import PerfilHeader from '../components/PerfilHeader';
import Swiper from 'react-native-swiper';

const VerPublicacion = ({navigation, route}) => {
    const { datos } = route.params;
    const [currentPage, setCurrentPage] = useState(0);

    const imagenes = [
        { uri: datos.images[0] },
        { uri: datos.images[0] },
        { uri: datos.images[0] }
    ];

    return (
        <View>
            <PerfilHeader/>
            <View style={globalStyles.form}>
                <Text style={styles.titulo}>Tostilocos preparados al gusto</Text>
                <View style={styles.contendorImagenes}>
                    <Swiper style={styles.wrapper} showsButtons={false}>
                        {imagenes.map((imagen, index) => (
                            <View key={index} style={styles.slide}>
                                <Image source={imagen} style={styles.image} />
                            </View>
                        ))}
                    </Swiper>
                </View>
                <View style={{width: wp("80%")}}>
                    <Text style={styles.textoDatos}>Lugar: {datos.location} </Text>
                    <Text style={styles.textoDatos}>Días: {datos.days.join('-')}</Text>
                    <Text style={styles.textoDatos}>Horario: {datos.schedule}</Text>
                    <Text style={styles.textoDatos}>Contacto Externo: {datos.contact}</Text>
                    <Text style={styles.textoDatos} multiline={true}>Detalles: {datos.details}</Text>
                </View>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    contendorImagenes:{
        width: wp("80%"),
        height: hp("40%"),
    },
    titulo:{
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 4,
        color: "black",
        textAlign: "center",
    },
    textoDatos:{
        fontSize: 18,
        color: "black",
        textAlign: "justify",
    },
    image: {
        width: wp("80%"),
        height: hp("40%"),
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default VerPublicacion;