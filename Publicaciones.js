import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native'
import Header from './Header';
import {globalStyles} from './globalStyles';

export default class Publicaciones extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Header navigation={this.props.navigation} 
            title="Publicaciones" 
            customStyles={styles.title} // Puedes personalizar los estilos aquí 
            />
        <View style={globalStyles.form}>

        </View>
      </View>
    );
  }
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