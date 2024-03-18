import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button} from 'react-native'
import {globalStyles} from '../../globalStyles';
import MapboxGL, {UserLocation, PointAnnotation, ShapeSource, LineLayer } from "@rnmapbox/maps"
import Geolocation from '@react-native-community/geolocation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useParams } from 'react-router-dom';

const tokenMapBox = "pk.eyJ1IjoibWFueWdoIiwiYSI6ImNsdHRjdXJqbjBxN2wyaW8yaHlydmxtM3AifQ.tUiGgfNB8sO7P_6TBDaa3Q";

MapboxGL.setAccessToken(tokenMapBox);

// MapboxGL.setConnected(true);
MapboxGL.requestAndroidLocationPermissions();
MapboxGL.setTelemetryEnabled(false);
MapboxGL.locationManager.start();

const Viajes = () => {
  const cordenadasEjemplo=[-103.3254175364575, 20.65495138469866]

  const [routeDirections, setRouteDirections] = useState([])
  const [coords, setCoords] = useState([]);
  const route = useParams();
  //const {store} = route.params;

  async function getPermissionLocation() {
    try {
      const geo = await Geolocation.getCurrentPosition(
        location =>
          setCoords([location.coords.longitude, location.coords.latitude]),
        err => console.log(err),
        {enableHighAccuracy: true},
      );
    } catch (error) {
      console.error('Error getting location', error);
    }
  }

  function makeRouterFeature(coordinates){
    let routerFeature = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: coordinates,
          },
        },
      ],
    };
    return routerFeature;
  }

  const handlePress = async (coords) => {
      // Obtener la ubicación actual del usuario (coordenadas)
      // const userLocation = await MapboxGL.locationManager.getLastKnownLocation();
      // const originCoords = [userLocation.coords.longitude, userLocation.coords.latitude];
      const startCoords = `${coords[0]}, ${coords[1]}`;
      const endCoords = '-103.3254175364575, 20.65495138469866';
      // Trazar la ruta entre el origen y el destino
      //const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${originCoords[0]},${originCoords[1]};${coords[0]},${coords[1]}?steps=true&geometries=geojson&access_token=${tokenMapBox}`;
      const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${startCoords};${endCoords}?alternatives=true&geometries=geojson&steps=true&banner_instructions=true&overview=full&voice_instructions=true&access_token=${tokenMapBox}`;
      console.log(startCoords)
      console.log(endCoords)
      console.log(url)
      try {
        let response = await fetch(url);
        let json = await response.json();
        if (json.routes && json.routes.length > 0) { // Verificar si hay rutas en la respuesta JSON
          const coordinates = json.routes[0].geometry.coordinates; // Acceder a las coordenadas de la primera ruta
          console.log("Coordenadas\n", coordinates)
          if (coordinates && coordinates.length > 0) {
              const routerFeature = makeRouterFeature([...coordinates]);
              setRouteDirections(routerFeature);
              console.log(routerFeature)
              // También puedes setear las coordenadas de origen si lo necesitas
              // setCoords({ longitude: originCoords[0], latitude: originCoords[1] });
          }
      } else {
          console.error("No se encontraron rutas o las rutas no están en el formato esperado.");
      }
      }catch (error) {
        console.error(error);
    }
  };

  useEffect(() => {
    // Aquí puedes realizar cualquier acción adicional necesaria
    getPermissionLocation();
    console.log("routeDirections ha cambiado:", routeDirections);
    console.log(routeDirections.length)
  }, [routeDirections]);
  return (
    <View>
        <View style={[globalStyles.form, {padding : 0}]}>
          <View style={styles.container}>
            {/* <MapboxGL.MapView style={styles.map}> */}
              {/* <MapboxGL.UserLocation
                  visible={true}
                />
                <MapboxGL.Camera
                  zoomLevel={16}
                  followUserMode="normal"
                  followUserLocation={true}
                  followZoomLevel={16}
                /> */}
                {/* <MapboxGL.Camera zoomLevel={17} centerCoordinate={cordenadasEjemplo} />
                <MapboxGL.PointAnnotation id="point" coordinate={cordenadasEjemplo} />
            </MapboxGL.MapView> */}
            <MapboxGL.MapView style={styles.map} zoomEnabled={true} rotateEnabled={true} onDidFinishLoadingMap={async()=>{
              await handlePress(coords);
            }}>
              <MapboxGL.Camera
                followUserLocation={true}
                followZoomLevel={14}
                animationMode={'flyTo'}
                animationDuration={6000}
              />
              {routeDirections.length != 0 && (
                <MapboxGL.ShapeSource id= "line1" shape={routeDirections}>
                  <MapboxGL.LineLayer
                    id="routerLine01"
                    style={{lineColor: "#FA9E14", lineWidth: 4}}
                  />
                </MapboxGL.ShapeSource>
              )}

              <MapboxGL.UserLocation
                animated={true}
                androidRenderMode='gps'
                showsUserHeadingIndicator={true}
              />
            </MapboxGL.MapView>
          </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: hp("94%"),
    width: wp("100%"),
    backgroundColor: "tomato",
  },
  map: {
    flex: 1
  }

})

export default Viajes