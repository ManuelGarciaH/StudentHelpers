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

  const showPosts = async (category) => {
    const postsCollection = collection(FIREBASE_DB, "publicaciones");
    let postsQuery
    if(category=="Tendencias"){
      postsQuery = query(postsCollection, where("category", "!=", "Viaje"));
    }else{
      postsQuery = query(postsCollection, where("category", "==", category));
    }

    const unsubscribe = onSnapshot(postsQuery, (querySnapshot) => {
      console.log("A");
      setDownloadedPosts([]);
      if (querySnapshot.empty) {
        console.log("No hay documentos en la colección 'modulos'");
        setShowNoPostsMessage(true);
      } else {
        const newPosts = [];
        querySnapshot.forEach((doc) => {
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
            days: doc.data().dias,
            contact: doc.data().contacto,
            images: doc.data().image // Agregar las URLs de las imágenes al objeto postD
          };
          newPosts.push(postData);
        });
        console.log(newPosts);
        setDownloadedPosts(newPosts);
        setShowNoPostsMessage(false);
      }
      
    }, (error) => {
      console.error("Error al obtener documentos:", error);
    });
    setTimeout(() => {
      setModalLoading(false);
    }, 1000);
    return () => unsubscribe(); // Cleanup on unmount
  }

  useEffect(() => {
    showPosts(selectedCategory);
  }, []); // Se ejecuta solo una vez al montar el componente

    const verPublicacion = (item) => {
      if(!open){
        navigation.navigate("VerPublicacion", { datos: item })
      }
    };

    useEffect(() => {
      const timeout = setTimeout(() => {
        mostrar()
      }, 5000);
      return () => clearTimeout(timeout);
    });

    const mostrar = () => {
      if (downloadedPosts.length === 0) {
        setShowNoPostsMessage(true);
        setModalLoading(true);
      }else{
        setShowNoPostsMessage(false);
        setModalLoading(false);
      }
      console.log("algo")
    }
    const [open, setOpen] = useState(false)
    toggleOpen = () => {
      setOpen(!open);
    };
    const handleCategoryChange = (category) => {
      if(selectedCategory != category){
        setSelectedCategory(category)
        setModalLoading(true);
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
          {modalLoading ? (
            // <ActivityIndicator size="large" color="#0000ff" />
              <ModalLoading visible={true}/>
            ) : (
              <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                {downloadedPosts.map((item, index) => (
                  <View key={index} style={styles.cuadro}> 
                    <TouchableOpacity style={styles.itemConteiner} onPress={() => verPublicacion(item)}>
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
                        {/* <Text style={styles.textEmail}>Horario: {item.schedule} - {item.scheduleEnd}</Text> */}
                        {/* <Text style={styles.textEmail}>Contacto Externo: {item.contact}</Text> */}
                        <Text style={styles.textCost}>$ {item.cost} - $ {item.maxCost}</Text>
                      </View>
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
    marginTop: 5,
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
});

export default Publicaciones;