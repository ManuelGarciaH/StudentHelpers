import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, {useState, useEffect} from 'react';
import { FIREBASE_DB } from '../../Firebase';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import {globalStyles} from '../../globalStyles';
import ModalLoading from '../components/ModalLoading';
import MapView from 'react-native-maps';
import TraceButton from './seePublicationModals/TraceButton';


const Servicios = ({}) => {
  const [downloadedPosts, setDownloadedPosts] = useState([]);
  const [showNoPostsMessage, setShowNoPostsMessage] = useState(false);
  const [modalLoading, setModalLoading] = useState(true);  
  
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
    return () => unsubscribe(); // Cleanup on unmount
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

    const openModal = (image, index) => {
      setSelectedImage(image);
      setSelectedIndex(index);
      setModalVisible(true);
    } 

    const [open, setOpen] = useState(false)
    toggleOpen = () => {
      setOpen(!open);
    };

    const openMap = () => {
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 20.65415556282134,
            longitude: -103.3246397431702,
          }}>
          <MapView.Marker
            coordinate={{
              latitude: 20.65415556282134,
              longitude: -103.3246397431702,
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
                        <TraceButton   modulo={item.location} />
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
});

export default Servicios;
