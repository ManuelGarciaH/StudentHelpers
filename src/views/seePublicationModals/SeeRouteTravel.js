import { View, Text, Modal, TouchableOpacity, StyleSheet, PermissionsAndroid  } from 'react-native'
import React, {useEffect, useState} from 'react'
import { globalStyles } from '../../../globalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { API_KEY_MAPS } from '@env';
import ModalLoading from '../../components/ModalLoading';

const SeeRouteTravel = ({location}) => {
  const [modalSeeRouteTravel, setModalSeeRouteTravel] = useState(false);
  const [loading, setLoading] = useState(false);

  const [coordinatesOrigin, setCoordinatesOrigin] = useState(null);
  const [coordinatesParkingStudents, setCoordinatesParkingStudents] = useState({
    latitude: 20.65415556282134,
    longitude: -103.3246397431702,
    title: "Estacionamiento de estudiantes",
    descripcion : "Algo",
  });
  const [mapRegion, setMapRegion] = useState({
    latitude: 20.65415556282134,
    longitude: -103.3246397431702,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });

  const getCoordinates = async () => {
    handleShowRoute();
    setLoading(true);
    setModalSeeRouteTravel(true);
  };

  const handleShowRoute = () => {
    const newRegion = {
      latitude: (coordinatesParkingStudents.latitude + coordinatesOrigin.latitude) / 2,
      longitude: (coordinatesParkingStudents.longitude + coordinatesOrigin.longitude) / 2, // Corregir aquí
      latitudeDelta: Math.abs(coordinatesParkingStudents.latitude - coordinatesOrigin.latitude) * 1.3,
      longitudeDelta: Math.abs(coordinatesParkingStudents.longitude - coordinatesOrigin.longitude) * 1.3, // Corregir aquí
    };

    setMapRegion(newRegion);
  };

    useEffect(() =>{
        setCoordinatesOrigin(location);
    }, [])

    const apikey = API_KEY_MAPS;

  return (
    <View>
        <TouchableOpacity onPress={() => {getCoordinates()}}>
          <View style={[globalStyles.dataButton,  styles.buttonGetModule, styles.buttonClose]}>
              <Icon name="map-marker" style={globalStyles.dataIcon}/>
              <Text style={globalStyles.dataTxtButton}>Ver ruta</Text>
          </View>
        </TouchableOpacity>

        <ModalLoading visible={loading} />

        <Modal
            animationType='fade'  transparent={true} visible={modalSeeRouteTravel}
            onRequestClose={() => {
                setModalSeeRouteTravel(false);
                setLoading(false);
            }}>
            <View style={globalStyles.centerContainer}>
                <View style={styles.modalContainerMap}>
                    <Text style={styles.textTitle}>Estacionamiento estudiantes</Text>
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
                    >
                    {coordinatesParkingStudents != null && (    
                        <Marker
                            key={coordinatesParkingStudents.id}
                            coordinate={{ latitude: coordinatesParkingStudents.latitude, longitude: coordinatesParkingStudents.longitude }}
                            title={coordinatesParkingStudents.nombre}
                            description={coordinatesParkingStudents.descripcion}
                        />
                    )}
                    {coordinatesOrigin != null && (    
                        <Marker
                            key={1}
                            coordinate={{ latitude: coordinatesOrigin.latitude, longitude: coordinatesOrigin.longitude }}
                            title="Marcador origen"
                            description="Poner descripcion"
                        />
                    )}
                    {(coordinatesParkingStudents != null && coordinatesOrigin != null) && (    
                        <MapViewDirections
                            apikey={apikey}
                            origin={{ latitude: coordinatesOrigin.latitude, longitude: coordinatesOrigin.longitude }} // Corregir la forma de pasar las coordenadas
                            destination={{ latitude: coordinatesParkingStudents.latitude, longitude: coordinatesParkingStudents.longitude }} // Corregir la forma de pasar las coordenadas// Usar la segunda coordenada como destino
                            strokeWidth={5}
                            strokeColor="red"
                            mode="DRIVING"
                            tracksViewChanges={true} // Evita que la ruta se quite y se vuelva a pintar
                        />
                    )}
                    </MapView>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() =>{setModalSeeRouteTravel(false);  setLoading(false);}}>
                            <View style={[styles.button, styles.buttonClose]}>
                                <Text style={globalStyles.dataTxtButton}>Cerrar</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    </View>
  )
}

const styles = StyleSheet.create ({
    modalContainerMap:{
        backgroundColor: '#B5D8C3',
        height: hp("92%"),
        width: wp("95%"),
        padding: 10,
        elevation: 5,
        // alignItems: "center",
        justifyContent: "space-between",
      },
      map: {
        // height: hp("77%"),
        // width: wp("90%"),
        ...StyleSheet.absoluteFillObject,
      },
      textTitle:{
        fontSize: 24,
        fontWeight: "bold",
        color : "black"
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
      buttonGetModule:{
        padding: 9,
        elevation: 1,
        alignSelf: "center",
        width: wp("95%"),
        marginTop: 10,
        marginBottom: 30,
        // marginLeft: 20,
        // marginRight: 10,
      },
      buttonClose: {
        backgroundColor: '#0ABEDC',
      },
})

export default SeeRouteTravel