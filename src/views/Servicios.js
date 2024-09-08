import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, {useState, useEffect} from 'react';
import { TraceRouteBotton } from '/seePublicationModals/TraceRouteBotton.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FIREBASE_DB } from '../../Firebase';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import {globalStyles} from '../../globalStyles';
import ModalLoading from '../components/ModalLoading';
import Swiper from 'react-native-swiper';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

const Servicios = ({navigation, route}) => {
  // const { datos } = route.params;

  const [downloadedPosts, setDownloadedPosts] = useState([]);
  const [showNoPostsMessage, setShowNoPostsMessage] = useState(false);
  const [modalLoading, setModalLoading] = useState(true)

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // const imagenes = datos.images.map(image => ({ uri: image }));
  
  const showPosts = async () => {
    const postsCollection = collection(FIREBASE_DB, "servicios");
    let postsQuery
    postsQuery = query(postsCollection);
    

    const unsubscribe = onSnapshot(postsQuery, (querySnapshot) => {
      setDownloadedPosts([]);
      if (querySnapshot.empty) {
        setShowNoPostsMessage(true);
      } else {
        const newPosts = [];
        querySnapshot.forEach((doc) => {
          const postData = {
            id: doc.id,
            title: doc.data().title,
            details: doc.data().description,
            schedule: doc.data().schedule,
            location: doc.data().ubication,
            phone: doc.data().phone,
            mail: doc.data().mail,
            image: doc.data().image
          };
          newPosts.push(postData);
        });
        setDownloadedPosts(newPosts);
        setShowNoPostsMessage(false);
      }
      
    });
    return () => unsubscribe();
  }

  useEffect(() => {
    showPosts();
  }, []);
  

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

    const openMapModal = () => {
      setModalVisible(true);
    }

    const openModal = (image, index) => {
      setSelectedImage(image);
      setSelectedIndex(index);
      setModalVisible(true);
    } 

    const closeModal = () => {
      setModalVisible(false);
      setSelectedImage(null);
    }

    const [open, setOpen] = useState(false)
    toggleOpen = () => {
      setOpen(!open);
    };

    const openMap = () => {
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: $LATITUDE$,
            longitude: $LONGITUDE$,
            latitudeDelta: $LATITUDE_DELTA$,
            longitudeDelta: $LONGITUDE_DELTA$,
          }}>
          <MapView.Marker
            coordinate={{
              latitude: $MARKER_LATITUDE$,
              longitude: $MARKER_LONGITUDE$,
            }}
            title="Location"
            description="This is the location"
            onPress={() => openMap(item.location)}
          />
        </MapView>
    };



    return (
        <View style={globalStyles.mainContainer}>
          {showNoPostsMessage ? (
            <Text style={styles.noPostsMessage}>No hay servicios disponibles.</Text>
          ) : (
          <>
          {modalLoading ? (
              <ModalLoading visible={true}/>
            ) : (
              <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                {downloadedPosts.map((item, index) => (
                  <View key={index} style={styles.cuadro}> 
                    <TouchableOpacity style={styles.itemConteiner}>
                      <View style={styles.imageButton}>
                        <Image
                          source={{ uri: item.image[0] }}
                          style={styles.imagen}
                        />
                        <TouchableOpacity style={styles.buttonUbication} >
                          <Icon name="map-marker" style={styles.dataIcon}/>
                          
                        </TouchableOpacity> 
                        {/* <View style={styles.contendorImagenes}>
                          <Swiper style={styles.wrapper} showsButtons={false} 
                              loop={false}
                              loopClonesPerSide={1}
                              index={selectedIndex}>
                              {imagenes.map((imagen, index) => (
                                  <TouchableOpacity key={index} onPress={() => openMapModal()} style={styles.slide}>
                                      <View>
                                          <Image source={imagen} style={styles.image} />
                                      </View>
                                  </TouchableOpacity>
                              ))}
                          </Swiper>
                        </View> */}
                      </View>
                      
                      <View  style={styles.contenido}>
                        <Text style={styles.nombre} numberOfLines={2}>{item.title}</Text>
                        <Text >{item.details}</Text>
                        <Text >{item.schedule}</Text>
                        <Text >{item.phone}</Text>
                        <Text >{item.mail}</Text>
                        <Text >Lugar: {item.location}</Text>
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
  scrollView: {
    marginTop: 5,
    flex: 1,
  },
  buttonUbication: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', 
    backgroundColor: '#A7DBCB',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 20,
    height: 50,
    width: 50,
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#A7DBCB',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'grey',
  },
  cuadro: {
    flexDirection: 'row', 
    alignItems: 'center',
    backgroundColor: 'grey',
    padding: 20,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.8,
    shadowRadius: 0,
    elevation: 10,
  },
  contenido: {
    flex: 1, 
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemConteiner:{
    flexDirection: "row",
    alignItems: "center",
    width: 300,
  },
  imagen: {
    width: 80,
    height: 80,
    marginLeft: -2,
    borderRadius: 5,
    marginRight: 10,

  },
  dataIcon:{
    color: "white",
    fontSize: 20,
    marginRight: 0,
  },
  imageButton:{
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  noPostsMessage: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  buttonUbication: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    marginLeft: 0,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 80,
  },
});

export default Servicios;
