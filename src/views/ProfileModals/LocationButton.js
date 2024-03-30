import { View, Text, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react';
import {Controller} from 'react-hook-form';
import Icon from 'react-native-vector-icons/FontAwesome';
import { globalStyles } from '../../../globalStyles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ModalSelector from 'react-native-modal-selector';

const LocationButton = ({ control, errors, name, setValue, trigger }) => {
  //List for modalSelector
  const [modulesList, setModulesList] = useState([]);

  const [modalLocation, setModalLocation] = useState()
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() =>{
    setModulesList([]);
    const moduleOptions = [];
    let j=0;
    for (let i = 65; i <= 90; i++) {
      moduleOptions.push({
        key: i + j - 65,
        label: 'Modulo ' + String.fromCharCode(i),
      });
      if (String.fromCharCode(i) == 'V') {
        j++;
        moduleOptions.push({key: i + j - 65, label: 'Modulo V2'});
      }
    }

    moduleOptions.push({key: 27, label: 'Modulo Z2'});
    moduleOptions.push({key: 28, label: 'Modulo Alpha(DUCT1)'});
    moduleOptions.push({key: 29, label: 'Modulo Beta(DUCT2)'});
    setModulesList(moduleOptions);
  }, [])

  return (
    <View style={globalStyles.centrar}>
        <Icon.Button name="map-marker"style={styles.botonDatos} borderRadius={13}
        onPress={() => setModalLocation(true)}>Lugar</Icon.Button>
        {modalLocation && (
        <ModalSelector data={modulesList} visible={true} style={{height: hp("0%"), width: wp("0%")}}
            onModalClose={() => {
                setModalLocation(false)
            }}
            onChange={option => {
                setSelectedLocation(option.label);
                setModalLocation(false); // Cierra el modal después de seleccionar una opción
                setValue(name, option.label);
                trigger(name)
            }}
        />
        )}
        <Controller
            name={name}
            control={control}
            rules={{ required: "Campo requerido" }}
            defaultValue=""
            render={({ field: { value } }) => (
            <>
                <Text>{value}</Text>
                {errors[name] && <Text style={{ color: 'red' }}>{errors[name].message}</Text>}
            </>
        )}
        />
    </View>
  )
}

styles = StyleSheet.create({
    botonDatos:{
        width: wp("27%"),
        backgroundColor: "green",
        textAlign: "center",
    },
})

export default LocationButton;