import { StyleSheet, TextInput, View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function PasswordInput(props) {
  const [visibility, setVisibility] = useState(true);
  const [secure, setSecure] = useState(true);
  const [icon, setIcon] = useState("visibility");

  const showPassword = () => {
    if (visibility) {
      setSecure(false);
      setVisibility(false);
      setIcon("visibility-off");
    } else {
      setSecure(true);
      setVisibility(true);
      setIcon("visibility");
    }
  }

  return (
    <View style={styles.container}>
      <TextInput 
            secureTextEntry={secure}
            {...props}
            style={styles.input}
      /> 
      <TouchableOpacity onPress={showPassword} style={styles.show}>
        <Icon name={icon} size={30} color="black" /> 
      </TouchableOpacity>
        {/*<Text>{password}</Text>
         Implementar boton para ocultar */}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row', 
      alignItems: 'center', 
      backgroundColor: '#AFC1BC',
      borderRadius: 5,
    },
    input:{
        flex: 1,
        width: wp('90%'),
        backgroundColor: '#AFC1BC',
        borderRadius: 5,
        marginTop: 2,
        color: '#000000',
    },
    show:{
      alignItems: 'center',
      justifyContent: "center",
      width: wp('14%'),
      height: hp('6%'),
      backgroundColor: '#AFC1BC',
      borderRadius: 5,
    }
})