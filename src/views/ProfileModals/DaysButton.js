import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {Controller} from 'react-hook-form';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, {useState} from 'react'
import { globalStyles } from '../../../globalStyles'

const DaysButton = ({ control, errors, name, setValue, trigger }) => {
  const [modalDays, setModalDays] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);

  const filterDaysSelector = (dia) => {
    const updateDays = selectedDays.includes(dia)
      ? selectedDays.filter((selectedDay) => selectedDay !== dia)
      : [...selectedDays, dia];

    const weeklyDays = ['L', 'M', 'I', 'J', 'V', 'S'];
    const sortedDays = weeklyDays.filter((dia) => updateDays.includes(dia));
    
    setSelectedDays(sortedDays);
  };

  const buttonConfirmDays = () =>{
    //setShowDays(selectedDays);
    setValue(name, selectedDays)
    setModalDays(!modalDays);
    trigger(name)
  }

  return (
    <View style={globalStyles.centrar}>
        <TouchableOpacity onPress={() => setModalDays(true)}>
          <View style={globalStyles.dataButton}>
            <Icon name="calendar" style={globalStyles.dataIcon}/>
            <Text style={globalStyles.dataTxtButton}>Días</Text>
          </View>
        </TouchableOpacity>
        <Controller
            name={name}
            control={control}
            defaultValue={""}
            rules={{required: "Campo requerido"}}
            render={({field:{value}})=> (
            <>
                {!errors[name] && <Text style={globalStyles.showInfoSelected}>{value ? value.join(' - ') : ''}</Text>}
                {errors[name] && <Text style={globalStyles.errorMessage}>{errors[name].message}</Text>}
            </>
        )}
        />

        <Modal animationType="fade" transparent={true} visible={modalDays}
            onRequestClose={() => {
              setModalDays(!modalDays);
            }}>
              <View style={globalStyles.centerContainer}>
                <View style={[styles.modalContainerDays, {justifyContent: "center"}]}>
                  <Text style={[styles.textModal, {fontWeight: "bold"}]}>Escoge los días que estarás disponible</Text>

                  <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => filterDaysSelector('L')}>
                      <View style={[styles.dayButton, selectedDays.includes('L') && styles.selectedDay]}>
                        <Text style={styles.dayText}>Lunes</Text>
                      </View>
                    </TouchableOpacity>
                    <View style={{ marginHorizontal: 10}}></View>
                    <TouchableOpacity onPress={() => filterDaysSelector('M')}>
                      <View style={[styles.dayButton, selectedDays.includes('M') && styles.selectedDay]}>
                        <Text style={styles.dayText}>Martes</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => filterDaysSelector('I')}>
                      <View style={[styles.dayButton, selectedDays.includes('I') && styles.selectedDay]}>
                        <Text style={styles.dayText}>Miercoles</Text>
                      </View>
                    </TouchableOpacity>
                    <View style={{ marginHorizontal: 10}}></View>
                    <TouchableOpacity onPress={() => filterDaysSelector('J')}>
                      <View style={[styles.dayButton, selectedDays.includes('J') && styles.selectedDay]}>
                        <Text style={styles.dayText}>Jueves</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => filterDaysSelector('V')}>
                      <View style={[styles.dayButton, selectedDays.includes('V') && styles.selectedDay]}>
                        <Text style={styles.dayText}>Viernes</Text>
                      </View>
                    </TouchableOpacity>
                      <View style={{ marginHorizontal: 10}}></View>
                    <TouchableOpacity onPress={() => filterDaysSelector('S')}>
                      <View style={[styles.dayButton, selectedDays.includes('S') && styles.selectedDay]}>
                        <Text style={styles.dayText}>Sabado</Text>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.textModal}>Días seleccionados: {selectedDays.join('-')}</Text>
                  
                  <View style={[styles.buttonContainer, {justifyContent: "flex-end"}]}>
                    <TouchableOpacity
                      style={[styles.button, styles.buttonClose, { marginHorizontal: 0}]}
                      onPress={() => setModalDays(false)}>
                      <Text style={styles.textStyle}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => buttonConfirmDays()}>
                      <Text style={styles.textStyle}>Seleccionar Días</Text>
                    </TouchableOpacity>
                  </View>
                  
                </View>
              </View>
          </Modal> 
        
    </View>

    
  )
}

const styles = StyleSheet.create({
    botonDatos:{
        width: wp("27%"),
        backgroundColor: "green",
        textAlign: "center",
    },
    modalContainerDays: {
        backgroundColor: '#B5D8C3',
        height: hp("42%"),
        width: wp("88%"),
        padding: 10,
        elevation: 5,
        alignItems: "center",
    },
    textModal: {
        textAlign: "center",
        fontSize: 18,
        color: "black",
        marginBottom: 10,
    },
    buttonContainer:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between", // Distribuye automáticamente el espacio entre los botones
        marginVertical: 5
    },
    dayButton: {
        alignItems: "center",
        paddingVertical: 8,
        borderWidth: 2,
        borderRadius: 20,
        borderColor: 'grey',
        marginBottom: 10,
        width: wp("30%"),
    },
    selectedDay: {
        backgroundColor: '#8CD1A9',
    },
    dayText: {
        fontSize: 16,
        // fontWeight: 'bold',
        color: "black",
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
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
})

export default DaysButton