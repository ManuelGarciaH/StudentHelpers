import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import {Controller} from 'react-hook-form';
import {globalStyles} from '../../../globalStyles';
import DatePicker from 'react-native-date-picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';

const ScheduleButton = ({ control, errors, name,  start, getValues}) => {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(new Date());

    // Calcula las horas de inicio y fin límites
    const minTime = new Date();
    minTime.setHours(7, 0, 0); // 7:00 am
    const maxTime = new Date();
    maxTime.setHours(21, 0, 0); // 9:00 pm
    const horaInicial = new Date();
    horaInicial.setHours(15, 0, 0)


    const openDatePicker=()=>{
        if(start){
            setOpen(true)
        }else{
            if(getValues("horario")==""){
                setOpen(false)
                Alert.alert("Debes seleccionar primero un horario de inicio");
            }else{
                setOpen(true)
            }
        }
    }

    const validateHorarioFinal = (value) => {
        if(name=="horario"){
            return true;
        }else{
            const horarioFinal = obtenerHorasMinutos(value);
            const horarioInicial = obtenerHorasMinutos(getValues('horario'));

            if (horarioFinal <= horarioInicial) {
                return 'El horario final debe ser mayor que el horario inicial'; // Mensaje de error personalizado
            }
            return true; // Validación pasada
      };
    }

    const obtenerHorasMinutos = (hora) => {
        console.log(hora)
        const partesHora = hora.split(':');
        const horas = parseInt(partesHora[0], 10);
        const minutos = parseInt(partesHora[1], 10);
        return horas * 60 + minutos;
      };
        
    

    return (
        <View style={[globalStyles.centrar, {flex: 1}]}>
            <TouchableOpacity onPress={openDatePicker}>
            <View style={globalStyles.dataButton}>
                <Icon name="clock-o" style={globalStyles.dataIcon}/>
                {start && <Text style={globalStyles.dataTxtButton}>Horario Inicio</Text>}
                {!start && <Text style={globalStyles.dataTxtButton}>Horario Final</Text>}
            </View>
            </TouchableOpacity>
            {/*Open datePicker schedule*/}
            <Controller
                name={name}
                control={control}
                rules={{
                    required: 'Campo requerido',
                    validate: { validateHorarioFinal }
                  }}
                defaultValue=""
                render={({field: {onChange, value}})=>(
                    <>
                        <DatePicker modal open={open} date={horaInicial} mode="time" minimumDate={minTime} maximumDate={maxTime}
                            title="Selecciona una hora" // Texto adicional en el encabezado del modal
                            cancelText="Cancelar" // Texto personalizado para el botón de cancelar
                            confirmText="Aceptar" // Texto personalizado para el botón de confirmar
                            buttonColor="green"
                            dividerColor="green"
                            theme="auto"
                            onConfirm={(date) => {
                                setOpen(false)
                                setDate(date)
                                onChange(date.toLocaleTimeString());
                            }}
                            onCancel={() => {
                                setOpen(false)
                            }}
                            onRequestClose={() => {
                                setOpen(false);
                            }}
                        />
                        
                        {!errors[name] && <Text style={globalStyles.showInfoSelected}>{value}</Text>}
                        {errors[name] && <Text style={globalStyles.errorMessage}>{errors[name].message}</Text>}
                    </>
                )}
            />
            {/*Close datePicker schedule*/}
        </View>
    )
}

const styles = StyleSheet.create({
    botonDatos:{
        width: wp("27%"),
        backgroundColor: "green",
        textAlign: "center",
    },
})

export default ScheduleButton;