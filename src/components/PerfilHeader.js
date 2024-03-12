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
            <View style={styles.editarPerfil}>
                <TouchableOpacity>
                    <Icon name="edit" size={50} color={"white"}></Icon>
                </TouchableOpacity>
            </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
    imgBackGround:{
        width: wp('100%'),
        height: hp('7%'),
    },
    editarPerfil:{
        alignItems: "flex-end",
    },
});

export default PerfilHeader