import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, 
  ScrollView, Image, ActivityIndicator} from 'react-native'
import {globalStyles} from '../../globalStyles';
import ModalLoading from '../components/ModalLoading';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { FIREBASE_DB } from '../../Firebase';
import { collection, getDocs} from "firebase/firestore";

const Publicaciones = ({ navigation }) => {
  const [downloadedPosts, setDownloadedPosts] = useState([]);

  useEffect(() => {
    const showPosts = async () => {
      console.log("A")
      console.log(downloadedPosts);
      setDownloadedPosts([]);
      try {
        const postsCollection = collection(FIREBASE_DB, "publicaciones");
        const querySnapshot = await getDocs(postsCollection);
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
              category: doc.data().category,
              schedule: doc.data().horario,
              location: doc.data().lugar,
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

    return (
      <View>
        <View style={[globalStyles.form, {padding: 3},]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {downloadedPosts.length === 0 ? (
              // <ActivityIndicator size="large" color="#0000ff" />
                <ModalLoading visible={true}/>
              ) : (
                <ScrollView showsVerticalScrollIndicator={false}>
                  {downloadedPosts.map((item, index) => (
                    <View key={index} > 
                      <TouchableOpacity style={styles.itemConteiner} onPress={() => verPublicacion(item)}>
                        <View style={styles.imageContainer}>
                          <Image
                            source={{ uri: item.images[0] }}
                            style={styles.image}
                          />
                        </View>
                        
                        <View>
                          <Text style={styles.textTitle}>{item.title}</Text>
                          <Text style={styles.textEmail}>Lugar: {item.location}</Text>
                          <Text style={styles.textEmail}>Días: {item.days.join('-')}</Text>
                          <Text style={styles.textEmail}>Horario: {item.schedule}</Text>
                          <Text style={styles.textEmail}>Contacto Externo: {item.contact}</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ))}
                </ScrollView>
              )}
          </ScrollView>
        </View>
      </View>
    );
}
const styles = StyleSheet.create({
  itemConteiner:{
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    elevation: 5,
    marginBottom: 10,
    width: wp("96%"),
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
    marginLeft: 5,
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
    fontSize: 17,
    fontWeight: "600",
  },
});

export default Publicaciones;