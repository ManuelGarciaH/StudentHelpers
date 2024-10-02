import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, 
  ScrollView, Image, } from 'react-native'
import {globalStyles} from '../../globalStyles';
import ModalLoading from '../components/ModalLoading';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { FIREBASE_DB } from '../../Firebase';
import { collection, onSnapshot } from "firebase/firestore";
import BuscadorHeader from '../components/BuscadorHeader';

const ListProfiles = ({navigation}) => {
    const [downloadedPosts, setDownloadedPosts] = useState([]);
    const [showNoPostsMessage, setShowNoPostsMessage] = useState(false);
    const [modalLoading, setModalLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('');
  
    const showPosts = async () => {
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
                idUser: doc.data().id_usuario,
                url_photo: doc.data().url_foto,
                carrer: doc.data().carrer,
            };
            newPosts.push(postData);
            });
            setDownloadedPosts(newPosts);
            setShowNoPostsMessage(false);
        }
        }, (error) => {
        // console.error("Error al obtener documentos:", error);
        });
        return () => unsubscribe(); // Cleanup on unmount
    }
  
    useEffect(() => {
      showPosts();
    }, []); // Se ejecuta solo una vez al montar el componente
  
    useEffect(() => {
      const timeout = setTimeout(() => {
        mostrar()
      }, 3500);
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
    const watchSellerProfile = (item) => {
        navigation.navigate("ProfileSeller", {userName: item.userName, idUser: item.idUser})
    }
    const filteredPosts = downloadedPosts.filter((item) => 
      item.userName.toLowerCase().includes(searchQuery.toLowerCase())
    );
      return (
        <View style={globalStyles.mainContainer}>
        <BuscadorHeader visible={open} setVisible={setOpen} searchQuery={searchQuery} setSearchQuery={setSearchQuery} showDrawer={false}/>
            {showNoPostsMessage ? (
                <Text style={styles.noPostsMessage}>No hay publicaciones disponibles.</Text>
            ) : (
            <>
            {modalLoading ? (
                // <ActivityIndicator size="large" color="#0000ff" />
                <ModalLoading visible={true}/>
                ) : (
                <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                    <View style={styles.categoryContainer}>
                        <Text style={styles.textCategoryTitle}>Perfiles</Text>
                    </View>
                    {filteredPosts.map((item, index) => (
                      (item.url_photo && item.url_photo!="null") && ( // Verifica que url_photo no sea null o undefined
                        <View key={index} style={styles.cuadro}> 
                          <TouchableOpacity style={styles.itemConteiner} onPress={() => watchSellerProfile(item)}>
                            <View style={styles.imageContainer}>
                              <Image
                                source={{ uri: item.url_photo }}
                                style={styles.image}
                              />
                            </View>
                            <View style={styles.dataContainer}>
                              <Text style={styles.textUserName}>{item.userName}</Text>
                              <Text style={styles.textCarrer}>{item.carrer}</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      )
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
    noPostsMessage: {
      textAlign: "center",
      marginTop: 20,
      fontSize: 16,
    },
    dataContainer:{
      width: wp("58%")
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
    categoryContainer:{
      marginBottom:"1%",
      width: wp("95%"),
    },
    textCategoryTitle:{
      fontSize: 36,
      color: "black",
      fontWeight:"bold",
    },
  });
export default ListProfiles