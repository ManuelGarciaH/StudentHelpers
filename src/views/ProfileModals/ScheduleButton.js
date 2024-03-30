import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Controller} from 'react-hook-form';
import Icon from 'react-native-vector-icons/FontAwesome';
import { globalStyles } from '../../../globalStyles';
import DatePicker from 'react-native-date-picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ScheduleButton = ({ control, errors, name }) => {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(new Date());

    return (
        <View style={globalStyles.centrar}>
            <Icon.Button name="clock-o" style={styles.botonDatos} borderRadius={13}
            onPress={() => setOpen(true)}>Horarios</Icon.Button>
            {/*Open datePicker schedule*/}
            <Controller
                name={name}
                control={control}
                rules={{required: "Campo requerido"}}
                defaultValue=""
                render={({field: {onChange, value}})=>(
                    <>
                        <DatePicker modal open={open} date={date} mode="time"
                            onConfirm={(date) => {
                                setOpen(false)
                                setDate(date)
                                onChange(date.toLocaleTimeString());
                            }}
                            onCancel={() => {
                                setOpen(false)
                            }}
                        />
                        <Text>{value}</Text> 
                        {errors[name] && <Text style={{ color: 'red' }}>{errors[name].message}</Text>}
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