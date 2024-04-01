import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native'
import {globalStyles} from '../../globalStyles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import PerfilHeader from '../components/PerfilHeader';
import CreatePostModal from './ProfileModals/CreatePostModal';
// import { Button } from 'react-native-paper';

const Perfil = () => {
  //States for modals
  const [modalCreatePost, setModalCreatePost] = useState(false);

  return (
    <View>
        <PerfilHeader/>
        <View style={[globalStyles.form, {padding: 5}]}>
          <Text style={styles.titleName}>Nombre de Usuario</Text>
          <View style={styles.descriptionContainer}>
            <Image
              source={require("../../Img/Sin-foto-Perfil.png")}
              style={styles.image}
            />
            <Text style={styles.textDescription}>In et ullamco consectetur minim exercitation officia proident aliquip tempor voluptate ut anim sunt velit. Elit et eiusmod sunt proident. Do ad aute proident non aute consequat consectetur irure fugiat dolor.</Text>
          </View>
          <Text style={styles.titleName}>Publicaciones</Text>
          <View style={styles.descriptionContainer}>
            <View style={[globalStyles.centrar, ]}>
              <TouchableOpacity onPress={() => setModalCreatePost(true)}>
                <View style={styles.buttonCreatePost}>
                  <Icon name="plus" style={styles.iconCreatePost}/>
                  <Text style={styles.txtButton}>Crear Publicación</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <CreatePostModal visible={modalCreatePost} onClose={() => setModalCreatePost(false)} />

        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  descriptionContainer:{
    flexDirection: "row",
    alignItems: "center",
    width: wp("100%"),
    margin: 2,
    borderWidth: 1,
    borderColor: "grey",
  },
  titleName:{
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 4,
    color: "black",
  },
  textDescription:{
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
  buttonCreatePost:{
    flexDirection: "row",
    margin: 5,
    backgroundColor: "#0ABEDC",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  iconCreatePost:{
    color: "white",
    fontSize: 17,
    marginRight: 10
  },
  txtButton:{
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  }
});

export default Perfil;