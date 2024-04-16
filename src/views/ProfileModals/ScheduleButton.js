import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {Controller} from 'react-hook-form';
import { globalStyles } from '../../../globalStyles';
import DatePicker from 'react-native-date-picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';

const ScheduleButton = ({ control, errors, name }) => {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(new Date());

    // Calcula las horas de inicio y fin límites
    const minTime = new Date();
    minTime.setHours(7, 0, 0); // 7:00 am
    const maxTime = new Date();
    maxTime.setHours(21, 0, 0); // 9:00 pm

    return (
        <View style={globalStyles.centrar}>
            <TouchableOpacity onPress={() => setOpen(true)}>
            <View style={globalStyles.dataButton}>
                <Icon name="clock-o" style={globalStyles.dataIcon}/>
                <Text style={globalStyles.dataTxtButton}>Horario</Text>
            </View>
            </TouchableOpacity>
            {/*Open datePicker schedule*/}
            <Controller
                name={name}
                control={control}
                rules={{required: "Campo requerido"}}
                defaultValue=""
                render={({field: {onChange, value}})=>(
                    <>
                        <DatePicker modal open={open} date={date} mode="time" minimumDate={minTime} maximumDate={maxTime}
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