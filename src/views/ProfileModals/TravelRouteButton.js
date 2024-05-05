import { View, Text, Modal, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView} from 'react-native'
import React, {useEffect, useState, useRef } from 'react'
import { globalStyles } from '../../../globalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { API_KEY_MAPS } from '@env';
import ModalLoading from '../../components/ModalLoading';
import { Controller } from 'react-hook-form';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const TravelRouteButton = ({ control, errors, name, setValue, trigger, getValues, imageUploaded }) => {
  const [modalTravelRoute, setModalTravelRoute] = useState(false);
  const [destination, setDestination] = useState(null);
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
  const [loading, setLoading] = useState(false);

  const apikey = API_KEY_MAPS;

  const mapRef = useRef(null);

  const handleTakeSnapshot = async () => {
    if (mapRef.current) {
      try {
        if (destination != null && coordinatesParkingStudents != null){
          const snapshot = await mapRef.current.takeSnapshot({
            format: 'jpg', // Formato de la imagen (puede ser 'jpg' o 'png')
            quality: 0.8, // Calidad de la imagen (valor entre 0 y 1)
            result: 'file', // Tipo de resultado (puede ser 'file', 'base64' o 'data-uri')
          });
          // Obtener las imágenes actuales
          const currentImages = getValues("image");
  
          // Crear una nueva matriz para almacenar las imágenes actualizadas
          const updatedImages = [];
  
          // Agregar la nueva imagen en la primera posición
          updatedImages.push(snapshot);
  
          // Si existen imágenes adicionales, agregarlas a la matriz sin cambios
          if (currentImages && currentImages.length > 1) {
            for (let i = 1; i < currentImages.length; i++) {
              updatedImages.push(currentImages[i]);
            }
          }else if(imageUploaded){
            for (let i = 0; i < currentImages.length; i++) {
              updatedImages.push(currentImages[i]);
            }
          }
          setValue("image", updatedImages); 
          trigger("image");

          setValue(name, { latitude: destination.latitude, longitude: destination.longitude });
          trigger(name);
          
          
          setModalTravelRoute(false); 
          setLoading(false)
        }else{
          console.log("ingresa la direccion");
        }
        
      } catch (error) {
        console.error('Error al tomar el snapshot:', error);
      }
    }
  };

  const handleSelectAddress = (data, details = null) => {
    // Guardar las coordenadas de destino seleccionadas por el usuario
    setDestination({
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
    });
    const newRegion = {
      latitude: (coordinatesParkingStudents.latitude + details.geometry.location.lat) / 2,
      longitude: (coordinatesParkingStudents.longitude + details.geometry.location.lng) / 2,
      latitudeDelta: Math.abs(coordinatesParkingStudents.latitude - details.geometry.location.lat) * 1.3,
      longitudeDelta: Math.abs(coordinatesParkingStudents.longitude - details.geometry.location.lng) * 1.3,
    };
  
    // Establecer la nueva región del mapa
    setMapRegion(newRegion);
  };

  const getCoordinates = async () => {
    setLoading(true);
    setModalTravelRoute(true);
  };

  return (
    <View style={globalStyles.centrar}>
        <TouchableOpacity onPress={() => {getCoordinates()}}>
          <View style={globalStyles.dataButton}>
            <Icon name="map-marker" style={globalStyles.dataIcon}/>
            <Text style={globalStyles.dataTxtButton}>Ruta</Text>
          </View>
        </TouchableOpacity>

        <ModalLoading visible={loading} />

        <Controller
            name={name}
            control={control}
            rules={{ required: "Campo requerido" }}
            defaultValue=""
            render={({ field: { value } }) => (
            <>
                {(!errors[name] && value.length===0) && <Text style={globalStyles.showInfoSelected}> </Text>}
                {(!errors[name] && value.length != 0 ) && <Text style={globalStyles.showInfoSelected}>Ruta guardada</Text>}
                {errors[name] && <Text style={globalStyles.errorMessage}>{errors[name].message}</Text>}
            </>
        )}
        />

        <Modal
        animationType='fade'  transparent={true} visible={modalTravelRoute}
        onRequestClose={() => {
            setModalTravelRoute(false);
            setLoading(false);1
        }}>
          <ScrollView>
            <View style={globalStyles.centerContainer}>
                <View style={styles.modalContainerMap}>
                  <View style={{zIndex: 1, flex: 0.5}}>
                    <GooglePlacesAutocomplete
                        placeholder='Buscar'
                        onPress={handleSelectAddress}
                        query={{
                            key: apikey,
                            language: 'es',
                        }}
                        fetchDetails={true}
                        textInputStyle={{
                            fontSize: 16,
                        }}
                    />
                  </View>
                  <MapView
                      provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                      style={styles.map}
                      ref={mapRef}
                      initialRegion={{
                        latitude: 20.65415556282134,
                        longitude: -103.3246397431702,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                      }}
                      region={mapRegion}
                      minZoomPreference={1} // Ajusta este valor según tus necesidades
                      maxZoomPreference={6} // Ajusta este valor según tus necesidades
                      followsUserLocation={true}
                  >
                  {coordinatesParkingStudents != null && (    
                      <Marker
                          key={coordinatesParkingStudents.id}
                          coordinate={{ latitude: coordinatesParkingStudents.latitude, longitude: coordinatesParkingStudents.longitude }}
                          title={coordinatesParkingStudents.nombre}
                          description={coordinatesParkingStudents.descripcion}
                      />
                  )}
                  {(destination != null && coordinatesParkingStudents != null) && (    
                      <MapViewDirections
                          apikey={apikey}
                          origin={{ latitude: destination.latitude, longitude: destination.longitude }} // Corregir la forma de pasar las coordenadas
                          destination={{ latitude: coordinatesParkingStudents.latitude, longitude: coordinatesParkingStudents.longitude }} // Corregir la forma de pasar las coordenadas// Usar la segunda coordenada como destino
                          strokeWidth={5}
                          strokeColor="red"
                          mode="DRIVING"
                          tracksViewChanges={true} // Evita que la ruta se quite y se vuelva a pinta
                      />
                  )}
                  </MapView>
                  
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={()=> {setModalTravelRoute(false); setLoading(false)}}>
                      <View style={[styles.button, styles.buttonClose]}>
                        <Text style={globalStyles.dataTxtButton}>Cancelar</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleTakeSnapshot}>
                      <View style={[styles.button, styles.buttonClose]}>
                        <Text style={globalStyles.dataTxtButton}>Guardar ruta</Text>
                      </View>
                    </TouchableOpacity>
                  </View>

              </View>
            </View>
          </ScrollView>
        </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 20,
    borderWidth: 2,
    zIndex: 1,
  },
  modalContainerMap:{
    backgroundColor: '#B5D8C3',
  //   borderRadius: 20,
    height: hp("92%"),
    width: wp("95%"),
    padding: 10,
    elevation: 5,
    // alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
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
  buttonClose: {
    backgroundColor: '#0ABEDC',
  },
  buttonGetModule:{
    padding: 10,
    elevation: 2,
    alignSelf: "center",
    width: wp("95%"),
    marginTop: 10,
  },
  containerAutoComplete: {
    width: wp("90%"),
    zIndex: 1, // Asegura que el componente esté sobre el mapa
    position: 'absolute',
    alignItems: "center",
    top: 0,
    left: 0,
    //marginLeft: 10,
    justifyContent: "center",
  },
  textInputContainerAutoComplete: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    zIndex: 1,
  },
  listViewAutoComplete: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 5,
    marginTop: 10,
    elevation: 2,
    zIndex: 1,
  },
  separatorAutoComplete: {
    height: 0.5,
    backgroundColor: '#DDDDDD',
  },
})

export default TravelRouteButton