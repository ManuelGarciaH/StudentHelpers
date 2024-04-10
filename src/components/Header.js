// Header.js
import React from 'react';
import { Text, Image, TouchableOpacity, ImageBackground, View, StyleSheet } from 'react-native';
import { globalStyles } from '../../globalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Header = ({navigation, back}) => {

  return (
    // <ImageBackground style={globalStyles.imgBackGround} source={require("../../Img/background.jpeg")}>
    //     <View style={globalStyles.header}>
    //         <TouchableOpacity onPress={goBack}>
    //             <Image
    //             style={globalStyles.imgHeaderRetroceso}
    //             source={require('../../Img/Flecha-verde.png')}
    //             />
    //         </TouchableOpacity>
    //         <Text style={customStyles}>{title}</Text>
    //         <Image style={globalStyles.imgHeaderLogo} source={require('../../Img/Logo.png')} />
    //     </View>
    // </ImageBackground>

    <ImageBackground style={styles.imgBackGround} source={require("../../Img/background.jpeg")}>
      <View style={styles.container}>
        {back ? (
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.buttonBack}>
            <Icon name="arrow-left" size={34} color="black" />
          </TouchableOpacity>
        ) : (<>

        </>)}
        <View style={[globalStyles.header, styles.imgHeaderLogoContainer]}>
          <Image style={styles.imgHeaderLogo} source={require('../../Img/Logo.png')} />
        </View>
      </View>
    </ImageBackground>
    
  );
};

const styles = StyleSheet.create({
  imgBackGround: {
    width: wp('100%'),
    height: hp('7.5%'),
  },
  buttonBack: {
    marginLeft: "3%",
  },
  imgHeaderLogo: {
    width: wp('12%'),
    height: hp('6%'),
  },
  container: {
    flexDirection: "row",
    justifyContent: 'space-between', // Esto distribuirá los elementos horizontalmente
    alignItems: 'center',
    marginTop: 6,
  },
  imgHeaderLogoContainer: {
    flex: 1, // Esto hará que el contenedor del encabezado ocupe todo el espacio disponible
    flexDirection: 'row',
    justifyContent: 'flex-end', // Esto alineará el logotipo a la derecha
    marginRight: "2%",
  },
})

export default Header;