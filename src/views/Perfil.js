import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import {globalStyles} from '../../globalStyles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import PerfilHeader from '../components/PerfilHeader';
import CreatePostModal from './ProfileModals/CreatePostModal';
import ModalLoading from '../components/ModalLoading';

import { FIREBASE_DB } from '../../Firebase';
import { collection, getDocs, query, where } from "firebase/firestore";
import DeleteConfirmModal from './ProfileModals/DeleteConfirmModal';

const Perfil = ({ navigation }) => {
  //States for modals
  const [modalCreatePost, setModalCreatePost] = useState(false);
  const [modalDeleteConfirm, setModalDeleteConfirm] = useState(false);
  const [downloadedPosts, setDownloadedPosts] = useState([]);
  const [showNoPostsMessage, setShowNoPostsMessage] = useState(false);

  const userName = "Manuel Antonio Garcia";

  useEffect(() => {
    setDownloadedPosts([]);

    const showPosts = async () => {
      try {
        const postsCollection = collection(FIREBASE_DB, "publicaciones");
        const querySnapshot = await getDocs(query(postsCollection, where("nombreUsuario", "==", userName)));
        console.log("Consulta completada. Documentos obtenidos:", querySnapshot.docs.length);
        if (querySnapshot.empty) {
          console.log("No hay documentos en la colección 'modulos'");
        } else {
          const newPosts = [];
          querySnapshot.forEach(async (doc) => {
            console.log("Datos del documento:", doc.data());
            const postData = {
              id: doc.id,
              userName: doc.data().nombreUsuario,
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
              images: doc.data().image // Agregar las URLs de las imágenes al objeto postD
            };
            newPosts.push(postData);
          });
          // console.log(newPosts);
          console.log("Base de datos")
          console.log(downloadedPosts);
          console.log(downloadedPosts.length)
          setDownloadedPosts(newPosts);
        }
      } catch (error) {
        console.error("Error al obtener documentos:", error);
      }
    }
    showPosts();
    
  }, []); // Se ejecuta solo una vez al montar el componente

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
    console.log("algo")
  }

  const openUpdatePosts = (item)=>{
    navigation.navigate("UpdatePosts", { datos: item })
  }

  return (
    <View style={globalStyles.mainContainer}>
      <Text style={styles.titleName}>{userName}</Text>
      <View style={styles.descriptionContainer}>
        <Image
          source={require("../../Img/Sin-foto-Perfil.png")}
          style={styles.image}
        />
        <Text style={styles.textDescription}>In et ullamco consectetur minim exercitation officia proident aliquip tempor voluptate ut anim sunt velit. Elit et eiusmod sunt proident. Do ad aute proident non aute consequat consectetur irure fugiat dolor.</Text>
      </View>
      <Text style={styles.titleName}>Publicaciones</Text>
      <View style={[styles.descriptionContainer, {marginBottom: 5}]}>
        <View style={[globalStyles.centrar, ]}>
          <TouchableOpacity onPress={() => setModalCreatePost(true)}>
            <View style={styles.buttonCreatePost}>
              <Icon name="plus" style={styles.iconCreatePost}/>
              <Text style={styles.txtButton}>Crear Publicación</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <CreatePostModal visible={modalCreatePost} onClose={() => setModalCreatePost(false)} userName={userName} />
      <DeleteConfirmModal visible={modalDeleteConfirm} onClose={() => setModalDeleteConfirm(false)} userName={userName}/>

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
                      <Text style={styles.textCost}>$ {item.cost} - $ {item.maxCost}</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={styles.iconContainer}>
                    <TouchableOpacity  onPress={() => openUpdatePosts(item)}>
                      <View>
                          <Icon name="pencil" style={styles.updateButton} size={25}/>
                      </View>
                    </TouchableOpacity>
                    <View style={styles.verticalSeparator}></View>
                    <TouchableOpacity onPress={() => setModalDeleteConfirm(true)} >
                      <View>
                          <Icon name="trash" style={styles.deleteButton} size={25}/>
                      </View>
                    </TouchableOpacity>
                  </View>
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

export default Perfil;