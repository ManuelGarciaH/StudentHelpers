import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import { globalStyles } from '../../../globalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { API_KEY_MAPS } from '@env';

import { FIREBASE_DB } from '../../../Firebase';
import { collection, getDocs, query, where } from "firebase/firestore";
// import Geolocation from 'react-native-geolocation-service';

const TraceRouteBotton = ({modulo}) => {
    const [modalTraceRoute, setModalTraceRoute] = useState(false);
    const [coordinatesModule, setCoordinatesModule] =useState(null);

    const [currentLocation, setCurrentLocation] = useState(null);
    const apikey = API_KEY_MAPS;

    const getCoordinates = async () => {
        try {
          console.log("Realizando consulta a la colección 'modulos'");
          const modulesCollection = collection(FIREBASE_DB, "modulos");
          const querySnapshot = await getDocs(query(modulesCollection, where("nombre", "==", modulo)));
          console.log("Consulta completada. Documentos obtenidos:", querySnapshot.docs.length);
          if (querySnapshot.empty) {
            console.log("No hay documentos en la colección 'modulos'");
          } else {
            // Solo estamos obteniendo un documento, por lo que no necesitamos iterar
            const doc = querySnapshot.docs[0];
            console.log("Datos del documento:", doc.data());
            const newCoordinate = {
              id: doc.id,
              latitude: doc.data().latitud,
              longitude: doc.data().longitud,
              nombre: doc.data().nombre,
              descripcion: 'Descripción del nuevo lugar',
            };
            setCoordinatesModule(newCoordinate);
            // getCurrentLocation();
            setModalTraceRoute(true)
          }
        } catch (error) {
          console.error("Error al obtener documentos:", error);
        }
      };

    //   const getCurrentLocation = () => {
    //     Geolocation.getCurrentPosition(
    //       position => {
    //         const { latitude, longitude } = position.coords;
    //         setCurrentLocation({ latitude, longitude });
    //       },
    //       error => console.error(error),
    //       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    //     );
    //   };

  return (
    <View>
        <TouchableOpacity onPress={() => {getCoordinates()}}>
            <View style={globalStyles.dataButton}>
                <Icon name="map-marker" style={globalStyles.dataIcon}/>
                <Text style={globalStyles.dataTxtButton}>Llegar al modulo</Text>
            </View>
        </TouchableOpacity>

      <Modal
        animationType='fade'  transparent={true} visible={modalTraceRoute}
        onRequestClose={() => {
            setModalTraceRoute(false);
        }}>
        <View style={globalStyles.centerContainer}>
            <View style={styles.modalContainerMap}>
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    region={{
                        latitude: 20.655897,
                        longitude: -103.32689,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                    showsUserLocation={true}
                    followsUserLocation={true}
                >
                {coordinatesModule != null && (    
                    <Marker
                        key={coordinatesModule.id}
                        coordinate={{ latitude: coordinatesModule.latitude, longitude: coordinatesModule.longitude }}
                        title={coordinatesModule.nombre}
                        description={coordinatesModule.descripcion}
                    />

                )}

                </MapView>
            </View>
        </View>

      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
    modalContainerMap:{
        backgroundColor: '#B5D8C3',
        borderRadius: 20,
        height: hp("80%"),
        width: wp("95%"),
        padding: 10,
        elevation: 5,
        alignItems: "center",
        justifyContent: "space-between",
    },
    map: {
        height: hp("77%"),
        width: wp("90%"),
        //borderRadius: 20,
    },
})

export default TraceRouteBotton