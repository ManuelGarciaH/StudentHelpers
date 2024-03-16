import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native'
import {globalStyles} from '../../globalStyles';
import MapboxGL from "@rnmapbox/maps"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const tokenMapBox = "pk.eyJ1IjoibWFueWdoIiwiYSI6ImNsdHRjdXJqbjBxN2wyaW8yaHlydmxtM3AifQ.tUiGgfNB8sO7P_6TBDaa3Q";

MapboxGL.setAccessToken(tokenMapBox);

// MapboxGL.setConnected(true);
MapboxGL.setTelemetryEnabled(false);
// MapboxGL.setWellKnownTileServer("Mapbox");

const Viajes = () => {
  const cordenadasEjemplo=[-103.3254175364575, 20.65495138469866]

  return (
    <View>
        <View style={globalStyles.form}>
          <View style={styles.container}>
            <MapboxGL.MapView style={styles.map}>
              <MapboxGL.Camera zoomLevel={15} centerCoordinate={cordenadasEjemplo} />
              <MapboxGL.PointAnnotation id="point" coordinate={cordenadasEjemplo} />
            </MapboxGL.MapView>
          </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: hp("88%"),
    width: wp("100%"),
    backgroundColor: "tomato"
  },
  map: {
    flex: 1
  }

})

export default Viajes