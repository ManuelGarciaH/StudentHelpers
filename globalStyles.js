import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const globalStyles = StyleSheet.create({
    header:{                    //Header contiene el logo, titulo de la ventana
        flexDirection: 'row', 
        alignItems: 'center',
        flex: 1,
    },
    centrar:{
        flex: 1,
        alignItems: 'center', // Esto centra horizontalmente el contenido
    },
    imgBackGround:{
        width: wp('100%'),
        height: hp('15%'),
    },
    imgHeaderLogo:{
        width: wp('23%'),
        height: hp('13%'),
        margin: 10
    },
    imgHeaderRetroceso:{
        width: wp('20%'),
        height: hp('10%'),
        margin: 10
    },
    form:{
        backgroundColor: '#A7DBCB',
        padding: 20,
        height: hp('100%'),
        alignItems: 'center',
    },
    txtBasic:{
        fontSize: 20,
        color: '#000000',
        fontWeight: '600',
    },
    input:{
        width: wp('90%'),
        borderWidth: 1,
        backgroundColor: '#AFC1BC',
        borderColor: 'black',
        borderRadius: 15,
        marginBottom: 15,
        marginTop: 2,
    },
    txtInput:{
        fontSize: 20,
        color: '#000000',
        fontWeight: '600',
    },
    boton:{
        backgroundColor: '#33BD78',
        width: wp('70%'),
        height: hp('8%'),
        borderRadius: 15,
        marginTop: 10,
    },
    txtBoton:{
        fontSize: 25,
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: '#000000',
        fontWeight: 'bold',
    },
    container:{
        flex: 1,
    },
    showInfoSelected:{
        color: "black",
        fontSize: 17,
    },
    errorMessage:{
        color: "red",
        fontSize: 17,
    },
    dataButton:{
        flexDirection: "row",
        backgroundColor: "green",
        padding: 7,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        width: wp("39%"),
    },
    dataIcon:{
        color: "white",
        fontSize: 17,
        marginRight: 10
    },
    dataTxtButton:{
        fontSize: 18,
        color: "white",
        fontWeight: "bold",
    },
    centerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});