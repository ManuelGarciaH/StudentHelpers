import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native'
import {globalStyles} from '../../globalStyles';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import { FIREBASE_DB } from '../../Firebase';
import { collection, query, getDocs, limit } from "firebase/firestore";
import { API_KEY_MAPS } from '@env';

const apikey = API_KEY_MAPS;

const origin = {latitude: 20.6557968824397, longitude: -103.32599362480626};
const destination = {latitude: 20.656630129459906, longitude:  -103.32629403219092};

const Viajes = () => {
  const [markerList, setMarkerList] = useState([]);

  useEffect(() => {
    console.log(apikey);
    const getModules = async () => {
      setMarkerList([]);
      try {
        console.log("Realizando consulta a la colección 'modulos'");
        const modulesCollection = collection(FIREBASE_DB, "modulos");
        // const querySnapshot = await getDocs(query(modulesCollection, limit(30)));
        const querySnapshot = await getDocs(modulesCollection);
        console.log("Consulta completada. Documentos obtenidos:", querySnapshot.docs.length);
        if (querySnapshot.empty) {
          console.log("No hay documentos en la colección 'modulos'");
        } else {
          const nuevosMarcadores = [];
          querySnapshot.forEach((doc) => {
            console.log("Datos del documento:", doc.data());
            nuevosMarcadores.push({
              id: doc.id,
              latitude: doc.data().latitud,
              longitude: doc.data().longitud,
              nombre: doc.data().nombre,
              descripcion: 'Descripción del nuevo lugar',
            });
          });
          setMarkerList(nuevosMarcadores);
        }
      } catch (error) {
        console.error("Error al obtener documentos:", error);
      }
    }
    
    getModules();
  }, []); // Se ejecuta solo una vez al montar el componente
  
  return (
    <View>
        <View style={globalStyles.form}>
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
            {markerList.map((marker) => (
              <Marker
                key={marker.id}
                coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                title={marker.nombre}
                description={marker.descripcion}
              />
            ))}
            {markerList.length >= 2 && (
              <MapViewDirections
                apikey={apikey}
                origin={`${markerList[0].latitude},${markerList[0].longitude}`}
                destination={`${markerList[1].latitude},${markerList[1].longitude}`} // Usar la segunda coordenada como destino
                strokeWidth={5}
                strokeColor="red"
                mode="WALKING"
              />
            )}
          </MapView>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Viajes