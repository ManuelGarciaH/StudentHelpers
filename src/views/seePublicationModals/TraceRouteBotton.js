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

const TraceRouteBotton = ({modulo}) => {
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
    const intervalId = setInterval(getCurrentLocation, 60000); // Actualizar la ubicación cada 60 segundos
    return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
  }, []); // Ejecutar solo una vez al montar el componente

  const getCoordinates = async () => {
    if(!permissionDenied){
      setLoading(true);
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
          //getCurrentLocation();
          setModalTraceRoute(true)
        }
      } catch (error) {
        console.error("Error al obtener documentos:", error);
      }
    }else{
      //setLoading(false);
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
        // Si se otorgan los permisos, obtener la ubicación actual
        getCurrentLocation();
      } else {
        console.log('Permiso de ubicación denegado');
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

const centerMapOnUser = () => {
  if (currentLocation) {
    setMapRegion(prevRegion => ({
      ...prevRegion,
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
    }));
  }
};

return (
    <View>
      <TouchableOpacity onPress={() => {getCoordinates()}}>
          <View style={[globalStyles.dataButton,  styles.buttonGetModule, styles.buttonClose]}>
              <Icon name="map-marker" style={globalStyles.dataIcon}/>
              <Text style={globalStyles.dataTxtButton}>Llegar</Text>
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
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={styles.map}
                        initialRegion={{
                            latitude: 20.655897,
                            longitude: -103.32689,
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121,
                        }}
                        region={mapRegion}
                        minZoomPreference={1} // Ajusta este valor según tus necesidades
                        maxZoomPreference={6} // Ajusta este valor según tus necesidades
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
                            origin={{ latitude: coordinatesModule.latitude, longitude: coordinatesModule.longitude }} // Corregir la forma de pasar las coordenadas
                            destination={{ latitude: currentLocation.latitude, longitude: currentLocation.longitude }} // Corregir la forma de pasar las coordenadas// Usar la segunda coordenada como destino
                            strokeWidth={5}
                            strokeColor="red"
                            mode="WALKING"
                            tracksViewChanges={true} // Evita que la ruta se quite y se vuelva a pintar
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
    // height: hp("77%"),
    // width: wp("90%"),
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
    justifyContent: "space-between", // Distribuye automáticamente el espacio entre los botones
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
    // alignSelf: "center",
    width: wp("95%"),
    marginTop: 10,
    marginBottom: 30,
    // marginLeft: 20,
    // marginRight: 10,
  }
})

export default TraceRouteBotton