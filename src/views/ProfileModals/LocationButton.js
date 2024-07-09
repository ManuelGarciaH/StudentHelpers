import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Controller} from 'react-hook-form';
import Icon from 'react-native-vector-icons/FontAwesome';
import { globalStyles } from '../../../globalStyles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ModalSelector from 'react-native-modal-selector';
import { Button } from 'react-native-paper';

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
    <View style={[globalStyles.centrar, {flex: 1}]}>
        <TouchableOpacity onPress={() => setModalLocation(true)}>
          <View style={globalStyles.dataButton}>
            <Icon name="map-marker" style={globalStyles.dataIcon}/>
            <Text style={globalStyles.dataTxtButton}>Lugar</Text>
          </View>
        </TouchableOpacity>
        
        {modalLocation && (
        <ModalSelector animationType="fade" data={modulesList} visible={true} 
          optionTextStyle={styles.optionText}
          style={styles.modalSelector}
            onModalClose={() => {
                setModalLocation(false)
            }}
            onChange={option => {
                setSelectedLocation(option.label);
                setModalLocation(false); // Cierra el modal después de seleccionar una opción
                setValue(name, option.label);
                trigger(name)
            }}
            onRequestClose={() => {
              setModalLocation(false);
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
                {!errors[name] && <Text style={globalStyles.showInfoSelected}>{value}</Text>}
                {errors[name] && <Text style={globalStyles.errorMessage}>{errors[name].message}</Text>}
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
  modalSelector:{
    height: hp("0%"), 
    width: wp("0%"),
    backgroundColor: "black",
  },
  optionText:{
    fontSize: 25,
  },
})

export default LocationButton;