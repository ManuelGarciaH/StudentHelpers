import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native'
import Header from '../components/Header';
import {globalStyles} from '../../globalStyles';
import BuscadorHeader from '../components/BuscadorHeader';

const Publicaciones = ({ navigation }) => {
    return (
      <View>
        <BuscadorHeader/>
        <View style={globalStyles.form}>

        </View>
      </View>
    );
}
const styles = StyleSheet.create({
    title:{                     //Titulo de la ventana
        backgroundColor: '#000000',
        marginHorizontal: -5,
        marginLeft: -5,
        padding: 10,
        borderRadius: 10,
        fontSize: 30,
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});

export default Publicaciones;