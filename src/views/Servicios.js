import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, {useState, useEffect} from 'react';
import { TraceRouteBotton } from '/seePublicationModals/TraceRouteBotton.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FIREBASE_DB } from '../../Firebase';

const Servicios = ({navigation}) => {
  const [downloadedPosts, setDownloadedPosts] = useState([]);
  const [showNoPostsMessage, setShowNoPostsMessage] = useState(false);
  const [modalLoading, setModalLoading] = useState(true)
  

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
      console.log("servicios")
    }

    const [open, setOpen] = useState(false)
    toggleOpen = () => {
      setOpen(!open);
    };

    const verUbicacion = (item) => {
      if(!open){
        navigation.navigate("VerUbicacion", { datos: item })
      }
    };

    const getCoordinates = async () => {
      handleShowRoute();
      setLoading(true);
      setModalSeeRouteTravel(true);
    };

  return (
    <View style={styles.scrollContainer}>
      <ScrollView >
      <Text style={styles.titulo}>Servicios Generales</Text>
        {downloadedPosts.map((item, index) => (
          <View style={styles.content}>
            <Text style={styles.titulo}>Servicios Generales</Text>
            {downloadedPosts.map((servicio, index) => (
              <View key={index} style={styles.cuadro}>
                <TouchableOpacity style={styles.itemConteiner} >
                    <View style={styles.contenido}>
                      <Text style={styles.nombre}>{servicio.nombre}</Text>
                      <Text>{servicio.descripcion}</Text>
                      <Text>{servicio.telefono}</Text>
                      <Text>{servicio.coreo}</Text>
                      <Text>{servicio.horario}</Text>
                    </View>
                    <View style={styles.imageButton} >
                      <Image source={servicio.imagen} style={styles.imagen} />
                      <Image
                        source={{ uri: item.images[0] }}
                        style={styles.imagen}
                      />
                      <View style={styles.buttonUbication} >
                        <Icon name="map-marker" style={styles.dataIcon}/>
                      </View>
                    </View>
                    <TouchableOpacity onPress={() => {getCoordinates()}}>
                      <View >
                          <Icon name="map-marker" style={styles.dataIcon}/>
                          <Text >Ver ruta</Text>
                      </View>
                    </TouchableOpacity>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
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
    marginLeft: 20,
    borderRadius: 5,
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
});

export default Servicios;
