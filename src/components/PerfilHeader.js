import React from 'react';
import { ImageBackground, View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const PerfilHeader = ({ modalConfiguration, setModalConfiguration }) => {
    const openModalConfiguration = () => {
        console.log(modalConfiguration)
        setModalConfiguration(true);
    };

    return (
        <ImageBackground style={styles.imgBackGround} source={require("../../Img/background.jpeg")}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.editarPerfil} onPress={openModalConfiguration}>
                    <Icon name="gear" size={50} color="black" />
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    imgBackGround: {
        width: wp('100%'),
        height: hp('7.5%'),
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems:"flex-end",
        marginRight:"1.5%",
    },
    editarPerfil: {
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
    },
});

export default PerfilHeader;
