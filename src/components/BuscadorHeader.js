// Header.js
import React, { useState } from 'react';
import { TextInput, Image, TouchableOpacity, ImageBackground, View, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { globalStyles } from './globalStyles';
import { Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BuscadorHeader = ({visible, setVisible,}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    console.log(query); // Imprime el texto en la consola
    setSearchQuery(query); // Actualiza el estado del texto de búsqueda
  };

  const openDrawer = () =>{
    setVisible(true)
  }

  return (
    <ImageBackground style={styles.imgBackGround} source={require("../../Img/background.jpeg")}>
        <View style={styles.container}>
            <TouchableOpacity onPress={openDrawer}>
                <Icon name="menu" color={"black"} size={46} style={styles.icon}/>
            </TouchableOpacity>
            <Searchbar
                placeholder="Search"
                onChangeText={handleSearch}
                value={searchQuery}
                style={styles.searchBar}
                inputStyle={styles.inputStyle}
                icon={({ color, size }) => ( // Define el icono dentro de una función
                    <Icon name="search" color={color} size={size} />
                )}
            />
            <Image style={styles.imgHeaderLogo} source={require('../../Img/Logo.png')} />
        </View>
    </ImageBackground>
    
    // <View style={{flexDirection: "row"}}>
    //     <Searchbar
    //         placeholder="Search"
    //         onChangeText={handleSearch}
    //         value={searchQuery}
    //         style={styles.searchBar}
    //         inputStyle={styles.inputStyle}
    //         icon={({ color, size }) => ( // Define el icono dentro de una función
    //             <Icon name="search" color={color} size={size} />
    //         )}
    //     />
    //     <Image style={styles.imgHeaderLogo} source={require('../../Img/Logo.png')} />
    // </View>
    
  );
};

const styles = StyleSheet.create({
    searchBar: {
        // marginLeft: "1%",
        borderRadius: 20,
        width: wp("70%"),
        height: hp("6%"),
    },
    inputStyle: {
        fontSize: 16,
        alignSelf: "center",
    },
    imgHeaderLogo:{
        marginRight: "1%",
        width: wp('12%'),
        height: hp('6%'),
    },
    imgBackGround:{
        width: wp('100%'),
        height: hp('7.5%'),
    },
    container: {
        flexDirection: "row",
        justifyContent:'space-between',
        alignItems: 'center',
        marginTop: 6,
    },
    icon:{
        marginLeft: "1%",
    }
});

export default BuscadorHeader;