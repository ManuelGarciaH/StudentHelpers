// Header.js
import React, { useState } from 'react';
import { TextInput, Image, TouchableOpacity, ImageBackground, View, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { globalStyles } from './globalStyles';
import { Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BuscadorHeader = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    console.log(query); // Imprime el texto en la consola
    setSearchQuery(query); // Actualiza el estado del texto de búsqueda
  };

  return (
    <ImageBackground style={styles.imgBackGround} source={require("../../Img/background.jpeg")}>
        <View style={styles.header}>
            <View style={styles.buscador}>
                <Searchbar
                    placeholder="Search"
                    onChangeText={handleSearch}
                    value={searchQuery}
                    icon={({ color, size }) => ( // Define el icono dentro de una función
                        <Icon name="search" color={color} size={size} />
                    )}
                />
                {/* <TextInput style={styles.txtInput}></TextInput> */}
            </View>
            <Image style={styles.imgHeaderLogo} source={require('../../Img/Logo.png')} />
        </View>
    </ImageBackground>
    
  );
};

const styles = StyleSheet.create({
    header:{                    //Header contiene el logo, titulo de la ventana
        flexDirection: 'row', 
        alignItems: 'center',
        flex: 1,
    },
    imgHeaderLogo:{
        width: wp('18%'),
        height: hp('9%'),
        margin: 10
    },
    imgBackGround:{
        width: wp('100%'),
        height: hp('10%'),
    },
    buscador:{
        width: wp('78%'),
        height: hp('5%'),
        borderRadius: 15,
        marginLeft: 5,
        marginBottom: 15
    },
});

export default BuscadorHeader;