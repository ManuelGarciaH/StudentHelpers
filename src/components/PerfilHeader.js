import React from 'react';
import { TextInput, Image, TouchableOpacity, ImageBackground, View, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { globalStyles } from './globalStyles';
import { Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const PerfilHeader = () => {
  return (
    <ImageBackground style={styles.imgBackGround} source={require("../../Img/background.jpeg")}>
        <View style={styles.container}>
            <TouchableOpacity style={styles.editarPerfil}>
                <Icon name="edit" size={50} color="white" />
            </TouchableOpacity>
        </View>
    </ImageBackground>

    // <View style={styles.container}>
    //     <TouchableOpacity style={styles.editarPerfil}>
    //         <Icon name="edit" size={50} color="white" />
    //     </TouchableOpacity>
    // </View>
  )
}

const styles = StyleSheet.create({
    imgBackGround:{
        width: wp('100%'),
        height: hp('7.5%'),
    },
    container: {
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    editarPerfil:{
        alignItems: "center",
        justifyContent: "flex-end",
    },
});

export default PerfilHeader