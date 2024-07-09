import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, ActivityIndicator, Modal } from 'react-native'
import {globalStyles} from '../../globalStyles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import PerfilHeader from '../components/PerfilHeader';
import CreatePostModal from './ProfileModals/CreatePostModal';
import ModalLoading from '../components/ModalLoading';

import { FIREBASE_AUTH, FIREBASE_DB } from '../../Firebase';
// import { collection, getDocs, query, where } from "firebase/firestore";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import DeleteConfirmModal from './ProfileModals/DeleteConfirmModal';
import { Button } from 'react-native-paper';
import { getAuth, reload, updateProfile } from "firebase/auth";
import { useNavigation, useFocusEffect } from '@react-navigation/native';


const Perfil = ({ navigation}) => {
  //States for modals
  const [modalCreatePost, setModalCreatePost] = useState(false);
  const [downloadedPosts, setDownloadedPosts] = useState([]);
  const [downloadedUsers, setDownloadedUsers] = useState('');
  const [showNoPostsMessage, setShowNoPostsMessage] = useState(false);
  const [modalConfiguration, setModalConfiguration] = useState(false)
  const [currentUser, setCurrentUser] = useState(getAuth().currentUser);
  const [reloadPhoto, setReloadPhoto] = useState(true)

  // const userName = "Manuel Antonio Garcia";
  const userName = currentUser.displayName;

  useEffect(() => {
    setDownloadedPosts([]);
    setCurrentUser(getAuth().currentUser)

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
            images: doc.data().image // Agregar las URLs de las imágenes al objeto postData
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
    setDownloadedUsers('');
    const usuariosTable = collection(FIREBASE_DB, "usuarios");
    const postsQuery = query(usuariosTable, where("id_usuario", "==", currentUser.uid));

    const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
      if (snapshot.empty) {
        console.log("No hay documentos en la colección 'usuarios'");
      } else {
        const doc = snapshot.docs[0];
        const postData = {
          id: doc.id,
          description: doc.data().description,
          carrer: doc.data().carrer,
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
  }, [userName]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      mostrar()
    }, 5000);
    return () => clearTimeout(timeout);
  });

  const verPublicacion = (item) => {
    navigation.navigate("VerPublicacion", { datos: item,  isOwner: true})
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

  const closeModalConfiguration = () => {
    setModalConfiguration(false)
  }

  const EditProfile = () => {
    setModalConfiguration(false)
    navigation.navigate("EditProfile", {description: downloadedUsers.description, id: downloadedUsers.id, carrer: downloadedUsers.carrer})
  }

  return (
    <View style={globalStyles.mainContainer}>
      <PerfilHeader modalConfiguration={modalConfiguration} setModalConfiguration={setModalConfiguration} />
      <Text style={styles.titleName}>{userName}</Text>
      <View style={styles.descriptionContainer}>
        {!downloadedUsers ? (
          <View style={[{justifyContent: "center", alignItems: "center", width: "100%", height: "34.3%"}]}>
            <ActivityIndicator style={styles.activityIndicator} color="#0000ff" />
          </View>
        ) : (
          <>
            {(!downloadedUsers.url_photo || downloadedUsers.url_photo=="null") 
              && <Image source={require("../../Img/Sin-foto-Perfil.png")} style={styles.image}/>}
            {(downloadedUsers.url_photo && downloadedUsers.url_photo!="null") 
              &&<Image source={{ uri: downloadedUsers.url_photo }} style={styles.image} /> }
            {!downloadedUsers &&  <Text style={styles.textDescription}>Ingresa configuración para agregar una foto de perfil y descripción.</Text>}  
            {downloadedUsers.description &&  <Text style={styles.textDescription}>{downloadedUsers.description}</Text>}  
          </>
          )}
       
      </View>
      <Text style={styles.titleName}>Publicaciones</Text>
      <View style={[styles.descriptionContainer, {marginBottom: 5}]}>
        <View style={[globalStyles.centrar, {flex: 1}]}>
          <TouchableOpacity onPress={() => setModalCreatePost(true)}>
            <View style={styles.buttonCreatePost}>
              <Icon name="plus" style={styles.iconCreatePost}/>
              <Text style={styles.txtButton}>Crear Publicación</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <CreatePostModal visible={modalCreatePost} onClose={() => setModalCreatePost(false)} userName={userName} id={currentUser.uid}/>

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
                  <View style={styles.iconContainer}>
                    <TouchableOpacity  onPress={() => openUpdatePosts(item)}>
                      <View>
                          <Icon name="pencil" style={styles.updateButton} size={25}/>
                      </View>
                    </TouchableOpacity>
                    <View style={styles.verticalSeparator}></View>

                    <DeleteConfirmModal userName={userName} item={item}/>

                  </View>
                </View>
                

              ))}
            </ScrollView>
            
          )}
        </>
        
      )}
      <Modal
        transparent={true}
        visible={modalConfiguration}
        onRequestClose={closeModalConfiguration}
      >  
        <View style={[globalStyles.centerContainer, {justifyContent:"flex-start", backgroundColor: 'rgba(0, 0, 0, 0.2)',}]}>
          <View style={styles.modalContainer}>
          <View style={styles.delimitador}></View>
          <TouchableOpacity onPress={EditProfile}>
              <View style={styles.containerConfigButtons}>
                <Text style={styles.textConfigButtons}>Editar perfil</Text>
              </View>
          </TouchableOpacity>
          <View style={styles.delimitador}></View>
          <TouchableOpacity>
              <View style={styles.containerConfigButtons}>
                <Text style={styles.textConfigButtons}>Cambiar contraseña</Text>
              </View>
          </TouchableOpacity>
          <View style={styles.delimitador}></View>
          <TouchableOpacity onPress={closeModalConfiguration}>
              <View style={styles.containerConfigButtons}>
                <Text style={styles.textConfigButtons}>Cerrar</Text>
              </View>
          </TouchableOpacity>
          <View style={styles.delimitador}></View>
          <View style={[styles.delimitador, {marginTop: "25%"}]}></View>
          <TouchableOpacity onPress={ () => FIREBASE_AUTH.signOut() }>
              <View style={styles.containerLogOutButton}>
                <Text style={styles.textConfigButtons}>LogOut</Text>
              </View>
          </TouchableOpacity>
          <View style={styles.delimitador}></View>
          </View>
        </View>
      </Modal>
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
    width: wp("81.5%"),
  },
  image:{
    margin: 7,
    marginRight: 5,
    marginLeft: 10,
    width: 120,
    height: 120,
    // width: wp("30%"),
    // height: hp("15%"),
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
  modalContainer: {
    backgroundColor: '#B5D8C3',
    width: wp("75%"),
    elevation: 5,
    alignSelf:"flex-end",
  },
  containerConfigButtons:{
    backgroundColor: "#8CD1A9",
    height: hp("6%"),
    flexDirection: "row",
    alignItems: "center",
  },
  textConfigButtons:{
    marginLeft: "8%",
    fontSize: 20,
    color: "black",
  },
  containerLogOutButton:{
    backgroundColor: '#0ABEDC',
    height: hp("6%"),
    flexDirection: "row",
    alignItems: "center",
  },
  delimitador:{
    height: 0.4, 
    width: "100%", 
    backgroundColor: "grey"
  },
  activityIndicator:{
    transform: [{ scale: 4.5 }],
    marginLeft: "5%",
  },
});

export default Perfil;