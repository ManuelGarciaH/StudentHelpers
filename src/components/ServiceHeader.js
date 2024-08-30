import React from 'react';
import { ImageBackground, View, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ServiceHeader = () => {
  return (
    <ImageBackground style={styles.imgBackGround} source={require("../../Img/background.jpeg")}>
        <View style={styles.container}>
        </View>
    </ImageBackground>
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
});

export default ServiceHeader