import { View, Text, Modal, TouchableOpacity, StyleSheet, PermissionsAndroid, Alert } from 'react-native'
import React, {useEffect, useState} from 'react'
import { globalStyles } from '../../../globalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { API_KEY_MAPS } from '@env';
import ModalLoading from '../../components/ModalLoading';

import { FIREBASE_DB } from '../../../Firebase';
import { collection, getDocs, query, where } from "firebase/firestore";
import Geolocation from 'react-native-geolocation-service';

const TraceButton = ({modulo}) => {
  const [modalTraceRoute, setModalTraceRoute] = useState(false);
  const [coordinatesModule, setCoordinatesModule] =useState(null);

  const [currentLocation, setCurrentLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [mapRegion, setMapRegion] = useState({
    latitude: 20.655897,
    longitude: -103.32689,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  const apikey = API_KEY_MAPS;

  useEffect(() =>{
      requestLocationPermission();
  }, [])

  useEffect(() => {
    const intervalId = setInterval(getCurrentLocation, 60000); 
    return () => clearInterval(intervalId); 
  }, []); 

  const getCoordinates = async () => {
    if(!permissionDenied){
      setLoading(true);
      try {
        const modulesCollection = collection(FIREBASE_DB, "modulos");
        const querySnapshot = await getDocs(query(modulesCollection, where("nombre", "==", modulo)));
        if (querySnapshot.empty) {

        } else {
          const doc = querySnapshot.docs[0];
          const newCoordinate = {
            id: doc.id,
            latitude: doc.data().latitud,
            longitude: doc.data().longitud,
            nombre: doc.data().nombre,
            descripcion: 'Descripción del nuevo lugar',
          };
          setCoordinatesModule(newCoordinate);
          setModalTraceRoute(true)
        }
      } catch (error) {
        console.error("Error al obtener documentos:", error);
      }
    }else{
      Alert.alert('Permisos de ubicación negados, favor de activarlos para utilizar esta opción')
    }
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Permiso de ubicación',
          message: 'Esta aplicación necesita acceder a tu ubicación.',
          buttonNeutral: 'Preguntar luego',
          buttonNegative: 'Cancelar',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getCurrentLocation();
      } else {
        setPermissionDenied(true);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
      },
      error => console.error(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  };

const centerMapOnMarker = () => {
  if (coordinatesModule) {
    setMapRegion(prevRegion => ({
      ...prevRegion,
      latitude: coordinatesModule.latitude,
      longitude: coordinatesModule.longitude,
    }));
  }
};

return (
    <View>
      <TouchableOpacity style={styles.buttonUbication} onPress={() => {getCoordinates()}}>
          <View >
              <Icon name="map-marker" style={styles.dataIcon}/>
              
          </View>
      </TouchableOpacity>

      {loading && <ModalLoading visible={loading} />}
      
      {(coordinatesModule && currentLocation) && (
        <Modal
          animationType='fade'  
          transparent={true} 
          visible={modalTraceRoute}
          onRequestClose={() => {
              setModalTraceRoute(false);
              setLoading(false);
          }}>
            <View style={globalStyles.centerContainer}>
                <View style={styles.modalContainerMap}>
                    <Text style={styles.textTitle}>{modulo}</Text>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        initialRegion={{
                            latitude: 20.655897,
                            longitude: -103.32689,
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121,
                        }}
                        region={mapRegion}
                        minZoomPreference={1}
                        maxZoomPreference={6} 
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
                    {(currentLocation != null && coordinatesModule != null) && (    
                        <MapViewDirections
                            apikey={apikey}
                            origin={{ latitude: coordinatesModule.latitude, longitude: coordinatesModule.longitude }}
                            destination={{ latitude: currentLocation.latitude, longitude: currentLocation.longitude }}
                            strokeWidth={5}
                            strokeColor="red"
                            mode="WALKING"
                            tracksViewChanges={true}
                        />
                    )}
                    </MapView>
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity onPress={() => {setModalTraceRoute(false); setLoading(false)}}>
                        <View style={[styles.button, styles.buttonClose]}>
                          <Text style={globalStyles.dataTxtButton}>Cerrar</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={centerMapOnMarker}>
                        <View style={[styles.button, styles.buttonClose]}>
                          <Text style={globalStyles.dataTxtButton}>Centrar en marcador</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  modalContainerMap:{
    backgroundColor: '#B5D8C3',
    borderRadius: 20,
    height: hp("92%"),
    width: wp("95%"),
    padding: 10,
    elevation: 5,
    alignItems: "center",
    justifyContent: "space-between",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  textTitle:{
    fontSize: 24,
    fontWeight: "bold",
    color : "black",
    zIndex: 1,
    borderWidth: 1,
    backgroundColor: '#0ABEDC',
    elevation: 2,
    padding: 5,
    paddingHorizontal: 20,
  },
  buttonContainer:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  button: {
    padding: 10,
    elevation: 2,
    marginLeft: 20,
    marginRight: 10,
  },
  buttonClose: {
    backgroundColor: '#0ABEDC',
  },
  buttonGetModule:{
    padding: 9,
    elevation: 1,
    borderRadius: 0,
    width: wp("94.4%"),
    marginTop: 5,
    marginBottom: 1,
    alignSelf: "center",
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
  dataIcon:{
    color: "white",
    fontSize: 20,
    marginRight: 0,
  },
})

export default TraceButton