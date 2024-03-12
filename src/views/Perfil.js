import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image} from 'react-native'
import {globalStyles} from '../../globalStyles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import PerfilHeader from '../components/PerfilHeader';

const Perfil = () => {
  return (
    <View>
        <PerfilHeader/>
        <View style={[globalStyles.form, {padding: 5}]}>
          <Text style={styles.nombreTitulo}>Nombre de Usuario</Text>
          <View style={styles.contenedorDescripcion}>
            <Image
              source={require("../../Img/Sin-foto-Perfil.png")}
              style={styles.image}
            />
            <Text style={styles.textoDescripcion}>In et ullamco consectetur minim exercitation officia proident aliquip tempor voluptate ut anim sunt velit. Elit et eiusmod sunt proident. Do ad aute proident non aute consequat consectetur irure fugiat dolor.</Text>
          </View>
          <Text style={styles.nombreTitulo}>Publicaciones</Text>
          <View style={styles.contenedorDescripcion}>
            <View style={[globalStyles.centrar, styles.botonCrearPublicacion]}>
              <Icon.Button 
                name="plus"
              >Crear Publicación</Icon.Button>
            </View>
          </View>

        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  contenedorDescripcion:{
    flexDirection: "row",
    alignItems: "center",
    width: wp("100%"),
    margin: 2,
    borderWidth: 1,
    borderColor: "grey",
  },
  nombreTitulo:{
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 4,
    color: "black",
  },
  textoDescripcion:{
   // marginRight: 150,
   width: wp("55%"),
   marginLeft: 5,
   marginRight: 4,
   textAlign: "justify",
  },
  image:{
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
    width: wp("40%"),
    height: hp("20%"),
  },
  contenedorCrearPubliacion:{
    flexDirection: "row",
    alignItems: "center",
    height: 45,
  },
  botonCrearPublicacion:{
    margin: 5,
  }
});

export default Perfil;