import React, { Component, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, 
  ScrollView, Image, ActivityIndicator,
  DrawerLayoutAndroid,
  TouchableWithoutFeedback} from 'react-native'
import {globalStyles} from '../../globalStyles';
import ModalLoading from '../components/ModalLoading';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { FIREBASE_DB } from '../../Firebase';
import { collection, query, where, onSnapshot, orderBy, limit } from "firebase/firestore";
import BuscadorHeader from '../components/BuscadorHeader';
import DrawerCategory from '../components/DrawerCategory';
import MenuDrawer from 'react-native-side-drawer';
import { overlay } from 'react-native-paper';

const Publicaciones = ({ navigation}) => {
  const [downloadedPosts, setDownloadedPosts] = useState([]);
  const [showNoPostsMessage, setShowNoPostsMessage] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Tendencias')
  const [modalLoading, setModalLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('');

  const showPosts = async (category) => {
    const postsCollection = collection(FIREBASE_DB, "publicaciones");
    let postsQuery
    if(category=="Tendencias"){
      postsQuery = query(postsCollection, 
        orderBy("total_views", "desc"), // Ordena de mayor a menor
        limit(10) // Limita a los primeros 20
      );
    }else{
      postsQuery = query(postsCollection, 
        where("category", "==", category),
        orderBy("total_views", "desc"), // Ordena de mayor a menor
        limit(10) // Limita a los primeros 20
      );
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
            coordinates: doc.data().coordenadas,
            location: doc.data().lugar,
            days: doc.data().dias,
            contact: doc.data().contacto,
            images: doc.data().image, // Agregar las URLs de las imágenes al objeto postD
            total_views: doc.data().total_views
          };
          newPosts.push(postData);
        });
        setDownloadedPosts(newPosts);
        setShowNoPostsMessage(false);
        setTimeout(() => {
          setModalLoading(false)
        }, 600);
      }
      
    }, (error) => {
       //console.log("Error al obtener documentos:", error);
    });
    
    return () => unsubscribe(); // Cleanup on unmount
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
    }
    const [open, setOpen] = useState(false)
    toggleOpen = () => {
      setOpen(!open);
    };
    const handleCategoryChange = (category) => {
      setSelectedCategory(category)
      setSearchQuery("")
      setOpen(false)
      setModalLoading(true)
    };
    const filteredPosts = downloadedPosts.filter((item) => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
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
        <BuscadorHeader visible={open} setVisible={setOpen} searchQuery={searchQuery} setSearchQuery={setSearchQuery} showDrawer={true}/>
          {open && (
            <TouchableWithoutFeedback onPress={toggleOpen}>
              <View style={styles.overlay} />
            </TouchableWithoutFeedback>
          )}
          {showNoPostsMessage ? (
            <View style={styles.center}>
              <Text style={styles.noPostsMessage}>No hay publicaciones disponibles.</Text>
              <Image style={styles.imgHeaderLogo} source={require('../../Img/Logo.png')} />
            </View>
          ) : (
          <>
          {modalLoading ? (
            // <ActivityIndicator size="large" color="#0000ff" />
              <ModalLoading visible={true}/>
            ) : (
              <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                <View style={styles.categoryContainer}>
                  <Text style={styles.textCategoryTitle}>{selectedCategory}</Text>
                </View>
                {filteredPosts.map((item, index) => (
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
                        {item.category!="Viaje" && <Text style={styles.textEmail}>Lugar: {item.location}</Text>}
                        <Text style={styles.textEmail}>Días: {item.days.join('-')}</Text>
                        {/* <Text style={styles.textEmail}>Horario: {item.schedule} - {item.scheduleEnd}</Text> */}
                        {/* <Text style={styles.textEmail}>Contacto Externo: {item.contact}</Text> */}
                        {item.category=="Viaje" && <Text style={styles.textEmail}>Asientos: {item.cantidad}</Text>}
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
    backgroundColor: '#F2F2F2',
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
    color: '#000000'
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
    width: wp("95%"),
  },
  textCategoryTitle:{
    textAlign:"left",
    fontSize: 36,
    color: "black",
    fontWeight:"bold",
  },
  center:{
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  imgHeaderLogo:{
        marginRight: "1%",
        opacity: 0.5,
        width: wp('50%'),
        height: hp('25%'),
    },
});

export default Publicaciones;