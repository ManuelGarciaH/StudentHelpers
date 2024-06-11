import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const globalStyles = StyleSheet.create({
    header:{                    //Header contiene el logo, titulo de la ventana
        flexDirection: 'row', 
        alignItems: 'center',
        flex: 1,
    },
    centrar:{
        // flex: 1,
        alignItems: 'center', // Esto centra horizontalmente el contenido
        textAlignVertical: "center"
    },
    imgBackGround:{
        width: wp('100%'),
        height: hp('7.5%'),
    },
    imgHeaderLogo:{
        marginLeft: "4%",
        width: wp('12%'),
        height: hp('6%'),
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
        //alignItems: 'center',
    },
    txtBasic:{
        fontSize: 17,
        color: '#000000',
        fontWeight: '600',
        marginTop: 10,
    },
    input:{
        width: wp('90%'),
        //borderWidth: 1,
        backgroundColor: '#AFC1BC',
        //borderColor: 'black',
        borderRadius: 5,
        //marginBottom: 15,
        marginTop: 2,
        color: '#000000',
        //fontWeight: '600',
    },
    txtInput:{
        //fontSize: 20,
        color: '#000000',
        fontWeight: '600',
    },
    boton:{
        backgroundColor: '#33BD78',
        width: wp('70%'),
        height: hp('8%'),
        borderRadius: 15,
        margin: 20,
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
    mainContainer: {
        flex: 1,
        padding: 3,
        paddingTop: 0,
        alignItems: "center",
        backgroundColor: '#A7DBCB',
    },
});