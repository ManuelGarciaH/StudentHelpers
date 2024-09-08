import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import {globalStyles} from '../../globalStyles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ModalLoading from '../components/ModalLoading';

import { FIREBASE_DB } from '../../Firebase';
// import { collection, getDocs, query, where } from "firebase/firestore";
import { collection, query, where, onSnapshot } from "firebase/firestore";

const ProfileSeller  = ({ navigation, route }) => {
const { userName, idUser } = route.params;
  //States for modals
  const [modalCreatePost, setModalCreatePost] = useState(false);
  const [downloadedPosts, setDownloadedPosts] = useState([]);
  const [showNoPostsMessage, setShowNoPostsMessage] = useState(false);
  const [downloadedUsers, setDownloadedUsers] = useState('');

  useEffect(() => {
    setDownloadedUsers('');
    const usuariosTable = collection(FIREBASE_DB, "usuarios");
    const postsQuery = query(usuariosTable, where("id_usuario", "==", idUser));

    const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
      if (snapshot.empty) {
        console.log("No hay documentos en la colección 'usuarios'");
      } else {
        const doc = snapshot.docs[0];
        const postData = {
          id: doc.id,
          description: doc.data().description,
          name: doc.data().nombre,
          url_photo: doc.data().url_foto,
        };
        setDownloadedUsers(postData);
      }
    }, (error) => {
      console.error("Error al obtener documentos:", error);
    });

    // Cleanup function to unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setDownloadedPosts([]);

    const postsCollection = collection(FIREBASE_DB, "publicaciones");
    const postsQuery = query(postsCollection, where("nombreUsuario", "==", userName));

    const unsubscribe = onSnapshot(postsQuery, (querySnapshot) => {
      if (querySnapshot.empty) {
        console.log("No hay documentos en la colección 'publicaciones'");
      } else {
        const newPosts = [];
        querySnapshot.forEach((doc) => {
          const postData = {
            id: doc.id,
            userName: doc.data().nombreUsuario,
            idUser: doc.data().id_usuario,
            title: doc.data().titulo,
            details: doc.data().detalles,
            cost: doc.data().costo,
            maxCost: doc.data().costoMaximo,
            cantidad: doc.data().cantidad,
            category: doc.data().category,
            schedule: doc.data().horario,
            scheduleEnd: doc.data().horarioFin,
            location: doc.data().lugar,
            coordinates: doc.data().coordenadas,
            days: doc.data().dias,
            contact: doc.data().contacto,
            images: doc.data().image, // Agregar las URLs de las imágenes al objeto postD
            popularity: doc.data().popularidad
          };
          newPosts.push(postData);
        });
        setDownloadedPosts(newPosts);
      }
    }, (error) => {
      console.error("Error al obtener documentos:", error);
    });

    // Cleanup function to unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, [userName]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      mostrar()
    }, 5000);
    return () => clearTimeout(timeout);
  });

  const verPublicacion = (item) => {
    navigation.navigate("VerPublicacion", { datos: item })
  };

  const mostrar = () => {
    if (downloadedPosts.length === 0) {
      setShowNoPostsMessage(true);
    }else{
      setShowNoPostsMessage(false);
    }
  }

  const openUpdatePosts = (item)=>{
    navigation.navigate("UpdatePosts", { datos: item })
  }

  return (
    <View style={globalStyles.mainContainer}>
      <Text style={styles.titleName}>{userName}</Text>
      <View style={styles.descriptionContainer}>
        {(!downloadedUsers.url_photo || downloadedUsers.url_photo=="null") 
            && <Image source={require("../../Img/Sin-foto-Perfil.png")} style={styles.image}/>}
          
        {(downloadedUsers.url_photo && downloadedUsers.url_photo!="null") 
            &&<Image source={{ uri: downloadedUsers.url_photo }} style={styles.image} /> }
        {downloadedUsers.description=='' &&  <Text style={styles.textDescription}>Ingresa configuración para agregar una foto de perfil y descripción.</Text>}  
        {downloadedUsers.description!='' &&  <Text style={styles.textDescription}>{downloadedUsers.description}</Text>} 
      </View>
      <Text style={styles.titleName}>Publicaciones</Text>
      <View style={[styles.descriptionContainer, {marginBottom: 5, borderWidth: 0.5}]}>
      </View>

      {showNoPostsMessage ? (
        <Text style={styles.noPostsMessage}>No hay publicaciones disponibles.</Text>
      ) : (
        <>
          {downloadedPosts.length === 0 ? (
            <ModalLoading visible={true}/>
          ) : (
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
              {downloadedPosts.map((item, index) => (
                <View key={index} style={styles.cuadro}>
                  <TouchableOpacity style={styles.itemConteiner} onPress={() => verPublicacion(item)}>
                    <View style={styles.imageContainer}> 
                      <Image
                        source={{ uri: item.images[0] }}
                        style={styles.imageStyle}
                      />
                    </View>

                    <View style={styles.dataContainer}>
                      <Text style={styles.textTitle} numberOfLines={2}>{item.title}</Text>
                      {item.category!="Viaje" && <Text style={styles.textEmail}>Lugar: {item.location}</Text>}
                      <Text style={styles.textEmail}>Días: {item.days.join('-')}</Text>
                      {/* <Text style={styles.textEmail}>Horario: {item.schedule} - {item.scheduleEnd}</Text> */}
                      {/* <Text style={styles.textEmail}>Contacto Externo: {item.contact}</Text> */}
                      {item.category=="Viaje" && <Text style={styles.textEmail}>Pasajeros disponibles: {item.cantidad}</Text>}
                      {item.category!="Intercambio" && <Text style={styles.textCost}>$ {item.cost} - $ {item.maxCost}</Text>}
                    </View>
                  </TouchableOpacity>
                </View>

              ))}
            </ScrollView>

          )}
        </>
      )}
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
  scrollView: {
    // borderWidth: 4,
    marginTop: 5,
    flex: 1,
  },
  textDescription:{
   // marginRight: 150,
   width: wp("55%"),
   marginLeft: 5,
   marginRight: 4,
   textAlign: "justify",
   width:"62%",
   height: "93%"
  },
  imageStyle: {
    width: wp("28%"),
    height: hp("13%"),
  },
  imageContainer: {
    width: wp("30%"),
    height: hp("16%"),
    padding: 10,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
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
  },
  cuadro: {
    flexDirection: 'row', 
    alignItems: 'center',
    backgroundColor: '#9C9C9C',
    padding: 2,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 0,
    elevation: 6,
  },
  itemConteiner:{
    flexDirection: "row",
    alignItems: "center",
    width: wp("92%"),
  },
  image:{
    margin: 7,
    marginRight: 5,
    marginLeft: 10,
    width: wp("30%"),
    height: hp("15%"),
  },
  textTitle:{
    fontSize: 20,
    fontWeight: "600",
    color: "black",
  },
  textEmail:{
    fontSize: 14,
  },
  textCost:{
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  iconContainer:{
    alignItems: "center",
    width: wp("10.5%"),
    marginHorizontal: 5,
  },
  updateButton:{
    padding: 8,
    backgroundColor:"#0ABEDC",
    borderRadius: 5,
    color: "black",
  },
  deleteButton:{
    padding: 8,
    backgroundColor:"red",
    borderRadius: 5,
    color: "black",
  },
  verticalSeparator:{
    marginVertical: 9,
  },
  dataContainer:{
    width: wp("50%")
  },
});

export default ProfileSeller ;