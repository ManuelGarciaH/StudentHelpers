import React, { Component, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, 
  ScrollView, Image, ActivityIndicator,
  DrawerLayoutAndroid,
  TouchableWithoutFeedback} from 'react-native'
import {globalStyles} from '../../globalStyles';
import ModalLoading from '../components/ModalLoading';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { FIREBASE_DB } from '../../Firebase';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import BuscadorHeader from '../components/BuscadorHeader';
import DrawerCategory from '../components/DrawerCategory';
import MenuDrawer from 'react-native-side-drawer';
import { overlay } from 'react-native-paper';

const Publicaciones = ({ navigation}) => {
  const [downloadedPosts, setDownloadedPosts] = useState([]);
  const [showNoPostsMessage, setShowNoPostsMessage] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Tendencias')
  const [modalLoading, setModalLoading] = useState(true)
  console.log("publicacion")

  const showPosts = async (category) => {
    if(category!="Perfiles"){
      const postsCollection = collection(FIREBASE_DB, "publicaciones");
      let postsQuery
      if(category=="Tendencias"){
        postsQuery = query(postsCollection, where("category", "!=", "Viaje"));
        }else{
          postsQuery = query(postsCollection, where("category", "==", category));
        }

      const unsubscribe = onSnapshot(postsQuery, (querySnapshot) => {
        setDownloadedPosts([]);
        if (querySnapshot.empty) {
          console.log("No hay documentos en la colección 'modulos'");
          setShowNoPostsMessage(true);
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
              days: doc.data().dias,
              contact: doc.data().contacto,
              images: doc.data().image // Agregar las URLs de las imágenes al objeto postD
            };
            newPosts.push(postData);
          });
          setDownloadedPosts(newPosts);
          setShowNoPostsMessage(false);
          setTimeout(() => {
            setModalLoading(false);
          }, 500);
        }
      }, (error) => {
        // console.error("Error al obtener documentos:", error);
      });
      return () => unsubscribe(); // Cleanup on unmount
    }else{
      const usuariosCollection = collection(FIREBASE_DB, "usuarios");
      const unsubscribe = onSnapshot(usuariosCollection, (querySnapshot) => {
        setDownloadedPosts([]);
        if (querySnapshot.empty) {
          console.log("No hay documentos en la colección 'usuarios'");
          setShowNoPostsMessage(true);
        } else {
          const newPosts = [];
          querySnapshot.forEach((doc) => {
            const postData = {
              id: doc.id,
              userName: doc.data().nombre,
              url_photo: doc.data().url_foto,
            };
            newPosts.push(postData);
          });
          console.log(newPosts)
          setDownloadedPosts(newPosts);
          setShowNoPostsMessage(false);
          setTimeout(() => {
            setModalLoading(false);
          }, 700);
        }
      }, (error) => {
        // console.error("Error al obtener documentos:", error);
      });
      return () => unsubscribe(); // Cleanup on unmount
    }
  }

  useEffect(() => {
    showPosts(selectedCategory);
  }, [selectedCategory]); // Se ejecuta solo una vez al montar el componente

  useEffect(() => {
    const timeout = setTimeout(() => {
      mostrar()
    }, 5000);
    return () => clearTimeout(timeout);
  });

  const verPublicacion = (item) => {
    if(!open){
      navigation.navigate("VerPublicacion", { datos: item })
    }
  };

    const mostrar = () => {
      if (downloadedPosts.length === 0) {
        setShowNoPostsMessage(true);
        setModalLoading(true);
      }else{
        setShowNoPostsMessage(false);
        setModalLoading(false);
      }
    }
    const [open, setOpen] = useState(false)
    toggleOpen = () => {
      setOpen(!open);
    };
    const handleCategoryChange = (category) => {
      if(selectedCategory != category){
        setModalLoading(true);
        setSelectedCategory(category)
        setOpen(false)
        showPosts(category)
      }
    };
    return (
      <MenuDrawer
        open={open}
        position={'left'}
        drawerContent={<DrawerCategory setVisible={setOpen} selectedCategory={selectedCategory} handleCategoryChange={handleCategoryChange}/>}
        drawerPercentage={70}
        animationTime={200}
        overlay={true}
        opacity={1}
      >
        <View style={globalStyles.mainContainer}>
          <BuscadorHeader visible={open} setVisible={setOpen}/>
          {open && (
            <TouchableWithoutFeedback onPress={toggleOpen}>
              <View style={styles.overlay} />
            </TouchableWithoutFeedback>
          )}
          {showNoPostsMessage ? (
            <Text style={styles.noPostsMessage}>No hay publicaciones disponibles.</Text>
          ) : (
          <>
          {downloadedPosts > 0  || modalLoading ? (
              <ModalLoading visible={true}/>
            ) : (
              <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                <View style={styles.categoryContainer}>
                  <Text style={styles.textCategoryTitle}>{selectedCategory}</Text>
                </View>
                {downloadedPosts.map((item, index) => (
                  <View key={index} style={styles.cuadro}> 
                    <TouchableOpacity style={styles.itemConteiner} onPress={() => verPublicacion(item)}>
                      {selectedCategory != "Perfiles" ? (
                        <>
                          <View style={styles.imageContainer}>
                            <Image
                              source={{ uri: item.images[0] }}
                              style={styles.image}
                            />
                          </View>
                          <View  style={styles.dataContainer}>
                            <Text style={styles.textTitle} numberOfLines={2}>{item.title}</Text>
                            <Text style={styles.textEmail}>Lugar: {item.location}</Text>
                            <Text style={styles.textEmail}>Días: {item.days.join('-')}</Text>
                            {item.category!="Intercambio" && <Text style={styles.textCost}>$ {item.cost} - $ {item.maxCost}</Text>}
                          </View>
                        </>
                      ) : (
                        <>
                          <View style={styles.imageContainer}>
                            <Image
                              source={{ uri: item.url_photo }}
                              style={styles.image}
                            />
                          </View>
                          <View  style={styles.dataContainer}>
                            <Text style={styles.textUserName}>{item.userName}</Text>
                            <Text style={styles.textCarrer}>Ingenieria en Computación</Text>
                          </View>
                        </>
                      )}
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            )}
            </>
          )}
        </View>
      </MenuDrawer>
    );
}
const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Cambia el color y la opacidad aquí
    flex: 1,
    zIndex: 1,
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
    width: wp("94%"),
  },
  scrollView: {
    // borderWidth: 4,
    // marginTop: 5,
    flex: 1,
  },
  image: {
    width: wp("28%"),
    height: hp("13%"),
    //resizeMode: "contain",
  },
  imageContainer: {
    width: wp("30%"),
    height: hp("16%"),
    padding: 10,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  textName:{
    fontSize: 17,
    fontWeight: "600",
  },
  textEmail:{
    fontSize: 14,
  },
  textTitle:{
    fontSize: 20,
    color: "black",
    fontWeight: "600",
  },
  textCost:{
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  noPostsMessage: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  dataContainer:{
    width: wp("58%")
  },
  categoryContainer:{
    marginBottom:"1%",
    width:"100%"
  },
  textCategoryTitle:{
    fontSize: 36,
    color: "black",
    fontWeight:"bold",
  },
  textUserName:{
    fontSize: 20,
    color: "black",
    fontWeight: "600",
  },
  textCarrer:{
    fontSize: 18,
    color: "black",
  },
});

export default Publicaciones;