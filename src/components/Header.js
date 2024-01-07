// Header.js
import React from 'react';
import { Text, Image, TouchableOpacity, ImageBackground, View } from 'react-native';
import { globalStyles } from '../../globalStyles';

const Header = ({ navigation, title, customStyles }) => {
  const goBack = () => {
    navigation.navigate('Inicio');
  };

  return (
    <ImageBackground style={globalStyles.imgBackGround} source={require("../../Img/background.jpeg")}>
        <View style={globalStyles.header}>
            <TouchableOpacity onPress={goBack}>
                <Image
                style={globalStyles.imgHeaderRetroceso}
                source={require('../../Img/Flecha-verde.png')}
                />
            </TouchableOpacity>
            <Text style={customStyles}>{title}</Text>
            <Image style={globalStyles.imgHeaderLogo} source={require('../../Img/Logo.png')} />
        </View>
    </ImageBackground>
    
  );
};

export default Header;