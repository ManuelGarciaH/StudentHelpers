import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, 
  ScrollView, Image, ActivityIndicator} from 'react-native'
import {globalStyles} from '../../globalStyles';
import ModalLoading from '../components/ModalLoading';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { FIREBASE_DB } from '../../Firebase';
import { collection, getDocs, query, where } from "firebase/firestore";

const Viajes = ({ navigation }) => {
  const [downloadedPosts, setDownloadedPosts] = useState([]);
  const [showNoPostsMessage, setShowNoPostsMessage] = useState(false);

  useEffect(() => {
    const showPosts = async () => {
      console.log("A")
      console.log(downloadedPosts);
      setDownloadedPosts([]);
      try {
        const postsCollection = collection(FIREBASE_DB, "publicaciones");
        const querySnapshot = await getDocs(query(postsCollection, where("category", "==", "Viaje")));
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
              coordinates: doc.data().coordenadas,
              days: doc.data().dias,
              contact: doc.data().contacto,
              images: doc.data().image // Agregar las URLs de las imágenes al objeto postD
            };
            newPosts.push(postData);
          });
          console.log(newPosts);
          setDownloadedPosts(newPosts);
        }
      } catch (error) {
        console.error("Error al obtener documentos:", error);
      }
    }
    
    showPosts();
  }, []); // Se ejecuta solo una vez al montar el componente

    const verPublicacion = (item) => {
      navigation.navigate("VerPublicacion", { datos: item })
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
      }else{
        setShowNoPostsMessage(false);
      }
      console.log("algo")
    }

    return (
      <View style={globalStyles.mainContainer}>
        {showNoPostsMessage ? (
            <Text style={styles.noPostsMessage}>No hay viajes disponibles.</Text>
          ) : (
          <>
          {downloadedPosts.length === 0 ? (
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
                      
                      <View>
                        <Text style={styles.textTitle}>{item.title}</Text>
                        <Text style={styles.textEmail}>Días: {item.days.join('-')}</Text>
                        {/* <Text style={styles.textEmail}>Horario: {item.schedule} - {item.scheduleEnd}</Text>
                        <Text style={styles.textEmail}>Contacto Externo: {item.contact}</Text> */}
                        <Text style={styles.textEmail}>Asientos: {item.cantidad}</Text>
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
    );
}

const styles = StyleSheet.create({
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
  image: {
    width: wp("28%"),
    height: hp("13%"),
    //resizeMode: "contain",
  },
  scrollView: {
    // borderWidth: 4,
    marginTop: 5,
    flex: 1,
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
    fontWeight: "600",
    color: "black",
  },
  textCost:{
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  scrollView: {
    // borderWidth: 4,
    marginTop: 5,
    flex: 1,
  },
});

export default Viajes