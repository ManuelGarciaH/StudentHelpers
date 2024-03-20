import { View, Text } from 'react-native'
import React from 'react'
import { globalStyles } from '../../globalStyles'

const VerPublicacion = ({navigation, route}) => {
    const { datos } = route.params;
    return (
        <View>
            <View style={globalStyles.form}>
                <Text>Tostilocos preparados al gusto</Text>
                <Text>Lugar: {datos.location.state} </Text>
                <Text>Días L-V</Text>
                <Text>Horario {datos.registered.date}</Text>
                <Text>Contacto Externo {datos.cell}</Text>
            </View>
        </View>
    )
}

export default VerPublicacion;